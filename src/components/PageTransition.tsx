import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit" | "idle">("idle");
  const isFirstRender = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = location.pathname;
      return;
    }

    // Only animate if pathname actually changed
    if (prevPathname.current !== location.pathname) {
      setTransitionStage("exit");
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (transitionStage === "exit") {
      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage("enter");
      }, 250); // Exit duration

      return () => clearTimeout(exitTimer);
    }

    if (transitionStage === "enter") {
      const enterTimer = setTimeout(() => {
        setTransitionStage("idle");
      }, 400); // Enter duration

      return () => clearTimeout(enterTimer);
    }
  }, [transitionStage, children]);

  // Update children immediately if we're idle and children changed
  useEffect(() => {
    if (transitionStage === "idle") {
      setDisplayChildren(children);
    }
  }, [children, transitionStage]);

  return (
    <div 
      className={`page-transition ${transitionStage}`}
      style={{ minHeight: "100vh" }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
