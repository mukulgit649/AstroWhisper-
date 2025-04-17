import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Moon, Sun, MessageCircle, Sparkles, Star, Map } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarsBackground from '@/components/Stars'; // Renamed import to avoid conflict
import CosmicBackground from '@/components/CosmicBackground';
import { zodiacSigns } from '@/utils/zodiacData';

const Index = () => {
  const [activeSign, setActiveSign] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveSign((prev) => (prev + 1) % zodiacSigns.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <StarsBackground count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className={`md:w-1/2 mb-10 md:mb-0 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
                <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 glow-text">
                  Discover Your Cosmic Guidance
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
                  Unlock the mysteries of the universe with AI-powered astrological insights, tarot readings, and personalized guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="glow-btn" size="lg">
                    Explore Your Stars
                  </Button>
                  <Button variant="outline" className="border-astro-purple/50 hover:bg-astro-purple/10" size="lg">
                    <Moon className="mr-2 h-5 w-5" />
                    Today's Horoscope
                  </Button>
                </div>
              </div>
              
              <div className={`md:w-1/2 relative ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-astro-glow/20 animate-rotate-slow"></div>
                  <div className="absolute inset-[20px] rounded-full border-2 border-astro-violet/30 animate-rotate-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-[40px] rounded-full border-2 border-astro-purple/20 animate-rotate-slow" style={{ animationDuration: '80s' }}></div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-astro-violet to-astro-purple animate-pulse-glow flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">
                      {zodiacSigns[activeSign].symbol}
                    </span>
                  </div>
                  
                  {zodiacSigns.map((sign, index) => {
                    // Calculate position around the circle
                    const angle = (index * (360 / zodiacSigns.length)) * (Math.PI / 180);
                    const radius = 140; // Can be adjusted based on your design
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div 
                        key={sign.name}
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center bg-astro-navy border border-white/10 transition-all duration-300 ${index === activeSign ? 'scale-125 border-astro-violet' : 'scale-100'}`}
                        style={{ 
                          left: `calc(50% + ${x}px - 20px)`,
                          top: `calc(50% + ${y}px - 20px)`,
                          boxShadow: index === activeSign ? '0 0 15px rgba(159,68,211,0.6)' : 'none'
                        }}
                        onClick={() => setActiveSign(index)}
                      >
                        <span>{sign.symbol}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className={`text-center mb-16 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.6s' }}>
              <h2 className="font-unbounded text-3xl md:text-4xl font-bold mb-4 glow-text">
                Cosmic Services
              </h2>
              <p className="text-lg text-foreground/70 max-w-xl mx-auto">
                Explore our mystical AI-powered tools to gain insight into your past, present, and future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link to="/horoscope" className={`${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.7s' }}>
                <Card className="glass-card h-full hover:shadow-[0_0_20px_rgba(159,68,211,0.4)] transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="rounded-full bg-astro-purple/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-astro-purple/30 transition-colors duration-300">
                      <Sun className="h-7 w-7 text-astro-glow" />
                    </div>
                    <h3 className="font-unbounded text-xl font-semibold mb-3">Daily Horoscope</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      Receive personalized daily guidance based on your zodiac sign and planetary alignments.
                    </p>
                    <div className="flex items-center text-astro-violet group-hover:text-astro-glow transition-colors duration-300">
                      <span className="mr-2 font-medium">Read today's stars</span>
                      <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/tarot" className={`${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.8s' }}>
                <Card className="glass-card h-full hover:shadow-[0_0_20px_rgba(159,68,211,0.4)] transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="rounded-full bg-astro-purple/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-astro-purple/30 transition-colors duration-300">
                      <Star className="h-7 w-7 text-astro-glow" />
                    </div>
                    <h3 className="font-unbounded text-xl font-semibold mb-3">Tarot Reading</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      Draw virtual tarot cards with AI-generated interpretations tailored to your spiritual journey.
                    </p>
                    <div className="flex items-center text-astro-violet group-hover:text-astro-glow transition-colors duration-300">
                      <span className="mr-2 font-medium">Pull your cards</span>
                      <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/astrobot" className={`${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.9s' }}>
                <Card className="glass-card h-full hover:shadow-[0_0_20px_rgba(159,68,211,0.4)] transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="rounded-full bg-astro-purple/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-astro-purple/30 transition-colors duration-300">
                      <MessageCircle className="h-7 w-7 text-astro-glow" />
                    </div>
                    <h3 className="font-unbounded text-xl font-semibold mb-3">Ask AstroBot</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      Chat with our mystical AI companion for personalized guidance on life's burning questions.
                    </p>
                    <div className="flex items-center text-astro-violet group-hover:text-astro-glow transition-colors duration-300">
                      <span className="mr-2 font-medium">Start chatting</span>
                      <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/birthchart" className={`${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '1s' }}>
                <Card className="glass-card h-full hover:shadow-[0_0_20px_rgba(159,68,211,0.4)] transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="rounded-full bg-astro-purple/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-astro-purple/30 transition-colors duration-300">
                      <Map className="h-7 w-7 text-astro-glow" />
                    </div>
                    <h3 className="font-unbounded text-xl font-semibold mb-3">Birth Chart</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      Generate your complete astrological blueprint based on your exact birth time and location.
                    </p>
                    <div className="flex items-center text-astro-violet group-hover:text-astro-glow transition-colors duration-300">
                      <span className="mr-2 font-medium">Map your stars</span>
                      <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className={`relative rounded-2xl overflow-hidden ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '1s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-astro-purple to-astro-navy opacity-90"></div>
              
              <div className="relative z-10 py-16 px-4 md:px-10 flex flex-col items-center text-center">
                <Sparkles className="h-12 w-12 text-white mb-6 animate-pulse" />
                
                <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 text-white">
                  Begin Your Cosmic Journey Today
                </h2>
                
                <p className="text-lg text-white/90 max-w-2xl mb-8">
                  Sign up now to unlock premium astrological insights, save your readings, and receive 
                  personalized celestial guidance tailored to your unique birth chart.
                </p>
                
                <Button className="glow-btn text-lg" size="lg">
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
