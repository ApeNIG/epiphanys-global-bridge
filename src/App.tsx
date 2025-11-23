import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AIChatbot } from "./components/AIChatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Advisory from "./pages/Advisory";
import ManageOpportunities from "./pages/ManageOpportunities";
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
import DealFlowPlatform from "./pages/DealFlowPlatform";
import AITasks from "./pages/AITasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/opportunities" element={<ManageOpportunities />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/investment-hub" element={<InvestmentHub />} />
            <Route path="/global" element={<Global />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/network" element={<Network />} />
            <Route path="/deal-flow-platform" element={<DealFlowPlatform />} />
            <Route path="/business-onboarding" element={<BusinessOnboarding />} />
            <Route path="/ai-tasks" element={<AITasks />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            <AIChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
