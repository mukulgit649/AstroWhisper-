
import { useState } from 'react';
import { MapPin, Clock, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 max-w-lg">
          <h2 className="text-4xl font-bold mb-8 font-unbounded">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-purple-300 flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Birth Date
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-navy-800/50 border-purple-500/20 text-white"
                placeholder="dd-mm-yyyy"
              />
            </div>

            <div className="space-y-2">
              <label className="text-purple-300 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Birth Time (optional)
              </label>
              <Input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-navy-800/50 border-purple-500/20 text-white"
              />
              <p className="text-sm text-gray-400">For more accurate ascendant calculation</p>
            </div>

            <div className="space-y-2">
              <label className="text-purple-300 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Birth Place (optional)
              </label>
              <Input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full bg-navy-800/50 border-purple-500/20 text-white"
                placeholder="City, Country"
              />
              <p className="text-sm text-gray-400">For house system calculations</p>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-medium rounded-xl transition-all duration-300">
              Calculate Chart
            </Button>

            <Card className="bg-navy-800/30 border-purple-500/20 p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">About Birth Charts</h3>
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
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
              <div className="text-3xl">✧</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-unbounded">
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
