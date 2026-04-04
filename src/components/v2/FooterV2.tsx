import { Linkedin, Twitter, Instagram, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  Platform: [
    { label: "Advisory", href: "/v2/advisory" },
    { label: "Investment Hub", href: "/v2/investment" },
    { label: "Community", href: "/v2/community" },
    { label: "Opportunities", href: "/v2/advisory" },
    { label: "Global", href: "/v2/global" },
  ],
  Company: [
    { label: "About", href: "/v2/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Partnerships", href: "#" },
    { label: "Events", href: "#" },
  ],
};

const FooterV2 = () => {
  return (
    <footer className="bg-[#15171A] pt-16 pb-8 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {/* Editorial headline */}
        <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-white/10 leading-[1.3] max-w-[600px] mb-14">
          Building bridges between heritage and opportunity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand — editorial, left-aligned */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-1.5">
              <img src={logo} alt="Epiphiny Flow" className="w-8 h-8 object-contain" />
              <span className="text-[20px] text-white tracking-wide" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                Epiphiny Flow
              </span>
            </div>
            <p className="text-[14px] text-gray-600 leading-[1.7] max-w-[280px]">
              Connecting diaspora communities with global opportunities in
              business, careers, and investment.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-[13px] text-gray-600">Manchester, UK</span>
              </div>
              <a
                href="mailto:Robert@epiphinyflow.com"
                className="flex items-center gap-2 hover:text-gray-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-[13px] text-gray-600">Robert@epiphinyflow.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/epiphiny-flow-95b948387/" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/epiphinyflow/" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-[#00E7C3]/30 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns — editorial spacing */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div
              key={title}
              className="md:col-span-2 flex flex-col gap-3 first:md:col-start-7"
            >
              <span className="text-[10px] font-semibold text-gray-500 tracking-[2px] uppercase mb-1">
                {title}
              </span>
              {links.map((link) =>
                link.href.startsWith("/") && link.href !== "#" ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[13px] text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar — minimal */}
        <div className="border-t border-white/[0.06] mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-gray-700">
            &copy; 2026 Epiphiny Flow. All rights reserved. FCA Regulated.
          </span>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[12px] text-gray-700 hover:text-gray-500 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
