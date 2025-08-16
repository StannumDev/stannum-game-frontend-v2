'use client'

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Achievement, FullUserDetails } from '@/interfaces';

interface Props{
    achievement: Achievement,
    user:FullUserDetails
}

export const ProfileAchievementsCard = ({ achievement, user }: Props) => {
    const { title, description, background, categories, getProgress, id, xpReward } = achievement
    const achieved = user.achievements.some(a => a.achievementId === id);
    console.log(user.achievements)
    console.log(id)
    const progress = getProgress(user)
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <motion.article
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className='w-full aspect-video px-6 py-4 rounded-2xl flex items-end group relative overflow-hidden'
        >
            <div className='size-full absolute top-0 left-0 z-0 pointer-events-none'>
                <Image src={background} alt="Logro STANNUM Game" className={`size-full object-cover ${achieved ? 'grayscale-0' : 'grayscale'}`}/>
                <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-50 lg:opacity-25 lg:group-hover:opacity-100 transition-200'></div>
            </div>
            <div className='flex items-center gap-1 absolute top-4 left-6 z-10'>
                {categories.map((category, i) => (
                    <span key={`achievement_category_${i}`} className='bg-stannum/40 text-stannum text-xs font-semibold py-1 px-2 rounded-lg'>{category.toUpperCase()}</span>
                ))}
            </div>
            <div className="bg-white/10 text-stannum text-xs font-semibold py-1 px-2 rounded-lg absolute top-4 right-6 z-10">{xpReward} XP</div>
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
                        <div className='text-sm leading-none font-black'>{progress}%</div>
                        <div className="w-full h-1.5 bg-white rounded-lg flex overflow-hidden transition-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div className={`flex flex-col justify-center border-white border rounded-s-lg bg-stannum`} style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                }
            </div>
        </motion.article>
    );
};
