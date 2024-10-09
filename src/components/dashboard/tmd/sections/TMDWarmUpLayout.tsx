import { motion } from 'framer-motion';
import { TMDModuleCard } from "@/components";

export const TMDWarmUpLayout = () => {
    return (
        <motion.section
            key="TMDWarmUpLayout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            className="w-full flex flex-col gap-4"
        >
            <TMDModuleCard/>
        </motion.section>
    )
}