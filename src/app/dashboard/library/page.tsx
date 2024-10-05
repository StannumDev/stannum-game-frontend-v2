import Link from "next/link";

export default function LibraryPage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow lg:min-h-svh flex justify-start items-start p-4">
            <div>
                <Link href='/dashboard/library/tmd' className="bg-card-light py-1 px-4 rounded-lg">TMD</Link>
            </div>
        </main>
    );
}