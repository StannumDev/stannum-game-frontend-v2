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
                <div className='size-full text-center flex flex-col justify-center items-center gap-8 lg:absolute lg:top-0 lg:left-0'>
                    <div className='lg:grow max-w-lg flex flex-col justify-center items-center'>
                        <RankingStarIcon className='size-10 lg:size-14 text-stannum mb-3'/>
                        <h2 className='title-3 font-semibold text-lg lg:text-2xl'>
                            Competí y escalá posiciones
                        </h2>
                        <p className='mt-2 w-full max-w-2xl font-thin lg:text-lg text-white/50'>Ganá <b className='text-stannum font-semibold'>XP</b> con cada lección, subí de <b className='text-stannum font-semibold'>nivel</b> y competí en el ranking contra otros jugadores. Tu progreso desbloquea logros y títulos únicos.</p>
                    </div>
                    <RankingStarIcon className='size-24 lg:size-48 text-stannum/10 lg:absolute lg:bottom-0 lg:left-8'/>
                </div>
            </div>
        </motion.main>
    )
}
