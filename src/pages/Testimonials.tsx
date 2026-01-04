import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollSection } from "@/components/ScrollSection";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "BitwellForge transformed our approach to client acquisition with systems that actually work.",
      author: "Sarah Chen",
      role: "Founder, TechConsult",
    },
    {
      quote: "Strategic clarity without the complexity. Their frameworks delivered results in weeks, not months.",
      author: "Marcus Williams",
      role: "CEO, Growth Partners",
    },
    {
      quote: "Finally, a growth partner that speaks our language and delivers measurable outcomes.",
      author: "Jessica Moore",
      role: "Director, Scale Ventures",
    },
    {
      quote: "Working with BitwellForge eliminated guesswork. We now have predictable pipeline and clear ROI.",
      author: "David Park",
      role: "VP Marketing, Innovate Labs",
    },
    {
      quote: "Their outbound systems cut our sales cycle in half while improving deal quality.",
      author: "Rachel Torres",
      role: "Founder, Enterprise Solutions",
    },
    {
      quote: "Calm, professional, effective. The kind of partner you want when scaling matters.",
      author: "James Anderson",
      role: "CEO, Digital Ventures",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <ScrollSection>
            <h1 className="text-display mb-6">Testimonials</h1>
          </ScrollSection>
          <ScrollSection delay={100}>
            <p className="text-body-l text-muted-foreground">
              What clients say about working with BitwellForge.
            </p>
          </ScrollSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-standard">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollSection key={index} delay={index * 100}>
                <div className="border border-[hsl(var(--line-hair))] rounded-xl p-8 bg-[hsl(var(--card))] hover-lift h-full">
                  <p className="text-body-l mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-caption font-normal">{testimonial.author}</p>
                    <p className="text-micro text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
