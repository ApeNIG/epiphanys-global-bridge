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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building, Target, TrendingUp, PoundSterling, Users, Handshake, Heart } from "lucide-react";

interface BusinessProfileFormProps {
  onComplete?: () => void;
}

export default function BusinessProfileForm({ onComplete }: BusinessProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("company");
  
  const form = useForm({
    defaultValues: {
      // Company Profile
      name: "",
      website: "",
      hq_location: "",
      year_founded: "",
      legal_structure: "",
      stage: "",
      sector: "",
      business_model: "",
      // Market & Offering
      problem_statement: "",
      target_customers: "",
      key_differentiator: "",
      current_markets: "",
      expansion_markets: "",
      // Traction
      revenue_model: "",
      annual_revenue: "",
      has_customers: "",
      customer_details: "",
      key_metrics: "",
      awards_grants: "",
      // Funding Needs
      previous_funding: "",
      previous_funding_amount: "",
      previous_investors: "",
      current_funding_goal: "",
      funding_type: "",
      use_of_funds: [] as string[],
      // Team
      founder_names_roles: "",
      team_size: "",
      advisory_board: "",
      // Strategic Fit
      investor_types: [] as string[],
      preferred_geography: "",
      open_to_partnerships: "",
      partnership_type: "",
      // Impact & Values
      esg_sdg_alignment: [] as string[],
      diversity_inclusion: "",
      mission_driven: "",
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
          location: data.hq_location,
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
          usp: data.key_differentiator,
          current_markets: data.current_markets ? data.current_markets.split(",").map((m: string) => m.trim()) : [],
          desired_markets: data.expansion_markets ? data.expansion_markets.split(",").map((m: string) => m.trim()) : [],
        }),
        
        // Traction data
        supabase.from("company_traction").insert({
          company_id: companyId,
          revenue_range: data.annual_revenue,
          revenue_model: data.revenue_model,
          key_metrics: data.key_metrics ? { metrics: data.key_metrics } : null,
          customers: data.has_customers === "yes" ? 1 : 0,
          awards: data.awards_grants ? data.awards_grants.split(",").map((a: string) => a.trim()) : [],
        }),
        
        // Funding data
        supabase.from("company_funding").insert({
          company_id: companyId,
          previous_funding: data.previous_funding === "yes" ? data.previous_funding_amount : null,
          current_funding_goal: data.current_funding_goal,
          funding_type: data.funding_type,
          use_of_funds: data.use_of_funds.join(", "),
        }),
        
        // Team data
        supabase.from("company_team").insert({
          company_id: companyId,
          founder_name: data.founder_names_roles,
          role: "Founder",
          team_size: data.team_size ? parseInt(data.team_size) : null,
          advisors: data.advisory_board ? data.advisory_board.split(",").map((a: string) => a.trim()) : [],
        }),
        
        // Strategic fit data
        supabase.from("company_strategic_fit").insert({
          company_id: companyId,
          investor_type: data.investor_types,
          preferred_investor_location: data.preferred_geography ? data.preferred_geography.split(",").map((l: string) => l.trim()) : [],
          partnership_interest: data.open_to_partnerships === "yes" ? data.partnership_type : null,
        }),
        
        // Impact data
        supabase.from("company_impact").insert({
          company_id: companyId,
          esg_alignment: data.esg_sdg_alignment.join(", "),
          sdg_alignment: data.esg_sdg_alignment,
          diversity_inclusion: data.diversity_inclusion,
          mission_driven: data.mission_driven === "yes",
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
    { id: "funding", label: "Funding", icon: PoundSterling },
    { id: "team", label: "Team", icon: Users },
    { id: "strategic", label: "Strategic Fit", icon: Handshake },
    { id: "impact", label: "Impact", icon: Heart },
  ];

  const sectorOptions = [
    "FinTech", "HealthTech", "EdTech", "PropTech", "CleanTech", "AgriTech", 
    "RetailTech", "FoodTech", "TravelTech", "LegalTech", "HRTech", 
    "MarketingTech", "CyberSecurity", "AI/ML", "Blockchain", "IoT", 
    "E-commerce", "SaaS", "Marketplace", "Manufacturing", "Other"
  ];

  const useOfFundsOptions = [
    "R&D", "Team Growth", "Market Expansion", "Operations", "Marketing", "Technology Development", "Other"
  ];

  const investorTypeOptions = [
    "Angel Investors", "Venture Capital", "Corporate VC", "Family Office", "Impact Investors", "Government Grants", "Crowdfunding", "Other"
  ];

  const esgSdgOptions = [
    "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education", 
    "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy", 
    "Decent Work and Economic Growth", "Industry Innovation and Infrastructure", 
    "Reduced Inequalities", "Sustainable Cities and Communities", "Responsible Consumption and Production", 
    "Climate Action", "Life Below Water", "Life on Land", "Peace Justice and Strong Institutions", 
    "Partnerships for the Goals"
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
                <h3 className="text-lg font-semibold">Section 1: Company Profile</h3>
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
                    name="hq_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HQ Location</FormLabel>
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
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select legal structure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
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
                        <FormLabel>Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="idea">Idea</SelectItem>
                            <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series_a">Series A</SelectItem>
                            <SelectItem value="growth">Growth</SelectItem>
                            <SelectItem value="established_sme">Established SME</SelectItem>
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
                        <FormLabel>Sector/Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
                            {sectorOptions.map((sector) => (
                              <SelectItem key={sector} value={sector.toLowerCase().replace(/\//g, "_")}>{sector}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select business model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="b2b">B2B</SelectItem>
                            <SelectItem value="b2c">B2C</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="marketplace">Marketplace</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="market" className="space-y-4">
                <h3 className="text-lg font-semibold">Section 2: Market & Offering</h3>
                <FormField
                  control={form.control}
                  name="problem_statement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem you are solving</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe the problem your company solves..." />
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
                      <FormLabel>Who are your target customers?</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe your target customer segments..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="key_differentiator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key differentiator / USP</FormLabel>
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
                        <FormLabel>Current markets active in</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="UK, EU (comma separated)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expansion_markets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Markets you want to expand into</FormLabel>
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
                <h3 className="text-lg font-semibold">Section 3: Traction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="revenue_model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Subscription, Transaction-based" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="annual_revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Revenue</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select revenue range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="0-100k">£0 - £100k</SelectItem>
                            <SelectItem value="100k-500k">£100k - £500k</SelectItem>
                            <SelectItem value="500k-1m">£500k - £1m</SelectItem>
                            <SelectItem value="1m+">£1m+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="has_customers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customers / contracts signed</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="customers-yes" />
                            <Label htmlFor="customers-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="customers-no" />
                            <Label htmlFor="customers-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("has_customers") === "yes" && (
                  <FormField
                    control={form.control}
                    name="customer_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Details</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Provide details about your customers or contracts..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="key_metrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Performance Metrics</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="ARR, GMV, users, growth rate, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="awards_grants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Awards, grants, or accelerators joined</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="List any awards, grants, or accelerator programs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="funding" className="space-y-4">
                <h3 className="text-lg font-semibold">Section 4: Funding Needs</h3>
                
                <FormField
                  control={form.control}
                  name="previous_funding"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Have you raised funding before?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="funding-yes" />
                            <Label htmlFor="funding-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="funding-no" />
                            <Label htmlFor="funding-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("previous_funding") === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="previous_funding_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Funding Amount</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="£250k" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="previous_investors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Investors</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="List previous investors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="current_funding_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current fundraising goal</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="£500k" />
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
                        <FormLabel>Type of funding sought</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select funding type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="equity">Equity</SelectItem>
                            <SelectItem value="debt">Debt</SelectItem>
                            <SelectItem value="grant">Grant</SelectItem>
                            <SelectItem value="strategic_partnership">Strategic Partnership</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="use_of_funds"
                  render={() => (
                    <FormItem>
                      <FormLabel>Use of funds (select all that apply)</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {useOfFundsOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="use_of_funds"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <h3 className="text-lg font-semibold">Section 5: Team</h3>
                <FormField
                  control={form.control}
                  name="founder_names_roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder names & roles</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="John Smith - CEO, Jane Doe - CTO" />
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
                        <Input {...field} type="number" placeholder="5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="advisory_board"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advisory board / mentors (optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="List key advisors or mentors" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="strategic" className="space-y-4">
                <h3 className="text-lg font-semibold">Section 6: Strategic Fit</h3>
                <FormField
                  control={form.control}
                  name="investor_types"
                  render={() => (
                    <FormItem>
                      <FormLabel>What type of investors are you seeking?</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {investorTypeOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="investor_types"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferred_geography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred investor geography</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Local, Regional, Global, Diaspora networks" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="open_to_partnerships"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open to partnerships?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="partnerships-yes" />
                            <Label htmlFor="partnerships-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="partnerships-no" />
                            <Label htmlFor="partnerships-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("open_to_partnerships") === "yes" && (
                  <FormField
                    control={form.control}
                    name="partnership_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of partnership</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Strategic, Distribution, Technology, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                <h3 className="text-lg font-semibold">Section 7: Impact & Values (Optional)</h3>
                
                <FormField
                  control={form.control}
                  name="esg_sdg_alignment"
                  render={() => (
                    <FormItem>
                      <FormLabel>Are you aligned with any ESG/SDG goals?</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                        {esgSdgOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="esg_sdg_alignment"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
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
                      <FormLabel>Diversity & inclusion approach</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe your approach to diversity and inclusion..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mission_driven"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social enterprise / mission-driven?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="mission-yes" />
                            <Label htmlFor="mission-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="mission-no" />
                            <Label htmlFor="mission-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
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