import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Building, Target, TrendingUp, DollarSign, Users, Handshake, Heart } from "lucide-react";

interface BusinessProfileFormProps {
  onComplete?: () => void;
}

export default function BusinessProfileForm({ onComplete }: BusinessProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("company");
  
  const form = useForm({
    defaultValues: {
      // Company
      name: "",
      website: "",
      location: "",
      year_founded: "",
      legal_structure: "",
      stage: "",
      sector: "",
      business_model: "",
      // Market
      problem_statement: "",
      target_customers: "",
      usp: "",
      current_markets: "",
      desired_markets: "",
      // Traction
      revenue_range: "",
      revenue_model: "",
      key_metrics: "",
      customers: "",
      awards: "",
      // Funding
      previous_funding: "",
      current_funding_goal: "",
      funding_type: "",
      use_of_funds: "",
      // Team
      founder_name: "",
      role: "",
      team_size: "",
      advisors: "",
      // Strategic Fit
      investor_type: [],
      preferred_investor_location: "",
      partnership_interest: "",
      // Impact
      esg_alignment: "",
      sdg_alignment: [],
      diversity_inclusion: "",
      mission_driven: false,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Insert company
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          user_id: user.id,
          name: data.name,
          website: data.website,
          location: data.location,
          year_founded: data.year_founded ? parseInt(data.year_founded) : null,
          legal_structure: data.legal_structure,
          stage: data.stage,
          sector: data.sector,
          business_model: data.business_model,
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // Insert related data
      const companyId = company.id;

      await Promise.all([
        // Market data
        supabase.from("company_market").insert({
          company_id: companyId,
          problem_statement: data.problem_statement,
          target_customers: data.target_customers,
          usp: data.usp,
          current_markets: data.current_markets ? data.current_markets.split(",").map((m: string) => m.trim()) : [],
          desired_markets: data.desired_markets ? data.desired_markets.split(",").map((m: string) => m.trim()) : [],
        }),
        
        // Traction data
        supabase.from("company_traction").insert({
          company_id: companyId,
          revenue_range: data.revenue_range,
          revenue_model: data.revenue_model,
          key_metrics: data.key_metrics ? JSON.parse(data.key_metrics) : null,
          customers: data.customers ? parseInt(data.customers) : null,
          awards: data.awards ? data.awards.split(",").map((a: string) => a.trim()) : [],
        }),
        
        // Funding data
        supabase.from("company_funding").insert({
          company_id: companyId,
          previous_funding: data.previous_funding,
          current_funding_goal: data.current_funding_goal,
          funding_type: data.funding_type,
          use_of_funds: data.use_of_funds,
        }),
        
        // Team data
        supabase.from("company_team").insert({
          company_id: companyId,
          founder_name: data.founder_name,
          role: data.role,
          team_size: data.team_size ? parseInt(data.team_size) : null,
          advisors: data.advisors ? data.advisors.split(",").map((a: string) => a.trim()) : [],
        }),
        
        // Strategic fit data
        supabase.from("company_strategic_fit").insert({
          company_id: companyId,
          investor_type: data.investor_type,
          preferred_investor_location: data.preferred_investor_location ? data.preferred_investor_location.split(",").map((l: string) => l.trim()) : [],
          partnership_interest: data.partnership_interest,
        }),
        
        // Impact data
        supabase.from("company_impact").insert({
          company_id: companyId,
          esg_alignment: data.esg_alignment,
          sdg_alignment: data.sdg_alignment,
          diversity_inclusion: data.diversity_inclusion,
          mission_driven: data.mission_driven,
        }),
      ]);

      toast.success("Business profile created successfully!");
      onComplete?.();
    } catch (error) {
      console.error("Error creating business profile:", error);
      toast.error("Failed to create business profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "company", label: "Company", icon: Building },
    { id: "market", label: "Market", icon: Target },
    { id: "traction", label: "Traction", icon: TrendingUp },
    { id: "funding", label: "Funding", icon: DollarSign },
    { id: "team", label: "Team", icon: Users },
    { id: "strategic", label: "Strategic Fit", icon: Handshake },
    { id: "impact", label: "Impact", icon: Heart },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Business Profile</CardTitle>
        <CardDescription>
          Provide detailed information about your business to enable AI-powered matching with relevant investors and opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-7">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="company" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your company name" />
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
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://yourcompany.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="London, UK" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year_founded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Founded</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="2023" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="legal_structure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Structure</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select legal structure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="limited_company">Limited Company</SelectItem>
                            <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                            <SelectItem value="sole_trader">Sole Trader</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="idea">Idea</SelectItem>
                            <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series_a">Series A</SelectItem>
                            <SelectItem value="series_b">Series B</SelectItem>
                            <SelectItem value="series_c">Series C+</SelectItem>
                            <SelectItem value="growth">Growth</SelectItem>
                            <SelectItem value="ipo_ready">IPO Ready</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., FinTech, HealthTech, EdTech" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., SaaS, Marketplace, B2B" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="market" className="space-y-4">
                <FormField
                  control={form.control}
                  name="problem_statement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Statement</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What problem does your company solve?" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="target_customers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Customers</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe your target customer segments" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unique Selling Proposition</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What makes your solution unique?" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="current_markets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Markets</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="UK, EU (comma separated)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desired_markets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Markets</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="US, APAC (comma separated)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="traction" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="revenue_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select revenue range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-10k">0-10k</SelectItem>
                            <SelectItem value="10k-50k">10k-50k</SelectItem>
                            <SelectItem value="50k-100k">50k-100k</SelectItem>
                            <SelectItem value="100k-500k">100k-500k</SelectItem>
                            <SelectItem value="500k-1M">500k-1M</SelectItem>
                            <SelectItem value="1M+">1M+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="revenue_model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Subscription, Transactional" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="key_metrics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Metrics (JSON format)</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder='e.g., { "ARR": "500k", "MoM Growth": "10%" }' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Customers</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="e.g., 1000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="awards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Awards & Recognition</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Best Startup, Innovation Award" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="funding" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="previous_funding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Funding</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., $500k Seed Round" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="current_funding_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Funding Goal</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., $2M Series A" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="funding_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select funding type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series_a">Series A</SelectItem>
                            <SelectItem value="series_b">Series B</SelectItem>
                            <SelectItem value="series_c">Series C+</SelectItem>
                            <SelectItem value="venture_debt">Venture Debt</SelectItem>
                            <SelectItem value="grant">Grant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="use_of_funds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Use of Funds</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="e.g., Product Development, Marketing" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="founder_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founder Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., CEO, CTO" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="team_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="e.g., 10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="advisors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advisors</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Dr. Smith, Mr. Jones" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="strategic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="investor_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Investor Type</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        <FormField
                          control={form.control}
                          name="investor_type"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("angel")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "angel"])
                                      : field.onChange(field.value?.filter((value) => value !== "angel"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Angel</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="investor_type"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("vc")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "vc"])
                                      : field.onChange(field.value?.filter((value) => value !== "vc"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">VC</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="investor_type"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("private_equity")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "private_equity"])
                                      : field.onChange(field.value?.filter((value) => value !== "private_equity"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Private Equity</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="investor_type"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("corporate")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "corporate"])
                                      : field.onChange(field.value?.filter((value) => value !== "corporate"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Corporate</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferred_investor_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Investor Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Silicon Valley, New York" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="partnership_interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Interest</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="e.g., Joint Ventures, Distribution Agreements" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                <FormField
                  control={form.control}
                  name="esg_alignment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ESG Alignment</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe your company's ESG alignment" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sdg_alignment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDG Alignment</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        <FormField
                          control={form.control}
                          name="sdg_alignment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("sdg1")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "sdg1"])
                                      : field.onChange(field.value?.filter((value) => value !== "sdg1"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">SDG 1: No Poverty</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sdg_alignment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("sdg2")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], "sdg2"])
                                      : field.onChange(field.value?.filter((value) => value !== "sdg2"))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">SDG 2: Zero Hunger</FormLabel>
                            </FormItem>
                          )}
                        />
                        {/* Add more SDG options as needed */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diversity_inclusion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diversity & Inclusion</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe your company's diversity and inclusion initiatives" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mission_driven"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Mission-Driven</FormLabel>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                    if (currentIndex > 0) {
                      setCurrentTab(tabs[currentIndex - 1].id);
                    }
                  }}
                  disabled={currentTab === "company"}
                >
                  Previous
                </Button>
                {currentTab === "impact" ? (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Complete Profile"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                      if (currentIndex < tabs.length - 1) {
                        setCurrentTab(tabs[currentIndex + 1].id);
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
