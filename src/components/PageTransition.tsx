import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    clipPath: "inset(100% 0 0 0)",
  },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const exitTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: "opacity, filter, clip-path" }}
    >
      {children}
    </motion.div>
  );
}

export { exitTransition };
