import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Menu, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/bitwellforge-logo-new.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    label: "home",
    href: "/"
  }, {
    label: "services",
    href: "/services"
  }, {
    label: "testimonials",
    href: "/testimonials"
  }, {
    label: "about",
    href: "/about"
  }, {
    label: "contact",
    href: "/contact"
  }];
  useEffect(() => {
    const logoEl = document.querySelector('[data-el="site-logo"]') as HTMLElement;
    if (logoEl && !logoEl.hasAttribute('data-spin-bound')) {
      logoEl.setAttribute('data-spin-bound', '1');
      logoEl.addEventListener('click', e => {
        e.preventDefault();
        logoEl.classList.remove('logo-spin');
        void logoEl.offsetWidth;
        logoEl.classList.add('logo-spin');
      });
    }
  }, []);
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[hsl(var(--line-hair))]">
      <div className="container-standard relative">
        <div className="flex items-center justify-between h-[72px] lg:h-[72px] md:h-[64px] sm:h-[56px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group" data-el="site-logo" role="img" aria-label="BitwellForge logo">
            <img src={logo} alt="BitwellForge" className="h-10 w-10 transition-all duration-[600ms] ease-out" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map(item => <Link key={item.href} to={item.href} className={`text-[16px] font-normal lowercase hover-underline transition-colors duration-[120ms] ${location.pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {item.label}
              </Link>)}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
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
                className="fixed top-[14px] right-4 z-[120] w-11 h-11 inline-flex items-center justify-center bg-transparent border-none p-0 text-foreground hover:opacity-90 active:scale-98 transition-all duration-[120ms] focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="relative w-6 h-[18px] inline-block" aria-hidden="true">
                  <span className="absolute left-0 right-0 top-0 h-[2px] bg-current rounded-sm" />
                  <span className="absolute left-0 right-0 top-2 h-[2px] bg-current rounded-sm" />
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-current rounded-sm" />
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="bg-background border-[hsl(var(--line-hair))] max-h-[90vh] overflow-y-auto rounded-b-2xl shadow-[0_16px_60px_rgba(0,0,0,0.60)]">
              <nav id="mobile-menu" className="flex flex-col gap-0 mt-8">
                {navItems.map((item, index) => <div key={item.href}>
                    <Link to={item.href} onClick={() => setIsOpen(false)} className={`text-[22px] font-normal lowercase py-4 block transition-colors duration-[120ms] ${location.pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {item.label}
                    </Link>
                    {index < navItems.length - 1 && <div className="h-[1px] bg-[hsl(var(--line-hair))]" />}
                  </div>)}
              </nav>
              
              {/* Mobile Social Icons */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[hsl(var(--line-hair))]">
                <a href="https://www.instagram.com/bitwellforge/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/company/bitwellforge/about/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Email">
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