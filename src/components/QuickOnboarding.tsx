import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, ArrowRight, User, Mail, MapPin, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const onboardingSteps = [
  { icon: User, label: "Basic Info", duration: "30s" },
  { icon: Mail, label: "Email & Password", duration: "45s" },
  { icon: MapPin, label: "Set Preferences", duration: "30s" },
];

const QuickOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup - create account
      setLoading(true);
      try {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (!error) {
          // Success toast already shown by signUp function
          // User will be redirected to sign-in page after email confirmation
        }
      } catch (error) {
        console.error('Sign up error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-accent border-accent/20">
              <Clock className="w-3 h-3 mr-1" />
              Under 2 Minutes
            </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple 
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}Quick Start{" "}
                </span>
              </h2>
            <p className="text-lg text-muted-foreground">
              Get started with our streamlined onboarding. No jargon, no barriers - just simple steps to unlock opportunities.
            </p>
          </div>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = onboardingSteps[currentStep].icon;
                    return <IconComponent className="w-5 h-5 text-primary" />;
                  })()}
                  {onboardingSteps[currentStep].label}
                </CardTitle>
                <Badge variant="secondary">
                  Step {currentStep + 1} of {onboardingSteps.length}
                </Badge>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      What's your name?
                    </label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="text-base"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Create a password
                    </label>
                    <Input
                      type="password"
                      placeholder="Choose a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We'll send a confirmation email to verify your account.
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your location
                    </label>
                    <Input
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This helps us show relevant local and diaspora opportunities.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  ~{onboardingSteps[currentStep].duration} remaining
                </div>
                
                <Button 
                  onClick={handleNext}
                  variant="hero"
                  className="group"
                  disabled={
                    loading ||
                    (currentStep === 0 && !formData.name) ||
                    (currentStep === 1 && (!formData.email || !formData.password)) ||
                    (currentStep === 2 && !formData.location)
                  }
                >
                  {currentStep === onboardingSteps.length - 1 ? (
                    <>
                      {loading ? "Creating Account..." : "Complete Setup"}
                      <CheckCircle className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  GDPR Compliant
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  256-bit Encryption
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  No Spam Policy
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time estimation */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    (() => {
                      const StepIcon = step.icon;
                      return <StepIcon className="w-4 h-4" />;
                    })()
                  )}
                </div>
                <div className="text-xs">
                  <div className="font-medium">{step.label}</div>
                  <div className="text-muted-foreground">{step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickOnboarding;