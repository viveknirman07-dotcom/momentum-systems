import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, TrendingUp, Users, Target, Linkedin as LinkedinIcon, Search, Share2, GraduationCap, Award, Check, LucideIcon } from "lucide-react";
import { ScrollSection } from "@/components/ScrollSection";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedService } from "@/contexts/SelectedServiceContext";

interface ServiceOption {
  label: string;
}

interface Service {
  name: string;
  blurb: string;
  options: ServiceOption[];
  icon: LucideIcon;
}

const Services = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useSelectedService();
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [{
    name: "Business Consulting and Growth Strategy",
    blurb: "Custom-built blueprints for scale that align market, model and message.",
    options: [
      { label: "Growth roadmaps" },
      { label: "Offer and pricing design" },
      { label: "Go-to-market architecture" },
      { label: "Measurement planning" },
      { label: "Other" }
    ],
    icon: Lightbulb
  }, {
    name: "High-Ticket Sales Consulting",
    blurb: "Systems that consistently attract and convert premium clients without spray-and-pray.",
    options: [
      { label: "Pipeline design" },
      { label: "Sales messaging and scripts" },
      { label: "Qualification frameworks" },
      { label: "Enablement and review" },
      { label: "Other" }
    ],
    icon: TrendingUp
  }, {
    name: "Performance Marketing",
    blurb: "Revenue-maximizing campaigns with clear attribution and creative that earns attention.",
    options: [
      { label: "Paid media strategy" },
      { label: "Creative direction" },
      { label: "A/B testing and experimentation" },
      { label: "Attribution and reporting" },
      { label: "Other" }
    ],
    icon: Target
  }, {
    name: "B2B Lead Generation",
    blurb: "Targeted funnels that reach real decision-makers with respect and precision.",
    options: [
      { label: "ICP and account lists" },
      { label: "Offer hooks and angles" },
      { label: "Landing experiences" },
      { label: "Calendaring and follow-up" },
      { label: "Other" }
    ],
    icon: Users
  }, {
    name: "LinkedIn Outreach and Positioning",
    blurb: "Authority-led strategies that convert conversations into clients.",
    options: [
      { label: "Profile architecture" },
      { label: "Content and POV system" },
      { label: "Warm and cold outreach" },
      { label: "Relationship pipelines" },
      { label: "Other" }
    ],
    icon: LinkedinIcon
  }, {
    name: "SEO and Digital Visibility",
    blurb: "Frameworks to dominate organic search and expand discoverability.",
    options: [
      { label: "Technical SEO" },
      { label: "Content architecture" },
      { label: "On-page and internal links" },
      { label: "Search analytics" },
      { label: "Other" }
    ],
    icon: Search
  }, {
    name: "Social Media Growth",
    blurb: "Data-backed methods to amplify influence and brand reach without noise.",
    options: [
      { label: "Channel strategy" },
      { label: "Content system" },
      { label: "Creative templates" },
      { label: "Insights and cadence" },
      { label: "Other" }
    ],
    icon: Share2
  }, {
    name: "Digital Product and Course Consulting",
    blurb: "Guide experts to package knowledge and monetize at scale with clean learning flows.",
    options: [
      { label: "Curriculum design" },
      { label: "Platform selection" },
      { label: "Pricing and funnels" },
      { label: "Launch and iteration" },
      { label: "Other" }
    ],
    icon: GraduationCap
  }, {
    name: "PR and Branding Solutions",
    blurb: "Establish credibility, thought leadership and market authority with intent.",
    options: [
      { label: "Narrative and messaging" },
      { label: "Media targets and outreach" },
      { label: "Founder's brand system" },
      { label: "Asset kit and guidelines" },
      { label: "Other" }
    ],
    icon: Award
  }];

  const faq = [{
    q: "Do you work with early stage teams?",
    a: "Yes, if there is a real offer and a responsible owner. We prefer focused operators over vanity metrics."
  }, {
    q: "How do engagements start?",
    a: "We begin with a short paid clarity call, a focused session to understand your growth goals."
  }];

  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
  };

  const handleOptionSelect = (serviceName: string, optionLabel: string) => {
    setSelectedService({
      serviceName,
      optionName: optionLabel
    });
    setActiveServiceIndex(null);
    navigate("/contact");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setActiveServiceIndex(null);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveServiceIndex(null);
      }
    };
    
    if (activeServiceIndex !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeServiceIndex]);

  const activeService = activeServiceIndex !== null ? services[activeServiceIndex] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <ScrollSection>
            <h1 className="text-display mb-6">Services</h1>
          </ScrollSection>
          <ScrollSection delay={100}>
            <p className="text-h3 text-muted-foreground font-normal">
              Systems that reduce randomness and increase repeatability.
            </p>
          </ScrollSection>
        </div>
      </section>

      <section id="services" className="pb-24">
        <div className="container-standard">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollSection key={index} delay={index * 50}>
                  <button
                    type="button"
                    onClick={() => handleServiceClick(index)}
                    className="service-card border border-[hsl(var(--line-hair))] rounded-xl p-6 bg-[hsl(var(--card))] transition-all duration-300 h-full w-full text-left cursor-pointer hover:border-[hsl(var(--foreground)/0.2)] hover:shadow-lg"
                  >
                    <div className="icon mb-4 transition-transform duration-400">
                      <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-h4 mb-3">{service.name}</h3>
                    <p className="text-body-m text-muted-foreground mb-4">{service.blurb}</p>
                    <ul className="space-y-2">
                      {service.options.slice(0, -1).map((option, optionIndex) => (
                        <li key={optionIndex} className="text-caption text-muted-foreground">
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </button>
                </ScrollSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Options Overlay */}
      {activeService && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "hsl(var(--background) / 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          <div
            className="w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--line-hair))] rounded-2xl p-8 shadow-2xl"
            style={{
              animation: "fadeSlideUp 200ms ease-out forwards"
            }}
          >
            <div className="mb-6">
              <h3 className="text-h3 mb-2">{activeService.name}</h3>
              <p className="text-body-m text-muted-foreground">Select an option to continue</p>
            </div>
            
            <div className="space-y-2">
              {activeService.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  type="button"
                  onClick={() => handleOptionSelect(activeService.name, option.label)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--line-hair))] bg-[hsl(var(--background))] text-left transition-all duration-200 hover:border-[hsl(var(--foreground)/0.3)] hover:bg-[hsl(var(--muted))]"
                >
                  <span className="text-body-m text-foreground">{option.label}</span>
                  <Check className="w-5 h-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="section-spacing rounded-md">
        <div className="container-narrow">
          <ScrollSection>
            <h2 className="text-h2 mb-12">Frequently asked</h2>
          </ScrollSection>
          <ScrollSection delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-h4 text-left hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-l text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
