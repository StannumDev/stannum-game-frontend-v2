import Image from "next/image";
import { LazyMotion, domAnimation } from "framer-motion"
import * as motion from "framer-motion/m"
import background from "@/assets/background/login.webp";

export const BackgroundLogin = () => {
    return (
        <LazyMotion features={domAnimation}>
            <motion.aside
                initial={{ x: '-100%', opacity: 0}}
                animate={{ x: 0, opacity: 1}}
                transition={{ type:'spring', bounce: 0 }}
                className="w-full lg:w-1/2 aspect-video max-h-64 lg:max-h-none lg:aspect-auto lg:h-svh relative"
            >
                <Image src={background} alt='Iniciar sesión' className="size-full object-cover absolute top-0 left-0"/>
            </motion.aside>
        </LazyMotion>
    )
}
