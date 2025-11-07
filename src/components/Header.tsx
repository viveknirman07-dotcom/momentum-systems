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
  return <header className="site-header sticky top-0 z-50 backdrop-blur-[12px] border-b border-white/[0.08]" style={{
    background: 'rgba(10, 10, 10, 0.35)',
    backdropFilter: 'blur(12px) saturate(120%)',
    WebkitBackdropFilter: 'blur(12px) saturate(120%)',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.25)'
  }}>
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
              <button className="menu-toggle" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded={isOpen} type="button">
                <span className="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};
export default Header;