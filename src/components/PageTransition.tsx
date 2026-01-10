import { motion, AnimatePresence, Variants, Transition, Easing } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const easing: Easing = [0.25, 0.46, 0.45, 0.94];

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    filter: "blur(8px)",
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: easing,
  duration: 0.6,
};

const wipeVariants: Variants = {
  initial: {
    scaleX: 1,
    originX: 0,
  },
  animate: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.5,
      ease: easing,
      delay: 0.1,
    },
  },
  exit: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative"
      >
        {/* Futuristic wipe overlay */}
        <motion.div
          variants={wipeVariants}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              hsl(var(--primary) / 0.15) 0%,
              hsl(var(--background)) 50%,
              hsl(var(--primary) / 0.1) 100%
            )`,
            backdropFilter: "blur(4px)",
          }}
        />
        
        {/* Scan line effect during transition */}
        <motion.div
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 0.4,
            ease: "linear",
            delay: 0.1,
          }}
          className="fixed left-0 right-0 h-[2px] z-[9999] pointer-events-none"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              hsl(var(--primary) / 0.8) 20%,
              hsl(var(--primary)) 50%,
              hsl(var(--primary) / 0.8) 80%,
              transparent 100%
            )`,
            boxShadow: "0 0 20px 4px hsl(var(--primary) / 0.5)",
          }}
        />

        {/* Page content with dissolve effect */}
        <motion.div
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
