import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.STANNUM_API_KEY;

const ALLOWED_ORIGINS = (() => {
    try {
        const raw = process.env.NEXT_PUBLIC_APP_ORIGIN || "";
        if (raw) return [raw];
    } catch {}
    return [];
})();

const isOriginAllowed = (origin: string | null): boolean => {
    if (!origin) return true;
    if (ALLOWED_ORIGINS.length === 0) return true;
    return ALLOWED_ORIGINS.includes(origin);
};

const ipBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000;

const getClientIp = (req: NextRequest): string => {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const real = req.headers.get("x-real-ip");
    if (real) return real;
    return "unknown";
};

const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    const bucket = ipBuckets.get(ip);
    if (!bucket || bucket.resetAt < now) {
        ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }
    bucket.count += 1;
    return bucket.count > RATE_LIMIT_MAX;
};

const pruneBuckets = () => {
    if (ipBuckets.size < 1000) return;
    const now = Date.now();
    for (const [key, bucket] of ipBuckets) {
        if (bucket.resetAt < now) ipBuckets.delete(key);
    }
};

export async function POST(req: NextRequest) {
    if (!API_URL || !API_KEY) {
        return NextResponse.json({ success: false }, { status: 500 });
    }

    const origin = req.headers.get("origin");
    if (!isOriginAllowed(origin)) {
        return NextResponse.json({ success: false, code: "ORIGIN_NOT_ALLOWED" }, { status: 403 });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
        return NextResponse.json({ success: false, code: "RATE_LIMITED" }, { status: 429 });
    }
    pruneBuckets();

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ success: false, code: "INVALID_JSON" }, { status: 400 });
    }

    try {
        const upstream = await fetch(`${API_URL}/feedback/error`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "x-forwarded-for": ip,
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(8_000),
        });

        const text = await upstream.text();
        return new NextResponse(text, {
            status: upstream.status,
            headers: { "Content-Type": upstream.headers.get("content-type") || "application/json" },
        });
    } catch (err) {
        console.error("[feedback/error route] proxy failed:", err);
        return NextResponse.json({ success: false }, { status: 502 });
    }
}
