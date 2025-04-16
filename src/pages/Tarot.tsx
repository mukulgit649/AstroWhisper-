import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import Navbar from '@/components/Navbar';
import { getRandomCard, TarotCard } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const drawCard = () => {
    setIsLoading(true);
    setIsRevealed(false);
    
    // Simulate card drawing delay
    setTimeout(() => {
      const card = getRandomCard();
      const reversed = Math.random() > 0.7; // 30% chance of reversed
      
      setSelectedCard(card);
      setIsReversed(reversed);
      setIsLoading(false);
    }, 1500);
  };

  const revealCard = () => {
    setIsRevealed(true);
    toast({
      title: "Card Revealed",
      description: `The ${selectedCard?.name} has been revealed. Consider its wisdom carefully.`,
    });
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <main className="container mx-auto px-6 py-10 md:py-16 relative z-10">
        <h1 className="font-cinzel text-4xl md:text-5xl text-center font-bold mb-8 glow-text">
          Tarot Reading
        </h1>
        
        <p className="text-lg text-center text-foreground/70 mb-10 max-w-3xl mx-auto">
          Focus on a question or situation in your mind, then draw a card to receive cosmic guidance. The cards reveal what you need to know, not always what you want to hear.
        </p>

        <div className="flex flex-col items-center justify-center space-y-8">
          {!selectedCard && !isLoading && (
            <Button 
              className="glow-btn text-lg py-6 px-8" 
              onClick={drawCard}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Draw a Card
            </Button>
          )}

          {isLoading && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-lg">Consulting the cosmic forces</p>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
              <p className="text-sm text-foreground/60">
                Focus on your question while the cards align...
              </p>
            </div>
          )}

          {selectedCard && !isLoading && (
            <div className="flex flex-col items-center space-y-6">
              <div className={`relative transition-all duration-700 ${isRevealed ? 'scale-100' : 'scale-95'}`}>
                <div className={`card-container ${isRevealed ? 'revealed' : ''} ${isReversed ? 'reversed' : ''}`}>
                  {!isRevealed ? (
                    <div className="card-back glass-card rounded-lg flex items-center justify-center" 
                      style={{width: '280px', height: '460px'}}>
                      <div className="text-4xl opacity-60">✧</div>
                    </div>
                  ) : (
                    <Card className="w-[280px] shadow-lg glass-card">
                      <CardContent className="p-6 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-2">{selectedCard.name}</h2>
                        <p className="text-sm mb-4">{isReversed ? 'Reversed' : 'Upright'}</p>
                        <div className="mb-4 bg-black/20 p-4 rounded-lg">
                          <img 
                            src={selectedCard.image} 
                            alt={selectedCard.name} 
                            className={`w-full h-60 object-contain ${isReversed ? 'rotate-180' : ''}`}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Meaning:</p>
                          <p className="mb-2">{isReversed 
                            ? selectedCard.reversed.join(', ') 
                            : selectedCard.upright.join(', ')}
                          </p>
                          <p className="text-xs opacity-80 mt-2">{selectedCard.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {selectedCard && !isRevealed && (
                <Button className="glow-btn" onClick={revealCard}>
                  Reveal Card
                </Button>
              )}

              {isRevealed && (
                <Button className="glow-btn" onClick={drawCard}>
                  Draw Another Card
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <BackToHome />

      <style jsx>{`
        .card-container {
          perspective: 1000px;
          transition: transform 0.8s;
        }
        .card-back {
          backface-visibility: hidden;
          background-image: radial-gradient(circle at center, #2a2042, #191425);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 15px rgba(123, 97, 255, 0.3);
        }
        .card-container.revealed {
          transform: rotateY(180deg);
        }
        .card-container.reversed {
          transform: rotateX(180deg);
        }
        .loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: currentColor;
          margin: 0 2px;
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .loading-dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        .loading-dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Tarot;
