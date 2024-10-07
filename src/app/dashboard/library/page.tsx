import Link from "next/link";

export default function LibraryPage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow min-w-0 lg:min-h-svh p-4 flex flex-col gap-4 overflow-x-hidden">
            <div>
                <Link href='/dashboard/library/tmd' className="bg-card-light py-1 px-4 rounded-lg">TMD</Link>
            </div>
        </main>
    );
}