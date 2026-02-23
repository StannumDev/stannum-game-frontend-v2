'use client'

import { m } from 'framer-motion';

export const SidebarMobileIndicator = () => {
    return (
        <m.div
            transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
            layoutId="navbarIndicator"
            className="w-4 h-0.5 bg-stannum rounded-full absolute bottom-2"
        ></m.div>
    )
}
