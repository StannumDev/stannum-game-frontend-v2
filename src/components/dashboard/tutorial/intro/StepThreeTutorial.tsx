import Image from 'next/image';
import { motion } from 'framer-motion';
import photo from '@/assets/background/stannum_game_trophy.webp';

interface Props{
    direction: 'prev'|'next'
}

export const StepThreeTutorial = ({direction}:Props) => {

    const variants = {
        enter: { x: direction === "next" ? "50%" : "-50%", opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.1 } },
        exit: { x: direction === "next" ? "-50%" : "50%", opacity: 0, transition: { duration: 0.1 } }
    };

    return (
        <motion.main
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            className="w-full grow py-8 lg:py-8"
        >
            <div className='size-full relative lg:overflow-y-auto'>
                <div className='size-full text-center flex flex-col lg:flex-row px-4 lg:px-0 gap-8 justify-center items-center lg:absolute lg:top-0 lg:left-0'>
                    <Image priority src={photo} alt='Tutorial STANNUM Game' className='w-full max-w-md aspect-square object-cover object-[90%_50%] rounded-2xl shrink-0 shadow-md' />
                    <div className='grow max-w-lg text-pretty flex flex-col items-center'>
                        <h2 className='title-3 font-semibold text-lg lg:text-2xl'>
                            ¡Acepta el desafío y potencia tu crecimiento!
                        </h2>
                        <p className='mt-2 w-full max-w-2xl font-thin lg:text-lg text-white/50'>Cada desafío ha sido creado para que avances de manera <b className='text-stannum font-semibold'>estructurada y lógica.</b> A través de competencias, pruebas individuales y misiones, irás ganando confianza, conocimiento y habilidades para superar los retos más complejos de tu negocio.</p>
                    </div>
                </div>
            </div>
        </motion.main>
    )
}
