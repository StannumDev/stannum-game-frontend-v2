import { motion } from 'framer-motion';
import { RankingStarIcon } from '@/icons';

interface Props{
    direction: 'prev'|'next'
}

export const StepFourTutorial = ({direction}:Props) => {

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
            className="w-full grow py-12 lg:py-8"
        >
            <div className='size-full relative lg:overflow-y-auto'>
                <div className='size-full text-center flex flex-col justify-center lg:justify-center items-center gap-8 lg:absolute lg:top-0 lg:left-0'>
                    <div className='lg:grow max-w-lg flex flex-col justify-center items-center'>
                        <h2 className='title-3 font-semibold text-lg lg:text-2xl'>
                            ¡Acepta el desafío y potencia tu crecimiento!
                        </h2>
                        <p className='mt-2 w-full max-w-2xl font-thin lg:text-lg text-white/50'>En <b className='font-semibold text-white'>STANNUM Game</b>, cada paso que das te acerca a nuevas recompensas y mayores desafíos. Tu progreso no solo te llevará a mejorar tus habilidades, sino también a ganar <b className='text-stannum font-semibold'>logros exclusivos,</b> desbloquear <b className='text-stannum font-semibold'>títulos únicos</b>, y participar en la clasificación de los <b className='text-stannum font-semibold'>mejores jugadores.</b></p>
                    </div>
                    <RankingStarIcon className='size-24 lg:size-48 text-stannum lg:absolute lg:bottom-0 lg:left-8'/>
                </div>
            </div>
        </motion.main>
    )
}
