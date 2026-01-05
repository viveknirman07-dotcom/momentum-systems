import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return <footer className="border-t border-[hsl(var(--line-hair))] py-20">
      <div className="container-standard">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Logo Column */}
          <div>
            <span className="font-display text-base tracking-wider text-foreground uppercase opacity-80">
              <span className="font-medium">Bitwell</span> <span className="font-normal">Forge</span>
            </span>
          </div>

          {/* Navigate Column */}
          <div>
            <h4 className="text-caption font-medium mb-6 text-foreground">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-caption text-muted-foreground hover:text-foreground hover-underline transition-colors duration-[120ms] w-fit lowercase">
                home
              </Link>
              <Link to="/services" className="text-caption text-muted-foreground hover:text-foreground hover-underline transition-colors duration-[120ms] w-fit lowercase">
                services
              </Link>
              <Link to="/testimonials" className="text-caption text-muted-foreground hover:text-foreground hover-underline transition-colors duration-[120ms] w-fit lowercase">
                testimonials
              </Link>
              <Link to="/about" className="text-caption text-muted-foreground hover:text-foreground hover-underline transition-colors duration-[120ms] w-fit lowercase">
                about
              </Link>
              <Link to="/contact" className="text-caption text-muted-foreground hover:text-foreground hover-underline transition-colors duration-[120ms] w-fit lowercase">
                contact
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-caption font-medium mb-6 text-foreground">Contact</h4>
            
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/bitwellforge/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/bitwellforge/about/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/bitwellforge?s=21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="X (Twitter)">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:v@bitwellforge.com?subject=Inquiry%20from%20BitwellForge%20Site" className="text-muted-foreground hover:text-foreground transition-colors duration-[120ms]" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;