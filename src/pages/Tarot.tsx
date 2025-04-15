import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, BookOpen, Download, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';
import { getRandomCard } from '@/utils/tarotData';
import { getMockTarotReading } from '@/utils/mockAiResponses';
import type { TarotCard } from '@/utils/tarotData';
import { useDailyReset } from '@/hooks/useDailyReset';
import { shareContent, saveReading } from '@/utils/shareUtils';

const Tarot = () => {
  const [cards, setCards] = useState<TarotCard[]>(() => {
    const saved = localStorage.getItem('daily_tarot_cards');
    return saved ? JSON.parse(saved) : Array(3).fill(null).map(() => getRandomCard());
  });
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(() => {
    const saved = localStorage.getItem('daily_tarot_selected');
    return saved ? JSON.parse(saved) : null;
  });
  const [reading, setReading] = useState(() => {
    const saved = localStorage.getItem('daily_tarot_reading');
    return saved ? JSON.parse(saved) : '';
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const { shouldReset } = useDailyReset('tarot');

  useEffect(() => {
    setIsLoaded(true);
    if (shouldReset()) {
      // Reset daily draw
      const newCards = Array(3).fill(null).map(() => getRandomCard());
      setCards(newCards);
      setSelectedCard(null);
      setReading('');
      setIsFlipped(false);
      localStorage.setItem('daily_tarot_cards', JSON.stringify(newCards));
      localStorage.removeItem('daily_tarot_selected');
      localStorage.removeItem('daily_tarot_reading');
      toast({
        title: "Daily Tarot Reset",
        description: "Your tarot cards have been reset for a new day.",
      });
    }
  }, []);

  const handleDrawCard = (card: TarotCard) => {
    if (isFlipped || isDrawing) return;
    
    setIsDrawing(true);
    setSelectedCard(card);
    localStorage.setItem('daily_tarot_selected', JSON.stringify(card));
    
    setTimeout(() => {
      setIsFlipped(true);
    }, 500);
    
    setTimeout(() => {
      setIsReading(true);
      const cardReading = getMockTarotReading(card.name);
      
      let i = 0;
      const typingInterval = setInterval(() => {
        setReading(cardReading.substring(0, i));
        localStorage.setItem('daily_tarot_reading', JSON.stringify(cardReading.substring(0, i)));
        i++;
        if (i > cardReading.length) {
          clearInterval(typingInterval);
          setIsReading(false);
        }
      }, 20);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedCard(null);
    setReading('');
    setIsFlipped(false);
    setIsDrawing(false);
    setIsReading(false);
    
    // Get new cards
    const newCards = Array(3).fill(null).map(() => getRandomCard());
    setCards(newCards);
  };

  const handleSaveReading = () => {
    if (!selectedCard || !reading) return;
    
    const result = saveReading({
      card: selectedCard,
      reading,
      date: new Date().toISOString()
    });
    
    if (result.success) {
      toast({
        title: "Reading Saved",
        description: "Your tarot reading has been saved successfully."
      });
    } else {
      toast({
        title: "Error",
        description: "Could not save your reading. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShareReading = async () => {
    if (!selectedCard || !reading) return;
    
    const shareData = {
      title: `Tarot Reading: ${selectedCard.name}`,
      text: reading,
      url: window.location.href
    };
    
    const result = await shareContent(shareData);
    
    if (result.success) {
      toast({
        title: "Shared Successfully",
        description: result.method === 'clipboard' 
          ? "Reading copied to clipboard!" 
          : "Reading shared successfully!"
      });
    } else {
      toast({
        title: "Error",
        description: "Could not share the reading. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Stars count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10 container mx-auto px-4 py-12">
        <div className={`text-center mb-12 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
            Mystical Tarot Reading
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore the wisdom of the cards with our AI-powered tarot readings for guidance and insight.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!selectedCard ? (
            <div className={`${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <Sparkles className="h-10 w-10 text-astro-glow mx-auto mb-4" />
                    <h2 className="font-unbounded text-2xl font-medium mb-3">Select a Card</h2>
                    <p className="text-foreground/70 max-w-md mx-auto">
                      Focus on your question or intention, then choose one card to receive your mystical guidance.
                    </p>
                  </div>
                  
                  <div className="flex justify-center items-center gap-6 md:gap-10 my-10">
                    {cards.map((card, index) => (
                      <div 
                        key={index}
                        className="relative cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(159,68,211,0.6)]"
                        onClick={() => handleDrawCard(card)}
                      >
                        <div className="w-[120px] h-[200px] md:w-[140px] md:h-[240px] rounded-lg bg-gradient-to-b from-astro-navy to-astro-purple border border-white/10 flex items-center justify-center">
                          <div className="w-[110px] h-[190px] md:w-[130px] md:h-[230px] rounded-lg border border-white/20 flex flex-col items-center justify-center p-3 bg-astro-dark/80">
                            <div className="border-2 border-astro-glow/30 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                              <Sparkles className="h-6 w-6 text-astro-glow" />
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-foreground/50 uppercase tracking-wider">Card</div>
                              <div className="text-lg font-cinzel">{index + 1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
              {/* Selected Card Display */}
              <div>
                <Card className="glass-card overflow-hidden h-full">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center h-full">
                    <div className="relative w-[200px] h-[340px] mx-auto perspective">
                      <div 
                        className={`absolute inset-0 rounded-lg transition-all duration-1000 transform preserve-3d ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* Card Back */}
                        <div className="absolute inset-0 backface-hidden">
                          <div className="w-full h-full rounded-lg bg-gradient-to-b from-astro-navy to-astro-purple border border-white/10 flex items-center justify-center">
                            <div className="w-[180px] h-[320px] rounded-lg border border-white/20 flex flex-col items-center justify-center p-3 bg-astro-dark/80">
                              <div className="border-2 border-astro-glow/30 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                <Sparkles className="h-8 w-8 text-astro-glow" />
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-foreground/50 uppercase tracking-wider">Tarot</div>
                                <div className="text-xl font-cinzel">Mystic</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Front */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                          <div className="w-full h-full rounded-lg bg-gradient-to-b from-astro-navy to-astro-purple border border-white/10 flex items-center justify-center">
                            <div className="w-[180px] h-[320px] rounded-lg border border-white/20 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                              {/* Card Content */}
                              <div className="absolute inset-0 bg-gradient-to-b from-astro-purple/30 to-astro-navy/50 backdrop-blur-sm"></div>
                              
                              <div className="relative z-10 text-center p-4 flex flex-col items-center h-full">
                                <div className="text-xs text-astro-glow uppercase tracking-wider mb-2">
                                  {selectedCard.arcana} arcana
                                </div>
                                <h3 className="text-xl font-cinzel font-bold mb-4">{selectedCard.name}</h3>
                                
                                <div className="my-4 border-2 border-astro-glow/30 rounded-full w-16 h-16 flex items-center justify-center">
                                  <span className="text-2xl font-cinzel">{selectedCard.number}</span>
                                </div>
                                
                                <div className="mt-2 space-y-3 flex-grow">
                                  <div className="text-xs text-foreground/70">Keywords:</div>
                                  <div className="flex flex-wrap justify-center gap-1">
                                    {selectedCard.keywords.slice(0, 3).map((keyword) => (
                                      <span key={keyword} className="text-xs px-2 py-1 rounded-full bg-astro-purple/30">
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="font-unbounded text-xl font-medium mb-2">{isFlipped ? selectedCard.name : 'Your Card'}</h3>
                      {isFlipped && (
                        <div className="flex justify-center flex-wrap gap-1 mt-2">
                          {selectedCard.keywords.map((keyword) => (
                            <span key={keyword} className="text-xs px-2 py-1 rounded-full bg-astro-purple/20">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Card Reading */}
              <div>
                <Card className="glass-card overflow-hidden h-full">
                  <CardContent className="p-6 md:p-8 h-full flex flex-col">
                    <h3 className="font-unbounded text-xl font-medium mb-4 flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-astro-glow" />
                      Your Mystical Reading
                    </h3>
                    
                    <div className="flex-grow">
                      {isReading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-astro-violet rounded-full mr-2 animate-pulse"></div>
                            <div className="w-4 h-4 bg-astro-violet rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-4 h-4 bg-astro-violet rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            <span className="ml-2">Channeling cosmic wisdom...</span>
                          </div>
                        </div>
                      ) : (
                        reading ? (
                          <div className="bg-white/5 rounded-lg p-4 h-full overflow-y-auto">
                            <div className="prose prose-invert max-w-none">
                              {reading.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 leading-relaxed text-foreground/90">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-foreground/50 text-center">
                            {isFlipped ? 'Preparing your reading...' : 'Flip a card to receive your reading'}
                          </div>
                        )
                      )}
                    </div>
                    
                    {selectedCard && reading && (
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Button onClick={handleReset} className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Draw New Cards
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-astro-purple/50 hover:bg-astro-purple/10 gap-2"
                          onClick={handleSaveReading}
                        >
                          <Download className="h-4 w-4" />
                          Save Reading
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-astro-purple/50 hover:bg-astro-purple/10 gap-2"
                          onClick={handleShareReading}
                        >
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tarot;
