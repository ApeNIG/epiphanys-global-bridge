import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">EF</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Epiphiny Flow
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#opportunities" className="text-foreground hover:text-primary transition-colors">
            Opportunities
          </a>
          <a href="#community" className="text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero" size="sm">
              Join Platform
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;