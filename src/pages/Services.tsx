import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, TrendingUp, Users, Target, Linkedin as LinkedinIcon, Search, Share2, GraduationCap, Award, LucideIcon } from "lucide-react";
import { ScrollSection } from "@/components/ScrollSection";
import ServiceOptionsPanel from "@/components/ServiceOptionsPanel";

interface ServiceOption {
  id: string;
  label: string;
}

interface Service {
  name: string;
  blurb: string;
  bullets: string[];
  icon: LucideIcon;
  options: ServiceOption[];
}

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});

  const services: Service[] = [
    {
      name: "Business Consulting and Growth Strategy",
      blurb: "Custom-built blueprints for scale that align market, model and message.",
      bullets: ["Growth roadmaps", "Offer and pricing design", "Go-to-market architecture", "Measurement planning"],
      icon: Lightbulb,
      options: [
        { id: "growth-roadmaps", label: "Growth roadmaps" },
        { id: "offer-pricing", label: "Offer and pricing design" },
        { id: "go-to-market", label: "Go-to-market architecture" },
        { id: "measurement", label: "Measurement planning" },
      ],
    },
    {
      name: "High-Ticket Sales Consulting",
      blurb: "Systems that consistently attract and convert premium clients without spray-and-pray.",
      bullets: ["Pipeline design", "Sales messaging and scripts", "Qualification frameworks", "Enablement and review"],
      icon: TrendingUp,
      options: [
        { id: "pipeline", label: "Pipeline design" },
        { id: "messaging", label: "Sales messaging and scripts" },
        { id: "qualification", label: "Qualification frameworks" },
        { id: "enablement", label: "Enablement and review" },
      ],
    },
    {
      name: "Performance Marketing",
      blurb: "Revenue-maximizing campaigns with clear attribution and creative that earns attention.",
      bullets: ["Paid media strategy", "Creative direction", "A/B testing and experimentation", "Attribution and reporting"],
      icon: Target,
      options: [
        { id: "paid-media", label: "Paid media strategy" },
        { id: "creative", label: "Creative direction" },
        { id: "ab-testing", label: "A/B testing and experimentation" },
        { id: "attribution", label: "Attribution and reporting" },
      ],
    },
    {
      name: "B2B Lead Generation",
      blurb: "Targeted funnels that reach real decision-makers with respect and precision.",
      bullets: ["ICP and account lists", "Offer hooks and angles", "Landing experiences", "Calendaring and follow-up"],
      icon: Users,
      options: [
        { id: "icp", label: "ICP and account lists" },
        { id: "hooks", label: "Offer hooks and angles" },
        { id: "landing", label: "Landing experiences" },
        { id: "calendaring", label: "Calendaring and follow-up" },
      ],
    },
    {
      name: "LinkedIn Outreach and Positioning",
      blurb: "Authority-led strategies that convert conversations into clients.",
      bullets: ["Profile architecture", "Content and POV system", "Warm and cold outreach", "Relationship pipelines"],
      icon: LinkedinIcon,
      options: [
        { id: "profile", label: "Profile architecture" },
        { id: "content-pov", label: "Content and POV system" },
        { id: "outreach", label: "Warm and cold outreach" },
        { id: "relationships", label: "Relationship pipelines" },
      ],
    },
    {
      name: "SEO and Digital Visibility",
      blurb: "Frameworks to dominate organic search and expand discoverability.",
      bullets: ["Technical SEO", "Content architecture", "On-page and internal links", "Search analytics"],
      icon: Search,
      options: [
        { id: "technical-seo", label: "Technical SEO" },
        { id: "content-arch", label: "Content architecture" },
        { id: "on-page", label: "On-page and internal links" },
        { id: "search-analytics", label: "Search analytics" },
      ],
    },
    {
      name: "Social Media Growth",
      blurb: "Data-backed methods to amplify influence and brand reach without noise.",
      bullets: ["Channel strategy", "Content system", "Creative templates", "Insights and cadence"],
      icon: Share2,
      options: [
        { id: "channel", label: "Channel strategy" },
        { id: "content-system", label: "Content system" },
        { id: "templates", label: "Creative templates" },
        { id: "insights", label: "Insights and cadence" },
      ],
    },
    {
      name: "Digital Product and Course Consulting",
      blurb: "Guide experts to package knowledge and monetize at scale with clean learning flows.",
      bullets: ["Curriculum design", "Platform selection", "Pricing and funnels", "Launch and iteration"],
      icon: GraduationCap,
      options: [
        { id: "curriculum", label: "Curriculum design" },
        { id: "platform", label: "Platform selection" },
        { id: "pricing-funnels", label: "Pricing and funnels" },
        { id: "launch", label: "Launch and iteration" },
      ],
    },
    {
      name: "PR and Branding Solutions",
      blurb: "Establish credibility, thought leadership and market authority with intent.",
      bullets: ["Narrative and messaging", "Media targets and outreach", "Founder's brand system", "Asset kit and guidelines"],
      icon: Award,
      options: [
        { id: "narrative", label: "Narrative and messaging" },
        { id: "media", label: "Media targets and outreach" },
        { id: "founder-brand", label: "Founder's brand system" },
        { id: "assets", label: "Asset kit and guidelines" },
      ],
    },
  ];

  const faq = [
    {
      q: "Do you work with early stage teams?",
      a: "Yes, if there is a real offer and a responsible owner. We prefer focused operators over vanity metrics.",
    },
    {
      q: "How do engagements start?",
      a: "We begin with a short paid clarity call, a focused session to understand your growth goals.",
    },
  ];

  const handleServiceClick = useCallback((index: number) => {
    if (activeService === index) {
      setActiveService(null);
    } else {
      setActiveService(index);
    }
  }, [activeService]);

  const handleToggleOption = useCallback((serviceIndex: number, optionId: string) => {
    setSelectedOptions((prev) => {
      const current = prev[serviceIndex] || [];
      if (current.includes(optionId)) {
        return {
          ...prev,
          [serviceIndex]: current.filter((id) => id !== optionId),
        };
      } else {
        return {
          ...prev,
          [serviceIndex]: [...current, optionId],
        };
      }
    });
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveService(null);
  }, []);

  return (
    <div className={`min-h-screen bg-background ${activeService !== null ? "services-active" : ""}`}>
      <Header />
      <div className="h-16 lg:h-[72px]" />

      {/* Liquid blur overlay */}
      {activeService !== null && (
        <div className="services-blur-overlay" />
      )}

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
          <div
            className="services-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === index;
              return (
                <ScrollSection key={index} delay={index * 50}>
                  <div
                    className={`service-card-wrapper ${isActive ? "is-active" : ""}`}
                    onClick={() => handleServiceClick(index)}
                  >
                    <div className="service-card border border-[hsl(var(--line-hair))] rounded-xl p-6 bg-[hsl(var(--card))] transition-all duration-300 h-full cursor-pointer">
                      <div className="icon mb-4 transition-transform duration-400">
                        <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-h4 mb-3">{service.name}</h3>
                      <p className="text-body-m text-muted-foreground mb-4">{service.blurb}</p>
                      <ul className="space-y-2">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-caption text-muted-foreground">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ServiceOptionsPanel
                      serviceName={service.name}
                      options={service.options}
                      selectedOptions={selectedOptions[index] || []}
                      onToggleOption={(optionId) => handleToggleOption(index, optionId)}
                      onClose={handleClosePanel}
                      isOpen={isActive}
                    />
                  </div>
                </ScrollSection>
              );
            })}
          </div>
        </div>
      </section>

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
