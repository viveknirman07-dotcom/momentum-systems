import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, TrendingUp, Users, Target, Linkedin as LinkedinIcon, Search, Share2, GraduationCap, Award } from "lucide-react";
const Services = () => {
  const services = [{
    name: "Business Consulting and Growth Strategy",
    blurb: "Custom-built blueprints for scale that align market, model and message.",
    bullets: ["Growth roadmaps", "Offer and pricing design", "Go-to-market architecture", "Measurement planning"],
    icon: Lightbulb
  }, {
    name: "High-Ticket Sales Consulting",
    blurb: "Systems that consistently attract and convert premium clients without spray-and-pray.",
    bullets: ["Pipeline design", "Sales messaging and scripts", "Qualification frameworks", "Enablement and review"],
    icon: TrendingUp
  }, {
    name: "Performance Marketing",
    blurb: "Revenue-maximizing campaigns with clear attribution and creative that earns attention.",
    bullets: ["Paid media strategy", "Creative direction", "A/B testing and experimentation", "Attribution and reporting"],
    icon: Target
  }, {
    name: "B2B Lead Generation",
    blurb: "Targeted funnels that reach real decision-makers with respect and precision.",
    bullets: ["ICP and account lists", "Offer hooks and angles", "Landing experiences", "Calendaring and follow-up"],
    icon: Users
  }, {
    name: "LinkedIn Outreach and Positioning",
    blurb: "Authority-led strategies that convert conversations into clients.",
    bullets: ["Profile architecture", "Content and POV system", "Warm and cold outreach", "Relationship pipelines"],
    icon: LinkedinIcon
  }, {
    name: "SEO and Digital Visibility",
    blurb: "Frameworks to dominate organic search and expand discoverability.",
    bullets: ["Technical SEO", "Content architecture", "On-page and internal links", "Search analytics"],
    icon: Search
  }, {
    name: "Social Media Growth",
    blurb: "Data-backed methods to amplify influence and brand reach without noise.",
    bullets: ["Channel strategy", "Content system", "Creative templates", "Insights and cadence"],
    icon: Share2
  }, {
    name: "Digital Product and Course Consulting",
    blurb: "Guide experts to package knowledge and monetize at scale with clean learning flows.",
    bullets: ["Curriculum design", "Platform selection", "Pricing and funnels", "Launch and iteration"],
    icon: GraduationCap
  }, {
    name: "PR and Branding Solutions",
    blurb: "Establish credibility, thought leadership and market authority with intent.",
    bullets: ["Narrative and messaging", "Media targets and outreach", "Founder's brand system", "Asset kit and guidelines"],
    icon: Award
  }];
  const faq = [{
    q: "Do you work with early stage teams?",
    a: "Yes, if there is a real offer and a responsible owner. We prefer focused operators over vanity metrics."
  }, {
    q: "How do engagements start?",
    a: "We begin with a short paid clarity call, a focused session to understand your growth goals."
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <h1 className="text-display mb-6">Services</h1>
          <p className="text-h3 text-muted-foreground font-normal">
            Systems that reduce randomness and increase repeatability.
          </p>
        </div>
      </section>

      <section id="services" className="pb-24">
        <div className="container-standard">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
        }}>
            {services.map((service, index) => {
            const Icon = service.icon;
            return <div key={index} className="service-card border border-[hsl(var(--line-hair))] rounded-xl p-6 bg-[hsl(var(--card))] transition-all duration-300" style={{
              animationDelay: `${index * 50}ms`
            }}>
                  <div className="icon mb-4 transition-transform duration-400">
                    <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-h4 mb-3">{service.name}</h3>
                  <p className="text-body-m text-muted-foreground mb-4">{service.blurb}</p>
                  <ul className="space-y-2">
                    {service.bullets.map((bullet, bulletIndex) => <li key={bulletIndex} className="text-caption text-muted-foreground">
                        {bullet}
                      </li>)}
                  </ul>
                </div>;
          })}
          </div>
        </div>
      </section>

      <section className="section-spacing rounded-md">
        <div className="container-narrow">
          <h2 className="text-h2 mb-12">Frequently asked</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border-none">
                <AccordionTrigger className="text-h4 text-left hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-body-l text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Services;