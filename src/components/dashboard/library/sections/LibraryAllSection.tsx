import { LibraryCard } from "@/components";

export const LibraryAllSection = () => {
    return (
        <section className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <LibraryCard/>
            <LibraryCard/>
            <LibraryCard/>
            <LibraryCard/>
            <LibraryCard/>
        </section>
    )
}
