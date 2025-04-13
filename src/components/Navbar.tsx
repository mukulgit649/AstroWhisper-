
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Daily Horoscope', path: '/horoscope' },
    { name: 'Tarot Reading', path: '/tarot' },
    { name: 'Ask AstroBot', path: '/astrobot' },
    { name: 'Birth Chart', path: '/birthchart' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-nav w-full py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-astro-glow animate-pulse-glow" />
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-wider glow-text">
              AstroWhisper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-astro-glow transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-astro-purple/50 hover:bg-astro-purple/10">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="glow-btn">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-astro-navy/50"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-astro-navy/90 backdrop-blur-xl absolute top-full left-0 w-full py-4 border-b border-white/10">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="py-2 px-4 hover:bg-white/5 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Button variant="outline" className="border-astro-purple/50 hover:bg-astro-purple/10 w-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button className="glow-btn w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
