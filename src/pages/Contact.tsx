import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollSection } from "@/components/ScrollSection";
import { useServiceSelection } from "@/contexts/ServiceSelectionContext";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(500, "URL must be less than 500 characters")
    .refine(
      (val) => !val || val.startsWith("http://") || val.startsWith("https://") || val.startsWith("www."),
      "Please enter a valid URL"
    )
    .optional()
    .or(z.literal("")),
  goal: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters")
    .max(2000, "Goal description must be less than 2000 characters"),
  budget: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { selection, clearSelection } = useServiceSelection();

  // Generate prefilled goal text based on selection
  const getPrefilledGoal = () => {
    if (!selection) return "";
    if (selection.isOther) {
      return `Custom requirement related to ${selection.serviceName}\n\n`;
    }
    return `${selection.serviceName} — ${selection.selectedOption}\n\n`;
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      goal: getPrefilledGoal(),
      budget: "",
    },
  });

  // Update goal field when selection changes
  useEffect(() => {
    if (selection) {
      const currentGoal = form.getValues("goal");
      const prefilledGoal = getPrefilledGoal();
      // Only prefill if the goal is empty or hasn't been modified from a previous prefill
      if (!currentGoal || currentGoal === "" || currentGoal.startsWith(selection.serviceName) || currentGoal.startsWith("Custom requirement related to")) {
        form.setValue("goal", prefilledGoal);
      }
    }
  }, [selection]);

  const onSubmit = (data: ContactFormData) => {
    // Build email subject with service context
    let subject = `Contact from ${data.name}`;
    if (selection) {
      if (selection.isOther) {
        subject = `New Inquiry — ${selection.serviceName} | Custom Request`;
      } else {
        subject = `New Inquiry — ${selection.serviceName} | ${selection.selectedOption}`;
      }
    }

    const body = `Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Website: ${data.website || "Not provided"}
Budget: ${data.budget || "Undecided"}
${selection ? `\nService: ${selection.serviceName}\nFocus: ${selection.isOther ? "Custom requirement" : selection.selectedOption}` : ""}

Goal:
${data.goal}`;

    const mailtoLink = `mailto:v@bitwellforge.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    toast({
      title: "Thank you",
      description: "We usually reply within two business days.",
    });

    form.reset();
    clearSelection();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-16 lg:h-[72px]" />

      <section className="section-spacing">
        <div className="container-narrow">
          <ScrollSection>
            <h1 className="text-display mb-6">Contact</h1>
          </ScrollSection>
          <ScrollSection delay={100}>
            <p className="text-body-l text-muted-foreground">
              Start a conversation. No sales pressure. Just clarity.
            </p>
          </ScrollSection>

          {/* Service context badge */}
          {selection && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border">
                <span className="text-caption text-muted-foreground">Inquiry about:</span>
                <span className="text-caption font-medium text-foreground">
                  {selection.serviceName}
                  {!selection.isOther && ` — ${selection.selectedOption}`}
                </span>
                <button
                  onClick={clearSelection}
                  className="ml-1 p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Clear selection"
                >
                  <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-narrow max-w-[640px]">
          <ScrollSection delay={200}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={100}
                          className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">Work email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          maxLength={255}
                          className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">Company or practice</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={200}
                          className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">Website or LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          maxLength={500}
                          className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">What are you trying to achieve *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          maxLength={2000}
                          className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--focus-ring))] rounded-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body-m">Budget range (optional)</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-[hsl(var(--card))] border-[hsl(var(--input))] text-foreground focus:ring-[hsl(var(--focus-ring))] rounded-lg h-12">
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-[hsl(var(--line-hair))]">
                          <SelectItem value="undecided">Undecided</SelectItem>
                          <SelectItem value="2k-5k">$2k–$5k</SelectItem>
                          <SelectItem value="5k-15k">$5k–$15k</SelectItem>
                          <SelectItem value="15k-50k">$15k–$50k</SelectItem>
                          <SelectItem value="50k+">$50k+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium rounded-lg transition-all duration-[120ms]"
                >
                  Send
                </Button>
              </form>
            </Form>
          </ScrollSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
