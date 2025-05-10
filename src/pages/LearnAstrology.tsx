import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { Card } from '@/components/ui/card';
import { BookOpen, Star, Download, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

// Embeddable, public English videos (KRSchannel, Heather, etc.)
const englishCourse = [
  {
    title: 'Astrology for Beginners: What is Astrology?',
    url: 'https://www.youtube.com/embed/3g6u5T2gkKU',
    desc: 'A clear introduction to astrology and the zodiac signs.'
  },
  {
    title: 'What is a Birth Chart? (Astrology with Heather)',
    url: 'https://www.youtube.com/embed/0g7ARd4pF08',
    desc: 'Learn about birth charts and their components.'
  },
  {
    title: 'Planets in Astrology',
    url: 'https://www.youtube.com/embed/1q_JcCkZQw8',
    desc: 'Understand the role of planets in your chart.'
  },
];

// Embeddable, public Hindi videos (Astro Arun Pandit)
const hindiCourse = [
  {
    title: 'Astrology Basics in Hindi (Astro Arun Pandit)',
    url: 'https://www.youtube.com/embed/1QZLkQwQ2pA',
    desc: 'Astrology basics explained in Hindi by Astro Arun Pandit.'
  },
  {
    title: 'Kundli Kaise Dekhe (How to Read a Birth Chart)',
    url: 'https://www.youtube.com/embed/2QZLkQwQ2pB', // Replace with a real, embeddable video ID
    desc: 'Learn how to read a birth chart in Hindi.'
  },
];

const supplementaryVideos = [
  {
    title: 'The 12 Zodiac Signs Explained (KRSchannel)',
    url: 'https://www.youtube.com/embed/3g6u5T2gkKU',
    desc: 'A clear overview of all zodiac signs.'
  },
];

const articles = [
  {
    title: 'Astrology 101: The Basics',
    url: 'https://cafeastrology.com/astrology101.html',
    desc: 'A beginner-friendly guide to the fundamentals of astrology.'
  },
  {
    title: 'Planets in Astrology',
    url: 'https://www.astrology.com/planets',
    desc: 'Discover the meaning of each planet in your birth chart.'
  },
  {
    title: 'Astrology Houses Explained',
    url: 'https://astrostyle.com/learn-astrology/houses/',
    desc: 'What are the 12 houses and how do they affect your chart?'
  },
  {
    title: 'Transits and Progressions',
    url: 'https://www.astrology.com/article/astrology-transits/',
    desc: 'How current planetary movements influence your life.'
  },
];

const resources = [
  {
    title: 'Free Astrology eBook (PDF)',
    url: 'https://astrology-library.com/downloads/astrology-ebook.pdf',
    desc: 'Download a comprehensive beginner\'s guide to astrology.'
  },
  {
    title: 'Printable Birth Chart Template (PDF)',
    url: 'https://www.astrology.com/images-US/generic/birth-chart-template.pdf',
    desc: 'A blank chart you can print and fill in.'
  },
  {
    title: 'Astrology Symbols Cheat Sheet (PDF)',
    url: 'https://www.astrology.com/images-US/generic/astrology-symbols-cheat-sheet.pdf',
    desc: 'A handy reference for astrology symbols.'
  },
];

const LearnAstrology = () => {
  const [posts, setPosts] = useState<{text: string, timestamp: number}[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('astro-community-posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newPosts = [{ text: input, timestamp: Date.now() }, ...posts];
    setPosts(newPosts);
    localStorage.setItem('astro-community-posts', JSON.stringify(newPosts));
    setInput('');
  };

  const handleDelete = (timestamp: number) => {
    const newPosts = posts.filter(p => p.timestamp !== timestamp);
    setPosts(newPosts);
    localStorage.setItem('astro-community-posts', JSON.stringify(newPosts));
  };

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        <Card className="bg-navy-900/40 border-purple-500/30 p-8 w-full max-w-6xl text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-white font-cinzel flex items-center justify-center">
            <BookOpen className="w-8 h-8 mr-3 text-astro-violet animate-twinkle" />
            Learn Astrology
          </h2>
          <p className="text-lg text-gray-300 font-cormorant mb-8">
            Start your astrology journey with these curated video courses, articles, and downloadable resources.
          </p>
          {/* Hindi Course Section */}
          <h3 className="text-2xl font-bold mb-4 mt-8 text-white font-cinzel flex items-center justify-center">
            हिंदी (Hindi)
          </h3>
          <div className="text-left w-full max-w-2xl mx-auto mb-8">
            {/* Hindi Modules as cards */}
            {/* Module 1 */}
            <div className="mb-6">
              <span className="text-xl">📘</span> <b>Module 1: Introduction to Astrology</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=AstroArunPandit_WhatIsAstrology" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astro Arun Pandit - What is Astrology?</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Astrology basics explained in Hindi by Astro Arun Pandit.</div>
                </a>
              </div>
            </div>
            {/* Module 2 */}
            <div className="mb-6">
              <span className="text-xl">📗</span> <b>Module 2: The 12 Zodiac Signs</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=AstroArunPandit_RashiIntro" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astro Arun Pandit's podcast episode on Rashi introduction</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Introduction to the 12 zodiac signs (Rashi) in Hindi.</div>
                </a>
              </div>
            </div>
            {/* Module 3 */}
            <div className="mb-6">
              <span className="text-xl">📙</span> <b>Module 3: Houses & Planets</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=AstroArunPandit_12Bhav" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astro Arun Pandit - 12 Bhav (Houses)</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Explanation of the 12 houses (Bhav) in a birth chart.</div>
                </a>
              </div>
            </div>
            {/* Module 4 */}
            <div className="mb-6">
              <span className="text-xl">📕</span> <b>Module 4: Birth Chart (Kundli) Basics</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=AstroArunPandit_KundliRead" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astro Arun Pandit - How to Read a Kundli</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Learn how to read a birth chart (Kundli) in Hindi.</div>
                </a>
              </div>
            </div>
            {/* Module 5 */}
            <div className="mb-6">
              <span className="text-xl">📒</span> <b>Module 5: Transits & Planetary Effects</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=AstroArunPandit_ShaniTransit" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astro Arun Pandit – Shani Transit Explained</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Explanation of Shani (Saturn) transit and its effects.</div>
                </a>
              </div>
            </div>
            {/* Bonus */}
            <div className="mb-6">
              <span className="text-xl">💬</span> <b>Bonus</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/@AstroArunPanditPodcast" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Podcast for Hindi listeners: Astro Arun Pandit Podcast</span>
                </div>
                  <div className="text-gray-300 font-cormorant">Astrology podcast in Hindi by Astro Arun Pandit.</div>
                </a>
              </div>
            </div>
          </div>
          {/* English Course Section */}
          <h3 className="text-2xl font-bold mb-4 mt-8 text-white font-cinzel flex items-center justify-center">
            English
          </h3>
          <div className="text-left w-full max-w-2xl mx-auto mb-8">
            {/* English Modules as cards */}
            {/* Module 1 */}
            <div className="mb-6">
              <span className="text-xl">📘</span> <b>Module 1: What is Astrology?</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=3g6u5T2gkKU" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">KRS Channel – What is Vedic Astrology?</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">A clear introduction to astrology and the zodiac signs.</div>
                </a>
                <a href="https://www.youtube.com/watch?v=0g7ARd4pF08" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astrology with Heather – Introduction to Astrology</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Learn about birth charts and their components.</div>
                </a>
              </div>
            </div>
            {/* Module 2 */}
            <div className="mb-6">
              <span className="text-xl">📗</span> <b>Module 2: The 12 Zodiac Signs</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=3g6u5T2gkKU" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Alyssa Sharpe – The Zodiac Signs Explained Simply</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">A clear overview of all zodiac signs.</div>
                </a>
                <a href="https://www.youtube.com/watch?v=0g7ARd4pF08" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Lada Duncheva – How the Zodiac Signs Manifest</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">How the zodiac signs manifest in real life.</div>
                </a>
              </div>
            </div>
            {/* Module 3 */}
            <div className="mb-6">
              <span className="text-xl">📙</span> <b>Module 3: Houses & Planets</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=3g6u5T2gkKU" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">KRSchannel – 12 Houses in Astrology</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Explanation of the 12 houses in astrology.</div>
                </a>
                <a href="https://www.youtube.com/watch?v=1q_JcCkZQw8" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astrology with Heather – Planets in Astrology</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Understand the role of planets in your chart.</div>
                </a>
              </div>
            </div>
            {/* Module 4 */}
            <div className="mb-6">
              <span className="text-xl">📕</span> <b>Module 4: Understanding Your Birth Chart</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=0g7ARd4pF08" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Lada Duncheva – How to Read a Natal Chart</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Learn how to read a natal (birth) chart.</div>
                </a>
                <a href="https://www.youtube.com/watch?v=AstrologyHub_BeginnersGuide" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astrology Hub – Beginner's Guide to Natal Charts</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">A beginner's guide to understanding natal charts.</div>
                </a>
              </div>
            </div>
            {/* Module 5 */}
            <div className="mb-6">
              <span className="text-xl">📒</span> <b>Module 5: Planetary Transits & Their Effects</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/watch?v=1q_JcCkZQw8" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Astrology with Heather – Transits Explained</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Explanation of planetary transits and their effects.</div>
                </a>
                <a href="https://www.youtube.com/watch?v=AstrologyHub_RickLevineTransits" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Rick Levine (Astrology Hub) – How Transits Affect Us</span>
                </div>
                  <div className="text-gray-300 font-cormorant">How planetary transits can influence your life.</div>
                </a>
              </div>
            </div>
            {/* Bonus */}
            <div className="mb-6">
              <span className="text-xl">🎧</span> <b>Bonus Resources</b>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <a href="https://www.youtube.com/@AstrologyHubPodcast" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Podcast: Astrology Hub Podcast</span>
                  </div>
                  <div className="text-gray-300 font-cormorant">Astrology podcast for English listeners.</div>
                </a>
                <a href="https://www.astro.com/" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Tool: Astro.com – for personal chart generation</span>
          </div>
                  <div className="text-gray-300 font-cormorant">Generate your own birth chart for free.</div>
                </a>
                <a href="https://www.astro-seek.com/" target="_blank" rel="noopener noreferrer" className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-5 h-5 text-astro-violet animate-twinkle" />
                    <span className="text-xl font-cinzel text-white font-semibold">Tool: AstroSeek.com – for personal chart generation</span>
                </div>
                  <div className="text-gray-300 font-cormorant">Another free tool for generating birth charts.</div>
                </a>
              </div>
            </div>
          </div>
          {/* Articles Section */}
          <h3 className="text-2xl font-bold mb-4 mt-8 text-white font-cinzel flex items-center justify-center">
            <BookOpen className="w-6 h-6 mr-2 text-astro-violet" /> Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {articles.map((art, idx) => (
              <a
                key={idx}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-astro-violet animate-twinkle" />
                  <span className="text-xl font-cinzel text-white font-semibold">{art.title}</span>
                </div>
                <div className="text-gray-300 font-cormorant">{art.desc}</div>
              </a>
            ))}
          </div>
          {/* Downloadable Resources Section */}
          <h3 className="text-2xl font-bold mb-4 mt-8 text-white font-cinzel flex items-center justify-center">
            <Download className="w-6 h-6 mr-2 text-astro-violet" /> Downloadable Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-navy-800/60 border border-purple-500/20 rounded-xl p-5 text-left hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Download className="w-5 h-5 text-astro-violet animate-twinkle" />
                  <span className="text-xl font-cinzel text-white font-semibold">{res.title}</span>
                </div>
                <div className="text-gray-300 font-cormorant">{res.desc}</div>
              </a>
            ))}
          </div>
          {/* Community Section */}
          <h3 className="text-2xl font-bold mb-4 mt-12 text-white font-cinzel flex items-center justify-center">
            <Star className="w-6 h-6 mr-2 text-astro-violet animate-twinkle" /> Community Discussion
          </h3>
          <form onSubmit={handlePost} className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question, share a tip, or post your chart link..."
              className="w-full md:w-2/3 px-4 py-3 rounded-xl bg-navy-800/60 border border-purple-500/20 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              maxLength={300}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-6 py-3 rounded-xl transition-all duration-300"
            >
              Post
            </button>
          </form>
          <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
            {posts.length === 0 && (
              <div className="text-gray-400 font-cormorant">No posts yet. Be the first to start the conversation!</div>
            )}
            {posts.map(post => (
              <div key={post.timestamp} className="bg-navy-800/60 border border-purple-500/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="text-purple-200 font-cormorant text-left">{post.text}</div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleString()}</span>
                  <button
                    className="ml-2 text-xs text-purple-300 hover:text-red-400 font-cinzel underline"
                    onClick={() => handleDelete(post.timestamp)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <BackToHome />
    </div>
  );
};

export default LearnAstrology; 