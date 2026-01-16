import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, TrendingUp, Users, Target, Linkedin as LinkedinIcon, Search, Share2, GraduationCap, Award, Check, LucideIcon, ArrowRight, X } from "lucide-react";
import { ScrollSection } from "@/components/ScrollSection";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedService } from "@/contexts/SelectedServiceContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const { selectedServices, toggleSelection, hasSelection } = useSelectedService();
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const handleCardClick = (index: number) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(null);
    } else {
      setExpandedCardIndex(index);
    }
  };

  const handleOptionToggle = (serviceName: string, optionLabel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSelection({
      serviceName,
      optionName: optionLabel
    });
  };

  const handleContinue = () => {
    setExpandedCardIndex(null);
    navigate("/contact");
  };

  const handleCloseExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardIndex(null);
  };

  // Get selection count for a specific service
  const getServiceSelectionCount = (serviceName: string) => {
    return selectedServices.filter((s) => s.serviceName === serviceName).length;
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedCardIndex(null);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const totalSelections = selectedServices.length;

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
              const selectionCount = getServiceSelectionCount(service.name);
              const isExpanded = expandedCardIndex === index;
              
              return (
                <ScrollSection key={index} delay={index * 50}>
                  <div 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className="relative"
                  >
                    <motion.div
                      layout
                      onClick={() => handleCardClick(index)}
                      className={`service-card border rounded-xl p-6 bg-[hsl(var(--card))] transition-colors duration-300 w-full text-left cursor-pointer ${
                        isExpanded 
                          ? "border-[hsl(var(--foreground)/0.3)] shadow-xl" 
                          : selectionCount > 0 
                            ? "border-[hsl(var(--foreground)/0.3)]" 
                            : "border-[hsl(var(--line-hair))] hover:border-[hsl(var(--foreground)/0.2)] hover:shadow-lg"
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="icon transition-transform duration-400">
                          <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                        </div>
                        <div className="flex items-center gap-2">
                          {selectionCount > 0 && (
                            <span className="text-caption text-foreground bg-[hsl(var(--muted))] px-2 py-1 rounded-full">
                              {selectionCount} selected
                            </span>
                          )}
                          {isExpanded && (
                            <button
                              onClick={handleCloseExpanded}
                              className="p-1 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                              aria-label="Close options"
                            >
                              <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Card Title and Blurb */}
                      <h3 className="text-h4 mb-3">{service.name}</h3>
                      <p className="text-body-m text-muted-foreground mb-4">{service.blurb}</p>
                      
                      {/* Collapsed State - Show preview of options */}
                      <AnimatePresence mode="wait">
                        {!isExpanded && (
                          <motion.ul
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2"
                          >
                            {service.options.slice(0, -1).map((option, optionIndex) => (
                              <li key={optionIndex} className="text-caption text-muted-foreground">
                                {option.label}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                      
                      {/* Expanded State - Show selectable options inline */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 border-t border-[hsl(var(--line-hair))]">
                              <p className="text-caption text-muted-foreground mb-3">Select options (multiple allowed)</p>
                              <div className="space-y-2">
                                {service.options.map((option, optionIndex) => {
                                  const isSelected = hasSelection(service.name, option.label);
                                  return (
                                    <button
                                      key={optionIndex}
                                      type="button"
                                      onClick={(e) => handleOptionToggle(service.name, option.label, e)}
                                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-200 ${
                                        isSelected
                                          ? "border-[hsl(var(--foreground)/0.4)] bg-[hsl(var(--muted))]"
                                          : "border-[hsl(var(--line-hair))] bg-[hsl(var(--background))] hover:border-[hsl(var(--foreground)/0.3)] hover:bg-[hsl(var(--muted))]"
                                      }`}
                                    >
                                      <span className="text-body-m text-foreground">{option.label}</span>
                                      <Check 
                                        className={`w-4 h-4 transition-opacity duration-200 ${
                                          isSelected ? "text-foreground opacity-100" : "text-muted-foreground opacity-0"
                                        }`} 
                                      />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </ScrollSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Continue Button */}
      <AnimatePresence>
        {totalSelections > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              type="button"
              onClick={handleContinue}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-foreground text-background text-body-m font-normal shadow-2xl transition-all duration-200 hover:opacity-90"
            >
              Continue with {totalSelections} {totalSelections === 1 ? "selection" : "selections"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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