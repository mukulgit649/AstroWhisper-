
import { Moon, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface CosmicInsightsProps {
  className?: string;
  isLoaded: boolean;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const CosmicInsightsSidebar = ({ 
  className, 
  isLoaded, 
  fadeInAnimation, 
  fadeInLoaded 
}: CosmicInsightsProps) => {
  // Calculate current moon phase based on the current date
  const getMoonPhase = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Simplified calculation based on the lunar cycle
    const lp = 29.53; // Length of lunar phase in days
    const reference = new Date(2000, 0, 6, 18, 14, 0); // Known new moon
    const refTime = reference.getTime();
    const nowTime = now.getTime();
    const diff = (nowTime - refTime) / 1000 / 60 / 60 / 24;
    const phase = diff % lp;

    if (phase < 1) return { name: 'New Moon', illumination: '0%' };
    if (phase < 7.4) return { name: 'Waxing Crescent', illumination: Math.round((phase / 7.4) * 50) + '%' };
    if (phase < 8.4) return { name: 'First Quarter', illumination: '50%' };
    if (phase < 14.8) return { name: 'Waxing Gibbous', illumination: Math.round(50 + ((phase - 8.4) / 6.4) * 50) + '%' };
    if (phase < 15.8) return { name: 'Full Moon', illumination: '100%' };
    if (phase < 22.1) return { name: 'Waning Gibbous', illumination: Math.round(100 - ((phase - 15.8) / 6.3) * 50) + '%' };
    if (phase < 23.1) return { name: 'Last Quarter', illumination: '50%' };
    return { name: 'Waning Crescent', illumination: Math.round(50 - ((phase - 23.1) / 6.4) * 50) + '%' };
  };

  // Get current planetary transit
  const getPlanetaryTransit = () => {
    const month = new Date().getMonth();
    const transits = [
      { planet: 'Venus in Aries', meaning: 'Passionate new beginnings' },
      { planet: 'Mars in Taurus', meaning: 'Determined action' },
      { planet: 'Mercury in Gemini', meaning: 'Enhanced communication' },
      { planet: 'Venus in Cancer', meaning: 'Emotional nurturing' },
      { planet: 'Sun in Leo', meaning: 'Creative self-expression' },
      { planet: 'Mercury in Virgo', meaning: 'Analytical thinking' },
      { planet: 'Venus in Libra', meaning: 'Harmonious relationships' },
      { planet: 'Mars in Scorpio', meaning: 'Transformative energy' },
      { planet: 'Jupiter in Sagittarius', meaning: 'Expansion of horizons' },
      { planet: 'Saturn in Capricorn', meaning: 'Structured achievement' },
      { planet: 'Uranus in Aquarius', meaning: 'Revolutionary ideas' },
      { planet: 'Neptune in Pisces', meaning: 'Spiritual intuition' }
    ];
    return transits[month];
  };

  // Get today's energies
  const getTodaysEnergies = () => {
    const now = new Date();
    const day = now.getDate();
    
    // Simple calculation to vary energies based on day of month
    const manifestation = 40 + (day % 60);
    const intuition = 55 + (day % 30);
    const transformation = 30 + (day % 50);
    
    return { manifestation, intuition, transformation };
  };

  const moonPhase = getMoonPhase();
  const planetaryTransit = getPlanetaryTransit();
  const energies = getTodaysEnergies();

  return (
    <div className={`space-y-6 ${isLoaded ? fadeInLoaded : fadeInAnimation} ${className}`} style={{ transitionDelay: '0.3s' }}>
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-4">
          <h3 className="font-unbounded text-sm font-medium mb-3">Cosmic Insights</h3>
          
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Moon className="h-4 w-4 text-astro-glow mr-2" />
                <span className="text-xs text-foreground/70">Current Moon Phase</span>
              </div>
              <div className="text-sm font-medium">{moonPhase.name}</div>
              <div className="text-xs text-foreground/50 mt-1">{moonPhase.illumination} Illumination</div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Sparkles className="h-4 w-4 text-astro-glow mr-2" />
                <span className="text-xs text-foreground/70">Planetary Transit</span>
              </div>
              <div className="text-sm font-medium">{planetaryTransit.planet}</div>
              <div className="text-xs text-foreground/50 mt-1">{planetaryTransit.meaning}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-4">
          <h3 className="font-unbounded text-sm font-medium mb-3">Today's Energy</h3>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm">Manifestation</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: `${energies.manifestation}%` }}></div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm">Intuition</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${energies.intuition}%` }}></div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-sm">Transformation</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${energies.transformation}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CosmicInsightsSidebar;
