
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav w-full py-4 md:py-3 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <Moon className="h-8 w-8 text-astro-glow animate-pulse-glow transition-colors duration-300 group-hover:text-astro-violet" />
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-wider glow-text">
              AstroWhisper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-astro-glow transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-astro-glow after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-astro-purple/50 hover:bg-astro-purple/10 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Button>
            <Button className="glow-btn transition-transform duration-300 hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-astro-navy/50 transition-colors duration-300 hover:bg-astro-purple/20"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Menu className="h-6 w-6 text-foreground transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-astro-navy/90 backdrop-blur-xl absolute top-full left-0 w-full py-4 border-b border-white/10 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="py-3 px-4 hover:bg-white/5 rounded-lg transition-all duration-300 hover:translate-x-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
            <Button 
              variant="outline" 
              className="border-astro-purple/50 hover:bg-astro-purple/10 w-full transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </Button>
            <Button className="glow-btn w-full transition-all duration-300 hover:scale-[1.02]">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
