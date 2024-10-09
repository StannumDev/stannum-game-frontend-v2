import { motion } from 'framer-motion';
import { TMDModuleCard } from "@/components";

export const TMDPreseasonLayout = () => {
    return (
        <motion.section
            key="TMDPreseasonLayout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            className="w-full flex flex-col gap-4"
        >
            <TMDModuleCard/>
            <TMDModuleCard/>
            <TMDModuleCard/>
        </motion.section>
    )
}