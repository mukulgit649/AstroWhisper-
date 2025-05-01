
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, ChevronRight, MessageCircle, Sparkles, Book } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Stars from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Zodiac signs for the wheel
  const zodiacSigns = [
    { symbol: "♈", name: "Aries" },
    { symbol: "♉", name: "Taurus" },
    { symbol: "♊", name: "Gemini" },
    { symbol: "♋", name: "Cancer" },
    { symbol: "♌", name: "Leo" },
    { symbol: "♍", name: "Virgo" },
    { symbol: "♎", name: "Libra" },
    { symbol: "♏", name: "Scorpio" },
    { symbol: "♐", name: "Sagittarius" },
    { symbol: "♑", name: "Capricorn" },
    { symbol: "♒", name: "Aquarius" },
    { symbol: "♓", name: "Pisces" }
  ];

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Stars count={150} />
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-unbounded text-white leading-tight">
              Discover Your<br />Cosmic Guidance
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-lg">
              Unlock the mysteries of the universe with AI-powered astrological insights, tarot readings, and personalized guidance.
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-start">
              <Link to="/birthchart" className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full px-8 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,68,211,0.8)] flex items-center justify-center">
                Explore Your Stars
              </Link>
              <Link to="/horoscope" className="bg-transparent text-white border border-purple-500/50 rounded-full px-8 py-3 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center">
                <Moon className="mr-2 h-5 w-5" />
                Today's Horoscope
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {/* Updated Zodiac Wheel */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20"></div>
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-purple-500/30"></div>
              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-purple-500/40"></div>
              
              {/* Zodiac Signs Positioned Around the Circle */}
              <div className="absolute inset-0 animate-rotate-slow">
                {zodiacSigns.map((sign, index) => {
                  const angle = (index * 30) * Math.PI / 180;
                  const radius = 200; // Adjust based on your container size
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  // Calculate position as percentage of container
                  const top = 50 + (y / radius) * 40;
                  const left = 50 + (x / radius) * 40;
                  
                  return (
                    <div 
                      key={sign.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        top: `${top}%`, 
                        left: `${left}%` 
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-navy-900/80 backdrop-blur-sm flex items-center justify-center border border-purple-500/50 shadow-[0_0_10px_rgba(159,68,211,0.3)]">
                        <span className="text-purple-400 text-xl">{sign.symbol}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Center Gemini Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(159,68,211,0.6)]">
                  <span className="text-white text-5xl">♊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-6 bg-astro-navy/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 font-cinzel text-white">Cosmic Services</h2>
          <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
            Explore our mystical AI-powered tools to gain insight into your past, present, and future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sun className="w-10 h-10 text-purple-400" />,
                title: "Daily Horoscope",
                description: "Receive personalized daily guidance based on your zodiac sign and planetary alignments.",
                link: "/horoscope",
                cta: "Read today's stars"
              },
              {
                icon: <Book className="w-10 h-10 text-purple-400" />,
                title: "Tarot Reading",
                description: "Draw virtual tarot cards with AI-generated interpretations tailored to your spiritual journey.",
                link: "/tarot",
                cta: "Pull your cards"
              },
              {
                icon: <MessageCircle className="w-10 h-10 text-purple-400" />,
                title: "Ask AstroBot",
                description: "Chat with our mystical AI companion for personalized guidance on life's burning questions.",
                link: "/astrobot",
                cta: "Start chatting"
              },
              {
                icon: <Sparkles className="w-10 h-10 text-purple-400" />,
                title: "Birth Chart",
                description: "Generate your complete astrological blueprint based on your exact birth time and location.",
                link: "/birthchart",
                cta: "Map your stars"
              }
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group p-8 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,68,211,0.3)]"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-900/30">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
                  {service.cta} <ChevronRight className="ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
