import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageLoader } from "@/components/PageLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { FuturisticBackground } from "@/components/FuturisticBackground";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { SmoothScroll } from "@/components/SmoothScroll";

import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieConsent />
      <FuturisticBackground />
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <PageLoader />
          <AnimatedRoutes />
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
