'use client'

import { motion } from 'framer-motion';

export const SidebarMobileIndicator = () => {
    return (
        <motion.div
            transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
            layoutId="navbarIndicator"
            className="w-4 h-0.5 bg-stannum rounded-full absolute bottom-2"
        ></motion.div>
    )
}
