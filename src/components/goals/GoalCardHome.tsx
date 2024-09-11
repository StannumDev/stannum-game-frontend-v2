'use client'

import { motion } from "framer-motion";

export const GoalCardHome = () => {
    const percentage = 30;
    const progressValue = 50 + (100 - 50) * (1 - percentage / 100);
    return (
        <article className="h-full w-48 bg-transparent flex flex-col justify-center items-center">
            <div className="w-1/2 aspect-square relative">
                <div className="w-full absolute top-0 left-0">
                    <svg className="w-full -rotate-90" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <motion.circle
                            cx="9" cy="9" r="8" fill="none" strokeWidth="2" strokeLinejoin={'round'} strokeLinecap={'round'}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0 }}
                            className="stroke-current text-stannum opacity-25"
                        />
                        <motion.circle
                            cx="9" cy="9" r="8" fill="none" strokeWidth="2" strokeDasharray="100" strokeLinejoin={'round'} strokeLinecap={'round'}
                            initial={{ scale: 0, strokeDashoffset: 100 }}
                            animate={{ scale: 1, strokeDashoffset: progressValue }}
                            transition={{ type: 'spring', strokeDashoffset: { delay: 0.25 }, bounce: 0 }}
                            className="stroke-current text-stannum"
                        />
                    </svg>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                    >
                        <span className="text-center text-sm font-semibold text-neutral-300">{percentage}%</span>
                    </motion.div>
                </div>
            </div>
            <div className="grow w-full flex justify-center items-center">
                <h3 className="w-full text-center text-xl uppercase font-semibold truncate">Goal 1 Goal 1 Goal 1 Goal 1</h3>
            </div>
            <p className="text-center text-neutral-300 line-clamp-2">
                Consolidar la experiencia Consolidar la experiencia Consolidar la experiencia del cliente en el corazón de STANNUM
            </p>
        </article>
    )
}
