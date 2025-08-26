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

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Epiphiny Flow
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Connecting diaspora communities with global opportunities in business, careers, and investment.
            </p>
            
            <div className="flex items-center gap-4">
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
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <div className="space-y-3">
              {[
                { name: "Business Opportunities", href: "/opportunities" },
                { name: "Career Development", href: "/opportunities" },
                { name: "Investment Hub", href: "/investment-hub" },
                { name: "Global Collaboration", href: "/community" },
                { name: "Community Forum", href: "/community" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span className="flex items-center gap-1">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <div className="space-y-3">
              {[
                "Help Center",
                "Community Guidelines",
                "Privacy Policy",
                "Terms of Service",
                "Contact Us"
              ].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span className="flex items-center gap-1">
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Bottom Footer */}
        <div className="pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>London, United Kingdom</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hello@epiphinyflow.com</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Epiphiny Flow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;