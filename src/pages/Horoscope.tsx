import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDailyReset } from '@/hooks/useDailyReset';
import BackToHome from '@/components/BackToHome';

const Horoscope = () => {
  const [horoscope, setHoroscope] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { shouldReset } = useDailyReset('horoscope');

  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      // Simulate fetching horoscope from an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHoroscope('Today, the stars align in your favor. Expect unexpected opportunities and embrace new challenges.');
      setIsLoading(false);
    };

    if (shouldReset()) {
      // Fetch new horoscope if daily reset is needed
      fetchHoroscope();
    } else {
      // Load stored horoscope if available
      const storedHoroscope = localStorage.getItem('horoscope');
      if (storedHoroscope) {
        setHoroscope(storedHoroscope);
        setIsLoading(false);
      } else {
        // Fetch initial horoscope if nothing is stored
        fetchHoroscope();
      }
    }
  }, [shouldReset]);

  useEffect(() => {
    // Save horoscope to local storage whenever it changes
    localStorage.setItem('horoscope', horoscope);
  }, [horoscope]);

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <main className="container mx-auto px-6 py-20 relative z-10">
        <section className="text-center">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Daily Horoscope
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            Read your personalized daily horoscope to gain insights into your day.
          </p>

          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-lg">Consulting the stars...</p>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              ) : (
                <p className="text-foreground/90">{horoscope}</p>
              )}
            </CardContent>
          </Card>

          <Button className="glow-btn mt-8">
            <Moon className="mr-2 h-5 w-5" />
            Get Tomorrow's Prediction
          </Button>
        </section>
      </main>
      <Footer />
      <BackToHome />
    </div>
  );
};

export default Horoscope;
