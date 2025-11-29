import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowUpRight
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Logo Section - Centered */}
        <div className="pt-4 pb-12 flex flex-col items-center text-center">
          <img src={logo} alt="Epiphiny Flow Logo" className="h-16 w-auto mb-4" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Epiphiny Flow
          </span>
          <p className="text-muted-foreground mb-4 max-w-md">
            Connecting diaspora communities with global opportunities in business, careers, and investment.
          </p>
          <div className="flex items-center gap-4 mb-2">
            <Button variant="ghost" size="icon">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-6 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 justify-items-center">
          {[
            [
              { name: "Business Opportunities", href: "/opportunities" },
              { name: "Career Development", href: "/opportunities" }
            ],
            [
              { name: "Investment Hub", href: "/investment-hub" },
              { name: "Global Collaboration", href: "/community" }
            ],
            [
              { name: "Community Forum", href: "/community" },
              { name: "Help Center", href: "#" }
            ],
            [
              { name: "Community Guidelines", href: "#" },
              { name: "Privacy Policy", href: "#" }
            ],
            [
              { name: "Terms of Service", href: "#" },
              { name: "Contact Us", href: "#" }
            ]
          ].map((column, colIndex) => (
            <div key={colIndex} className="text-center">
              <div className="space-y-3">
                {column.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.href} 
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm group"
                  >
                    <span className="flex items-center justify-center gap-1">
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="mb-8" />
        
        {/* Bottom Footer */}
        <div className="pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Manchester, UK</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Robert@epiphinyflow.com</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;