import { StoreCard } from "@/components";

export const StoreAllSection = () => {
    return (
        <section className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
        </section>
    )
}
