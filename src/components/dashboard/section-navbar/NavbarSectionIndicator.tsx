'use client'

import { m } from 'framer-motion';

export const NavbarSectionIndicator = () => {
    return (
        <m.span
            transition={{ duration: 0.125, type: 'spring', bounce: 0 }}
            layoutId="NavbarSectionIndicator"
            className="size-full rounded-xl bg-stannum/40 inline-block absolute top-0 left-0 z-0"
        ></m.span>
    )
}
