import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Events = () => (
  <div className="min-h-screen bg-[#15171A] flex flex-col items-center justify-center px-6 text-center">
    <Link to="/v3" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#00E7C3] transition-colors text-sm">
      <ArrowLeft className="w-4 h-4" />
      Back to Home
    </Link>
    <div className="w-12 h-[2px] bg-[#00E7C3] mx-auto mb-8" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500 mb-6 block">Community</span>
    <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white tracking-[-0.03em] mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
      Events
    </h1>
    <p className="text-gray-500 text-[17px] leading-[1.7] max-w-[420px]">
      Networking events, summits, and workshops connecting diaspora professionals across borders. Coming soon.
    </p>
    <div className="mt-12 px-8 py-3 rounded-full border border-[#00E7C3]/30 text-[#00E7C3] text-sm font-semibold tracking-wider uppercase">
      Coming Soon
    </div>
  </div>
);

export default Events;
