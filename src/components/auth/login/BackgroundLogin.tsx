'use client'

import Image from "next/image";
import { m } from "framer-motion"
import background from "@/assets/background/the_game.webp";

export const BackgroundLogin = () => {
    return (
        <m.aside
            initial={{ x: '-100%', opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            transition={{ type:'spring', bounce: 0 }}
            className="w-full lg:w-auto lg:grow aspect-video lg:aspect-auto max-h-64 lg:max-h-none relative"
        >
            <div className="size-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-background absolute top-0 left-0 z-10"></div>
            <Image src={background} alt='Iniciar sesión' className="size-full object-cover absolute top-0 left-0 z-0"/>
        </m.aside>
    )
}
