import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "About", href: "/v2/about" },
  { label: "Advisory", href: "/v2/advisory" },
  { label: "Investment", href: "/v2/investment" },
  { label: "Community", href: "/v2/community" },
  { label: "Global", href: "/v2/global" },
];

const HeaderV3 = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between h-[72px]">
        <Link to="/v2" className="flex items-center gap-1.5">
          <img src={logo} alt="Epiphiny Flow" className="w-9 h-9 object-contain" />
          <span className="text-xl tracking-wide text-[#15171A]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
            Epiphiny Flow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-[#4a6e68] hover:text-[#00E7C3] transition-colors no-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:block text-sm font-medium text-[#4a6e68] hover:text-[#00E7C3]"
          >
            Log in
          </Link>
          <Link
            to="/auth"
            className="hidden sm:flex items-center gap-2 bg-[#15171A] text-[#00E7C3] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2a2d32] transition-colors"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-[#15171A]" />
            ) : (
              <Menu className="w-6 h-6 text-[#15171A]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-base font-medium text-[#4a6e68] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <Link to="/login" className="text-sm font-medium text-gray-700">
              Log in
            </Link>
            <Link
              to="/auth"
              className="flex items-center gap-2 bg-[#15171A] text-[#00E7C3] px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderV3;
