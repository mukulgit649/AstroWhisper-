
import { useState, useEffect } from 'react';
import { Sparkles, Eye, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { getRandomCard } from '@/utils/tarotData';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [cardContent, setCardContent] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (selectedCard !== null && !isRevealing) {
      // Get a random tarot card when a selection is made and reveal is complete
      const tarotCard = getRandomCard();
      setCardContent(tarotCard);
    }
  }, [selectedCard, isRevealing]);

  const handleCardClick = (cardNumber: number) => {
    if (!isRevealing && selectedCard === null) {
      setSelectedCard(cardNumber);
      setIsRevealing(true);
      
      // Simulate card reveal animation
      setTimeout(() => {
        setIsRevealing(false);
        setIsFlipped(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setSelectedCard(null);
    setCardContent(null);
    setIsFlipped(false);
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
          {cardContent ? 'Your Daily Wisdom' : 'Select a Card'}
        </h1>
        <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
          {cardContent 
            ? `You have drawn ${cardContent.name}. Focus on its message for your day.` 
            : 'Focus on your question or intention, then choose one card to receive your mystical guidance.'}
        </p>

        {!cardContent && (
          <div className="grid grid-cols-3 gap-10 max-w-3xl mx-auto">
            {[1, 2, 3].map((cardNumber) => (
              <div
                key={cardNumber}
                className={`aspect-[2/3] rounded-2xl border-2 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(159,68,211,0.6)] cursor-pointer ${
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
          <div className="flex flex-col items-center">
            <div 
              className={`w-64 aspect-[2/3] rounded-2xl border-2 border-purple-500 mb-10 shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-1000 transform ${isFlipped ? 'scale-110' : 'scale-100'}`}
            >
              <div className="h-full flex flex-col items-center justify-center bg-navy-800/50 rounded-xl p-6 text-center backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2 text-white">{cardContent.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{cardContent.arcana} Arcana</p>
                <p className="text-purple-300 italic mb-4">"{cardContent.keywords.join(', ')}"</p>
                <div className="border-t border-purple-500/30 pt-4 mt-2">
                  <p className="text-sm text-gray-400">Meaning</p>
                  <p className="text-white text-sm">{cardContent.upright[0]}</p>
                </div>
              </div>
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="gap-2 border-purple-500/30 bg-navy-800/30 hover:bg-navy-800/50 hover:border-purple-500/50 transition-all duration-300">
                  <Eye className="h-4 w-4 text-purple-400" /> Learn More
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-navy-800/90 border-purple-500/20 backdrop-blur-lg w-80 p-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Card Details</h4>
                  <p className="text-xs">{cardContent.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-purple-300">Upright:</p>
                    <p className="text-xs">{cardContent.upright.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-purple-300">Reversed:</p>
                    <p className="text-xs">{cardContent.reversed.join(', ')}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Button 
              onClick={handleReset} 
              variant="ghost" 
              className="mt-6 text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-300"
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Draw Another Card
            </Button>
          </div>
        )}
      </div>
      <BackToHome />
    </div>
  );
};

export default Tarot;
