import { motion, AnimatePresence, Variants, Transition, Easing } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const easing: Easing = [0.4, 0, 0.2, 1]; // Smooth ease-in-out

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: easing,
  duration: 0.5,
};

// Subtle crossfade overlay for perceived continuity
const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easing,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: easing,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative"
      >
        {/* Subtle crossfade overlay - no wipe, just smooth blend */}
        <motion.div
          variants={overlayVariants}
          className="fixed inset-0 z-[9999] pointer-events-none bg-background/30"
          style={{
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Page content with calm dissolve */}
        <motion.div
          variants={pageVariants}
          transition={pageTransition}
          className="will-change-[opacity,transform,filter]"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
