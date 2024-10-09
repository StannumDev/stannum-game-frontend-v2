'use client'

import { useState } from "react";
import { motion } from "framer-motion";

export const GoalCardHome = () => {
    const percentage = 90;
    const progressValue = 50 + (100 - 50) * (1 - percentage / 100);
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const progressVariants = {
        hidden: { scale: 0.9, rotate: -90, opacity: 0.75 },
        visible: { scale: 1, rotate: -90, opacity: 1 }
    }

    const textVariants = {
        hidden: { scale: 0.75, opacity: 0.75 },
        visible: { scale: 1, opacity: 1 }
    }

    return (
        <motion.article
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full aspect-square relative"
        >
            <div className="size-full bg-transparent flex flex-col justify-center absolute top-0 left-0">
                <div className="w-full aspect-[2.5] relative">
                    <div className="w-2/5 aspect-square absolute top-0 left-0 right-0 mx-auto">
                        <motion.svg
                            animate={isHovered ? progressVariants.visible : progressVariants.hidden}
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
                                animate={isHovered ? textVariants.visible : textVariants.hidden}
                                className="block text-center text-sm font-semibold text-neutral-300">{percentage}%
                            </motion.span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-4">
                    <h3 className="w-full text-center text-lg uppercase font-semibold line-clamp-2">Hola me llamo Mateo y me gusta mucho jugar al lol</h3>
                </div>
                <div className="mt-2 lg:mt-4 w-full text-center">
                    <p className="text-sm text-neutral-300 line-clamp-2">
                        Consolidar la experiencia Consolidar la experiencia Consolidar la experiencia del cliente en el corazón de STANNUM
                    </p>
                </div>
            </div>
        </motion.article>
    )
}
