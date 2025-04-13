
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Moon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-astro-navy/50 border-t border-white/5 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Moon className="h-6 w-6 text-astro-glow" />
              <span className="font-cinzel text-xl font-bold tracking-wider glow-text">
                AstroWhisper
              </span>
            </Link>
            <p className="text-sm text-foreground/70 mb-6 max-w-sm">
              Discover cosmic insights and mystical guidance through our AI-powered astrological tools and spiritual resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-astro-glow">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-3 text-foreground/90">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/horoscope" className="text-foreground/70 hover:text-astro-glow">Daily Horoscope</Link></li>
              <li><Link to="/tarot" className="text-foreground/70 hover:text-astro-glow">Tarot Reading</Link></li>
              <li><Link to="/astrobot" className="text-foreground/70 hover:text-astro-glow">Ask AstroBot</Link></li>
              <li><Link to="/birthchart" className="text-foreground/70 hover:text-astro-glow">Birth Chart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-3 text-foreground/90">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="text-foreground/70 hover:text-astro-glow">Learn Astrology</Link></li>
              <li><Link to="/blog" className="text-foreground/70 hover:text-astro-glow">Cosmic Blog</Link></li>
              <li><Link to="/glossary" className="text-foreground/70 hover:text-astro-glow">Astrology Glossary</Link></li>
              <li><Link to="/faq" className="text-foreground/70 hover:text-astro-glow">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-3 text-foreground/90">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-foreground/70 hover:text-astro-glow">About Us</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-astro-glow">Contact</Link></li>
              <li><Link to="/privacy" className="text-foreground/70 hover:text-astro-glow">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-foreground/70 hover:text-astro-glow">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} AstroWhisper. All rights reserved.
          </p>
          <p className="text-xs text-foreground/50 mt-2 md:mt-0">
            Powered by cosmic energy and advanced AI 🌌
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
