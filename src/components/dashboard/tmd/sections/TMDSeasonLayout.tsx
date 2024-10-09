import { motion } from 'framer-motion';
import { TMDModuleCard } from "@/components";

export const TMDSeasonLayout = () => {
    return (
        <motion.section
            key="TMDSeasonLayout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            className="w-full flex flex-col gap-4"
        >
            <TMDModuleCard/>
            <TMDModuleCard/>
        </motion.section>
    )
}