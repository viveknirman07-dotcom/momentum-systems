import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollSection } from "@/components/ScrollSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <ScrollSection>
            <h1 className="text-display mb-6">About</h1>
          </ScrollSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-narrow max-w-[72ch]">
          <ScrollSection>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              BitwellForge is a growth systems firm built around a simple belief: sustainable growth is the result of clarity, not constant acceleration.
            </p>
          </ScrollSection>
          <ScrollSection delay={100}>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              We design inbound and outbound client acquisition systems that generate consistent, qualified, high-value demand. Every system is built with a clear understanding of who it serves, how it converts, and how it supports long-term growth.
            </p>
          </ScrollSection>
          <ScrollSection delay={200}>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              At the core of our work is intentional system design. We begin by understanding who the business is truly for, how value is communicated, and how decisions flow across the organization. From there, we engineer growth infrastructure that aligns strategy, execution, and measurement into a cohesive whole.
            </p>
          </ScrollSection>
          <ScrollSection delay={300}>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              Our approach blends strategic thinking, performance marketing, intelligent outbound, and automation. Each element is integrated deliberately, ensuring growth efforts reinforce one another rather than operate in isolation. This allows teams to move forward with confidence, knowing growth is being driven by structure, not constant intervention.
            </p>
          </ScrollSection>
          <ScrollSection delay={400}>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              We believe growth should feel manageable, not overwhelming. There is no pressure to scale faster than the foundation can support. No reliance on fragmented tools or reactive decision-making. And no ambiguity around what is working, what is not, or why.
            </p>
          </ScrollSection>
          <ScrollSection delay={500}>
            <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
              Over time, we have seen that the most resilient businesses are not the ones that move the fastest, but the ones that build with clarity and discipline. Systems designed with care create consistency. Consistency builds trust. And trust allows growth to compound without friction.
            </p>
          </ScrollSection>
          <ScrollSection delay={600}>
            <p className="text-body-l text-muted-foreground leading-relaxed">
              For organizations that value long-term sustainability over short-term momentum, BitwellForge quietly builds the structure that makes enduring growth possible.
            </p>
          </ScrollSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
