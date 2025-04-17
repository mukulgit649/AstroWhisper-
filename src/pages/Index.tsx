import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Moon, Sun, MessageCircle, Sparkles, Star, Map } from 'lucide-react';
import Footer from '@/components/Footer';
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

  const testimonials = [
    {
      id: 1,
      name: 'Anya Sharma',
      text: "AstroWhisper's daily horoscopes are spot on! They've given me clarity and guidance in my daily life.",
      image: 'https://images.unsplash.com/photo-1599507348368-399994a19997?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      name: 'Raj Patel',
      text: 'The AstroBot is incredibly helpful! I asked about my career, and the insights were surprisingly accurate and actionable.',
      image: 'https://images.unsplash.com/photo-1544005313-943cb025c0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      name: 'Emily Chen',
      text: 'I love the tarot readings! They provide a unique perspective and have helped me understand my relationships better.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Navbar />
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

      <section className="py-24 md:py-32 px-6 bg-astro-navy/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/horoscope" className="glass-card p-6 hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <Sun className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Daily Horoscopes</h3>
              </div>
              <p className="text-gray-300">Get personalized insights into your day based on your zodiac sign.</p>
            </Link>
            <Link to="/tarot" className="glass-card p-6 hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Tarot Readings</h3>
              </div>
              <p className="text-gray-300">Unlock hidden truths and guidance with a personalized tarot card reading.</p>
            </Link>
            <Link to="/astrobot" className="glass-card p-6 hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <MessageCircle className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Ask AstroBot</h3>
              </div>
              <p className="text-gray-300">Get instant answers to your burning questions with our AI-powered astrologer.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-unbounded text-white">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                <p className="text-gray-300 italic mt-2">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-astro-navy/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-unbounded text-white">
            Explore the Cosmos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/birthchart" className="glass-card p-6 hover:scale-105">
              <Star className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Birth Charts</h3>
              <p className="text-gray-300">Discover your unique cosmic blueprint.</p>
            </Link>
            <Link to="/compatibility" className="glass-card p-6 hover:scale-105">
              <Heart className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Compatibility</h3>
              <p className="text-gray-300">Find out how compatible you are with others.</p>
            </Link>
            <Link to="/transit" className="glass-card p-6 hover:scale-105">
              <Map className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Transit Forecast</h3>
              <p className="text-gray-300">Plan your future with astrological insights.</p>
            </Link>
            <Link to="/learn" className="glass-card p-6 hover:scale-105">
              <BookOpen className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Learn Astrology</h3>
              <p className="text-gray-300">Expand your knowledge of the stars.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

const Heart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3.5c-1.71 0-3 1.02-3.5 2.14C12.5 4.52 11 3.5 9.5 3.5A5.5 5.5 0 0 0 4 8.5c0 2.29 1.51 4.04 3 5.5L12 21l7-7Z"/></svg>
);

const BookOpen = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
