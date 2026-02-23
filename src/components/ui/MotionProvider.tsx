import { ReactNode } from "react";
import { LazyMotion, domMax } from "framer-motion";

export const MotionProvider = ({ children }: { children: ReactNode }) => (
    <LazyMotion features={domMax} strict>
        {children}
    </LazyMotion>
);