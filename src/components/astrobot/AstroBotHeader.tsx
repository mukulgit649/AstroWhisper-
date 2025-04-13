
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AstroBotHeaderProps {
  isLoaded: boolean;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const AstroBotHeader = ({ isLoaded, fadeInAnimation, fadeInLoaded }: AstroBotHeaderProps) => {
  return (
    <div className={`text-center mb-8 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-astro-purple/30 flex items-center justify-center mr-3">
          <Sparkles className="h-6 w-6 text-astro-glow animate-pulse" />
        </div>
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text">
          Ask AstroBot
        </h1>
      </div>
      <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
        Consult with our mystical AI companion for cosmic guidance and astrological wisdom. 
        Ask about your zodiac sign, love life, career path, or any question seeking cosmic insight.
      </p>
    </div>
  );
};

export default AstroBotHeader;
