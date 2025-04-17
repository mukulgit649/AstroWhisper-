
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Moon, Youtube, Linkedin, Github, Heart, CreditCard, Users, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-astro-navy/50 border-t border-white/5 py-16 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Moon className="h-6 w-6 text-astro-glow" />
              <span className="font-cinzel text-xl font-bold tracking-wider glow-text">
                AstroWhisper
              </span>
            </Link>
            <p className="text-sm text-foreground/70 mb-6 max-w-sm leading-relaxed">
              Discover cosmic insights and mystical guidance through our AI-powered astrological tools and spiritual resources. Let the stars guide your journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Github size={18} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-astro-glow transition-colors duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-4 text-foreground/90 uppercase tracking-wider">Features</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/horoscope" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Daily Horoscope</Link></li>
              <li><Link to="/tarot" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Tarot Reading</Link></li>
              <li><Link to="/astrobot" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Ask AstroBot</Link></li>
              <li><Link to="/birthchart" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Birth Chart</Link></li>
              <li><Link to="/compatibility" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Compatibility</Link></li>
              <li><Link to="/transit" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Transit Predictions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-4 text-foreground/90 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/learn" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Learn Astrology</Link></li>
              <li><Link to="/blog" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Cosmic Blog</Link></li>
              <li><Link to="/glossary" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Astrology Glossary</Link></li>
              <li><Link to="/faq" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">FAQ</Link></li>
              <li><Link to="/guides" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">User Guides</Link></li>
              <li><Link to="/support" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Support Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded text-sm mb-4 text-foreground/90 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
              <li><Link to="/careers" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link to="/privacy" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="text-foreground/70 hover:text-astro-glow transition-all duration-300 hover:translate-x-1 inline-block">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-astro-glow/70" />
              <span className="text-xs text-foreground/60">+1 (888) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail size={14} className="mr-2 text-astro-glow/70" />
              <span className="text-xs text-foreground/60">contact@astrowhisper.com</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-2 text-astro-glow/70" />
              <span className="text-xs text-foreground/60">123 Cosmic Way, Starfield, CA 90210</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors duration-300">
              <CreditCard size={14} className="inline mr-1" /> Payment
            </a>
            <span className="text-foreground/60">•</span>
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors duration-300">
              <Users size={14} className="inline mr-1" /> Affiliates
            </a>
            <span className="text-foreground/60">•</span>
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors duration-300">
              <Heart size={14} className="inline mr-1" /> Donate
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} AstroWhisper. All rights reserved. Powered by cosmic energy and advanced AI 🌌
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
