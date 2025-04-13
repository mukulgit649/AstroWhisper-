
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Stars, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars as StarsBackground from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

const BirthChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [birthData, setBirthData] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    city: "",
    timezone: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [chartGenerated, setChartGenerated] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setBirthData({
      ...birthData,
      [field]: value
    });
  };

  const handleGenerateChart = () => {
    setIsGenerating(true);
    // Simulate chart generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setChartGenerated(true);
      setStep(3);
    }, 2500);
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <StarsBackground count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10 container mx-auto px-4 py-12">
        <div className={`text-center mb-12 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
            Birth Chart Analysis
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover your cosmic blueprint with our detailed birth chart analysis, revealing the planetary positions at the exact moment of your birth.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
          <Card className="glass-card overflow-hidden mb-6">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="flex-1 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-astro-purple' : 'bg-white/10'} transition-colors duration-300`}>
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className={`h-1 w-full ${step >= 2 ? 'bg-astro-purple' : 'bg-white/10'} transition-colors duration-300`}></div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-astro-purple' : 'bg-white/10'} transition-colors duration-300`}>
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className={`h-1 w-full ${step >= 3 ? 'bg-astro-purple' : 'bg-white/10'} transition-colors duration-300`}></div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-astro-purple' : 'bg-white/10'} transition-colors duration-300`}>
                    <span className="text-white font-medium">3</span>
                  </div>
                </div>
              </div>
              
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-unbounded text-2xl font-medium mb-6 text-center">Birth Date & Time</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="day">Day</Label>
                      <Input 
                        id="day" 
                        placeholder="Day (1-31)" 
                        type="number" 
                        min="1" 
                        max="31"
                        value={birthData.day}
                        onChange={(e) => handleInputChange("day", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="month">Month</Label>
                      <Select onValueChange={(value) => handleInputChange("month", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input 
                        id="year" 
                        placeholder="Year (e.g. 1990)" 
                        type="number"
                        min="1900"
                        max="2030"
                        value={birthData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hour">Hour</Label>
                      <Select onValueChange={(value) => handleInputChange("hour", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i < 10 ? `0${i}` : i}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minute">Minute</Label>
                      <Select onValueChange={(value) => handleInputChange("minute", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                            <SelectItem key={minute} value={minute.toString()}>
                              {minute < 10 ? `0${minute}` : minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setStep(2)}
                    disabled={!birthData.day || !birthData.month || !birthData.year}
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-unbounded text-2xl font-medium mb-6 text-center">Birth Location</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Enter your birth city" 
                      value={birthData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-12">UTC-12</SelectItem>
                        <SelectItem value="UTC-11">UTC-11</SelectItem>
                        <SelectItem value="UTC-10">UTC-10</SelectItem>
                        <SelectItem value="UTC-9">UTC-9</SelectItem>
                        <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                        <SelectItem value="UTC-7">UTC-7 (MST)</SelectItem>
                        <SelectItem value="UTC-6">UTC-6 (CST)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                        <SelectItem value="UTC-4">UTC-4</SelectItem>
                        <SelectItem value="UTC-3">UTC-3</SelectItem>
                        <SelectItem value="UTC-2">UTC-2</SelectItem>
                        <SelectItem value="UTC-1">UTC-1</SelectItem>
                        <SelectItem value="UTC+0">UTC+0</SelectItem>
                        <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                        <SelectItem value="UTC+2">UTC+2</SelectItem>
                        <SelectItem value="UTC+3">UTC+3</SelectItem>
                        <SelectItem value="UTC+4">UTC+4</SelectItem>
                        <SelectItem value="UTC+5">UTC+5</SelectItem>
                        <SelectItem value="UTC+5:30">UTC+5:30 (IST)</SelectItem>
                        <SelectItem value="UTC+6">UTC+6</SelectItem>
                        <SelectItem value="UTC+7">UTC+7</SelectItem>
                        <SelectItem value="UTC+8">UTC+8</SelectItem>
                        <SelectItem value="UTC+9">UTC+9 (JST)</SelectItem>
                        <SelectItem value="UTC+10">UTC+10</SelectItem>
                        <SelectItem value="UTC+11">UTC+11</SelectItem>
                        <SelectItem value="UTC+12">UTC+12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handleGenerateChart}
                      disabled={!birthData.city || !birthData.timezone || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Generating Chart...
                        </>
                      ) : "Generate Birth Chart"}
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && chartGenerated && (
                <div className="space-y-6">
                  <h2 className="font-unbounded text-2xl font-medium mb-6 text-center">Your Cosmic Blueprint</h2>
                  
                  <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-astro-glow/30"></div>
                    <div className="absolute inset-[20px] rounded-full border-2 border-astro-violet/40"></div>
                    <div className="absolute inset-[40px] rounded-full border-2 border-astro-purple/30"></div>
                    
                    {/* Zodiac signs on the wheel */}
                    {Array.from({ length: 12 }).map((_, index) => {
                      const angle = index * 30;
                      const radian = (angle - 90) * (Math.PI / 180);
                      const x = Math.cos(radian) * 45 + 50;
                      const y = Math.sin(radian) * 45 + 50;
                      
                      return (
                        <div 
                          key={index} 
                          className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-astro-navy/50 border border-astro-purple/30 rounded-full"
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`,
                          }}
                        >
                          <span className="text-sm">{['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'][index]}</span>
                        </div>
                      );
                    })}
                    
                    {/* Planet positions (simulated) */}
                    {['☉', '☽', '☿', '♀', '♂', '♃', '♄'].map((planet, index) => {
                      const angle = (index * 51) % 360; // Distributed unevenly for visual effect
                      const radian = (angle - 90) * (Math.PI / 180);
                      const radius = 25 + (index % 3) * 7; // Different distances from center
                      const x = Math.cos(radian) * radius + 50;
                      const y = Math.sin(radian) * radius + 50;
                      
                      return (
                        <div 
                          key={planet} 
                          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-astro-purple/70 rounded-full text-white border border-white/20"
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`,
                          }}
                        >
                          {planet}
                        </div>
                      );
                    })}
                    
                    {/* Center point */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-astro-navy border border-astro-glow flex items-center justify-center">
                      <Stars className="h-5 w-5 text-astro-glow" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Sun className="h-5 w-5 mr-2 text-yellow-400" />
                        Sun Sign
                      </h3>
                      <p className="text-lg font-cinzel mb-1">Leo</p>
                      <p className="text-sm text-foreground/70">
                        Your core essence is confident, creative, and generous. You shine with natural leadership and dramatic flair.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Moon className="h-5 w-5 mr-2 text-blue-200" />
                        Moon Sign
                      </h3>
                      <p className="text-lg font-cinzel mb-1">Cancer</p>
                      <p className="text-sm text-foreground/70">
                        Emotionally, you're nurturing, intuitive, and sensitive with a deep need for security and belonging.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3">Rising Sign</h3>
                      <p className="text-lg font-cinzel mb-1">Sagittarius</p>
                      <p className="text-sm text-foreground/70">
                        You present yourself to the world as optimistic, adventurous, and philosophical with a love for freedom.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3">Venus Sign</h3>
                      <p className="text-lg font-cinzel mb-1">Virgo</p>
                      <p className="text-sm text-foreground/70">
                        In love, you're thoughtful, practical, and attentive to details, expressing affection through acts of service.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white/5 rounded-lg p-5">
                    <h3 className="font-medium text-lg mb-3">Birth Chart Interpretation</h3>
                    <p className="text-sm text-foreground/80 mb-3">
                      Your birth chart reveals a complex interplay of cosmic energies. With Sun in Leo and Moon in Cancer, you balance confident self-expression with emotional sensitivity. Your Sagittarius Rising gives you an optimistic approach to life and new experiences.
                    </p>
                    <p className="text-sm text-foreground/80">
                      The positioning of Venus in Virgo suggests you express love through practical support and attention to detail, while Mars in Scorpio gives you intense determination and passionate drive in pursuing your goals.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button onClick={() => setStep(1)} variant="outline">
                      Create New Chart
                    </Button>
                    <Button className="flex-1">
                      Download Full Analysis
                    </Button>
                  </div>
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
