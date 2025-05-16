import { useState, useEffect } from 'react';
import { useAstroBot } from '@/contexts/AstroBotContext';
import CosmicInsightsSidebar from '@/components/astrobot/CosmicInsightsSidebar';
import ChatArea from '@/components/astrobot/ChatArea';
import AstroBotHeader from '@/components/astrobot/AstroBotHeader';
import UserPreferences from '@/components/astrobot/UserPreferences';
import MajorTransits from '@/components/astrobot/MajorTransits';
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';

const getMoonPhase = () => {
  const now = new Date();
  const lp = 29.53;
  const reference = new Date(2000, 0, 6, 18, 14, 0);
  const refTime = reference.getTime();
  const nowTime = now.getTime();
  const diff = (nowTime - refTime) / 1000 / 60 / 60 / 24;
  const phase = diff % lp;
  if (phase < 1) return { name: 'New Moon', illumination: '0%' };
  if (phase < 7.4) return { name: 'Waxing Crescent', illumination: Math.round((phase / 7.4) * 50) + '%' };
  if (phase < 8.4) return { name: 'First Quarter', illumination: '50%' };
  if (phase < 14.8) return { name: 'Waxing Gibbous', illumination: Math.round(50 + ((phase - 8.4) / 6.4) * 50) + '%' };
  if (phase < 15.8) return { name: 'Full Moon', illumination: '100%' };
  if (phase < 22.1) return { name: 'Waning Gibbous', illumination: Math.round(100 - ((phase - 15.8) / 6.3) * 50) + '%' };
  if (phase < 23.1) return { name: 'Last Quarter', illumination: '50%' };
  return { name: 'Waning Crescent', illumination: Math.round(50 - ((phase - 23.1) / 6.4) * 50) + '%' };
};

const getPlanetaryTransit = () => {
  const month = new Date().getMonth();
  const transits = [
    { planet: 'Venus in Aries', meaning: 'Passionate new beginnings' },
    { planet: 'Mars in Taurus', meaning: 'Determined action' },
    { planet: 'Mercury in Gemini', meaning: 'Enhanced communication' },
    { planet: 'Venus in Cancer', meaning: 'Emotional nurturing' },
    { planet: 'Sun in Leo', meaning: 'Creative self-expression' },
    { planet: 'Mercury in Virgo', meaning: 'Analytical thinking' },
    { planet: 'Venus in Libra', meaning: 'Harmonious relationships' },
    { planet: 'Mars in Scorpio', meaning: 'Transformative energy' },
    { planet: 'Jupiter in Sagittarius', meaning: 'Expansion of horizons' },
    { planet: 'Saturn in Capricorn', meaning: 'Structured achievement' },
    { planet: 'Uranus in Aquarius', meaning: 'Revolutionary ideas' },
    { planet: 'Neptune in Pisces', meaning: 'Spiritual intuition' }
  ];
  return transits[month];
};

const getTodaysEnergies = () => {
  const now = new Date();
  const day = now.getDate();
  const manifestation = 40 + (day % 60);
  const intuition = 55 + (day % 30);
  const transformation = 30 + (day % 50);
  return { manifestation, intuition, transformation };
};

const AstroBotContainer = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useAstroBot();
  const [isLoaded, setIsLoaded] = useState(false);

  const suggestedQuestions = [
    "What does my zodiac sign say about my love life?",
    "How will the current planetary alignments affect me?",
    "What career path aligns with my cosmic energy?",
    "Should I make this important decision now?",
    "What spiritual practice would benefit me most?",
    "Can you give me a quick tarot reading?",
    "How can I balance my chakras?",
    "What does my birth chart indicate about my purpose?",
  ];

  useEffect(() => {
    // Add a slight delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="relative z-10 pt-4">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-8 pb-16">
        <AstroBotHeader 
          isLoaded={isLoaded}
          fadeInAnimation={fadeInAnimation}
          fadeInLoaded={fadeInLoaded}
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1 space-y-6">
              <CosmicInsightsSidebar 
                isLoaded={isLoaded}
                fadeInAnimation={fadeInAnimation}
                fadeInLoaded={fadeInLoaded}
              />
            </div>
            
            {/* Chat Area */}
            <ChatArea 
              messages={messages}
              isLoading={isLoading}
              isLoaded={isLoaded}
              sendMessage={sendMessage}
              clearMessages={clearMessages}
              suggestedQuestions={suggestedQuestions}
              handleSuggestedQuestion={handleSuggestedQuestion}
              fadeInAnimation={fadeInAnimation}
              fadeInLoaded={fadeInLoaded}
            />
          </div>
          {/* Horizontal section below chat area */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cosmic Insights Card */}
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-unbounded text-sm font-medium mb-3">Cosmic Insights</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="mb-2 text-xs text-foreground/70">Current Moon Phase</div>
                    <div className="text-sm font-medium">{getMoonPhase().name}</div>
                    <div className="text-xs text-foreground/50 mt-1">{getMoonPhase().illumination} Illumination</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="mb-2 text-xs text-foreground/70">Planetary Transit</div>
                    <div className="text-sm font-medium">{getPlanetaryTransit().planet}</div>
                    <div className="text-xs text-foreground/50 mt-1">{getPlanetaryTransit().meaning}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Today's Energy Card */}
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-unbounded text-sm font-medium mb-3">Today's Energy</h3>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm">Manifestation</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: `${getTodaysEnergies().manifestation}%` }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-sm">Intuition</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${getTodaysEnergies().intuition}%` }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-sm">Transformation</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${getTodaysEnergies().transformation}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Major Transits Card */}
            <MajorTransits />
            {/* User Preferences Card */}
            <UserPreferences />
          </div>
        </div>
      </div>
      
      <BackToHome />
    </div>
  );
};

export default AstroBotContainer;
