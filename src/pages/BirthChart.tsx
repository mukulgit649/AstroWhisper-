
import { useState } from 'react';
import { zodiacSigns, getZodiacSign } from '@/utils/zodiacData';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [chart, setChart] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(birthDate);
    const sign = getZodiacSign(date.getMonth() + 1, date.getDate());
    const zodiacData = zodiacSigns.find(z => z.name.toLowerCase() === sign.toLowerCase());
    
    setChart(`Your sun sign is ${sign}. ${zodiacData?.element} is your element, and your ruling planet is ${zodiacData?.ruling_planet}.`);
  };

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Stars count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-center">Birth Chart Calculator</h1>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Birth Date</label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Birth Time (optional)</label>
                  <Input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Birth Place (optional)</label>
                  <Input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Calculate Chart
                </Button>
              </form>
              
              {chart && (
                <div className="mt-6 p-4 rounded-lg bg-white/5">
                  <p className="text-lg">{chart}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BirthChart;
