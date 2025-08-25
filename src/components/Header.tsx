import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link to="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-purple-600 to-accent rounded-xl flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                <span className="relative text-white font-bold text-lg tracking-tight">
                  <span className="text-white drop-shadow-sm">E</span>
                  <span className="text-orange-200 drop-shadow-sm">F</span>
                </span>
                {/* Dropdown indicator lines */}
                <div className="absolute bottom-1 right-1 flex flex-col space-y-0.5">
                  <div className="w-2 h-0.5 bg-white/60 rounded"></div>
                  <div className="w-2 h-0.5 bg-white/60 rounded"></div>
                  <div className="w-2 h-0.5 bg-white/60 rounded"></div>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Epiphiny Flow
              </span>
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/" className="w-full">
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/opportunities" className="w-full">
                Opportunities
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#community" className="w-full">
                Community
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#about" className="w-full">
                About
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#contact" className="w-full">
                Contact
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/auth" className="w-full">
                Join Platform
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/opportunities" className="text-foreground hover:text-primary transition-colors">
            Opportunities
          </Link>
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