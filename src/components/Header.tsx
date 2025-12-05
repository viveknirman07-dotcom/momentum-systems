import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Menu, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/bitwellforge-logo-new.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    label: "Home",
    href: "/"
  }, {
    label: "Services",
    href: "/services"
  }, {
    label: "Testimonials",
    href: "/testimonials"
  }, {
    label: "About",
    href: "/about"
  }, {
    label: "Contact",
    href: "/contact"
  }];
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const logoImg = e.currentTarget.querySelector('img') as HTMLElement;
    if (logoImg) {
      logoImg.classList.remove('logo-spin', 'logo-shake');
      void logoImg.offsetWidth; // Trigger reflow
      logoImg.classList.add('logo-spin');
    }
  };
  return <header className="site-header sticky top-0 z-50 backdrop-blur-[12px] border-b border-border bg-background">
      <div className="container-standard relative">
        <div className="flex items-center justify-between h-[72px] lg:h-[72px] md:h-[64px] sm:h-[56px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group" data-el="site-logo" role="img" aria-label="BitwellForge logo" onClick={handleLogoClick}>
            <img src={logo} alt="BitwellForge" className="h-10 w-10 transition-all duration-[600ms] ease-out" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map(item => <Link key={item.href} to={item.href} className={`text-[16px] font-normal hover-underline transition-colors duration-[120ms] ${location.pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {item.label}
              </Link>)}
          </nav>

          {/* Social Icons & Theme Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a href="https://www.instagram.com/bitwellforge/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/bitwellforge/about/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button 
                className="hamburger-btn min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="mobile-menu-overlay bg-black text-white border-none p-0 max-w-none w-full h-full inset-0 rounded-none data-[state=open]:animate-in data-[state=closed]:animate-out">
              {/* Close button - plain X */}
              <button onClick={() => setIsOpen(false)} className="menu-close" aria-label="Close menu" type="button">
                <span className="x" aria-hidden="true" />
              </button>
              <nav id="mobile-menu" className="mobile-menu-nav">
                <ul className="nav-list">
                  {navItems.map((item, index) => <li key={item.href}>
                      <Link to={item.href} onClick={() => setIsOpen(false)} className="mobile-menu-link">
                        {item.label}
                      </Link>
                    </li>)}
                </ul>
              </nav>
              
              {/* Mobile Social Icons */}
              <div className="mobile-social-icons">
                <a href="https://www.instagram.com/bitwellforge/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/company/bitwellforge/about/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Email">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};
export default Header;