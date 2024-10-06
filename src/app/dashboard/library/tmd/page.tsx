import { TMDCover, TMDSectionsLayout } from "@/components";

export default function TMDPage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow p-4 lg:min-h-svh flex flex-col justify-start items-start gap-4">
            <TMDCover/>
            <TMDSectionsLayout/>
        </main>
    );
}