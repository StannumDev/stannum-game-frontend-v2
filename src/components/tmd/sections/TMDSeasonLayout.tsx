import { TMDModuleCard } from "@/components";
import { motion } from 'framer-motion';

export const TMDSeasonLayout = () => {
    return (
        <motion.section
            key="TMDSeasonLayout"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1}}
            transition={{ type: "spring", bounce: 0 }}
            className="w-full flex flex-col gap-4"
        >
            <TMDModuleCard/>
            <TMDModuleCard/>
        </motion.section>
    )
}