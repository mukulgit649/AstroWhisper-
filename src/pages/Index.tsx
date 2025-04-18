
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Moon, Sun, MessageCircle, Sparkles, Book } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 rounded-full bg-purple-600/20 flex items-center justify-center shadow-[0_0_15px_rgba(159,68,211,0.4)] animate-pulse-glow">
              <Moon className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-unbounded text-white">
            Unlock Your Cosmic Potential
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            Explore the mystical world of astrology and gain profound insights into your life's journey.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link to="/horoscope" className="glow-btn group">
              View Daily Horoscope <ChevronRight className="w-5 h-5 ml-2 group-hover:animate-pulse-fast" />
            </Link>
            <Link to="/birthchart" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">
              Discover Your Birth Chart
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 md:py-32 px-6 bg-astro-navy/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-cinzel">Cosmic Services</h2>
          <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Explore our mystical AI-powered tools to gain insight into your past, present, and future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sun className="w-6 h-6 text-purple-400" />,
                title: "Daily Horoscope",
                description: "Receive personalized daily guidance based on your zodiac sign and planetary alignments.",
                link: "/horoscope",
                cta: "Read today's stars"
              },
              {
                icon: <Book className="w-6 h-6 text-purple-400" />,
                title: "Tarot Reading",
                description: "Draw virtual tarot cards with AI-generated interpretations tailored to your spiritual journey.",
                link: "/tarot",
                cta: "Pull your cards"
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-purple-400" />,
                title: "Ask AstroBot",
                description: "Chat with our mystical AI companion for personalized guidance on life's burning questions.",
                link: "/astrobot",
                cta: "Start chatting"
              },
              {
                icon: <Sparkles className="w-6 h-6 text-purple-400" />,
                title: "Birth Chart",
                description: "Generate your complete astrological blueprint based on your exact birth time and location.",
                link: "/birthchart",
                cta: "Map your stars"
              }
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group p-6 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/30">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
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
