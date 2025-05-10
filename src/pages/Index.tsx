import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, ChevronRight, MessageCircle, Sparkles, Book, ArrowLeft, ArrowRight, Globe2, User, Star as StarIcon, BookOpen, Mail, Github, Twitter, Facebook, Instagram, ArrowUp, UserCircle } from 'lucide-react';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Stars from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    name: 'Sophia L.',
    sign: 'Pisces',
    message: 'This app gave me so much clarity about my birth chart! The daily guidance feels spot on.'
  },
  {
    name: 'Marcus T.',
    sign: 'Leo',
    message: 'The tarot readings are beautiful and eerily accurate. I love the interactive design!'
  },
  {
    name: 'Ava R.',
    sign: 'Gemini',
    message: 'I check my horoscope here every morning. The personalized insights are a game changer.'
  },
  {
    name: 'Jin S.',
    sign: 'Capricorn',
    message: 'The birth chart wheel is stunning and easy to understand. Highly recommend!'
  },
  {
    name: 'Priya D.',
    sign: 'Libra',
    message: 'I love sharing my chart with friends. The social features are so fun!'
  },
  {
    name: 'Carlos M.',
    sign: 'Sagittarius',
    message: 'The weekly forecasts are always insightful and help me plan my week.'
  },
  {
    name: 'Emily W.',
    sign: 'Virgo',
    message: 'The glossary and learning tools made astrology so much more approachable for me.'
  },
  {
    name: 'Noah B.',
    sign: 'Aries',
    message: 'AstroBot is my favorite! The quick replies and voice features are super helpful.'
  },
  {
    name: 'Lina K.',
    sign: 'Cancer',
    message: 'I love the glowing design and how easy it is to use on my phone.'
  },
  {
    name: 'Zara F.',
    sign: 'Aquarius',
    message: 'The transits and progressions features are so unique. I feel truly seen!'
  }
];

const COSMIC_EVENTS = [
  {
    title: 'Mercury Retrograde',
    desc: 'Communication and travel may be unpredictable. Reflect, review, and double-check details.',
    color: 'from-purple-700 to-indigo-700'
  },
  {
    title: 'Full Moon in Scorpio',
    desc: 'Emotions run deep. A powerful time for transformation and release.',
    color: 'from-indigo-700 to-purple-700'
  },
  {
    title: 'Venus in Leo',
    desc: 'Romance and creativity are in the spotlight. Express your heart boldly!',
    color: 'from-pink-600 to-purple-600'
  },
  {
    title: 'Sun Enters Cancer',
    desc: 'Focus on home, family, and emotional well-being. Nurture yourself and others.',
    color: 'from-blue-700 to-purple-700'
  }
];

const Index = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [currentZodiacIndex, setCurrentZodiacIndex] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialsToShow = 5;
  const totalTestimonials = TESTIMONIALS.length;
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', sign: '', message: '' });

  const todayEvent = COSMIC_EVENTS[new Date().getDate() % COSMIC_EVENTS.length];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Change the center zodiac sign every 3 seconds
    const interval = setInterval(() => {
      setCurrentZodiacIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Shooting stars animation effect
  useEffect(() => {
    const container = heroBgRef.current;
    if (!container) return;
    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i++) {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = `${Math.random() * 80 + 5}%`;
      star.style.left = `${Math.random() * 90 + 5}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(star);
      stars.push(star);
    }
    return () => {
      stars.forEach(star => container.removeChild(star));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const getVisibleTestimonials = () => {
    const arr = [];
    for (let i = 0; i < testimonialsToShow; i++) {
      arr.push(TESTIMONIALS[(testimonialIdx + i) % totalTestimonials]);
    }
    return arr;
  };

  const handlePrevTestimonial = () => setTestimonialIdx((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  const handleNextTestimonial = () => setTestimonialIdx((prev) => (prev + 1) % totalTestimonials);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleTestimonialChange = (e) => setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });
  const handleTestimonialSubmit = (e) => { e.preventDefault(); setShowTestimonialModal(false); setTestimonialForm({ name: '', sign: '', message: '' }); alert('Thank you for sharing your experience!'); };
  const featuredUser = { name: 'Maya P.', sign: 'Sagittarius', quote: 'AstroWhisper helped me understand my cosmic path and connect with amazing people!' };

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Stars count={150} />
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 relative">
        <div ref={heroBgRef} className="absolute inset-0 pointer-events-none z-0">
          {/* Shooting stars and twinkling stars will be rendered here */}
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-cinzel text-white leading-tight">
              Discover Your<br />Cosmic Guidance
            </h1>
            <p className="text-xl font-cormorant text-gray-300 leading-relaxed mb-10 max-w-lg">
              Unlock the mysteries of the universe with AI-powered astrological insights, tarot readings, and personalized guidance.
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-start">
              <Link to="/birthchart" className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full px-8 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,68,211,0.8)] flex items-center justify-center font-cinzel">
                Explore Your Stars
              </Link>
              <Link to="/horoscope" className="bg-transparent text-white border border-purple-500/50 rounded-full px-8 py-3 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center font-cinzel">
                <Moon className="mr-2 h-5 w-5" />
                Today's Horoscope
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {/* Updated Zodiac Wheel */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40"></div>
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-purple-500/50"></div>
              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-purple-500/60"></div>
              
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
                      <div className="w-12 h-12 rounded-full bg-navy-900/80 backdrop-blur-sm flex items-center justify-center border border-purple-500/70 shadow-[0_0_15px_rgba(159,68,211,0.5)]">
                        <span className="text-astro-glow text-2xl">{sign.symbol}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Center Zodiac Icon - Changes periodically */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-astro-purple to-astro-violet flex items-center justify-center shadow-[0_0_30px_rgba(159,68,211,0.8)] transition-all duration-1000 ease-in-out">
                  <span className="text-white text-5xl transition-opacity duration-500">
                    {zodiacSigns[currentZodiacIndex].symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`w-full flex flex-col items-center py-6 px-4 animate-fade-in`}> 
        <div className={`w-full max-w-3xl rounded-2xl bg-gradient-to-br ${todayEvent.color} border-2 border-purple-500/40 shadow-[0_0_30px_rgba(159,68,211,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 p-6`}> 
          <div className="flex items-center gap-4"> 
            <Calendar className="w-10 h-10 text-yellow-300 animate-twinkle" /> 
            <div> 
              <h3 className="text-xl md:text-2xl font-bold text-white font-cinzel mb-1">{todayEvent.title}</h3> 
              <p className="text-purple-100 font-cormorant text-base md:text-lg">{todayEvent.desc}</p> 
            </div> 
          </div> 
        </div> 
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-transparent w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-10 font-cinzel text-white flex items-center gap-3">
          <StarIcon className="w-7 h-7 text-astro-violet animate-twinkle" />
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl">
          <div className="bg-navy-900/60 border border-purple-500/30 rounded-xl p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(159,68,211,0.3)] hover:shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-300">
            <User className="w-10 h-10 text-astro-glow mb-4" />
            <h3 className="text-xl font-bold text-white font-cinzel mb-2">Create Your Profile</h3>
            <p className="text-gray-300 font-cormorant">Enter your birth details and preferences to unlock personalized astrology and tarot insights.</p>
          </div>
          <div className="bg-navy-900/60 border border-purple-500/30 rounded-xl p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(159,68,211,0.3)] hover:shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-300">
            <Globe2 className="w-10 h-10 text-astro-glow mb-4" />
            <h3 className="text-xl font-bold text-white font-cinzel mb-2">Explore Cosmic Tools</h3>
            <p className="text-gray-300 font-cormorant">Access your birth chart, daily horoscope, tarot readings, and more—all powered by AI.</p>
          </div>
          <div className="bg-navy-900/60 border border-purple-500/30 rounded-xl p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(159,68,211,0.3)] hover:shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-300">
            <BookOpen className="w-10 h-10 text-astro-glow mb-4" />
            <h3 className="text-xl font-bold text-white font-cinzel mb-2">Learn & Grow</h3>
            <p className="text-gray-300 font-cormorant">Discover astrology basics, glossary, and tips to deepen your cosmic understanding.</p>
          </div>
          <div className="bg-navy-900/60 border border-purple-500/30 rounded-xl p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(159,68,211,0.3)] hover:shadow-[0_0_30px_rgba(159,68,211,0.5)] transition-all duration-300">
            <Sparkles className="w-10 h-10 text-astro-glow mb-4" />
            <h3 className="text-xl font-bold text-white font-cinzel mb-2">Shine & Share</h3>
            <p className="text-gray-300 font-cormorant">Save your charts, share insights, and connect with the cosmic community.</p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-6 bg-astro-navy/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 font-cinzel text-white">Cosmic Services</h2>
          <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto font-cormorant">
            Explore our mystical AI-powered tools to gain insight into your past, present, and future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sun className="w-10 h-10 text-astro-glow" />,
                title: "Daily Horoscope",
                description: "Receive personalized daily guidance based on your zodiac sign and planetary alignments.",
                link: "/horoscope",
                cta: "Read today's stars"
              },
              {
                icon: <Book className="w-10 h-10 text-astro-glow" />,
                title: "Tarot Reading",
                description: "Draw virtual tarot cards with AI-generated interpretations tailored to your spiritual journey.",
                link: "/tarot",
                cta: "Pull your cards"
              },
              {
                icon: <MessageCircle className="w-10 h-10 text-astro-glow" />,
                title: "Ask AstroBot",
                description: "Chat with our mystical AI companion for personalized guidance on life's burning questions.",
                link: "/astrobot",
                cta: "Start chatting"
              },
              {
                icon: <Sparkles className="w-10 h-10 text-astro-glow" />,
                title: "Birth Chart",
                description: "Generate your complete astrological blueprint based on your exact birth time and location.",
                link: "/birthchart",
                cta: "Map your stars"
              }
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group p-8 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,68,211,0.4)]"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-900/40 border border-purple-500/30">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white font-cinzel">{service.title}</h3>
                <p className="text-gray-300 mb-6 font-cormorant text-lg">{service.description}</p>
                <span className="text-astro-glow group-hover:text-astro-lilac flex items-center font-cinzel">
                  {service.cta} <ChevronRight className="ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col items-center mt-20 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-cinzel mb-8 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-astro-violet animate-twinkle" />
          What Our Users Say
        </h2>
        <div className="flex items-center w-full max-w-7xl">
          <button
            onClick={handlePrevTestimonial}
            className="mr-4 bg-navy-900/80 border border-purple-500/30 rounded-full p-3 hover:bg-purple-700/30 transition z-10"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="w-7 h-7 text-purple-300" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 flex-grow">
            {getVisibleTestimonials().map((t, idx) => (
              <Card
                key={idx}
                className="bg-navy-900/60 border-purple-500/40 p-8 rounded-xl text-center shadow-[0_0_20px_rgba(159,68,211,0.4)] hover:shadow-[0_0_30px_rgba(159,68,211,0.7)] transition-all duration-300 border-2 hover:border-purple-400 animate-fade-in"
              >
                <div className="text-lg text-purple-200 font-cormorant mb-4">“{t.message}”</div>
                <div className="text-sm text-gray-400 font-cinzel">— {t.name}, <span className="text-purple-300">{t.sign}</span></div>
              </Card>
            ))}
          </div>
          <button
            onClick={handleNextTestimonial}
            className="ml-4 bg-navy-900/80 border border-purple-500/30 rounded-full p-3 hover:bg-purple-700/30 transition z-10"
            aria-label="Next testimonials"
          >
            <ArrowRight className="w-7 h-7 text-purple-300" />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 mt-20 mb-12 max-w-6xl mx-auto">
        {/* Share Experience Card */}
        <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border-purple-500/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(159,68,211,0.3)] flex-1 h-full min-h-[240px] flex flex-col items-center animate-fade-in">
          <h3 className="text-xl md:text-2xl font-bold text-white font-cinzel mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-astro-violet animate-twinkle" />
            Share Your Experience
          </h3>
          <p className="text-purple-200 font-cormorant mb-6 text-center">We love hearing from our cosmic community! Share your testimonial and inspire others.</p>
          <Button onClick={() => setShowTestimonialModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-8 py-3 rounded-xl text-lg transition-all duration-300 mt-auto">
            Submit Testimonial
          </Button>
        </Card>
        {/* Featured User Card */}
        <Card className="bg-navy-900/60 border-purple-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(159,68,211,0.3)] flex-1 h-full min-h-[240px] flex flex-col items-center animate-fade-in">
          <UserCircle className="w-14 h-14 text-astro-glow mb-4" />
          <h3 className="text-xl font-bold text-white font-cinzel mb-1">Featured User</h3>
          <div className="text-purple-300 font-cinzel mb-2">{featuredUser.name} <span className="text-purple-400">({featuredUser.sign})</span></div>
          <p className="text-purple-200 font-cormorant text-center mt-auto">“{featuredUser.quote}”</p>
        </Card>
      </div>

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-navy-900/90 border border-purple-500/40 rounded-2xl p-8 max-w-lg w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-astro-violet animate-twinkle" /> Share Your Experience
            </h2>
            <form onSubmit={handleTestimonialSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={testimonialForm.name}
                onChange={handleTestimonialChange}
                placeholder="Your Name"
                className="px-4 py-3 rounded-xl bg-navy-800/70 border border-purple-500/30 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-lg"
                required
              />
              <input
                type="text"
                name="sign"
                value={testimonialForm.sign}
                onChange={handleTestimonialChange}
                placeholder="Your Zodiac Sign"
                className="px-4 py-3 rounded-xl bg-navy-800/70 border border-purple-500/30 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-lg"
                required
              />
              <textarea
                name="message"
                value={testimonialForm.message}
                onChange={handleTestimonialChange}
                placeholder="Share your experience..."
                className="px-4 py-3 rounded-xl bg-navy-800/70 border border-purple-500/30 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-lg"
                rows={4}
                required
              />
              <div className="flex gap-4 justify-center mt-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-8 py-3 rounded-xl text-lg transition-all duration-300">
                  Submit
                </Button>
                <Button type="button" onClick={() => setShowTestimonialModal(false)} className="bg-navy-800 border border-purple-500/30 text-purple-200 font-cinzel px-8 py-3 rounded-xl text-lg transition-all duration-300">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center mt-20">
        <Card className="bg-navy-900/60 border-purple-500/30 p-10 rounded-2xl shadow-[0_0_30px_rgba(159,68,211,0.3)] max-w-3xl w-full flex flex-col items-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-cinzel mb-4 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-astro-violet animate-twinkle" />
            Featured Astrology Article
          </h2>
          <p className="text-lg text-purple-200 font-cormorant mb-6 text-center">
            <b>Unlocking the Secrets of Your Birth Chart:</b> Discover how planetary placements shape your personality, relationships, and life path. Learn the basics of reading your chart and start your journey to cosmic self-awareness.
          </p>
          <Link
            to="/learn-astrology"
            className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-8 py-3 rounded-xl text-lg transition-all duration-300 shadow-[0_0_15px_rgba(159,68,211,0.4)]"
          >
            Learn More
          </Link>
        </Card>
      </div>

      <div className="w-full flex flex-col items-center mt-20 mb-12">
        <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border-purple-500/40 p-10 rounded-2xl shadow-[0_0_40px_rgba(159,68,211,0.3)] max-w-2xl w-full flex flex-col items-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-cinzel mb-4 flex items-center gap-2">
            <Mail className="w-7 h-7 text-astro-violet animate-twinkle" />
            Get Weekly Cosmic Insights
          </h2>
          <p className="text-lg text-purple-200 font-cormorant mb-6 text-center">Sign up for exclusive astrology tips, event updates, and more—delivered to your inbox.</p>
          <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-xl bg-navy-900/70 border border-purple-500/30 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-lg"
              required
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-8 py-3 rounded-xl text-lg transition-all duration-300">
              Subscribe
            </Button>
          </form>
        </Card>
      </div>

      <footer className="w-full bg-navy-900/80 border-t border-purple-500/20 py-10 px-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <StarIcon className="w-7 h-7 text-astro-violet animate-twinkle" />
            <span className="text-lg font-cinzel text-white font-bold">AstroWhisper</span>
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center text-purple-200 font-cinzel text-sm">
            <a href="/about" className="hover:text-purple-400 transition">About</a>
            <a href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-purple-400 transition">Terms</a>
            <a href="/contact" className="hover:text-purple-400 transition">Contact</a>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition"><Twitter className="w-5 h-5" /></a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition"><Facebook className="w-5 h-5" /></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition"><Instagram className="w-5 h-5" /></a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-8 font-cinzel">
          &copy; {new Date().getFullYear()} AstroWhisper. All rights reserved.
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-purple-700 to-indigo-700 text-white p-4 rounded-full shadow-lg border-2 border-purple-400 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
