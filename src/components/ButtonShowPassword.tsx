'use client'

import { SetStateAction } from "react";
import { motion } from "framer-motion";
import { HidePasswordIcon, ShowPassowrdIcon } from "@/icons";

interface Props{
    status: boolean;
    changeStatus: (value: SetStateAction<boolean>) => void;
    className?: string;
    iconClassName?: string
}

export const ButtonShowPassword = ({status, changeStatus, className, iconClassName='text-white size-4'}:Props) => {
    return (
        <motion.button
            type="button"
            initial={{opacity: 0.5}}
            whileHover={{opacity: 1}}
            whileTap={{scale:1.1}}
            className={`flex justify-center items-center ${className}`}
            onClick={ () => { changeStatus(!status) }}
        >
            {
                status ? <ShowPassowrdIcon className={iconClassName}/> : <HidePasswordIcon className={iconClassName}/>
            }
        </motion.button>
    )
}
