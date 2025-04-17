
import { useState, useEffect } from 'react';
import { Sparkles, Eye, RefreshCcw, BookOpen, Feather } from 'lucide-react';
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
        // If parsing fails, we'll just draw a new card
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
      <div className="container mx-auto px-6 py-20 text-center max-w-4xl">
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center shadow-[0_0_15px_rgba(159,68,211,0.4)] animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-unbounded glow-text">
          {cardContent ? 'Your Mystical Reading' : 'Select a Card'}
        </h1>
        <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
          {cardContent 
            ? `You have drawn ${cardContent.name}. Focus on its message for your day.` 
            : 'Focus on your question or intention, then choose one card to receive your mystical guidance.'}
        </p>

        {!cardContent && (
          <div className="flex justify-center gap-12 max-w-3xl mx-auto">
            {[1, 2, 3].map((cardNumber) => (
              <div
                key={cardNumber}
                className={`w-[270px] aspect-[2/3] rounded-2xl border-2 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(159,68,211,0.6)] cursor-pointer ${
                  selectedCard === cardNumber 
                    ? 'border-purple-500 shadow-[0_0_30px_rgba(159,68,211,0.8)]'
                    : 'border-purple-500/30'
                }`}
                onClick={() => handleCardClick(cardNumber)}
              >
                <div className="h-full flex flex-col items-center justify-center bg-navy-800/30 rounded-xl backdrop-blur-sm">
                  <Sparkles className={`w-8 h-8 text-purple-400 mb-4 ${selectedCard === cardNumber ? 'animate-twinkle-fast' : ''}`} />
                  <p className="text-gray-400 uppercase tracking-wider">CARD</p>
                  <p className="text-3xl font-bold">{cardNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cardContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
              <div 
                className={`w-[270px] aspect-[2/3] rounded-2xl border-2 border-purple-500 mb-8 shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-1000 transform ${isFlipped ? 'scale-110' : 'scale-100'} hover:shadow-[0_0_40px_rgba(159,68,211,0.7)]`}
              >
                <div className="h-full flex flex-col items-center justify-center bg-purple-900/70 rounded-xl p-6 text-center backdrop-blur-sm">
                  <p className="text-sm text-purple-200 uppercase tracking-wider mb-1">MAJOR ARCANA</p>
                  <h3 className="text-2xl font-bold mb-6 text-white font-cinzel">{cardContent.name}</h3>
                  
                  <div className="w-16 h-16 border border-purple-400/50 rounded-full flex items-center justify-center mb-6">
                    <p className="text-2xl text-purple-300 font-cinzel">{cardContent.number || ""}</p>
                  </div>
                  
                  <p className="text-sm text-purple-200 mb-4">Keywords:</p>
                  <div className="space-y-2 text-center">
                    {cardContent.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                      <p key={idx} className="text-white">{keyword}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">{cardContent.name}</h2>
              
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {cardContent.keywords.map((keyword: string, idx: number) => (
                  <Badge 
                    key={idx}
                    className="bg-purple-600/20 border-purple-500/30 text-purple-200 hover:bg-purple-600/30 transition-colors duration-300"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-navy-800/40 p-8 rounded-xl border border-purple-500/20 text-left">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Your Mystical Reading
              </h2>
              
              <div className="space-y-6 text-gray-200">
                <p className="leading-relaxed">
                  {cardContent.name} strikes in your reading with its powerful symbolism and meaning. This card indicates 
                  {cardContent.upright[0].toLowerCase()} in your current situation.
                </p>
                
                <p className="leading-relaxed">
                  The energy of {cardContent.name} brings attention to {cardContent.upright[1].toLowerCase()}. 
                  Consider how this might be manifesting in your life right now and what changes you might need to embrace.
                </p>
                
                <div className="pt-4 border-t border-purple-500/20">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Reflection Questions:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>How might the energy of {cardContent.name} be influencing your current path?</li>
                    <li>What aspects of {cardContent.keywords[0]} and {cardContent.keywords[1]} can you embrace today?</li>
                    <li>In what ways could you harness this card's wisdom to overcome challenges?</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="gap-2 border-purple-500/30 bg-navy-800/30 hover:bg-navy-800/50 hover:border-purple-500/50 transition-all duration-300">
                      <Eye className="h-4 w-4 text-purple-400" /> Card Details
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-navy-800/90 border-purple-500/20 backdrop-blur-lg w-96 p-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Card Meaning</h4>
                      <p className="text-sm text-gray-300">{cardContent.description}</p>
                      <Separator className="bg-purple-500/20" />
                      <div>
                        <p className="text-sm font-semibold text-purple-300 mb-1">When Upright:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                          {cardContent.upright.map((meaning: string, index: number) => (
                            <li key={index}>{meaning}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-300 mb-1">When Reversed:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
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
            
            <div className="md:col-span-2 mt-4">
              <Button 
                onClick={handleReset} 
                variant="ghost" 
                className="mt-2 text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-300"
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
