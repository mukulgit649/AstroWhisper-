
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
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Column - Sign Selection */}
        <div>
          <ZodiacGrid selectedSign={selectedSign} onSelectSign={setSelectedSign} />
          <SignDetails signName={selectedSign} />
        </div>

        {/* Right Column - Horoscope Reading */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">♈</span>
            <div>
              <h2 className="text-3xl font-bold text-white font-unbounded">{selectedSign} Horoscope</h2>
              <p className="text-gray-400">{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Today is a powerful day for taking action on your goals, {selectedSign}. Your ruling planet Mars is fueling your 
            natural fire, giving you an extra boost of energy and determination. Use this cosmic gift wisely by focusing on your 
            most important priorities.
          </p>

          <Card className="bg-navy-800/30 border-purple-500/20 p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-white">Lucky Elements Today</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">NUMBER</p>
                <p className="text-xl text-purple-400">{luckyElements?.number}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">DAY</p>
                <p className="text-xl text-purple-400">{luckyElements?.day}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">COLOR</p>
                <div 
                  className="w-6 h-6 rounded-full mx-auto"
                  style={{ backgroundColor: luckyElements?.color }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">ELEMENT</p>
                <p className="text-xl text-purple-400">{luckyElements?.element}</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Forecast
            </Button>
            <Button variant="outline" className="flex-1 border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300">
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
