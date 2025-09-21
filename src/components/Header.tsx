import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Add safety check to prevent runtime errors during module loading
  let user = null;
  let signOut = () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch (error) {
    // Fallback during initial load - useAuth hook may not be available yet
    console.warn('useAuth not available yet');
  }

  // Fetch profile image when user changes
  useEffect(() => {
    if (user) {
      fetchProfileImage();
    } else {
      setProfileImage(null);
    }
  }, [user]);

  const fetchProfileImage = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_image_url')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data?.profile_image_url) {
      setProfileImage(data.profile_image_url);
    }
  };
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
              <Link to="/advisory" className="w-full">
                Advisory
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/investment-hub" className="w-full">
                Investment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/professionals" className="w-full">
                Professionals
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/community" className="w-full">
                Community
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/global" className="w-full">
                Global
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/about" className="w-full">
                About
              </Link>
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
          <Link to="/advisory" className="text-foreground hover:text-primary transition-colors">
            Advisory
          </Link>
          <Link to="/investment-hub" className="text-foreground hover:text-primary transition-colors">
            Investment
          </Link>
          <Link to="/professionals" className="text-foreground hover:text-primary transition-colors">
            Professionals
          </Link>
          <Link to="/community" className="text-foreground hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/global" className="text-foreground hover:text-primary transition-colors">
            Global
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Authentication */}
        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="flex items-center cursor-pointer text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;