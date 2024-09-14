'use client'

import { motion } from "framer-motion";
import { useState } from "react";



export const GoalCardHome = () => {
    const percentage = 90;
    const progressValue = 50 + (100 - 50) * (1 - percentage / 100);
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const progressVariants = {
        hidden: { scale: 0.75, rotate: -90, opacity: 0.75 },
        visible: { scale: 1, rotate: -90, opacity: 1 }
    }

    const textVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
    }

    return (
        <motion.article
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
            className="h-full w-48 bg-transparent flex flex-col justify-center items-center"
        >
            <div className="w-1/2 aspect-square relative">
                <div className="w-full absolute top-0 left-0">
                    <motion.svg
                        animate={ isHovered ? progressVariants.visible : progressVariants.hidden }
                        className="w-full" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
                    >
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
                    </motion.svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <motion.span
                            animate={ isHovered ? textVariants.visible : textVariants.hidden }
                            className="block text-center text-sm font-semibold text-neutral-300">{percentage}%
                        </motion.span>
                    </div>
                </div>
            </div>
            <div className="grow w-full flex justify-center items-center">
                <h3 className="w-full text-center text-xl uppercase font-semibold truncate">Goal 1 Goal 1 Goal 1 Goal 1</h3>
            </div>
            <p className="text-center text-neutral-300 line-clamp-2">
                Consolidar la experiencia Consolidar la experiencia Consolidar la experiencia del cliente en el corazón de STANNUM
            </p>
        </motion.article>
    )
}
