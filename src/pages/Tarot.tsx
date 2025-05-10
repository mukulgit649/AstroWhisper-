import { useState, useEffect } from 'react';
import { Sparkles, Eye, RefreshCcw, BookOpen, Star, Save, Share2, Volume2, Calendar, History, Bookmark, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { getRandomCard, tarotDeck } from '@/utils/tarotData';
import { useDailyReset } from '@/hooks/useDailyReset';
import TarotJournal from '@/components/TarotJournal';
import { useNavigate } from 'react-router-dom';

interface SavedReading {
  id: string;
  date: string;
  question: string;
  card: any;
  notes: string;
}

const spreadPositions = [
  'Past',
  'Present',
  'Future',
  'Advice',
  'Obstacles',
  'External Influences',
  'Outcome'
];

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [cardContent, setCardContent] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [question, setQuestion] = useState('');
  const [notes, setNotes] = useState('');
  const [savedReadings, setSavedReadings] = useState<SavedReading[]>([]);
  const [isReversed, setIsReversed] = useState(false);
  const { shouldReset } = useDailyReset('tarot_card');
  const [showJournal, setShowJournal] = useState(false);
  const [spreadCards, setSpreadCards] = useState<any[]>([]);
  const navigate = useNavigate();

  const savedCard = localStorage.getItem('daily_tarot_card');
  
  useEffect(() => {
    // Load saved readings
    const saved = localStorage.getItem('tarot_readings');
    if (saved) {
      try {
        setSavedReadings(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved readings:", e);
      }
    }

    // Check if we should use a saved card or reset
    if (savedCard && !shouldReset()) {
      try {
        setCardContent(JSON.parse(savedCard));
        setIsFlipped(true);
      } catch (e) {
        console.error("Error parsing saved card:", e);
      }
    }
  }, []);

  const handleDrawSpread = () => {
    // Shuffle the deck and draw 7 unique cards
    const deck = [...tarotDeck];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    const drawn = deck.slice(0, 7).map(card => ({
      ...card,
      isReversed: Math.random() > 0.7 // 30% chance reversed
    }));
    // Play card flip sound
    const audio = new Audio('/assets/sounds/card-flip.mp3');
    audio.play();
    // Navigate to spread page with cards and question
    navigate('/tarot/spread', { state: { spreadCards: drawn, question } });
  };

  const handleReset = () => {
    setSpreadCards([]);
    setIsFlipped(false);
    setCardContent(null);
    setSelectedCard(null);
    setIsRevealing(false);
    setQuestion('');
    setNotes('');
    setIsReversed(false);
    localStorage.removeItem('daily_tarot_card');
  };

  const handleSaveReading = () => {
    if (!cardContent) return;

    const newReading: SavedReading = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      question,
      card: { ...cardContent, isReversed },
      notes
    };

    const updatedReadings = [...savedReadings, newReading];
    setSavedReadings(updatedReadings);
    localStorage.setItem('tarot_readings', JSON.stringify(updatedReadings));
  };

  const handleShareReading = () => {
    if (!cardContent) return;

    const shareText = `🔮 My Tarot Reading\n\nQuestion: ${question || 'General Reading'}\nCard: ${cardContent.name} ${isReversed ? '(Reversed)' : ''}\n\n${cardContent.description}\n\nShared via AstroWhisper`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Tarot Reading',
        text: shareText
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText);
      alert('Reading copied to clipboard!');
    }
  };

  const playReading = () => {
    if (!cardContent) return;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${cardContent.name} ${isReversed ? 'reversed' : ''}. ${cardContent.description}`;
    window.speechSynthesis.speak(utterance);
  };

  const handleDeleteReading = (id: string) => {
    const updatedReadings = savedReadings.filter(reading => reading.id !== id);
    setSavedReadings(updatedReadings);
    localStorage.setItem('tarot_readings', JSON.stringify(updatedReadings));
  };

  return (
    <div className="min-h-screen cosmic-bg flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center relative py-12 md:py-20">
        {/* Glowing/starry icon above the card */}
        <div className="flex flex-col items-center mb-4 z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-700/30 to-indigo-700/20 blur-2xl animate-pulse-glow flex items-center justify-center mb-2"></div>
          <Star className="w-14 h-14 text-astro-glow animate-twinkle absolute mt-[-70px]" />
        </div>
        {/* Main content card */}
        <div className="relative z-10 w-full max-w-2xl mx-auto bg-navy-900/60 border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(159,68,211,0.3)] px-8 py-12 flex flex-col items-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-cinzel text-white leading-tight text-center">
            7-Card Tarot Spread
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-cormorant text-center">
            Focus on your question or intention, then draw 7 cards for a full tarot reading.
          </p>
          <div className="w-full mb-8">
            <Textarea
              placeholder="What would you like guidance on? (Optional)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-navy-900/60 border-2 border-purple-500/40 shadow-[0_0_15px_rgba(159,68,211,0.3)] text-white px-6 py-5 rounded-xl font-cinzel w-full text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              rows={3}
            />
          </div>
          <Button
            onClick={handleDrawSpread}
            variant="outline"
            className="gap-2 border-2 border-purple-500/50 bg-gradient-to-r from-purple-700/60 to-indigo-700/40 hover:bg-navy-800/70 hover:border-purple-500/80 transition-all duration-300 font-cinzel text-3xl px-16 py-6 rounded-xl shadow-[0_0_30px_rgba(159,68,211,0.5)] mb-6 animate-fade-in"
          >
            <Sparkles className="h-7 w-7 text-astro-glow mr-2" /> Draw 7 Cards
          </Button>
          <Button
            onClick={() => setShowJournal(true)}
            variant="outline"
            className="mt-2 border-purple-500/40 text-purple-200 font-cinzel px-8 py-3 rounded-xl text-lg hover:bg-purple-900/20 transition-all duration-300 animate-fade-in"
          >
            <BookOpen className="w-5 h-5 mr-2 text-astro-violet" /> View Journal
          </Button>
        </div>
        <BackToHome />
      </div>
    </div>
  );
};

export default Tarot;
