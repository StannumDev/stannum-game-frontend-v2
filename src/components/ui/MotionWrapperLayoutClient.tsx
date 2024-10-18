'use client'

import { motion } from "framer-motion";

export const MotionWrapperLayoutClient = ({children}:{children:React.ReactNode}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};