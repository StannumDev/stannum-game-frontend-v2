'use client'

import Image from "next/image";
import { motion } from 'framer-motion';
import wallpaper from "@/assets/wallpaper/login.webp";

export const WallpaperLogin = () => {
    return (
        <motion.aside
            initial={{ x: '-100%', opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            transition={{ type:'spring', bounce: 0 }}
            className="w-full lg:w-1/2 aspect-video max-h-64 lg:max-h-none lg:aspect-auto lg:h-svh relative"
        >
            <Image src={wallpaper} alt='Iniciar sesión' className="size-full object-cover absolute top-0 left-0"/>
        </motion.aside>
    )
}
