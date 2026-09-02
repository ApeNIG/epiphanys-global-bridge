import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import FeedbackWidget from "@/components/v3/FeedbackWidget";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import SuccessStories from "./pages/SuccessStories";
import Dashboard from "./pages/Dashboard";
import Advisory from "./pages/Advisory";
import ManageOpportunities from "./pages/ManageOpportunities";
import About from "./pages/About";
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
import AboutV3 from "./pages/AboutV3";
import AdvisoryV3 from "./pages/AdvisoryV3";
import InvestmentV3 from "./pages/InvestmentV3";
import AdvisoryReport from "./pages/AdvisoryReport";
import AdvisoryBoard from "./pages/AdvisoryBoard";
import Events from "./pages/Events";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import PosterGallery from "./components/posters/PosterGallery";

const queryClient = new QueryClient();

// AI chatbot removed 2026-09-02 per the 25 August website review (the "chat
// bubble" and "AI assistant" on that list are this one component). The
// component file is retained; restore by re-adding this wrapper and its import.

// Feedback widget: show on the public marketing pages only, not the
// logged-in app pages, auth screens, or the legacy /v2 site.
const FEEDBACK_HIDDEN_PREFIXES = [
  "/v2", "/auth", "/login", "/dashboard", "/profile", "/goals", "/network",
  "/opportunities", "/business-onboarding", "/ai-tasks", "/deal-flow-platform",
  "/investment-hub", "/professionals", "/success-stories",
];
const FeedbackWrapper = () => {
  const location = useLocation();
  if (FEEDBACK_HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p))) return null;
  return <FeedbackWidget />;
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
            <Route path="/" element={<IndexV3 />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advisory" element={<AdvisoryV3 />} />
            <Route path="/fund" element={<InvestmentV3 />} />
            <Route path="/legacy-advisory" element={<Advisory />} />
            <Route path="/opportunities" element={<ManageOpportunities />} />
            {/* Legacy pre-V3 pages, redirected 2026-09-02 on Siba's call.
                They rendered the old header, the old "Investment" nav and 3-4
                /auth links. Nothing on the site links to them any more, but old
                bookmarks and typed URLs landed on the old website. The page
                components remain in the repo; restore by swapping the element
                back. */}
            <Route path="/community" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<AboutV3 />} />
            <Route path="/legacy-about" element={<About />} />
            <Route path="/investment-hub" element={<Navigate to="/" replace />} />
            <Route path="/global" element={<Navigate to="/" replace />} />
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
            <Route path="/v3/about" element={<AboutV3 />} />
            <Route path="/v3/advisory" element={<AdvisoryV3 />} />
            <Route path="/v3/investment" element={<InvestmentV3 />} />
            <Route path="/advisory/report" element={<AdvisoryReport />} />
            <Route path="/advisory/board" element={<AdvisoryBoard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/posters" element={<PosterGallery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            <FeedbackWrapper />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
