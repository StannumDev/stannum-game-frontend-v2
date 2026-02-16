import { motion } from 'framer-motion';
import { CommunityIcon } from '@/icons';

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
            className="w-full grow py-8 lg:py-8"
        >
            <div className='size-full relative lg:overflow-y-auto'>
                <div className='size-full text-center flex flex-col justify-center items-center gap-8 lg:absolute lg:top-0 lg:left-0'>
                    <div className='lg:grow max-w-lg flex flex-col justify-center items-center'>
                        <h2 className='title-3 font-semibold text-lg lg:text-2xl'>
                            Explora la Comunidad STANNUM
                        </h2>
                        <p className='mt-2 w-full max-w-2xl font-thin lg:text-lg text-white/50'>En la sección <b className='text-stannum font-semibold'>Comunidad</b> encontrarás el <b className='text-stannum font-semibold'>Banco de Prompts</b> y el <b className='text-stannum font-semibold'>Banco de Asistentes de IA</b> creados por la comunidad. Comparte tus propias herramientas y aprovecha las de otros jugadores para <b className='text-stannum font-semibold'>potenciar tu productividad.</b></p>
                    </div>
                    <CommunityIcon className='size-24 lg:size-48 text-stannum lg:absolute lg:bottom-0 lg:left-8'/>
                </div>
            </div>
        </motion.main>
    )
}
