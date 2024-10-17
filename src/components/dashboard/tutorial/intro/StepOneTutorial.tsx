import { motion } from 'framer-motion';

interface Props{
    direction: 'prev'|'next'
}

export const StepOneTutorial = ({direction}:Props) => {

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
            className="w-full lg:grow py-12 lg:py-4 text-center text-pretty flex flex-col justify-center items-center"
        >
            <h2 className='w-fit max-w-full px-4 pb-2 text-2xl lg:text-5xl font-thin uppercase text-stannum border-b-2 border-white/25'>
                Bienvenido a
                <b className='text-white text-4xl lg:text-8xl font-black block'>STANNUM Game</b>
            </h2>
            <h3 className='mt-8 title-3 text-white font-semibold text-lg lg:text-2xl'>Preparate para transformar tu entrenamiento.</h3>
            <p className='mt-2 w-full max-w-2xl font-thin text-base lg:text-lg text-white/50'>En STANNUM Game, llevarás tus habilidades de emprendedor al siguiente nivel mientras superas desafíos y mejoras tu desempeño. Esta plataforma ha sido <b className='text-stannum font-semibold'>diseñada para emprendedores como tú,</b> que buscan evolucionar continuamente y desbloquear su <b className='text-stannum font-semibold'>máximo potencial.</b></p>
        </motion.main>
    )
}
