
import { useState } from 'react';
import { Calendar, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';

interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  traits: string[];
  description: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire Sign',
    traits: ['Courageous', 'Energetic', 'Confident', 'Impulsive'],
    description: 'Aries is the first sign of the zodiac. Those born under this sign are passionate, motivated, and confident leaders who b...'
  },
  // ... Add other zodiac signs
];

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(zodiacSigns[0]);

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Column - Sign Selection */}
        <div>
          <h2 className="text-3xl font-bold mb-8 font-unbounded">Choose Your Sign</h2>
          <div className="grid grid-cols-3 gap-4">
            {zodiacSigns.map((sign) => (
              <Button
                key={sign.name}
                onClick={() => setSelectedSign(sign)}
                className={`aspect-square p-6 flex flex-col items-center justify-center ${
                  selectedSign.name === sign.name 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-navy-800/50 hover:bg-purple-600/20'
                }`}
              >
                <span className="text-2xl mb-2">{sign.symbol}</span>
                <span className="text-sm">{sign.name}</span>
              </Button>
            ))}
          </div>

          <Card className="mt-8 bg-navy-800/30 border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedSign.symbol}</span>
              <div>
                <h3 className="text-xl font-bold">{selectedSign.name}</h3>
                <p className="text-sm text-gray-400">{selectedSign.dates}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">Fire Sign • Mars</p>
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 uppercase mb-2">TRAITS</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSign.traits.map(trait => (
                  <span key={trait} className="text-sm bg-purple-600/20 px-3 py-1 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-300">{selectedSign.description}</p>
          </Card>
        </div>

        {/* Right Column - Horoscope Reading */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">{selectedSign.symbol}</span>
            <div>
              <h2 className="text-3xl font-bold font-unbounded">{selectedSign.name} Horoscope</h2>
              <p className="text-gray-400">April 15, 2025</p>
            </div>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Today is a powerful day for taking action on your goals, Aries. Your ruling planet Mars is fueling your 
            natural fire, giving you an extra boost of energy and determination. Use this cosmic gift wisely by 
            focusing on your most important priorities. Unexpected opportunities may arise in your career sector, so 
            stay alert and ready to seize the moment. Your confidence is magnetic now – others will be drawn to 
            your leadership and passion. In relationships, express your desires clearly but remember to listen as well. 
            Balance your assertiveness with patience for best results.
          </p>

          <Card className="bg-navy-800/30 border-purple-500/20 p-6 mb-8">
            <h3 className="text-xl font-bold mb-6">Lucky Elements Today</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">NUMBER</p>
                <p className="text-xl text-purple-400">9</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">DAY</p>
                <p className="text-xl text-purple-400">Saturday</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">COLOR</p>
                <p className="text-xl text-red-400">Red</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">ELEMENT</p>
                <p className="text-xl text-purple-400">Fire</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Forecast
            </Button>
            <Button variant="outline" className="flex-1 border-purple-500/20 hover:bg-purple-600/20">
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
