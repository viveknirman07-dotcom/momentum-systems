import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageLoader } from "@/components/PageLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { FuturisticBackground } from "@/components/FuturisticBackground";
import { SelectedServiceProvider } from "@/contexts/SelectedServiceContext";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";

import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <TooltipProvider>
      <SelectedServiceProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <FuturisticBackground />
        <div className="scan-line" />
        <BrowserRouter>
          <ScrollToTop />
          <PageLoader />
          <AnimatedRoutes />
        </BrowserRouter>
      </SelectedServiceProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
