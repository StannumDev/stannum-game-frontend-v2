import { motion } from 'framer-motion';

interface Props{
    direction: 'prev'|'next'
}

export const StepFiveTutorial = ({direction}:Props) => {

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
            className="w-full lg:grow py-12 lg:py-4 text-center flex flex-col justify-center items-center"
        >
            <h2 className='w-full text-2xl lg:text-5xl font-black uppercase'>
                ¡Estas listo para <span className='block lg:inline'>comenzar tu viaje!</span>
            </h2>
            <p className='mt-2 w-full max-w-2xl font-thin text-base lg:text-lg text-white/50'>Has adquirido las herramientas necesarias para enfrentarte a desafíos reales. Desde hoy, tu progreso estará en tus manos y <b className='text-stannum font-semibold'>cada decisión te acercará más a tus objetivos</b> personales y profesionales. En <b className='text-white font-semibold'>STANNUM Game</b> tendrás acceso a <b className='text-stannum font-semibold'>recursos exclusivos, misiones diarias,</b> y la oportunidad de <b className='text-stannum font-semibold'>medir tu evolución de manera continua.</b></p>
        </motion.main>
    )
}
