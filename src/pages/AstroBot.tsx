
import { AstroBotProvider } from '@/contexts/AstroBotContext';
import AstroBotContainer from '@/components/astrobot/AstroBotContainer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

const AstroBot = () => {
  return (
    <div className="cosmic-bg min-h-screen flex flex-col relative overflow-hidden">
      <Stars count={200} />
      <CosmicBackground />
      
      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[5%] w-64 h-64 rounded-full bg-astro-purple/5 blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-astro-violet/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-astro-lilac/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <AstroBotProvider>
        <AstroBotContainer />
      </AstroBotProvider>
    </div>
  );
};

export default AstroBot;
