'use client'

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Achievement } from '@/interfaces';

export const ProfileAchievementsCard = ({ title, description, background, achieved, getProgress }: Achievement) => {
    const progress = getProgress()
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <motion.article
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className='w-full aspect-video px-6 py-4 rounded-2xl flex justify-start items-end group relative overflow-hidden'
        >
            <div className='size-full absolute top-0 left-0 z-0 pointer-events-none'>
                <Image src={background} alt="Logro STANNUM Game" className={`size-full object-cover ${achieved ? 'grayscale-0' : 'grayscale'}`}/>
                <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-25 group-hover:opacity-100 transition-200'></div>
            </div>
            <div className='w-full relative z-20 overflow-hidden'>
                <div className='overflow-hidden'>
                    <h3 className='w-full title-3 text-balance'>{title}</h3>
                    <AnimatePresence>
                        { isHovered &&
                            <motion.p
                                className='line-clamp-3 overflow-hidden'
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                {description}
                            </motion.p>
                        }
                    </AnimatePresence>
                </div>
                {
                    !achieved &&
                    <div className='mt-2 flex justify-center items-center gap-2'>
                        <div className='text-sm leading-none font-black text-white'>{progress}%</div>
                        <div className="w-full h-1.5 bg-white rounded-lg flex overflow-hidden transition-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div className={`flex flex-col justify-center border-white border rounded-s-lg bg-stannum`} style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                }
            </div>
        </motion.article>
    );
};
