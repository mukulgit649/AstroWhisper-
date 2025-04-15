
import { useState, useEffect } from 'react';
import { Moon, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDailyReset } from '@/hooks/useDailyReset';
import BackToHome from '@/components/BackToHome';
import { getWeeklyForecast } from '@/utils/weeklyForecast';
import { toast } from '@/hooks/use-toast';

interface HoroscopeData {
  daily: string;
  weekly: any[];
  zodiacSign: string;
}

const DEFAULT_SIGN = "Aries";

const Horoscope = () => {
  const [horoscope, setHoroscope] = useState<HoroscopeData>({
    daily: '',
    weekly: [],
    zodiacSign: DEFAULT_SIGN
  });
  const [isLoading, setIsLoading] = useState(true);
  const { shouldReset } = useDailyReset('horoscope');
  const [activeSign, setActiveSign] = useState(DEFAULT_SIGN);

  useEffect(() => {
    const fetchHoroscope = async (sign: string) => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate deterministic but unique daily horoscope based on sign and date
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
      const dailyText = generateDailyHoroscope(sign, dateStr);
      
      // Get weekly forecast from utility
      const weeklyData = getWeeklyForecast(sign) || [];
      
      const newHoroscope = {
        daily: dailyText,
        weekly: weeklyData,
        zodiacSign: sign
      };
      
      setHoroscope(newHoroscope);
      localStorage.setItem('horoscope', JSON.stringify(newHoroscope));
      localStorage.setItem('horoscope_sign', sign);
      setIsLoading(false);
      
      toast({
        title: `${sign} Horoscope Updated`,
        description: "Your celestial guidance has been refreshed for today.",
      });
    };

    // Check if we should reset or load stored data
    if (shouldReset()) {
      // Get saved zodiac sign preference or default to Aries
      const savedSign = localStorage.getItem('horoscope_sign') || activeSign;
      setActiveSign(savedSign);
      fetchHoroscope(savedSign);
    } else {
      // Load stored horoscope if available
      const storedHoroscope = localStorage.getItem('horoscope');
      const storedSign = localStorage.getItem('horoscope_sign');
      
      if (storedHoroscope && storedSign) {
        setHoroscope(JSON.parse(storedHoroscope));
        setActiveSign(storedSign);
        setIsLoading(false);
      } else {
        // Fetch initial horoscope if nothing is stored
        fetchHoroscope(activeSign);
      }
    }
  }, [shouldReset]);

  const handleSignChange = (sign: string) => {
    setActiveSign(sign);
    const fetchHoroscope = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
      const dailyText = generateDailyHoroscope(sign, dateStr);
      const weeklyData = getWeeklyForecast(sign) || [];
      
      const newHoroscope = {
        daily: dailyText,
        weekly: weeklyData,
        zodiacSign: sign
      };
      
      setHoroscope(newHoroscope);
      localStorage.setItem('horoscope', JSON.stringify(newHoroscope));
      localStorage.setItem('horoscope_sign', sign);
      setIsLoading(false);
    };
    
    fetchHoroscope();
  };

  const generateDailyHoroscope = (sign: string, dateStr: string): string => {
    // Array of cosmic influences
    const influences = [
      "Venus brings harmony to your relationships",
      "Mars energizes your ambitions",
      "Mercury enhances your communication",
      "The Moon deepens your intuition",
      "Jupiter expands your opportunities",
      "Saturn teaches important lessons",
      "Uranus brings unexpected changes",
      "Neptune inspires your creativity",
      "Pluto transforms aspects of your life"
    ];

    // Array of cosmic advice
    const advice = [
      "Take time for self-reflection today",
      "Express your authentic self boldly",
      "Listen carefully to those around you",
      "Trust your intuition on important matters",
      "Embrace change rather than resisting it",
      "Balance work with necessary rest",
      "Connect with nature to restore balance",
      "Practice gratitude for what you have",
      "Release what no longer serves you"
    ];

    // Simple hash function to get consistent but varied horoscopes
    const hash = (sign + dateStr).split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    
    const influence1 = influences[hash % influences.length];
    const influence2 = influences[(hash + 3) % influences.length];
    const todayAdvice = advice[(hash + 6) % advice.length];
    
    return `Today, ${influence1}. You may also notice that ${influence2.toLowerCase()}. ${todayAdvice}. The cosmic alignment favors your ${sign} energy in unique ways.`;
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <main className="container mx-auto px-6 py-10 md:py-16 relative z-10">
        <section className="text-center">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Cosmic Horoscope
          </h1>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            Explore the cosmic influences shaping your day and week ahead. The stars reveal their wisdom to guide your path.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
              <Button 
                key={sign}
                variant={activeSign === sign ? "default" : "outline"}
                className={`transition-all ${activeSign === sign ? 'glow-btn' : 'hover:bg-primary/20'}`}
                onClick={() => handleSignChange(sign)}
              >
                {sign}
              </Button>
            ))}
          </div>

          <Tabs defaultValue="daily" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="daily">Daily Guidance</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <Card className="glass-card mb-8">
                <CardContent className="p-6 md:p-8">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2 py-8">
                      <p className="text-lg">Consulting the stars</p>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        {activeSign} Daily Horoscope
                        <Sparkles className="h-5 w-5" />
                      </h2>
                      <p className="text-foreground/90 text-lg leading-relaxed">{horoscope.daily}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Button 
                className="glow-btn flex items-center gap-2"
                onClick={() => handleSignChange(activeSign)}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Reading
              </Button>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="space-y-4">
                {isLoading ? (
                  <Card className="glass-card">
                    <CardContent className="p-6 flex items-center justify-center">
                      <div className="flex items-center justify-center space-x-2 py-8">
                        <p className="text-lg">Reading the cosmic patterns</p>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  horoscope.weekly.map((item: any, index) => (
                    <Card key={index} className="glass-card">
                      <CardContent className="p-4 md:p-6">
                        <h3 className="text-lg font-medium mb-2">{item.area}</h3>
                        <p>{item.prediction}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
      <BackToHome />

      <style jsx>{`
        .loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: currentColor;
          margin: 0 2px;
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .loading-dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        .loading-dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Horoscope;
