import { useState, useEffect } from 'react';
import { zodiacSigns, getZodiacSign, getZodiacData } from '@/utils/zodiacData';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';
import { Search, Clock, MapPin, Moon, Sun, Sparkles } from 'lucide-react';
import {
  calculatePlanetaryPositions,
  calculateAspects,
  getPersonalizedReading
} from '@/utils/birthChartCalculations';

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [chart, setChart] = useState<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const calculateAscendant = (date: Date, time: string, latitude: number = 0) => {
    // This is a simplified calculation for demo purposes
    // In a real app, you would use more complex astronomical calculations
    
    const birthHour = time ? parseInt(time.split(':')[0]) : 12;
    const birthMinute = time ? parseInt(time.split(':')[1]) : 0;
    
    // Calculate sidereal time (simplified)
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hourDecimal = birthHour + (birthMinute / 60);
    
    // Use the date to create a consistent but seemingly random result for demo
    const ascendantValue = ((month * day + hourDecimal) % 12);
    
    // Map to zodiac signs
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(ascendantValue)];
  };
  
  const calculateMoonSign = (date: Date) => {
    // Simplified moon sign calculation for demo
    // In a real app, you would use ephemeris data and complex calculations
    
    // The moon changes signs approximately every 2.5 days
    // This creates a simplified mapping based on day of year
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const moonCycle = dayOfYear % 30; // Approximate 30-day lunar cycle
    
    // Map to zodiac signs (roughly 2.5 days per sign)
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(moonCycle / 2.5)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please enter your birth date to calculate your chart.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      try {
        const date = new Date(birthDate);
        const sunSign = getZodiacSign(date.getMonth() + 1, date.getDate());
        const sunSignData = getZodiacData(sunSign);
        const moonSign = calculateMoonSign(date);
        const moonSignData = getZodiacData(moonSign);
        const ascendant = birthTime ? calculateAscendant(date, birthTime) : null;
        const ascendantData = ascendant ? getZodiacData(ascendant) : null;
        
        // Calculate planetary positions
        const positions = calculatePlanetaryPositions(date);
        const aspects = calculateAspects(positions);
        
        // Get personalized reading
        const reading = getPersonalizedReading(
          sunSign,
          moonSign,
          ascendant,
          positions,
          aspects
        );
        
        setChart({
          sunSign,
          sunSignData,
          moonSign,
          moonSignData,
          ascendant,
          ascendantData,
          positions,
          aspects,
          reading,
          birthDate: date.toLocaleDateString(),
          birthTime: birthTime || 'Unknown',
          birthPlace: birthPlace || 'Unknown',
        });
        
        toast({
          title: "Birth Chart Calculated",
          description: "Your cosmic blueprint has been revealed."
        });
      } catch (error) {
        console.error('Error calculating birth chart:', error);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your birth chart. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Stars count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className={`text-center mb-12 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
            Birth Chart Calculator
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover your cosmic blueprint with our birth chart calculator. Enter your birth details to reveal planetary influences.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className={`md:col-span-1 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-center font-unbounded">Enter Your Details</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-2 flex items-center text-foreground/80">
                        <Search className="h-4 w-4 mr-2 text-astro-glow" />
                        Birth Date
                      </label>
                      <Input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 flex items-center text-foreground/80">
                        <Clock className="h-4 w-4 mr-2 text-astro-glow" />
                        Birth Time (optional)
                      </label>
                      <Input
                        type="time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <p className="text-xs text-foreground/60 mt-1">For more accurate ascendant calculation</p>
                    </div>
                    
                    <div>
                      <label className="block mb-2 flex items-center text-foreground/80">
                        <MapPin className="h-4 w-4 mr-2 text-astro-glow" />
                        Birth Place (optional)
                      </label>
                      <Input
                        type="text"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        placeholder="City, Country"
                        className="bg-white/5 border-white/10"
                      />
                      <p className="text-xs text-foreground/60 mt-1">For house system calculations</p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full glow-btn" 
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-astro-glow border-t-transparent"></div>
                          Calculating...
                        </>
                      ) : "Calculate Chart"}
                    </Button>
                  </form>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2 text-foreground/70">About Birth Charts</h3>
                    <p className="text-xs text-foreground/60">
                      Your birth chart is a cosmic snapshot of the sky at the moment you were born. It reveals your sun sign (core identity), moon sign (emotional nature), ascendant (outward persona), and planetary influences that shape your unique cosmic blueprint.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Birth Chart Results */}
            <div className={`md:col-span-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
              <Card className="glass-card h-full">
                <CardContent className="p-6">
                  {chart ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <h2 className="text-2xl font-bold font-unbounded">Your Birth Chart</h2>
                        <div className="text-sm text-foreground/70">
                          <div>Date: {chart.birthDate}</div>
                          <div>Time: {chart.birthTime}</div>
                          <div>Place: {chart.birthPlace}</div>
                        </div>
                      </div>
                      
                      {/* The Big Three */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-white/5 flex flex-col items-center text-center">
                          <Sun className="h-8 w-8 text-yellow-500 mb-2" />
                          <h3 className="font-unbounded text-lg mb-1">Sun Sign</h3>
                          <div className="text-2xl mb-1">{chart.sunSignData?.symbol}</div>
                          <div className="font-bold text-xl">{chart.sunSign}</div>
                          <div className="text-sm text-foreground/70 mt-1">Core Identity</div>
                          <div className="text-xs mt-2 bg-white/10 px-2 py-1 rounded-full">
                            {chart.sunSignData?.element} Element
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/5 flex flex-col items-center text-center">
                          <Moon className="h-8 w-8 text-blue-300 mb-2" />
                          <h3 className="font-unbounded text-lg mb-1">Moon Sign</h3>
                          <div className="text-2xl mb-1">{chart.moonSignData?.symbol}</div>
                          <div className="font-bold text-xl">{chart.moonSign}</div>
                          <div className="text-sm text-foreground/70 mt-1">Emotional Nature</div>
                          <div className="text-xs mt-2 bg-white/10 px-2 py-1 rounded-full">
                            {chart.moonSignData?.element} Element
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${chart.ascendant ? 'bg-white/5' : 'bg-white/2'} flex flex-col items-center text-center`}>
                          <Sparkles className="h-8 w-8 text-purple-400 mb-2" />
                          <h3 className="font-unbounded text-lg mb-1">Ascendant</h3>
                          {chart.ascendant ? (
                            <>
                              <div className="text-2xl mb-1">{chart.ascendantData?.symbol}</div>
                              <div className="font-bold text-xl">{chart.ascendant}</div>
                              <div className="text-sm text-foreground/70 mt-1">Outward Persona</div>
                              <div className="text-xs mt-2 bg-white/10 px-2 py-1 rounded-full">
                                {chart.ascendantData?.element} Element
                              </div>
                            </>
                          ) : (
                            <div className="text-sm text-foreground/70 italic mt-2">
                              Enter birth time for ascendant
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Planetary Positions */}
                      <div>
                        <h3 className="font-unbounded text-xl mb-3">Planetary Positions</h3>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {chart.positions.map((planet: any, index: number) => (
                              <div key={index} className="p-3 rounded-md bg-white/5 text-sm">
                                <div className="font-medium">{planet.planet}</div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-foreground/70">Sign:</span>
                                  <span>{planet.sign}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-foreground/70">House:</span>
                                  <span>{planet.house}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Aspects */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-unbounded text-xl mb-3">Key Aspects</h3>
                          <div className="bg-white/5 rounded-lg p-4 h-full">
                            <div className="space-y-3">
                              {chart.aspects.map((aspect: any, index: number) => (
                                <div key={index} className="p-2 rounded-md bg-white/5 text-sm">
                                  <div className="font-medium">{aspect.planets[0]} - {aspect.planets[1]}</div>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-foreground/70">Type:</span>
                                    <span>{aspect.type}</span>
                                  </div>
                                  <div className="text-xs text-foreground/80 mt-1">
                                    Angle: {aspect.angle.toFixed(2)}°, Orb: {aspect.orb.toFixed(2)}°
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-unbounded text-xl mb-3">Chart Interpretation</h3>
                          <div className="bg-white/5 rounded-lg p-4 h-full">
                            <p className="text-sm mb-3">
                              {chart.reading}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <div className="w-24 h-24 rounded-full bg-astro-navy/30 flex items-center justify-center mb-6">
                        <Sparkles className="h-10 w-10 text-astro-glow animate-pulse-slow" />
                      </div>
                      <h2 className="text-2xl font-bold text-center mb-4 font-unbounded">Discover Your Cosmic Blueprint</h2>
                      <p className="text-center text-foreground/70 max-w-md">
                        Enter your birth details to calculate your personalized natal chart and uncover the planetary influences that shape your life journey.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BirthChart;
