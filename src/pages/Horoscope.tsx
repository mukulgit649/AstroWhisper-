import { useState, useEffect } from 'react';
import { Calendar, Moon, Sparkles, Star, Bookmark, BookmarkCheck, MessageCircle, Share2, Facebook, Twitter, Send, Heart, Briefcase, Activity, ArrowLeft, ArrowRight, SunMoon, Award, Dice5, HelpCircle, Volume2, ThumbsUp, ThumbsDown, Globe2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import ZodiacGrid from '@/components/horoscope/ZodiacGrid';
import SignDetails from '@/components/horoscope/SignDetails';
import { getZodiacData, getDailyLuckyElements } from '@/utils/zodiacData';
import { getWeeklyForecast } from '@/utils/weeklyForecast';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';

// Daily guidance message pools for each sign and category
const DAILY_GUIDANCE = {
  Aries: {
    love: [
      "Let your passion lead the way in love today.",
      "Open your heart to new adventures in romance.",
      "Express your feelings boldly—someone special is listening.",
      "A spark from the past may reignite.",
      "Take the initiative in matters of the heart."
    ],
    career: [
      "Take bold steps at work—your courage is noticed.",
      "A new challenge brings growth; embrace it.",
      "Lead a project and inspire your team.",
      "Your ambition opens doors today.",
      "Stay focused—success is within reach."
    ],
    health: [
      "Channel your energy into a new fitness goal.",
      "Try a high-intensity workout for a boost.",
      "Balance action with rest for best results.",
      "Hydrate and fuel your body for adventure.",
      "Listen to your body's signals—don't overdo it."
    ],
    newMoon: [
      "Set intentions for bold new beginnings.",
      "A fresh start in love or career is possible.",
      "Plant seeds for a personal project.",
      "Embrace change and let go of old fears.",
      "Visualize your next big adventure."
    ],
    majorTransit: [
      "Mars energizes your sign—take action!",
      "Venus brings harmony to relationships.",
      "Mercury inspires clear communication.",
      "Jupiter expands your opportunities.",
      "Saturn rewards your discipline today."
    ]
  },
  Taurus: {
    love: [
      "Stability and comfort deepen your bonds.",
      "A gentle gesture brings romance closer.",
      "Nurture your relationship with patience.",
      "A surprise from a loved one warms your heart.",
      "Trust builds a strong foundation in love."
    ],
    career: [
      "Steady progress leads to lasting results.",
      "Your reliability is valued at work.",
      "Focus on practical solutions today.",
      "Financial opportunities may arise—be ready.",
      "Persistence pays off in your career."
    ],
    health: [
      "Enjoy nourishing foods and mindful eating.",
      "A walk in nature restores your energy.",
      "Prioritize rest and relaxation.",
      "Gentle movement supports your well-being.",
      "Listen to your body's need for comfort."
    ],
    newMoon: [
      "Set intentions for abundance and security.",
      "A new financial plan brings peace of mind.",
      "Start a self-care ritual.",
      "Plant seeds for long-term growth.",
      "Embrace new routines for stability."
    ],
    majorTransit: [
      "Venus enhances your charm—connect with others.",
      "Mars motivates you to take practical action.",
      "Mercury brings clarity to your finances.",
      "Jupiter expands your resources.",
      "Saturn helps you build strong foundations."
    ]
  },
  // ...repeat for all other signs (Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces)
};

// Helper to get daily rotating index
function getDailyIndex(seed: string, len: number) {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < seed.length + date.length; i++) {
    hash += (seed.charCodeAt(i % seed.length) + date.charCodeAt(i % date.length));
  }
  return hash % len;
}

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const [userBirthDate, setUserBirthDate] = useState<string | null>(null);
  const [showBirthday, setShowBirthday] = useState(false);
  const luckyElements = getDailyLuckyElements(selectedSign);
  const weeklyForecast = getWeeklyForecast(selectedSign);
  const today = new Date();
  const [favoriteHoroscopes, setFavoriteHoroscopes] = useState<string[]>([]);
  const [comments, setComments] = useState<{text: string, timestamp: number}[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [viewDate, setViewDate] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [luckyDraw, setLuckyDraw] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [usageCount, setUsageCount] = useState(0);

  // Load preferred sign and birth date from localStorage
  useEffect(() => {
    const savedSign = localStorage.getItem('preferredSign');
    if (savedSign) setSelectedSign(savedSign);
    const savedBirth = localStorage.getItem('userBirthDate');
    if (savedBirth) setUserBirthDate(savedBirth);
  }, []);

  // Save preferred sign to localStorage
  useEffect(() => {
    localStorage.setItem('preferredSign', selectedSign);
  }, [selectedSign]);

  // Check for birthday
  useEffect(() => {
    if (userBirthDate) {
      const [year, month, day] = userBirthDate.split('-').map(Number);
      if (
        today.getMonth() + 1 === month &&
        today.getDate() === day
      ) {
        setShowBirthday(true);
      } else {
        setShowBirthday(false);
      }
    }
  }, [userBirthDate, today]);

  // Load favorites and comments from localStorage
  useEffect(() => {
    const favs = localStorage.getItem('favoriteHoroscopes');
    if (favs) setFavoriteHoroscopes(JSON.parse(favs));
    const savedComments = localStorage.getItem('horoscope-comments');
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteHoroscopes', JSON.stringify(favoriteHoroscopes));
  }, [favoriteHoroscopes]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('horoscope-comments', JSON.stringify(comments));
  }, [comments]);

  // Bookmark logic
  const currentHoroscopeKey = `${selectedSign}-${today.toLocaleDateString('en-US')}`;
  const isBookmarked = favoriteHoroscopes.includes(currentHoroscopeKey);
  const handleBookmark = () => {
    if (isBookmarked) {
      setFavoriteHoroscopes(favoriteHoroscopes.filter(k => k !== currentHoroscopeKey));
    } else {
      setFavoriteHoroscopes([...favoriteHoroscopes, currentHoroscopeKey]);
    }
  };

  // Social share handlers
  const shareText = `${selectedSign} Horoscope for ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}:\n✨ Your cosmic guidance for today:\n${getZodiacData(selectedSign)?.description}`;
  const shareUrl = window.location.href;

  // Comment logic
  const handleCommentPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComments = [{ text: commentInput, timestamp: Date.now() }, ...comments];
    setComments(newComments);
    setCommentInput('');
  };

  const handleCommentDelete = (timestamp: number) => {
    setComments(comments.filter(c => c.timestamp !== timestamp));
  };

  // Prompt to save birth date if not set
  const handleSaveBirthDate = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('birthdate') as HTMLInputElement;
    if (input.value) {
      setUserBirthDate(input.value);
      localStorage.setItem('userBirthDate', input.value);
    }
  };

  // Mini-horoscopes (placeholders)
  const miniHoroscopes = {
    love: "Love: Open your heart to new connections and nurture existing bonds.",
    career: "Career: Stay focused on your goals; opportunities are on the horizon.",
    health: "Health: Take time for self-care and listen to your body's needs."
  };

  // Tomorrow/Yesterday navigation
  const handlePrevDay = () => {
    const prev = new Date(viewDate);
    prev.setDate(prev.getDate() - 1);
    setViewDate(prev);
  };
  const handleNextDay = () => {
    const next = new Date(viewDate);
    next.setDate(next.getDate() + 1);
    setViewDate(next);
  };

  // Moon phase widget (placeholder)
  const moonPhases = [
    { phase: 'New Moon', desc: 'A time for new beginnings and setting intentions.' },
    { phase: 'First Quarter', desc: 'Take action and overcome challenges.' },
    { phase: 'Full Moon', desc: 'Celebrate achievements and release what no longer serves you.' },
    { phase: 'Last Quarter', desc: 'Reflect, rest, and prepare for the next cycle.' }
  ];
  const moonPhase = moonPhases[viewDate.getDate() % 4];

  // Major transit (placeholder)
  const majorTransit = "Mars trine Jupiter: Take bold action—luck is on your side!";

  // Daily streak logic
  useEffect(() => {
    const todayStr = today.toDateString();
    const last = localStorage.getItem('horoscope-last-visit');
    const streakVal = parseInt(localStorage.getItem('horoscope-streak') || '0', 10);
    if (last === todayStr) {
      setStreak(streakVal);
    } else {
      if (last && new Date(last).getTime() === new Date(todayStr).getTime() - 86400000) {
        setStreak(streakVal + 1);
        localStorage.setItem('horoscope-streak', (streakVal + 1).toString());
      } else {
        setStreak(1);
        localStorage.setItem('horoscope-streak', '1');
      }
      localStorage.setItem('horoscope-last-visit', todayStr);
    }
    setLastVisit(last);
  }, [today]);

  // Lucky draw logic
  const luckyOptions = [
    `Lucky Number: ${Math.floor(Math.random() * 99) + 1}`,
    'Lucky Color: Purple',
    'Affirmation: Trust the universe and your path!',
    'Lucky Number: 7',
    'Lucky Color: Gold',
    'Affirmation: I am aligned with cosmic energy.'
  ];
  const handleLuckyDraw = () => {
    const pick = luckyOptions[Math.floor(Math.random() * luckyOptions.length)];
    setLuckyDraw(pick);
  };

  // Quiz modal (placeholder)
  const handleQuiz = () => setShowQuiz(true);
  const closeQuiz = () => setShowQuiz(false);

  // Usage stats logic
  useEffect(() => {
    const todayKey = 'horoscope-usage-' + today.toDateString();
    let count = parseInt(localStorage.getItem(todayKey) || '0', 10);
    count++;
    setUsageCount(count);
    localStorage.setItem(todayKey, count.toString());
  }, [today]);

  // Feedback logic
  useEffect(() => {
    const fb = localStorage.getItem('horoscope-feedback');
    if (fb) setFeedback(fb as 'up' | 'down');
  }, []);

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    localStorage.setItem('horoscope-feedback', type);
  };

  // Listen (Web Speech API)
  const handleListen = () => {
    const text = lang === 'en'
      ? `Your ${selectedSign} horoscope for ${viewDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}: ${getZodiacData(selectedSign)?.description}`
      : `आपका ${selectedSign} राशिफल: आज का दिन आपके लिए शुभ है। अपने लक्ष्यों पर ध्यान केंद्रित करें और सकारात्मक रहें।`;
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = lang === 'en' ? 'en-US' : 'hi-IN';
      window.speechSynthesis.speak(utter);
    }
  };

  // Hindi placeholder
  const hindiHoroscope = 'आज का दिन आपके लिए शुभ है। अपने लक्ष्यों पर ध्यान केंद्रित करें और सकारात्मक रहें।';

  const sign = selectedSign || 'Aries'; // fallback
  const guidance = DAILY_GUIDANCE[sign] || DAILY_GUIDANCE['Aries'];
  const loveMsg = guidance.love[getDailyIndex(sign + 'love', guidance.love.length)];
  const careerMsg = guidance.career[getDailyIndex(sign + 'career', guidance.career.length)];
  const healthMsg = guidance.health[getDailyIndex(sign + 'health', guidance.health.length)];
  const newMoonMsg = guidance.newMoon[getDailyIndex(sign + 'newMoon', guidance.newMoon.length)];
  const majorTransitMsg = guidance.majorTransit[getDailyIndex(sign + 'majorTransit', guidance.majorTransit.length)];

  return (
    <div className="cosmic-bg min-h-screen">
      <Stars count={100} />
      <CosmicBackground />
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-purple-600/10 animate-pulse-glow"></div>
            <div className="absolute top-4 -right-4 w-12 h-12 rounded-full bg-indigo-600/10 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-cinzel text-white leading-tight bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
              Daily Horoscope
            </h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed font-cormorant max-w-3xl mx-auto">
            Discover your daily cosmic guidance with our celestial horoscope readings. The stars have aligned to reveal your path today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-10 items-start">
          {/* Left Column - Sign Selection */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-astro-violet/5 animate-pulse-glow"></div>
            
            <Card className="bg-navy-800/30 border-purple-500/20 p-6 mb-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-2xl font-cinzel font-bold mb-4 text-white flex items-center">
                <Star className="h-5 w-5 mr-2 text-astro-violet animate-pulse-glow" />
                Select Your Zodiac Sign
              </h2>
              <ZodiacGrid selectedSign={selectedSign} onSelectSign={setSelectedSign} />
            </Card>
            
            <Card className="bg-navy-800/30 border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm animate-fade-in">
              <SignDetails signName={selectedSign} />
            </Card>
            {/* Place all feature cards directly below sign details */}
            <div className="flex flex-col gap-8 mt-8">
              {/* Daily Streak */}
              <Card className="bg-navy-800/40 border-purple-500/30 p-6 text-center animate-fade-in">
                <div className="flex flex-col items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-400 animate-twinkle" />
                  <span className="text-lg text-white font-cinzel">Daily Streak:</span>
                  <span className="text-2xl text-purple-300 font-bold font-cinzel">{streak} {streak === 1 ? 'day' : 'days'}</span>
                </div>
              </Card>
              {/* Spin the Wheel */}
              <Card className="bg-navy-800/40 border-purple-500/30 p-6 text-center animate-fade-in flex flex-col items-center gap-4">
                <Button onClick={handleLuckyDraw} className="bg-purple-600 hover:bg-purple-700 font-cinzel flex items-center gap-2 w-full justify-center">
                  <Dice5 className="w-5 h-5" /> Spin the Wheel
                </Button>
                {luckyDraw && (
                  <div className="mt-2 text-lg text-purple-200 font-cormorant animate-fade-in">{luckyDraw}</div>
                )}
              </Card>
              {/* Astro Quiz */}
              <Card className="bg-navy-800/40 border-purple-500/30 p-6 text-center animate-fade-in flex flex-col items-center gap-4">
                <Button onClick={handleQuiz} variant="outline" className="border-purple-500/20 hover:bg-purple-600/20 font-cinzel flex items-center gap-2 w-full justify-center">
                  <HelpCircle className="w-5 h-5" /> Astro Quiz
                </Button>
              </Card>
              {/* Feedback & Usage Stats */}
              <Card className="bg-navy-800/40 border-purple-500/30 p-4 text-center animate-fade-in flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-white font-cinzel">How was your horoscope?</span>
                  <Button onClick={() => handleFeedback('up')} variant="outline" className={`border-purple-500/20 hover:bg-purple-600/20 font-cinzel ml-2 ${feedback === 'up' ? 'bg-purple-700/30' : ''}`} title="Helpful">
                    <ThumbsUp className="w-5 h-5 text-green-400" />
                  </Button>
                  <Button onClick={() => handleFeedback('down')} variant="outline" className={`border-purple-500/20 hover:bg-purple-600/20 font-cinzel ml-2 ${feedback === 'down' ? 'bg-purple-700/30' : ''}`} title="Not helpful">
                    <ThumbsDown className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
                <div className="text-xs text-gray-400 font-cormorant mt-2">{usageCount} people checked their horoscope today</div>
              </Card>
              {/* Comment/Discussion Section */}
              <Card className="bg-navy-800/40 border-purple-500/30 p-6 text-left animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-white font-cinzel flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" /> Community Discussion
                </h3>
                <form onSubmit={handleCommentPost} className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    placeholder="Share your thoughts about today's horoscope..."
                    className="w-full md:w-2/3 px-4 py-3 rounded-xl bg-navy-800/60 border border-purple-500/20 text-white font-cinzel focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    maxLength={300}
                  />
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Post
                  </Button>
                </form>
                <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                  {comments.length === 0 && (
                    <div className="text-gray-400 font-cormorant">No comments yet. Be the first to share your thoughts!</div>
                  )}
                  {comments.map(post => (
                    <div key={post.timestamp} className="bg-navy-800/60 border border-purple-500/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="text-purple-200 font-cormorant text-left">{post.text}</div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <span className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleString()}</span>
                        <button
                          className="ml-2 text-xs text-purple-300 hover:text-red-400 font-cinzel underline"
                          onClick={() => handleCommentDelete(post.timestamp)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Horoscope Reading */}
          <div className="space-y-8">
            <Card className="bg-navy-800/30 border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/20 flex items-center justify-center shadow-[0_0_15px_rgba(159,68,211,0.5)] animate-pulse-glow">
                  <span className="text-4xl">{getZodiacData(selectedSign)?.symbol}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white font-cinzel">{selectedSign} Horoscope</h2>
                  <p className="text-gray-400 font-cormorant text-lg">Horoscope for: {viewDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 ml-auto">
                  {/* Share & Social Group */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(shareText);
                      }}
                      title="Copy to clipboard"
                      variant="outline"
                      className="border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-2 px-4 font-cinzel"
                    >
                      <Share2 className="w-4 h-4 mr-1" /> Share
                    </Button>
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" className="p-2 rounded-full hover:bg-purple-700 transition">
                      <Send className="w-5 h-5 text-green-400" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" title="Share on Twitter" className="p-2 rounded-full hover:bg-purple-700 transition">
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook" className="p-2 rounded-full hover:bg-purple-700 transition">
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </a>
                  </div>
                  {/* Divider */}
                  <span className="mx-2 hidden md:inline-block text-purple-400">|</span>
                  {/* Utility Group */}
                  <div className="flex items-center gap-2">
                    <Button onClick={handleListen} variant="outline" className="border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-2 px-3 font-cinzel" title="Listen to horoscope">
                      <Volume2 className="w-5 h-5" />
                    </Button>
                    <Button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} variant="outline" className="border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-2 px-3 font-cinzel" title="Switch language">
                      <Globe2 className="w-5 h-5" /> {lang === 'en' ? 'हिंदी' : 'EN'}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" onClick={handlePrevDay} className="border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-1 px-3 font-cinzel flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Yesterday
                </Button>
                <span className="text-xs text-gray-400">(You can select any sign above. Horoscope will update daily with API soon.)</span>
                <Button variant="outline" onClick={handleNextDay} className="border-purple-500/20 hover:bg-purple-600/20 transition-all duration-300 py-1 px-3 font-cinzel flex items-center">
                  Tomorrow <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="text-lg text-purple-200 font-cormorant mb-2">
                ✨ Your cosmic guidance for today:<br />
                {lang === 'en' ? getZodiacData(selectedSign)?.description : hindiHoroscope}
              </div>
              {/* Mini-horoscopes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Card className="bg-navy-800/50 border-purple-500/20 p-4 flex flex-col items-center">
                  <Heart className="w-6 h-6 text-pink-400 mb-2" />
                  <div className="text-purple-200 font-cormorant text-center">{loveMsg}</div>
                </Card>
                <Card className="bg-navy-800/50 border-purple-500/20 p-4 flex flex-col items-center">
                  <Briefcase className="w-6 h-6 text-blue-400 mb-2" />
                  <div className="text-purple-200 font-cormorant text-center">{careerMsg}</div>
                </Card>
                <Card className="bg-navy-800/50 border-purple-500/20 p-4 flex flex-col items-center">
                  <Activity className="w-6 h-6 text-green-400 mb-2" />
                  <div className="text-purple-200 font-cormorant text-center">{healthMsg}</div>
                </Card>
              </div>
              {/* Moon Phase Widget & Major Transit */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between my-4">
                <Card className="bg-navy-800/50 border-purple-500/20 p-4 flex flex-col items-center w-full md:w-1/2">
                  <SunMoon className="w-7 h-7 text-yellow-300 mb-2" />
                  <div className="text-purple-200 font-cormorant text-center font-bold">{newMoonMsg}</div>
                </Card>
                <Card className="bg-navy-800/50 border-purple-500/20 p-4 flex flex-col items-center w-full md:w-1/2">
                  <Sparkles className="w-7 h-7 text-astro-violet mb-2" />
                  <div className="text-purple-200 font-cormorant text-center font-bold">Major Transit</div>
                  <div className="text-gray-300 font-cormorant text-center text-sm">{majorTransitMsg}</div>
                </Card>
              </div>
            </Card>
            
            {/* Weekly Forecast Preview */}
            <Card className="bg-navy-800/30 border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 text-white font-cinzel flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-astro-violet animate-pulse-glow" />
                This Week's Cosmic Insights
              </h3>
              <div className="space-y-6">
                {weeklyForecast?.map((forecast, idx) => (
                  <div key={idx} className="border-b border-purple-500/20 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-lg font-cinzel text-purple-300 mb-2">{forecast.area}</h4>
                    <p className="text-gray-300 font-cormorant text-lg">{forecast.prediction}</p>
                  </div>
                ))}
              </div>
            </Card>
            {/* Lucky Elements Card - now below weekly forecast */}
            <Card className="bg-navy-800/50 border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300 mt-8">
              <h3 className="text-xl font-bold mb-8 text-white font-cinzel flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-pulse" />
                Lucky Elements Today
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-3 font-cormorant">NUMBER</p>
                  <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.number}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-3 font-cormorant">DAY</p>
                  <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.day}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-3 font-cormorant">COLOR</p>
                  <div 
                    className="w-6 h-6 rounded-full mx-auto border border-purple-500/30 shadow-[0_0_10px_rgba(159,68,211,0.3)]"
                    style={{ backgroundColor: luckyElements?.color }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-3 font-cormorant">ELEMENT</p>
                  <p className="text-xl text-purple-400 font-cinzel">{luckyElements?.element}</p>
                </div>
              </div>
            </Card>

            {/* Birthday Message */}
            {showBirthday && (
              <Card className="bg-gradient-to-br from-purple-600/40 to-indigo-600/30 border-purple-500/40 p-6 mb-8 text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-white font-cinzel mb-2 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 mr-2 text-astro-violet animate-twinkle" />
                  Happy Birthday!
                </h2>
                <p className="text-lg text-purple-200 font-cormorant">Wishing you a magical year ahead, {selectedSign}! May the stars align in your favor.</p>
              </Card>
            )}

            {/* Prompt to save birth date if not set */}
            {!userBirthDate && (
              <Card className="bg-navy-800/40 border-purple-500/30 p-6 mb-8 text-center animate-fade-in">
                <form onSubmit={handleSaveBirthDate} className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <label htmlFor="birthdate" className="text-white font-cinzel mr-2">Enter your birth date for birthday surprises:</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="bg-navy-900/60 border-purple-500/20 text-white px-4 py-3 rounded-xl font-cinzel"
                    required
                  />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 font-cinzel transition-all duration-300 px-6 py-3">
                    Save
                  </Button>
                </form>
              </Card>
            )}

            {/* Quiz Modal (placeholder) */}
            {showQuiz && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-navy-900/90 border border-purple-500/40 rounded-2xl p-8 max-w-lg w-full text-center animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4 text-white font-cinzel flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-astro-violet animate-twinkle" /> Fun Astro Quiz
                  </h2>
                  <p className="text-lg text-purple-200 font-cormorant mb-6">Which planet rules communication?</p>
                  <div className="flex flex-col gap-3 mb-6">
                    <Button variant="outline" className="border-purple-500/20 font-cinzel">Mars</Button>
                    <Button variant="outline" className="border-purple-500/20 font-cinzel">Venus</Button>
                    <Button variant="outline" className="border-purple-500/20 font-cinzel">Mercury</Button>
                    <Button variant="outline" className="border-purple-500/20 font-cinzel">Jupiter</Button>
                  </div>
                  <Button onClick={closeQuiz} className="bg-purple-600 hover:bg-purple-700 font-cinzel mt-2">Close</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <BackToHome />
    </div>
  );
};

export default Horoscope;
