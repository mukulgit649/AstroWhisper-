
import { useState } from 'react';
import { Calendar, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import ZodiacGrid from '@/components/horoscope/ZodiacGrid';
import SignDetails from '@/components/horoscope/SignDetails';
import { getDailyLuckyElements } from '@/utils/zodiacData';

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const luckyElements = getDailyLuckyElements(selectedSign);
  const today = new Date();

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Sign Selection */}
        <div>
          <ZodiacGrid selectedSign={selectedSign} onSelectSign={setSelectedSign} />
          <SignDetails signName={selectedSign} />
        </div>

        {/* Right Column - Horoscope Reading */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">{getZodiacData(selectedSign)?.symbol}</span>
            <div>
              <h2 className="text-3xl font-bold text-white font-unbounded">{selectedSign} Horoscope</h2>
              <p className="text-gray-400">{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed mb-10">
            Today is a powerful day for taking action on your goals, {selectedSign}. Your ruling planet {getZodiacData(selectedSign)?.ruling_planet.split(',')[0]} is fueling your 
            natural fire, giving you an extra boost of energy and determination. Use this cosmic gift wisely by focusing on your 
            most important priorities. Unexpected opportunities may arise in your career sector, so stay alert and ready to seize the moment. 
            Your confidence is magnetic now – others will be drawn to your leadership and passion. In relationships, 
            express your desires clearly but remember to listen as well. Balance your assertiveness with patience for best results.
          </p>

          <Card className="bg-navy-800/30 border-purple-500/20 p-6 mb-10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
            <h3 className="text-xl font-bold mb-8 text-white">Lucky Elements Today</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">NUMBER</p>
                <p className="text-xl text-purple-400">{luckyElements?.number}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">DAY</p>
                <p className="text-xl text-purple-400">{luckyElements?.day}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">COLOR</p>
                <div 
                  className="w-6 h-6 rounded-full mx-auto border border-purple-500/30"
                  style={{ backgroundColor: luckyElements?.color }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">ELEMENT</p>
                <p className="text-xl text-purple-400">{luckyElements?.element}</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-6">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 py-6">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Forecast
            </Button>
            <Button variant="outline" className="flex-1 border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-6">
              <Moon className="w-4 h-4 mr-2" />
              Moon Phase Report
            </Button>
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default Horoscope;
