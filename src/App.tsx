import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Advisory from "./pages/Advisory";
import Opportunities from "./pages/Opportunities";
import Community from "./pages/Community";
import About from "./pages/About";
import InvestmentHub from "./pages/InvestmentHub";
import Global from "./pages/Global";
import Consultation from "./pages/Consultation";
import Professionals from "./pages/Professionals";
import Profile from "./pages/Profile";
import BusinessOnboarding from "./pages/BusinessOnboarding";
import Goals from "./pages/Goals";
import { Network } from "./pages/Network";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/investment-hub" element={<InvestmentHub />} />
            <Route path="/global" element={<Global />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/network" element={<Network />} />
            <Route path="/business-onboarding" element={<BusinessOnboarding />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
