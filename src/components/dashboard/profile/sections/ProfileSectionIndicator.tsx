'use client'

import { motion } from 'framer-motion';

export const ProfileSectionIndicator = () => {
    return (
        <motion.span
            transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
            layoutId="profileSectionIndicator"
            className="size-full rounded-xl bg-stannum/40 inline-block absolute top-0 left-0 z-0"
        ></motion.span>
    )
}
