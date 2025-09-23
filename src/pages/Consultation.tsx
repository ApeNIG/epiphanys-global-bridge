import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Users, Building2, TrendingUp, Globe, Shield, CheckCircle, Calendar, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
const consultationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  organizationType: z.string().min(1, "Please select organisation type"),
  industryFocus: z.string().min(1, "Please select industry focus"),
  consultationGoals: z.string().min(20, "Please describe your goals (minimum 20 characters)"),
  currentChallenges: z.string().min(20, "Please describe your challenges (minimum 20 characters)"),
  budgetRange: z.string().min(1, "Please select budget range"),
  timeframe: z.string().min(1, "Please select timeframe"),
  hearAboutUs: z.string().optional()
});
type ConsultationForm = z.infer<typeof consultationSchema>;
const organizationTypes = [{
  value: "startup",
  label: "Startup (Pre-Series A)"
}, {
  value: "scaleup",
  label: "Scale-up (Series A+)"
}, {
  value: "sme",
  label: "SME (Established Business)"
}, {
  value: "enterprise",
  label: "Enterprise (1000+ employees)"
}, {
  value: "government",
  label: "Government/Public Sector"
}, {
  value: "nonprofit",
  label: "Non-profit Organisation"
}];
const industryFocus = ["Technology & Software", "Financial Services", "Healthcare & Life Sciences", "Retail & E-commerce", "Manufacturing", "Real Estate", "Education", "Energy & Sustainability", "Media & Entertainment", "Professional Services", "Other"];
const budgetRanges = ["Under £5,000", "£5,000 - £15,000", "£15,000 - £50,000", "£50,000 - £100,000", "£100,000+", "Government/Enterprise - Custom"];
const timeframes = ["Within 2 weeks", "Within 1 month", "Within 3 months", "Within 6 months", "Long-term partnership (6+ months)"];
const consultationBenefits = [{
  icon: Clock,
  title: "60-Minute Strategy Session",
  description: "Deep dive into your specific challenges and opportunities with senior advisors"
}, {
  icon: Globe,
  title: "Diaspora Network Mapping",
  description: "Identify key diaspora communities and networks relevant to your objectives"
}, {
  icon: TrendingUp,
  title: "Custom Growth Roadmap",
  description: "Receive a preliminary strategic roadmap tailored to your organisation"
}, {
  icon: Users,
  title: "Expert Network Access",
  description: "Connect with relevant experts and potential partners in our global network"
}];
const Consultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const form = useForm<ConsultationForm>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      organizationType: "",
      industryFocus: "",
      consultationGoals: "",
      currentChallenges: "",
      budgetRange: "",
      timeframe: "",
      hearAboutUs: ""
    }
  });
  const onSubmit = async (data: ConsultationForm) => {
    setIsSubmitting(true);
    try {
      // Store consultation request in database
      const {
        error
      } = await supabase.from('consultation_requests').insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        position: data.position,
        organization_type: data.organizationType,
        industry_focus: data.industryFocus,
        consultation_goals: data.consultationGoals,
        current_challenges: data.currentChallenges,
        budget_range: data.budgetRange,
        timeframe: data.timeframe,
        hear_about_us: data.hearAboutUs || null,
        status: 'pending'
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Consultation Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your strategic consultation."
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: "Error",
        description: "There was an issue submitting your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5" />
        <div className="flow-geometric-shape w-32 h-32 rotate-45 top-20 left-10 opacity-20" />
        <div className="flow-geometric-shape w-24 h-24 rotate-12 top-40 right-20 opacity-15" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              Strategic Consultation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Book Your Strategic
              </span>
              <br />
              <span className="text-foreground">Consultation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Get personalised expert guidance to unlock your organisation's potential through 
              strategic diaspora network connections and cultural intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Get</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your strategic consultation includes comprehensive analysis and actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {consultationBenefits.map((benefit, index) => <Card key={index} className="text-center p-6 hover:shadow-elegant transition-all duration-300">
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Consultation Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Your Consultation</h2>
              <p className="text-lg text-muted-foreground">
                Complete the form below and we'll contact you within 24 hours to schedule your session
              </p>
            </div>

            <Card className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@company.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="phone" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+44 20 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="position" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Your Position *</FormLabel>
                            <FormControl>
                              <Input placeholder="CEO, Founder, Director, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>
                  </div>

                  {/* Organisation Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2">Organisation Information</h3>
                    
                    <FormField control={form.control} name="company" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Company/Organisation Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your organisation name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="organizationType" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Organisation Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select organisation type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {organizationTypes.map(type => <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="industryFocus" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Industry Focus *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industryFocus.map(industry => <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2">Consultation Details</h3>
                    
                    <FormField control={form.control} name="consultationGoals" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>What are your main goals for this consultation? *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe what you hope to achieve through our consultation..." className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="currentChallenges" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>What are your current challenges? *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the main obstacles or challenges your organisation is facing..." className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="budgetRange" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Budget Range *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map(range => <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="timeframe" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Preferred Timeframe *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeframes.map(time => <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    <FormField control={form.control} name="hearAboutUs" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>How did you hear about us?</FormLabel>
                          <FormControl>
                            <Input placeholder="Google search, referral, social media, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button type="submit" size="xl" variant="hero" disabled={isSubmitting} className="px-12 py-6 text-lg">
                      {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-lg text-muted-foreground">
              Contact our advisory team directly for urgent consultation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">+44 20 3287 4567</p>
              <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-6pm GMT</p>
            </Card>

            <Card className="text-center p-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">advisory@epiphinyflow.com</p>
              <p className="text-xs text-muted-foreground mt-1">Response within 4 hours</p>
            </Card>

            <Card className="text-center p-6">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">London, UK</p>
              <p className="text-xs text-muted-foreground mt-1">Global virtual consultations</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Consultation;