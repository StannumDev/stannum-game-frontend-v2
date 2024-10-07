import { TMDModuleCard } from "@/components";
import { motion } from 'framer-motion';

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