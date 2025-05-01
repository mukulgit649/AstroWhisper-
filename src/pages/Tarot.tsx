
import { useState, useEffect } from 'react';
import { Sparkles, Eye, RefreshCcw, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { getRandomCard } from '@/utils/tarotData';
import { useDailyReset } from '@/hooks/useDailyReset';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [cardContent, setCardContent] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { shouldReset } = useDailyReset('tarot_card');

  const savedCard = localStorage.getItem('daily_tarot_card');
  
  useEffect(() => {
    // Check if we should use a saved card or reset
    if (savedCard && !shouldReset()) {
      try {
        setCardContent(JSON.parse(savedCard));
        setIsFlipped(true);
      } catch (e) {
        console.error("Error parsing saved card:", e);
      }
    }
  }, []);

  const handleCardClick = (cardNumber: number) => {
    if (!isRevealing && selectedCard === null) {
      setSelectedCard(cardNumber);
      setIsRevealing(true);
      
      // Simulate card reveal animation
      setTimeout(() => {
        const tarotCard = getRandomCard();
        setCardContent(tarotCard);
        setIsRevealing(false);
        setIsFlipped(true);
        
        // Save the card for today
        localStorage.setItem('daily_tarot_card', JSON.stringify(tarotCard));
        localStorage.setItem('tarot_card_last_reset', new Date().toDateString());
      }, 1500);
    }
  };

  const handleReset = () => {
    setSelectedCard(null);
    setCardContent(null);
    setIsFlipped(false);
    localStorage.removeItem('daily_tarot_card');
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-6 py-12 text-center max-w-5xl">
        {!cardContent && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center shadow-[0_0_25px_rgba(159,68,211,0.6)] animate-pulse-glow mb-4">
                <Star className="w-10 h-10 text-astro-glow animate-twinkle" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-cinzel text-white leading-tight bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
              Divine Your Destiny
            </h1>
            <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto font-cormorant">
              Focus on your question or intention as you select a card from the cosmic deck. The universe will guide your hand to the message you need most.
            </p>

            <div className="relative my-20">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 rounded-3xl transform -rotate-1"></div>
              <div className="flex justify-center gap-12 max-w-3xl mx-auto">
                {[1, 2, 3].map((cardNumber) => (
                  <div
                    key={cardNumber}
                    className={`w-[210px] aspect-[2/3] rounded-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                      selectedCard === cardNumber 
                        ? 'shadow-[0_0_40px_rgba(159,68,211,0.8)]'
                        : 'shadow-[0_0_15px_rgba(159,68,211,0.4)]'
                    }`}
                    onClick={() => handleCardClick(cardNumber)}
                  >
                    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-900/80 to-purple-900/40 rounded-xl backdrop-blur-md border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
                      <Sparkles className={`w-8 h-8 text-astro-glow mb-4 ${selectedCard === cardNumber ? 'animate-twinkle-fast' : 'animate-twinkle'}`} />
                      <p className="text-gray-400 uppercase tracking-wider text-sm font-cinzel mb-1">ARCANA</p>
                      <p className="text-4xl font-bold font-cinzel text-white">{cardNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {cardContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col items-center">
              <div 
                className="w-[260px] aspect-[2/3] rounded-2xl mb-8 shadow-[0_0_40px_rgba(159,68,211,0.6)] transition-all duration-1000 transform hover:shadow-[0_0_50px_rgba(159,68,211,0.8)]"
              >
                <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 text-center backdrop-blur-md border-2 border-purple-500/50">
                  <div className="w-full h-full flex flex-col items-center justify-between p-4 border border-purple-400/30 rounded-lg">
                    <p className="text-sm text-astro-glow uppercase tracking-widest mb-1 font-cinzel">MAJOR ARCANA</p>
                    <h3 className="text-3xl font-bold mb-6 text-white font-cinzel">{cardContent.name}</h3>
                    
                    <div className="w-20 h-20 border border-purple-400/50 rounded-full flex items-center justify-center mb-6 bg-purple-900/50 shadow-[0_0_15px_rgba(159,68,211,0.4)]">
                      <p className="text-3xl text-astro-glow">{cardContent.number || ""}</p>
                    </div>
                    
                    <p className="text-sm text-purple-200 mb-4 font-cinzel">Keywords:</p>
                    <div className="space-y-2 text-center">
                      {cardContent.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                        <p key={idx} className="text-white font-cormorant text-lg">{keyword}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 font-cinzel">{cardContent.name}</h2>
              
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {cardContent.keywords.map((keyword: string, idx: number) => (
                  <Badge 
                    key={idx}
                    className="bg-purple-600/20 border border-purple-500/40 text-purple-200 hover:bg-purple-600/30 transition-colors duration-300 py-1 px-3"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-navy-800/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 text-left shadow-[0_0_20px_rgba(159,68,211,0.3)]">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 font-cinzel">
                <BookOpen className="w-6 h-6 text-astro-violet" />
                Your Mystical Reading
              </h2>
              
              <div className="space-y-6 text-gray-200 font-cormorant text-lg">
                <p className="leading-relaxed">
                  {cardContent.name} strikes in your reading with its powerful symbolism and meaning. This powerful card indicates that structures in your life that have been built on shaky foundations—perhaps false beliefs, unsustainable situations, or inauthenticity—are due for dramatic dismantling.
                </p>
                
                <p className="leading-relaxed">
                  While {cardContent.name} experiences can feel shocking and disruptive, they ultimately serve to break through illusions and create space for more authentic rebuilding. The unexpected events associated with this card often initially appear as setbacks but ultimately lead to liberation from restrictive circumstances.
                </p>
                
                <p className="leading-relaxed">
                  {cardContent.name} encourages radical honesty with yourself about what isn't working in your life. Rather than clinging to the familiar, allow outmoded structures to fall away so that something more aligned with your true self can eventually be constructed. Remember that destruction precedes creation in many natural cycles.
                </p>
                
                <div className="pt-6 border-t border-purple-500/30 mt-6">
                  <h3 className="text-2xl font-semibold text-astro-glow mb-4 font-cinzel">Reflection Questions:</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-300">
                    <li>How might the energy of {cardContent.name} be influencing your current path?</li>
                    <li>What aspects of {cardContent.keywords[0]} and {cardContent.keywords[1]} can you embrace today?</li>
                    <li>In what ways could you harness this card's wisdom to overcome challenges?</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="gap-2 border-purple-500/30 bg-navy-800/50 hover:bg-navy-800/70 hover:border-purple-500/50 transition-all duration-300 font-cinzel">
                      <Eye className="h-4 w-4 text-astro-violet" /> Card Details
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-navy-800/90 border-purple-500/30 backdrop-blur-lg w-96 p-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white font-cinzel">Card Meaning</h4>
                      <p className="text-sm text-gray-300 font-cormorant">{cardContent.description}</p>
                      <Separator className="bg-purple-500/30" />
                      <div>
                        <p className="text-sm font-semibold text-astro-glow mb-1 font-cinzel">When Upright:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-cormorant">
                          {cardContent.upright.map((meaning: string, index: number) => (
                            <li key={index}>{meaning}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-astro-glow mb-1 font-cinzel">When Reversed:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-cormorant">
                          {cardContent.reversed.map((meaning: string, index: number) => (
                            <li key={index}>{meaning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            
            <div className="md:col-span-2 mt-6">
              <Button 
                onClick={handleReset} 
                variant="ghost" 
                className="mt-2 text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-300 font-cinzel"
              >
                <RefreshCcw className="h-4 w-4 mr-2" /> Draw Another Card
              </Button>
            </div>
          </div>
        )}
      </div>
      <BackToHome />
    </div>
  );
};

export default Tarot;
