import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    goal: "",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || "Not provided"}
Website: ${formData.website || "Not provided"}
Budget: ${formData.budget || "Undecided"}

Goal:
${formData.goal}`;

    const mailtoLink = `mailto:v@bitwellforge.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Thank you",
      description: "We usually reply within two business days.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      website: "",
      goal: "",
      budget: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <h1 className="text-display mb-6">Contact</h1>
          <p className="text-body-l text-muted-foreground">
            Start a conversation. No sales pressure. Just clarity.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-narrow max-w-[640px]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-body-m">Name *</Label>
              <Input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-body-m">Work email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-body-m">Company or practice</Label>
              <Input id="company" type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-body-m">Website or LinkedIn</Label>
              <Input id="website" type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-body-m">What are you trying to achieve *</Label>
              <Textarea id="goal" value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} required rows={5} className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg resize-none" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-body-m">Budget range (optional)</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground focus:ring-[hsl(var(--focus-ring))] rounded-lg h-12">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-[hsl(var(--line-hair))]">
                  <SelectItem value="undecided">Undecided</SelectItem>
                  <SelectItem value="2k-5k">$2k–$5k</SelectItem>
                  <SelectItem value="5k-15k">$5k–$15k</SelectItem>
                  <SelectItem value="15k-50k">$15k–$50k</SelectItem>
                  <SelectItem value="50k+">$50k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium rounded-lg transition-all duration-[120ms]">
              Send
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
