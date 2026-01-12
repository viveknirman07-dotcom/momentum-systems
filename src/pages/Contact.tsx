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
import { useState, useCallback, useEffect } from "react";
import { useSelectedService } from "@/contexts/SelectedServiceContext";

// Rate limiting constants
const RATE_LIMIT_KEY = "contact_form_submissions";
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Sanitize text to remove potentially dangerous characters while preserving readability
const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, "") // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/data:/gi, "") // Remove data: protocol
    .trim();
};

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .transform(sanitizeText),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => val.toLowerCase()),
  company: z
    .string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .transform(sanitizeText)
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
    .max(2000, "Goal description must be less than 2000 characters")
    .transform(sanitizeText),
  budget: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Check rate limit from localStorage
const checkRateLimit = (): { allowed: boolean; remaining: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    
    if (!stored) {
      return { allowed: true, remaining: RATE_LIMIT_MAX };
    }
    
    const submissions: number[] = JSON.parse(stored);
    const validSubmissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );
    
    return {
      allowed: validSubmissions.length < RATE_LIMIT_MAX,
      remaining: Math.max(0, RATE_LIMIT_MAX - validSubmissions.length),
    };
  } catch {
    return { allowed: true, remaining: RATE_LIMIT_MAX };
  }
};

// Record a submission for rate limiting
const recordSubmission = (): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let submissions: number[] = stored ? JSON.parse(stored) : [];
    
    // Clean old entries and add new
    submissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );
    submissions.push(now);
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(submissions));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

// Format multiple selections into readable text
const formatSelectionsForForm = (selections: { serviceName: string; optionName: string }[]): string => {
  if (selections.length === 0) return "";

  // Group selections by service
  const grouped = selections.reduce((acc, selection) => {
    if (!acc[selection.serviceName]) {
      acc[selection.serviceName] = [];
    }
    acc[selection.serviceName].push(selection.optionName);
    return acc;
  }, {} as Record<string, string[]>);

  // Format as readable text
  const lines: string[] = [];
  Object.entries(grouped).forEach(([serviceName, options]) => {
    lines.push(`Service: ${serviceName}`);
    options.forEach((option) => {
      if (option === "Other") {
        lines.push(`  - Custom requirement (please describe below)`);
      } else {
        lines.push(`  - ${option}`);
      }
    });
    lines.push(""); // Empty line between services
  });

  return lines.join("\n").trim();
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedServices, clearSelectedServices } = useSelectedService();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      goal: "",
      budget: "",
    },
  });

  // Pre-fill form when coming from Services page
  useEffect(() => {
    if (selectedServices.length > 0) {
      const prefillText = formatSelectionsForForm(selectedServices);
      form.setValue("goal", prefillText);
      clearSelectedServices();
    }
  }, [selectedServices, form, clearSelectedServices]);

  const onSubmit = useCallback((data: ContactFormData) => {
    // Check rate limit
    const { allowed, remaining } = checkRateLimit();
    
    if (!allowed) {
      toast({
        title: "Too many submissions",
        description: "Please wait before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Build mailto content with sanitized data
    const subject = `Contact from ${data.name}`;
    const body = `Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Website: ${data.website || "Not provided"}
Budget: ${data.budget || "Undecided"}

Goal:
${data.goal}`;

    const mailtoLink = `mailto:v@bitwellforge.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Record submission for rate limiting
    recordSubmission();

    window.location.href = mailtoLink;

    toast({
      title: "Thank you",
      description: `We usually reply within two business days. (${remaining - 1} submissions remaining this hour)`,
    });

    form.reset();
    setIsSubmitting(false);
  }, [form, toast]);

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
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium rounded-lg transition-all duration-[120ms] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send"}
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
