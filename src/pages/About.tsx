import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <h1 className="text-display mb-6">About</h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-narrow max-w-[72ch]">
          <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
            BitwellForge is a growth systems firm helping modern brands and professionals build calm, compounding business momentum without noise, complexity or dependency on trends.
          </p>
          <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
            We engineer inbound and outbound client acquisition systems that generate consistent, qualified, high-value demand.
          </p>
          <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
            Our approach blends strategy, performance marketing, intelligent outbound and automation to create scalable and reliable growth infrastructure.
          </p>
          <p className="text-body-l text-muted-foreground leading-relaxed mb-6">
            No pressure. No overwhelm. No guesswork.
          </p>
          <p className="text-body-l text-muted-foreground leading-relaxed">
            Only systems designed for clarity, control and long-term sustainability. If you value intentional growth over short-term tactics, we quietly build the foundation that makes it possible.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
