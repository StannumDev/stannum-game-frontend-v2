'use client'

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props{
  children: ReactNode;
  className?: string;
}

export const MotionWrapperLayoutClient = ({children, className}: Props) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0 }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};