import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessProfileForm from "@/components/BusinessProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Building, Target, Users } from "lucide-react";

export default function BusinessOnboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "AI-Powered Matching",
      description: "Get matched with relevant investors and opportunities based on your business profile and requirements."
    },
    {
      icon: <Building className="w-6 h-6 text-primary" />,
      title: "Comprehensive Profile",
      description: "Showcase your business with detailed information about market, traction, funding needs, and impact."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Connect with Investors",
      description: "Access our network of VCs, angel investors, and strategic partners looking for opportunities like yours."
    }
  ];

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold mb-4">
                  Complete Your Business Profile
                </CardTitle>
                <CardDescription className="text-lg">
                  Help us understand your business better to provide you with the most relevant investment opportunities and connections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="flex justify-center mb-3">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button onClick={() => setStep(2)} size="lg">
                    Start Profile Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You'll Provide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Company Information
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      Basic details, stage, sector, and business model
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Market Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      Problem statement, target customers, and market positioning
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Traction & Metrics
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      Revenue, customers, key performance indicators
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Funding Requirements
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      Funding goals, use of funds, investor preferences
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Team & Leadership
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      Founder information, team size, advisory board
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Impact & Values
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6">
                      ESG alignment, diversity & inclusion, mission-driven goals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        <BusinessProfileForm 
          onComplete={() => {
            navigate("/dashboard");
          }}
        />
      </div>
    </div>
  );
}