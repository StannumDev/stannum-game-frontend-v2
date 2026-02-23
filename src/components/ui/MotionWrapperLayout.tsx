'use client'

import { ReactNode } from "react";
import { m } from "framer-motion";

interface Props{
  children: ReactNode;
  className?: string;
}

export const MotionWrapperLayout = ({children, className}: Props) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0 }}
      className={`w-full ${className}`}
    >
      {children}
    </m.div>
  );
};