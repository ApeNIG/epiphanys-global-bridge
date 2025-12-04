import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, TrendingUp, Globe } from "lucide-react";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { user, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is coming from password reset or investor signup
  const urlParams = new URLSearchParams(window.location.search);
  const isPasswordReset = urlParams.get('type') === 'recovery';
  const userRole = urlParams.get('role');

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !isPasswordReset) {
      navigate('/dashboard');
    }
  }, [user, navigate, isPasswordReset]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(email, password, fullName, userRole || 'general');
    
    if (!error) {
      // Clear form after successful signup
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth?type=recovery`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setResetEmailSent(true);
        toast({
          title: "Reset email sent",
          description: "Check your email for a password reset link.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated.",
          variant: "default",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  // Password reset view
  if (isPasswordReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5">
        <header className="border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Epiphiny Flow" className="w-[65px] h-[65px] object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Epiphiny Flow
              </span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Update Your Password</CardTitle>
                <CardDescription>
                  Enter your new password below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="Enter your new password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmNewPassword" 
                      type="password" 
                      placeholder="Confirm your new password" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Updating Password..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Epiphiny Flow" className="w-[65px] h-[65px] object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
              join the epiphiny "deal" flow hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {userRole === 'investor'
                ? 'Discover vetted investment opportunities from diaspora entrepreneurs and growing businesses. Join our exclusive network of impact investors.'
                : 'Connect with global opportunities in business, careers, and investment. Unlock your cultural capital and join a trusted community of diaspora leaders.'
              }
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
            {showForgotPassword ? (
              /* Forgot Password Form */
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                  <CardDescription>
                    {resetEmailSent 
                      ? "We've sent you a password reset link. Check your email and follow the instructions."
                      : "Enter your email address and we'll send you a link to reset your password."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resetEmailSent ? (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resetEmail">Email Address</Label>
                        <Input 
                          id="resetEmail" 
                          type="email" 
                          placeholder="Enter your email" 
                          value={resetEmail} 
                          onChange={e => setResetEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Sending Reset Email..." : "Send Reset Email"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="w-full" 
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Back to Sign In
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm text-foreground">
                          If you don't see the email, check your spam folder or try again with a different email address.
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmailSent(false);
                          setResetEmail("");
                        }}
                      >
                        Back to Sign In
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="signup">Join Platform</TabsTrigger>
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {userRole === 'investor' ? 'Create Investor Account' : 'Create Your Account'}
                      </CardTitle>
                      <CardDescription>
                        {userRole === 'investor'
                          ? 'Join our exclusive network of verified investors and access curated investment opportunities from diaspora-led businesses.'
                          : 'Start your journey to economic empowerment. Join thousands of diaspora entrepreneurs, investors, and professionals.'
                        }
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
                            onChange={e => setFullName(e.target.value)} 
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
                            onChange={e => setEmail(e.target.value)} 
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
                            onChange={e => setPassword(e.target.value)} 
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
                            onChange={e => setConfirmPassword(e.target.value)} 
                            required 
                          />
                        </div>
                        <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? "Creating Account..." : userRole === 'investor' ? "Join as Investor" : "Join Epiphiny Flow"}
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
                            onChange={e => setEmail(e.target.value)} 
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
                            onChange={e => setPassword(e.target.value)} 
                            required 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            <span>Remember me</span>
                          </label>
                          <button 
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-primary hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
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