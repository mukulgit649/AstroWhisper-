
import React from 'react';
import { Sparkles, Star, Moon } from 'lucide-react';

interface AstroBotHeaderProps {
  isLoaded: boolean;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const AstroBotHeader = ({ isLoaded, fadeInAnimation, fadeInLoaded }: AstroBotHeaderProps) => {
  return (
    <div className={`text-center mb-12 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
      <div className="relative inline-block">
        <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-astro-violet/20 animate-pulse-glow"></div>
        <div className="absolute -bottom-4 -right-6 w-12 h-12 rounded-full bg-astro-lilac/20 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-astro-purple/40 to-astro-violet/20 flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(159,68,211,0.5)] animate-float-slow">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-astro-glow animate-pulse absolute -top-1 -right-1" />
              <Moon className="h-8 w-8 text-astro-glow animate-pulse" />
              <Star className="h-4 w-4 text-white/80 animate-twinkle absolute -bottom-1 -left-1" />
            </div>
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
            Ask AstroBot
          </h1>
        </div>
      </div>
      <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-cormorant leading-relaxed">
        Consult with our mystical AI companion for cosmic guidance and astrological wisdom. 
        Ask about your zodiac sign, love life, career path, or any question seeking cosmic insight.
      </p>
    </div>
  );
};

export default AstroBotHeader;
