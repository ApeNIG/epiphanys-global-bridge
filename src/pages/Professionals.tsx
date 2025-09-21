import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Clock, 
  DollarSign, 
  FileText,
  Award,
  Globe,
  Calendar
} from "lucide-react";

const Professionals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Professional Identity
    professional_title: "",
    years_experience: "",
    current_employment_status: "",
    availability: "",
    
    // Skills & Expertise
    core_skills: [] as string[],
    industry_expertise: [] as string[],
    certifications: "",
    languages_spoken: [] as string[],
    
    // Work Preferences
    work_type_preference: "",
    location_preference: "",
    salary_expectation: "",
    willing_to_relocate: "",
    notice_period: "",
    
    // Background & Education
    highest_qualification: "",
    university_institution: "",
    professional_summary: "",
    key_achievements: "",
    
    // Availability & Logistics
    start_date_availability: "",
    interview_availability: "",
    visa_status: "",
    security_clearance: "",
    
    // References & Portfolio
    references_available: "",
    portfolio_website: "",
    linkedin_profile: "",
    
    // Additional Information
    diversity_background: "",
    accessibility_requirements: "",
    professional_memberships: ""
  });

  const employmentStatuses = [
    "Currently Employed",
    "Unemployed - Actively Seeking", 
    "Unemployed - Open to Opportunities",
    "Freelancer/Consultant",
    "Student",
    "Career Break"
  ];

  const workTypePreferences = [
    "Full-time Permanent",
    "Part-time Permanent", 
    "Contract/Temporary",
    "Freelance/Consultant",
    "Remote Only",
    "Hybrid",
    "On-site Only"
  ];

  const skillCategories = [
    "Project Management",
    "Data Analysis", 
    "Software Development",
    "Digital Marketing",
    "Financial Analysis",
    "HR Management",
    "Sales & Business Development",
    "Operations Management",
    "Customer Service",
    "Legal & Compliance",
    "Design & Creative",
    "Engineering",
    "Healthcare",
    "Education & Training"
  ];

  const industryExpertise = [
    "Technology/IT",
    "Financial Services",
    "Healthcare",
    "Education",
    "Retail/E-commerce",
    "Manufacturing",
    "Real Estate",
    "Energy & Utilities",
    "Media & Entertainment",
    "Non-profit",
    "Government",
    "Consulting"
  ];

  const languages = [
    "English",
    "Spanish",
    "French", 
    "German",
    "Arabic",
    "Mandarin",
    "Hindi",
    "Portuguese",
    "Italian",
    "Japanese",
    "Other"
  ];

  const qualifications = [
    "High School/Secondary",
    "Diploma/Certificate",
    "Bachelor's Degree",
    "Master's Degree", 
    "PhD/Doctorate",
    "Professional Qualification",
    "Trade Certification"
  ];

  const handleSkillChange = (skill: string, checked: boolean, category: 'core_skills' | 'industry_expertise' | 'languages_spoken') => {
    const current = formData[category];
    if (checked) {
      setFormData({
        ...formData,
        [category]: [...current, skill]
      });
    } else {
      setFormData({
        ...formData,
        [category]: current.filter(s => s !== skill)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Store professional profile data in consultation_requests table for now
      // In a real app, you'd want a dedicated professionals table
      const { error } = await supabase
        .from('consultation_requests')
        .insert({
          full_name: `${user.user_metadata?.full_name || user.email}`,
          email: user.email,
          phone: formData.start_date_availability, // Temporary field mapping
          company: formData.professional_title,
          position: formData.current_employment_status,
          organization_type: "Professional",
          industry_focus: formData.industry_expertise.join(', '),
          consultation_goals: formData.professional_summary,
          current_challenges: formData.key_achievements,
          budget_range: formData.salary_expectation,
          timeframe: formData.notice_period,
          status: "professional_profile"
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Professional profile submitted successfully!",
        variant: "default"
      });
      
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to submit profile. Please try again.",
        variant: "destructive"
      });
      console.error('Error submitting profile:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Help employers understand your expertise and career goals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Professional Identity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Professional Identity
                </CardTitle>
                <CardDescription>
                  Your current professional status and experience level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="professional_title">Current/Target Job Title</Label>
                    <Input
                      id="professional_title"
                      value={formData.professional_title}
                      onChange={(e) => setFormData({...formData, professional_title: e.target.value})}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="years_experience">Years of Experience</Label>
                    <Select 
                      value={formData.years_experience} 
                      onValueChange={(value) => setFormData({...formData, years_experience: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10-15">10-15 years</SelectItem>
                        <SelectItem value="15+">15+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Current Employment Status</Label>
                    <Select 
                      value={formData.current_employment_status} 
                      onValueChange={(value) => setFormData({...formData, current_employment_status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Work Type Preference</Label>
                    <Select 
                      value={formData.work_type_preference} 
                      onValueChange={(value) => setFormData({...formData, work_type_preference: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {workTypePreferences.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Skills & Expertise
                </CardTitle>
                <CardDescription>
                  Your core competencies and industry knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">Core Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {skillCategories.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.core_skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean, 'core_skills')}
                        />
                        <Label htmlFor={skill} className="text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Industry Expertise</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {industryExpertise.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={industry}
                          checked={formData.industry_expertise.includes(industry)}
                          onCheckedChange={(checked) => handleSkillChange(industry, checked as boolean, 'industry_expertise')}
                        />
                        <Label htmlFor={industry} className="text-sm">
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications">Professional Certifications</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                    placeholder="List your professional certifications, licenses, or qualifications..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Work Preferences & Logistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Work Preferences & Logistics
                </CardTitle>
                <CardDescription>
                  Your availability and work arrangement preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location_preference">Location Preference</Label>
                    <Input
                      id="location_preference"
                      value={formData.location_preference}
                      onChange={(e) => setFormData({...formData, location_preference: e.target.value})}
                      placeholder="e.g., London, UK or Remote"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salary_expectation">Salary Expectation</Label>
                    <Input
                      id="salary_expectation"
                      value={formData.salary_expectation}
                      onChange={(e) => setFormData({...formData, salary_expectation: e.target.value})}
                      placeholder="e.g., £50,000 - £70,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Willing to Relocate?</Label>
                    <RadioGroup 
                      value={formData.willing_to_relocate} 
                      onValueChange={(value) => setFormData({...formData, willing_to_relocate: value})}
                      className="flex gap-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="relocate-yes" />
                        <Label htmlFor="relocate-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="relocate-no" />
                        <Label htmlFor="relocate-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="notice_period">Notice Period</Label>
                    <Select 
                      value={formData.notice_period} 
                      onValueChange={(value) => setFormData({...formData, notice_period: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1-week">1 week</SelectItem>
                        <SelectItem value="2-weeks">2 weeks</SelectItem>
                        <SelectItem value="1-month">1 month</SelectItem>
                        <SelectItem value="2-months">2 months</SelectItem>
                        <SelectItem value="3-months">3 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education & Background */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education & Background
                </CardTitle>
                <CardDescription>
                  Your educational qualifications and professional summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Highest Qualification</Label>
                    <Select 
                      value={formData.highest_qualification} 
                      onValueChange={(value) => setFormData({...formData, highest_qualification: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((qual) => (
                          <SelectItem key={qual} value={qual}>
                            {qual}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="university_institution">University/Institution</Label>
                    <Input
                      id="university_institution"
                      value={formData.university_institution}
                      onChange={(e) => setFormData({...formData, university_institution: e.target.value})}
                      placeholder="e.g., University of London"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="professional_summary">Professional Summary</Label>
                  <Textarea
                    id="professional_summary"
                    value={formData.professional_summary}
                    onChange={(e) => setFormData({...formData, professional_summary: e.target.value})}
                    placeholder="Brief overview of your professional background and career objectives..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="key_achievements">Key Achievements</Label>
                  <Textarea
                    id="key_achievements"
                    value={formData.key_achievements}
                    onChange={(e) => setFormData({...formData, key_achievements: e.target.value})}
                    placeholder="Highlight your most significant professional accomplishments..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Additional Information
                </CardTitle>
                <CardDescription>
                  Optional details that help employers understand your background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="portfolio_website">Portfolio/Website</Label>
                    <Input
                      id="portfolio_website"
                      value={formData.portfolio_website}
                      onChange={(e) => setFormData({...formData, portfolio_website: e.target.value})}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin_profile">LinkedIn Profile</Label>
                    <Input
                      id="linkedin_profile"
                      value={formData.linkedin_profile}
                      onChange={(e) => setFormData({...formData, linkedin_profile: e.target.value})}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Languages Spoken</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages_spoken.includes(language)}
                          onCheckedChange={(checked) => handleSkillChange(language, checked as boolean, 'languages_spoken')}
                        />
                        <Label htmlFor={language} className="text-sm">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Professional Profile"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Professionals;