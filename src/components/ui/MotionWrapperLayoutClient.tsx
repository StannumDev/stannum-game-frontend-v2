'use client'

import { motion } from "framer-motion";

interface Props{
  grow?: boolean;
  children: React.ReactNode
}

export const MotionWrapperLayoutClient = ({children, grow}: Props) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0 }}
      className={`w-full ${grow && 'grow'}`}
    >
      {children}
    </motion.div>
  );
};