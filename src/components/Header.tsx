import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Menu, Mail } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];


  return (
    <header className="site-header h-16 lg:h-[72px]">
      <div className="container-standard h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - BITWELL FORGE Wordmark */}
          <Link 
            to="/" 
            className="flex-shrink-0" 
            data-el="site-logo" 
            aria-label="BitwellForge home"
          >
            <span className="font-logo text-xl lg:text-2xl tracking-wider text-foreground font-medium">
              BitwellForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link 
                key={item.href} 
                to={item.href} 
                className={`text-[15px] font-normal transition-colors duration-150 hover-underline ${
                  location.pathname === item.href 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a 
              href="https://www.instagram.com/bitwellforge/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-150" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/company/bitwellforge/about/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-150" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-150" 
              aria-label="Email"
            >
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
            <SheetContent 
              side="top" 
              className="mobile-menu-overlay bg-black text-white border-none p-0 max-w-none w-full h-full inset-0 rounded-none"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="menu-close" 
                aria-label="Close menu" 
                type="button"
              >
                <span className="x" aria-hidden="true" />
              </button>
              <nav id="mobile-menu" className="mobile-menu-nav">
                <ul className="nav-list">
                  {navItems.map((item, index) => (
                    <li 
                      key={item.href} 
                      className="menu-item-stagger" 
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <Link 
                        to={item.href} 
                        onClick={() => setIsOpen(false)} 
                        className="mobile-menu-link"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Mobile Social Icons */}
              <div className="mobile-social-icons">
                <a 
                  href="https://www.instagram.com/bitwellforge/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors duration-200" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/bitwellforge/about/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors duration-200" 
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" 
                  className="text-white/70 hover:text-white transition-colors duration-200" 
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;