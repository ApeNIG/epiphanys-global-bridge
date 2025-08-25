import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, TrendingUp, Globe } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", { email, password });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log("Signup:", { fullName, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EF</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Epiphiny Flow
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Join the Diaspora Opportunity Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with global opportunities in business, careers, and investment. 
              Unlock your cultural capital and join a trusted community of diaspora leaders.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border/50">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-2">Verified Network</h3>
                <p className="text-sm text-muted-foreground text-center">KYC verified members and opportunities</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border/50">
                <Users className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-semibold mb-2">Diaspora Focus</h3>
                <p className="text-sm text-muted-foreground text-center">Built specifically for diaspora communities</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border/50">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-2">Impact Tracking</h3>
                <p className="text-sm text-muted-foreground text-center">Measure your economic empowerment</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border/50">
                <Globe className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-semibold mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground text-center">Connect across borders and industries</p>
              </div>
            </div>
          </div>

          {/* Auth Forms */}
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signup">Join Platform</TabsTrigger>
                <TabsTrigger value="login">Sign In</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>
                      Start your journey to economic empowerment. Join thousands of diaspora entrepreneurs, investors, and professionals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" className="w-full" size="lg">
                        Join Epiphiny Flow
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By signing up, you agree to our Terms of Service and Privacy Policy. 
                        Your data is protected and used only to connect you with relevant opportunities.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="login">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                      Sign in to access your opportunities and continue building your network.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="loginEmail">Email</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loginPassword">Password</Label>
                        <Input
                          id="loginPassword"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Button type="submit" variant="hero" className="w-full" size="lg">
                        Sign In
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-semibold mb-6">Trusted by diaspora communities worldwide</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">UK Government Partnership</div>
              <div className="text-sm font-medium">ISO 27001 Certified</div>
              <div className="text-sm font-medium">GDPR Compliant</div>
              <div className="text-sm font-medium">FCA Authorized Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;