
import React from 'react';

interface AstroBotHeaderProps {
  isLoaded: boolean;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const AstroBotHeader = ({ isLoaded, fadeInAnimation, fadeInLoaded }: AstroBotHeaderProps) => {
  return (
    <div className={`text-center mb-8 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
      <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
        Ask AstroBot
      </h1>
      <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
        Consult with our mystical AI companion for cosmic guidance and astrological wisdom.
      </p>
    </div>
  );
};

export default AstroBotHeader;
