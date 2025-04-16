
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { getRandomCard } from '@/utils/tarotData';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleCardClick = (cardNumber: number) => {
    if (!isRevealing && selectedCard === null) {
      setSelectedCard(cardNumber);
      setIsRevealing(true);
      setTimeout(() => {
        // Simulate card reveal animation
        setIsRevealing(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-unbounded">
          Select a Card
        </h1>
        <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
          Focus on your question or intention, then choose one card to receive your mystical guidance.
        </p>

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[1, 2, 3].map((cardNumber) => (
            <div
              key={cardNumber}
              className={`aspect-[2/3] rounded-2xl border-2 border-purple-500/30 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedCard === cardNumber ? 'border-purple-500' : ''
              }`}
              onClick={() => handleCardClick(cardNumber)}
            >
              <div className="h-full flex flex-col items-center justify-center bg-navy-800/30 rounded-xl">
                <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-gray-400 uppercase tracking-wider">CARD</p>
                <p className="text-2xl font-bold">{cardNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default Tarot;
