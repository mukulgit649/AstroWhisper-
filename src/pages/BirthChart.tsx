
import { useState } from 'react';
import { MapPin, Clock, CalendarDays, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 max-w-lg">
          <h2 className="text-4xl font-bold mb-14 font-unbounded text-white">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="text-purple-300 flex items-center gap-2 text-lg">
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
              />
            </div>

            <div className="space-y-3">
              <label className="text-purple-300 flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                Birth Time (optional)
              </label>
              <Input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
              <p className="text-sm text-gray-400">For more accurate ascendant calculation</p>
            </div>

            <div className="space-y-3">
              <label className="text-purple-300 flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                Birth Place (optional)
              </label>
              <Input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="City, Country"
              />
              <p className="text-sm text-gray-400">For house system calculations</p>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-8 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(159,68,211,0.8)] group"
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
                  Calculate Chart
                </>
              )}
            </Button>

            <Card className="bg-navy-800/30 border-purple-500/20 p-8 mt-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)]">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
                About Birth Charts
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your birth chart is a cosmic snapshot of the sky at the moment you were born. It reveals your 
                sun sign (core identity), moon sign (emotional nature), ascendant (outward persona), and 
                planetary influences that shape your unique cosmic blueprint.
              </p>
            </Card>
          </form>
        </div>

        {/* Right Column - Description */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center shadow-[0_0_15px_rgba(159,68,211,0.4)] animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-unbounded text-white">
            Discover Your Cosmic Blueprint
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Enter your birth details to calculate your personalized natal chart and uncover the planetary 
            influences that shape your life journey.
          </p>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default BirthChart;
