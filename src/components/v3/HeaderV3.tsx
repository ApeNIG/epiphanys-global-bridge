import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Advisory",
    href: "/advisory",
    children: [
      { label: "Report", href: "/advisory/report" },
      { label: "Advisory Board", href: "/advisory/board" },
    ],
  },
  {
    label: "Our Fund",
    href: "/fund",
    children: [
      { label: "Deal Flow Platform", href: "/deal-flow-platform" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/faq" },
];

const DropdownMenu = ({ items }: { items: { label: string; href: string }[] }) => (
  <div className="absolute top-full left-0 pt-2 z-50">
    <div className="w-52 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className="block px-5 py-3 text-sm text-[#4a6e68] hover:bg-[#F5F0E8] hover:text-[#15171A] transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const HeaderV3 = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-1.5">
          <img src={logo} alt="Epiphiny Flow" className="w-9 h-9 object-contain" />
          <span className="text-xl tracking-wide text-[#15171A]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
            Epiphiny Flow
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-[#4a6e68] hover:text-[#00E7C3] transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === item.label && (
                  <DropdownMenu items={item.children} />
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-[#4a6e68] hover:text-[#00E7C3] transition-colors no-underline"
              >
                {item.label}
              </Link>
            )
          )}
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
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between text-base font-medium text-[#4a6e68] py-2"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === item.label && (
                  <div className="pl-4 flex flex-col gap-1 mb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="text-sm text-[#4a6e68] py-1.5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-base font-medium text-[#4a6e68] py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-2">
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
