import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AIChatbot } from "./components/AIChatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import SuccessStories from "./pages/SuccessStories";
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
import IndexV2 from "./pages/IndexV2";
import AboutV2 from "./pages/AboutV2";
import AdvisoryV2 from "./pages/AdvisoryV2";
import InvestmentHubV2 from "./pages/InvestmentHubV2";
import CommunityPageV2 from "./pages/CommunityPageV2";
import GlobalV2 from "./pages/GlobalV2";
import DesignLabV2 from "./pages/DesignLabV2";
import IndexV3 from "./pages/IndexV3";
import PosterGallery from "./components/posters/PosterGallery";

const queryClient = new QueryClient();

const ChatbotWrapper = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/v2")) return null;
  return <AIChatbot />;
};

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
            <Route path="/login" element={<Login />} />
            <Route path="/success-stories" element={<SuccessStories />} />
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
            <Route path="/v2" element={<IndexV2 />} />
            <Route path="/v2/about" element={<AboutV2 />} />
            <Route path="/v2/advisory" element={<AdvisoryV2 />} />
            <Route path="/v2/investment" element={<InvestmentHubV2 />} />
            <Route path="/v2/community" element={<CommunityPageV2 />} />
            <Route path="/v2/global" element={<GlobalV2 />} />
            <Route path="/v2/lab" element={<DesignLabV2 />} />
            <Route path="/v3" element={<IndexV3 />} />
            <Route path="/posters" element={<PosterGallery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            <ChatbotWrapper />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
