import { useState, useEffect } from 'react';
import { Moon, Sun, Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';
import { zodiacSigns, getZodiacData } from '@/utils/zodiacData';
import { getMockHoroscopeReading } from '@/utils/mockAiResponses';
import { useDailyReset } from '@/hooks/useDailyReset';

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [horoscope, setHoroscope] = useState(() => {
    const saved = localStorage.getItem('daily_horoscope');
    return saved ? JSON.parse(saved) : '';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const zodiacData = getZodiacData(selectedSign);
  const { shouldReset } = useDailyReset('horoscope');

  useEffect(() => {
    setIsLoaded(true);
    if (shouldReset()) {
      setHoroscope('');
      localStorage.removeItem('daily_horoscope');
      toast({
        title: "Daily Horoscope Reset",
        description: "Your horoscope has been reset for a new day.",
      });
    }
  }, []);

  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      const reading = getMockHoroscopeReading(selectedSign);
      setHoroscope(reading);
      localStorage.setItem('daily_horoscope', JSON.stringify(reading));
      setIsLoading(false);
    };

    if (!horoscope || shouldReset()) {
      fetchHoroscope();
    }
  }, [selectedSign, shouldReset]);

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Stars count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10 container mx-auto px-4 py-12">
        <div className={`text-center mb-12 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
            Daily Horoscope
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore your daily cosmic guidance based on planetary alignments and celestial energies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Zodiac Sign Selector */}
          <div className={`md:col-span-1 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-6">
                <h2 className="font-unbounded text-xl font-medium mb-4">Choose Your Sign</h2>
                
                <div className="grid grid-cols-3 gap-3">
                  {zodiacSigns.map((sign) => (
                    <button
                      key={sign.name}
                      className={`rounded-lg p-3 transition-all duration-300 flex flex-col items-center justify-center ${
                        sign.name.toLowerCase() === selectedSign.toLowerCase()
                          ? 'bg-purple-glow shadow-[0_0_10px_rgba(159,68,211,0.6)]'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedSign(sign.name.toLowerCase())}
                    >
                      <span className="text-2xl mb-1">{sign.symbol}</span>
                      <span className="text-xs">{sign.name}</span>
                    </button>
                  ))}
                </div>
                
                {zodiacData && (
                  <div className="mt-6 p-4 rounded-lg bg-white/5">
                    <h3 className="font-unbounded text-lg mb-2 flex items-center">
                      <span className="text-2xl mr-2">{zodiacData.symbol}</span>
                      {zodiacData.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-2">{zodiacData.dates}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="text-xs px-2 py-1 rounded-full bg-white/10">
                        {zodiacData.element} Sign
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-white/10">
                        {zodiacData.ruling_planet}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Traits</h4>
                      <div className="flex flex-wrap gap-1">
                        {zodiacData.traits.map((trait) => (
                          <span key={trait} className="text-xs px-2 py-1 rounded-full bg-astro-purple/20">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-6 overflow-hidden">
              <CardContent className="p-6">
                <h2 className="font-unbounded text-xl font-medium mb-4">Celestial Overview</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-yellow-400 mr-3" />
                      <span>Sun in Leo</span>
                    </div>
                    <span className="text-xs text-foreground/50">Until Aug 22</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 text-gray-200 mr-3" />
                      <span>Moon in Pisces</span>
                    </div>
                    <span className="text-xs text-foreground/50">Next: Cancer</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-astro-violet mr-3" />
                      <span>Mercury Retrograde</span>
                    </div>
                    <span className="text-xs text-foreground/50">Apr 21 - May 14</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  View Complete Chart
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Horoscope Content */}
          <div className={`md:col-span-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
            <Card className="glass-card h-full">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-unbounded text-2xl font-medium flex items-center">
                    <span className="text-3xl mr-2">{zodiacData?.symbol}</span>
                    {zodiacData?.name} Horoscope
                  </h2>
                  <div className="px-3 py-1 rounded-full bg-astro-purple/20 text-sm">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 rounded-full border-4 border-astro-violet border-t-transparent animate-spin mb-4"></div>
                    <p className="text-foreground/70">Reading the stars...</p>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4 text-foreground/90 leading-relaxed">
                      {horoscope.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 rounded-lg bg-white/5">
                      <h3 className="font-unbounded text-lg mb-3">Lucky Elements Today</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <div className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Number</div>
                          <div className="font-semibold text-astro-glow">7</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <div className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Color</div>
                          <div className="font-semibold text-astro-glow">Purple</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <div className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Day</div>
                          <div className="font-semibold text-astro-glow">Thursday</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <div className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Element</div>
                          <div className="font-semibold text-astro-glow">Water</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Weekly Forecast
                      </Button>
                      <Button variant="outline" className="border-astro-purple/50 hover:bg-astro-purple/10">
                        <Moon className="mr-2 h-4 w-4" />
                        Moon Phase Report
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Horoscope;
