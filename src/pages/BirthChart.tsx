
import { useState } from 'react';
import { MapPin, Clock, CalendarDays, Sparkles, Star, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { useToast } from "@/components/ui/use-toast";

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please enter your birth date to calculate your chart",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Save birth data to localStorage for AstroBot to access
    localStorage.setItem('userBirthDate', birthDate);
    if (birthTime) localStorage.setItem('userBirthTime', birthTime);
    if (birthPlace) localStorage.setItem('userBirthPlace', birthPlace);

    // Simulate calculation time for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Chart calculated!",
        description: "Your cosmic blueprint has been revealed.",
        duration: 3000,
      });

      // In a real app, we'd navigate to a results page
      // For now we'll just reset the form
      setBirthDate('');
      setBirthTime('');
      setBirthPlace('');
    }, 1500);
  };

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-16 flex-grow">
        {/* Left Column - Description */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="relative mb-12">
            <div className="absolute -top-12 -left-4 w-24 h-24 rounded-full bg-purple-600/10 animate-pulse-glow"></div>
            <div className="absolute top-4 -right-8 w-16 h-16 rounded-full bg-indigo-600/10 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            
            <div className="flex justify-center md:justify-start mb-10 relative z-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/20 flex items-center justify-center shadow-[0_0_25px_rgba(159,68,211,0.5)] animate-pulse-glow">
                  <Star className="w-12 h-12 text-astro-glow absolute" />
                  <Moon className="w-8 h-8 text-purple-300 animate-twinkle-slow absolute -right-2 -top-1" />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 font-cinzel text-white leading-tight bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
            Discover Your Cosmic Blueprint
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed font-cormorant mb-8">
            Enter your birth details to calculate your personalized natal chart and uncover the planetary 
            influences that shape your life journey.
          </p>
          
          <Card className="bg-navy-800/20 border-purple-500/20 p-8 mt-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)]">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-white font-cinzel">
              <Sparkles className="w-5 h-5 mr-3 text-astro-violet animate-twinkle" />
              The Celestial Map of You
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed font-cormorant">
              Your birth chart is a cosmic snapshot of the sky at the moment you were born. It reveals your 
              sun sign (core identity), moon sign (emotional nature), ascendant (outward persona), and 
              planetary influences that shape your unique cosmic blueprint.
            </p>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="bg-navy-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(159,68,211,0.3)]">
            <h2 className="text-3xl font-bold mb-10 font-cinzel text-white text-center">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <CalendarDays className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Date
                </label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="dd-mm-yyyy"
                  required
                  style={{ color: 'white' }}
                />
              </div>

              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <Clock className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Time (optional)
                </label>
                <Input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  style={{ color: 'white' }}
                />
                <p className="text-sm text-gray-400 font-cormorant">For more accurate ascendant calculation</p>
              </div>

              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <MapPin className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Place (optional)
                </label>
                <Input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="City, Country"
                  style={{ color: 'white' }}
                />
                <p className="text-sm text-gray-400 font-cormorant">For house system calculations</p>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(159,68,211,0.8)] group font-cinzel"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-2">
                      <div className="loading-dot" style={{ animationDelay: '0s' }}></div>
                      <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
                      <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-twinkle-fast" />
                    Calculate Your Chart
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default BirthChart;
