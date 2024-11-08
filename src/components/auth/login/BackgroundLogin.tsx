import Image from "next/image";
import { LazyMotion, domAnimation } from "framer-motion"
import * as motion from "framer-motion/m"
import background from "@/assets/background/the_game.webp";

export const BackgroundLogin = () => {
    return (
        <LazyMotion features={domAnimation}>
            <motion.aside
                initial={{ x: '-100%', opacity: 0}}
                animate={{ x: 0, opacity: 1}}
                transition={{ type:'spring', bounce: 0 }}
                className="w-full lg:w-auto lg:grow aspect-video lg:aspect-auto max-h-64 lg:max-h-none lg:h-svh relative"
            >
                <div className="size-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-background absolute top-0 left-0 z-10"></div>
                <Image src={background} alt='Iniciar sesión' className="size-full object-cover absolute top-0 left-0 z-0"/>
            </motion.aside>
        </LazyMotion>
    )
}
