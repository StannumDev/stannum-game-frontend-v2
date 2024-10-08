import Link from "next/link";

export default function LibraryPage() {
    return (
        <main className="main-container">
            <div>
                <Link href='/dashboard/library/tmd' className="bg-card-light py-1 px-4 rounded-lg">TMD</Link>
            </div>
        </main>
    );
}