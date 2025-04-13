
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Home, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="cosmic-bg min-h-screen flex flex-col items-center justify-center p-4">
      <Stars count={100} />
      <CosmicBackground />
      
      <div className="relative z-10 text-center max-w-md">
        <div className="relative mb-6">
          <div className="flex justify-center items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-8 w-8 text-astro-glow animate-twinkle`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <h1 className="font-cinzel text-7xl font-bold mb-2 glow-text">404</h1>
        </div>
        
        <h2 className="font-unbounded text-2xl mb-4">Cosmic Void Encountered</h2>
        
        <p className="text-foreground/70 mb-8">
          The celestial page you seek has drifted beyond our cosmic map. Perhaps it's in another dimension or star system.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="glow-btn" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home Galaxy
            </Link>
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-foreground/50">
          Lost path: {location.pathname}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
