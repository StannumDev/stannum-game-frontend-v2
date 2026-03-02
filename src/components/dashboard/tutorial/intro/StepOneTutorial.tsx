import { m } from 'framer-motion';
import { GameControllerIcon } from '@/icons';

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
        <m.main
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            className="w-full lg:grow py-12 lg:py-4 text-center text-pretty flex flex-col justify-center items-center"
        >
            <GameControllerIcon className="size-12 lg:size-16 text-stannum mb-4" />
            <h2 className='w-fit max-w-full px-4 pb-2 text-2xl lg:text-5xl font-thin border-b-2 border-white/25'>
                <span className='text-stannum'>Bienvenido a</span>
                <b className='text-4xl lg:text-8xl font-black block'>STANNUM Game</b>
            </h2>
            <p className='mt-8 w-full max-w-xl font-thin lg:text-lg text-white/50'>Tu plataforma de entrenamiento gamificado, diseñada para <b className='text-stannum font-semibold'>líderes que buscan evolucionar.</b></p>
        </m.main>
    )
}
