import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import * as motion from "framer-motion/m";

interface Props{
  children: ReactNode;
  className?: string;
}

export const MotionWrapperLayout = ({children, className}: Props) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0 }}
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};