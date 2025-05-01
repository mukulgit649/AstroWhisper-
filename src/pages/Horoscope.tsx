
import { useState } from 'react';
import { Calendar, Moon, Sparkles, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import ZodiacGrid from '@/components/horoscope/ZodiacGrid';
import SignDetails from '@/components/horoscope/SignDetails';
import { getZodiacData, getDailyLuckyElements } from '@/utils/zodiacData';
import { getWeeklyForecast } from '@/utils/weeklyForecast';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const luckyElements = getDailyLuckyElements(selectedSign);
  const weeklyForecast = getWeeklyForecast(selectedSign);
  const today = new Date();

  return (
    <div className="cosmic-bg min-h-screen">
      <Stars count={100} />
      <CosmicBackground />
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-purple-600/10 animate-pulse-glow"></div>
            <div className="absolute top-4 -right-4 w-12 h-12 rounded-full bg-indigo-600/10 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-cinzel text-white leading-tight bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
              Daily Horoscope
            </h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed font-cormorant max-w-3xl mx-auto">
            Discover your daily cosmic guidance with our celestial horoscope readings. The stars have aligned to reveal your path today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-10 items-start">
          {/* Left Column - Sign Selection */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-astro-violet/5 animate-pulse-glow"></div>
            
            <Card className="bg-navy-800/30 border-purple-500/20 p-6 mb-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-2xl font-cinzel font-bold mb-4 text-white flex items-center">
                <Star className="h-5 w-5 mr-2 text-astro-violet animate-pulse-glow" />
                Select Your Zodiac Sign
              </h2>
              <ZodiacGrid selectedSign={selectedSign} onSelectSign={setSelectedSign} />
            </Card>
            
            <Card className="bg-navy-800/30 border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm animate-fade-in">
              <SignDetails signName={selectedSign} />
            </Card>
          </div>

          {/* Right Column - Horoscope Reading */}
          <div className="space-y-8">
            <Card className="bg-navy-800/30 border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/20 flex items-center justify-center shadow-[0_0_15px_rgba(159,68,211,0.5)] animate-pulse-glow">
                  <span className="text-4xl">{getZodiacData(selectedSign)?.symbol}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white font-cinzel">{selectedSign} Horoscope</h2>
                  <p className="text-gray-400 font-cormorant text-lg">{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              <p className="text-lg text-gray-200 leading-relaxed mb-10 font-cormorant">
                Today is a powerful day for taking action on your goals, {selectedSign}. Your ruling planet {getZodiacData(selectedSign)?.ruling_planet.split(',')[0]} is fueling your 
                natural fire, giving you an extra boost of energy and determination. Use this cosmic gift wisely by focusing on your 
                most important priorities. Unexpected opportunities may arise in your career sector, so stay alert and ready to seize the moment. 
                Your confidence is magnetic now – others will be drawn to your leadership and passion. In relationships, 
                express your desires clearly but remember to listen as well. Balance your assertiveness with patience for best results.
              </p>

              <Card className="bg-navy-800/50 border-purple-500/20 p-6 mb-10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                <h3 className="text-xl font-bold mb-8 text-white font-cinzel flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-pulse" />
                  Lucky Elements Today
                </h3>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3 font-cormorant">NUMBER</p>
                    <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.number}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3 font-cormorant">DAY</p>
                    <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.day}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3 font-cormorant">COLOR</p>
                    <div 
                      className="w-6 h-6 rounded-full mx-auto border border-purple-500/30 shadow-[0_0_10px_rgba(159,68,211,0.3)]"
                      style={{ backgroundColor: luckyElements?.color }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3 font-cormorant">ELEMENT</p>
                    <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.element}</p>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col md:flex-row gap-6">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 py-6 font-cinzel">
                  <Calendar className="w-4 h-4 mr-2" />
                  Weekly Forecast
                </Button>
                <Button variant="outline" className="flex-1 border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-6 font-cinzel">
                  <Moon className="w-4 h-4 mr-2" />
                  Moon Phase Report
                </Button>
              </div>
            </Card>
            
            {/* Weekly Forecast Preview */}
            <Card className="bg-navy-800/30 border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 text-white font-cinzel flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-astro-violet animate-pulse-glow" />
                This Week's Cosmic Insights
              </h3>
              <div className="space-y-6">
                {weeklyForecast?.map((forecast, idx) => (
                  <div key={idx} className="border-b border-purple-500/20 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-lg font-cinzel text-purple-300 mb-2">{forecast.area}</h4>
                    <p className="text-gray-300 font-cormorant text-lg">{forecast.prediction}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <BackToHome />
    </div>
  );
};

export default Horoscope;
