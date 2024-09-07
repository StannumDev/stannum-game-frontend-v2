'use client'

import { SetStateAction } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

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
            className={`${className} absolute bottom-0 right-0 size-9 flex justify-center items-center`}
            onClick={ () => { changeStatus(!status) }}
        >
            {
                status? <FaEye className={iconClassName}/> : <FaEyeSlash className={iconClassName}/>
            }
        </motion.button>
    )
}
