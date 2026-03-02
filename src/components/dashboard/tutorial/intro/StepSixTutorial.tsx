import { m } from 'framer-motion';
import { RocketIcon } from '@/icons';

interface Props{
    direction: 'prev'|'next'
}

export const StepSixTutorial = ({direction}:Props) => {

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
            className="w-full lg:grow py-12 lg:py-4 text-center flex flex-col justify-center items-center"
        >
            <RocketIcon className="size-12 lg:size-16 text-stannum mb-4" />
            <h2 className='w-full text-2xl lg:text-5xl font-black'>
                ¡A Jugar!
            </h2>
            <p className='mt-4 w-full max-w-xl font-thin lg:text-lg text-white/50'>Ya conocés el terreno. Completá lecciones, subí de nivel y dominá el <b className='text-stannum font-semibold'>ranking.</b> Tu progreso está en tus manos.</p>
        </m.main>
    )
}
