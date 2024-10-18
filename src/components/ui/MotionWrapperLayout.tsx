import { LazyMotion, domAnimation } from "framer-motion"
import * as motion from "framer-motion/m"

export const MotionWrapperLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};