import { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, CalendarDays, Sparkles, Star, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';
import { useToast } from "@/components/ui/use-toast";
import html2canvas from 'html2canvas';
import BirthChartWheel from '@/components/BirthChartWheel';
import { PlanetaryPositions, calculatePlanetaryPositions } from '@/utils/birthChartCalculations';
import { getPlanetInterpretation, getAspectInterpretation } from '@/utils/astrologyInterpretations';
import jsPDF from 'jspdf';

interface ChartResult {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  calculatedAt: string;
  positions: PlanetaryPositions;
  houses: any;
}

const HOUSE_SYSTEMS = [
  { value: 'placidus', label: 'Placidus' },
  { value: 'whole', label: 'Whole Sign' },
  { value: 'koch', label: 'Koch' },
  { value: 'equal', label: 'Equal' },
];

const GLOSSARY = [
  { term: 'Ascendant', definition: 'The sign rising on the eastern horizon at the time of birth, representing your outward persona and first impressions.' },
  { term: 'Sun Sign', definition: 'Your core identity, ego, and the essence of who you are.' },
  { term: 'Moon Sign', definition: 'Your emotional nature, instincts, and subconscious.' },
  { term: 'House', definition: 'A division of the birth chart representing different areas of life.' },
  { term: 'Aspect', definition: 'The angular relationship between two planets, indicating how they interact.' },
  { term: 'Transit', definition: 'The current movement of planets in the sky and how they affect your natal chart.' },
  { term: 'Synastry', definition: 'The comparison of two birth charts to analyze relationship compatibility.' },
  { term: 'Progression', definition: 'A method of advancing the natal chart to reflect personal growth over time.' },
];

const LEARN_ASTROLOGY = [
  {
    title: 'How to Read Your Birth Chart',
    content: 'Start by identifying your Sun, Moon, and Ascendant signs. Explore the planets in each sign and house, and look at the aspects (angles) between them. Each element tells a story about your personality, emotions, and life path.'
  },
  {
    title: 'What Are Houses?',
    content: 'The chart is divided into 12 houses, each representing a different area of life (e.g., self, money, communication, home, creativity, work, relationships, etc.). The sign on the cusp and any planets in a house influence that area.'
  },
  {
    title: 'What Are Aspects?',
    content: 'Aspects are angles between planets. Conjunctions blend energies, trines and sextiles bring harmony, squares and oppositions create challenges and growth.'
  }
];

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthTimePeriod, setBirthTimePeriod] = useState<'AM' | 'PM'>('AM');
  const [birthPlace, setBirthPlace] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chartResult, setChartResult] = useState<ChartResult | null>(null);
  const [compatDate, setCompatDate] = useState('');
  const [compatResult, setCompatResult] = useState<string | null>(null);
  const compatInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [transitDate, setTransitDate] = useState('');
  const [transitMsg, setTransitMsg] = useState<string | null>(null);
  const [savedCharts, setSavedCharts] = useState<any[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [chartInterpretation, setChartInterpretation] = useState<any>(null);
  const [houseSystem, setHouseSystem] = useState(() => localStorage.getItem('houseSystem') || 'placidus');
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [showProgressions, setShowProgressions] = useState(false);
  const [showSynastry, setShowSynastry] = useState(false);
  const [showTransits, setShowTransits] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [chartStyle, setChartStyle] = useState<'western' | 'vedic'>(() => {
    // Default to Vedic if India is in the birthPlace
    if (typeof window !== 'undefined') {
      const savedPlace = localStorage.getItem('userBirthPlace') || '';
      if (/india/i.test(savedPlace)) return 'vedic';
    }
    return 'western';
  });
  const [showStyleInfo, setShowStyleInfo] = useState(false);

  // Load last saved chart on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedBirthChart');
    if (saved) setChartResult(JSON.parse(saved));
  }, []);

  // Load saved charts on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedCharts');
    if (saved) setSavedCharts(JSON.parse(saved));
  }, []);

  // Accessibility: Close modals with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowGlossary(false);
        setShowLearn(false);
        setShowProgressions(false);
        setShowSynastry(false);
        setShowTransits(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const geocodeLocation = async (location: string) => {
    if (!location) return { lat: 0, lon: 0 };
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
    } catch (e) { /* ignore */ }
    return { lat: 0, lon: 0 };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please enter your birth date to calculate your chart",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    // Save birth data to localStorage for AstroBot to access
    localStorage.setItem('userBirthDate', birthDate);
    if (birthTime) localStorage.setItem('userBirthTime', birthTime);
    if (birthPlace) localStorage.setItem('userBirthPlace', birthPlace);
    // Geocode location
    const { lat, lon } = await geocodeLocation(birthPlace);
    setLatitude(lat);
    setLongitude(lon);
    // Get timezone (for demo, default to Asia/Kolkata if India, else UTC)
    let tz = 'UTC';
    if (/india/i.test(birthPlace)) tz = 'Asia/Kolkata';
    // Convert time to 24-hour format
    const get24HourTime = () => {
      if (!birthTime) return '';
      let [h, m] = birthTime.split(':').map(Number);
      if (birthTimePeriod === 'PM' && h < 12) h += 12;
      if (birthTimePeriod === 'AM' && h === 12) h = 0;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };
    // Call backend for chart calculation
    try {
      const response = await fetch('http://localhost:4000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: birthDate,
          time: get24HourTime(),
          lat,
          lon,
          tz,
          style: chartStyle,
          ayanamsa: chartStyle === 'vedic' ? 'lahiri' : undefined
        })
      });
      const data = await response.json();
      const result: ChartResult = {
        birthDate,
        birthTime: get24HourTime(),
        birthPlace,
        calculatedAt: new Date().toISOString(),
        positions: data.planets,
        houses: data.houses
      };
      setChartResult(result);
      toast({
        title: "Chart calculated!",
        description: "Your cosmic blueprint has been revealed.",
        duration: 3000,
      });
      setBirthDate('');
      setBirthTime('');
      setBirthPlace('');
    } catch (err) {
      toast({
        title: "Calculation failed",
        description: "Could not calculate chart. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save chart to localStorage (multiple)
  const handleSaveChart = () => {
    if (chartResult) {
      const updated = [...savedCharts, chartResult];
      setSavedCharts(updated);
      localStorage.setItem('savedCharts', JSON.stringify(updated));
      toast({
        title: "Chart saved!",
        description: "Your chart has been added to your saved charts.",
        duration: 2000,
      });
    }
  };

  // Delete a saved chart
  const handleDeleteChart = (idx: number) => {
    const updated = savedCharts.filter((_, i) => i !== idx);
    setSavedCharts(updated);
    localStorage.setItem('savedCharts', JSON.stringify(updated));
  };

  // Export chart card as image
  const handleExportChart = async (cardId: string) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    const canvas = await html2canvas(card, { backgroundColor: null });
    const link = document.createElement('a');
    link.download = 'birth-chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Add to Calendar (ICS file)
  const handleAddToCalendar = () => {
    if (!chartResult?.birthDate) return;
    const date = chartResult.birthDate.replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY=Your Birth Date\nDESCRIPTION=Celebrate your cosmic birthday!\nDTSTART;VALUE=DATE:${date}\nDTEND;VALUE=DATE:${date}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'birthdate.ics';
    link.click();
  };

  // Helper: Get sun sign from birth date
  function getSunSign(dateStr: string) {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    const m = month, d = day;
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini';
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer';
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra';
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio';
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius';
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
    if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return 'Pisces';
    return null;
  }

  // Horoscope messages (daily, simple)
  const horoscopes: Record<string, string> = {
    Aries: "Today is a day to take bold action. Trust your instincts and lead the way!",
    Taurus: "Focus on stability and comfort. Treat yourself to something that grounds you.",
    Gemini: "Communication is key today. Reach out and connect with someone new.",
    Cancer: "Nurture yourself and those you love. Home is your sanctuary right now.",
    Leo: "Let your light shine! Express yourself creatively and confidently.",
    Virgo: "Pay attention to the details. Organize your thoughts and your space.",
    Libra: "Seek balance in your relationships. Harmony brings you peace today.",
    Scorpio: "Embrace transformation. Let go of what no longer serves you.",
    Sagittarius: "Adventure calls! Try something new and expand your horizons.",
    Capricorn: "Hard work pays off. Stay focused on your long-term goals.",
    Aquarius: "Innovate and think outside the box. Your ideas can inspire others.",
    Pisces: "Listen to your intuition. Creativity and compassion guide you now."
  };

  // Compatibility logic (simple sun sign match)
  const compatibilityMessages: Record<string, string> = {
    'Aries-Taurus': 'Aries brings excitement, Taurus brings stability. Balance is key!',
    'Aries-Gemini': 'Dynamic and lively! You both love adventure and new ideas.',
    'Aries-Aries': 'A fiery match! Lots of passion, but watch for clashes.',
    // ... (add more pairs as needed)
    'default': 'Every match is unique! Communication and understanding are the real keys.'
  };

  function getCompatMessage(sign1: string, sign2: string) {
    if (!sign1 || !sign2) return '';
    const key1 = `${sign1}-${sign2}`;
    const key2 = `${sign2}-${sign1}`;
    return compatibilityMessages[key1] || compatibilityMessages[key2] || compatibilityMessages['default'];
  }

  const handleCompatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sign1 = getSunSign(chartResult?.birthDate);
    const sign2 = getSunSign(compatDate);
    if (!sign2) {
      setCompatResult('Please enter a valid date for the second person.');
      return;
    }
    setCompatResult(`${sign1} + ${sign2}: ${getCompatMessage(sign1, sign2)}`);
  };

  // Chart element descriptions
  const chartElements = [
    {
      key: 'Sun',
      title: 'Sun Sign',
      desc: 'Represents your core identity, ego, and the essence of who you are. It\'s the main sign people refer to in horoscopes.'
    },
    {
      key: 'Moon',
      title: 'Moon Sign',
      desc: 'Reflects your emotional nature, instincts, and subconscious. It shows how you process feelings and nurture yourself.'
    },
    {
      key: 'Ascendant',
      title: 'Ascendant (Rising Sign)',
      desc: "Describes your outward persona, first impressions, and how you approach new situations. It's the 'mask' you wear to the world."
    }
  ];
  const [openElement, setOpenElement] = useState<string | null>(null);

  // Simple transit messages (randomized for demo)
  const transitMessages = [
    'A day of cosmic opportunity—embrace change and growth!',
    'Reflect on your journey; the stars favor introspection.',
    'Energy is high—take bold steps toward your goals.',
    'A good day for connection and communication.',
    'Let go of what no longer serves you; transformation is near.',
    'Trust your intuition; the universe is guiding you.'
  ];

  const handleTransitCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transitDate) return;
    // Pick a message based on the date string hash
    const hash = transitDate.split('-').reduce((acc, v) => acc + v.charCodeAt(0), 0);
    setTransitMsg(transitMessages[hash % transitMessages.length]);
  };

  const handlePlanetClick = (planet: string) => {
    setSelectedPlanet(planet);
    // Show detailed interpretation for the selected planet
    const position = chartResult?.positions?.[planet.toLowerCase()];
    if (position) {
      const interpretation = {
        planet,
        sign: position.sign,
        degree: position.degree,
        ...getPlanetInterpretation(planet, position.sign),
        aspects: getPlanetAspects(planet, chartResult.positions).map(aspect => {
          const [type, otherPlanet] = aspect.split(' with ');
          return {
            type,
            planet: otherPlanet,
            ...getAspectInterpretation(planet, otherPlanet, type.toLowerCase())
          };
        })
      };
      setChartInterpretation(interpretation);
    }
  };

  const getPlanetAspects = (planet: string, positions: PlanetaryPositions): string[] => {
    const aspects: string[] = [];
    const planetPos = positions[planet.toLowerCase() as keyof PlanetaryPositions];
    
    if (!planetPos) return aspects;
    
    Object.entries(positions).forEach(([otherPlanet, otherPos]) => {
      if (otherPlanet === planet.toLowerCase()) return;
      
      const angle = Math.abs(planetPos.degree - otherPos.degree);
      if (angle <= 5) {
        aspects.push(`Conjunction with ${otherPlanet}: Strong blending of energies`);
      } else if (angle >= 175 && angle <= 185) {
        aspects.push(`Opposition with ${otherPlanet}: Dynamic tension and balance`);
      } else if (angle >= 55 && angle <= 65) {
        aspects.push(`Sextile with ${otherPlanet}: Harmonious opportunities`);
      } else if (angle >= 85 && angle <= 95) {
        aspects.push(`Square with ${otherPlanet}: Challenging growth`);
      } else if (angle >= 115 && angle <= 125) {
        aspects.push(`Trine with ${otherPlanet}: Natural flow and ease`);
      }
    });
    
    return aspects;
  };

  const handleHouseSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHouseSystem(e.target.value);
    localStorage.setItem('houseSystem', e.target.value);
  };

  // Export as PDF handler
  const handleExportPDF = async () => {
    const chartCard = document.getElementById('current-chart-card');
    if (!chartCard) return;
    const canvas = await html2canvas(chartCard, { backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('birth-chart.pdf');
  };

  // Simulate shareable link
  const handleShareChartLink = () => {
    // Simulate a unique link (in real app, use backend)
    const link = `${window.location.origin}/share/chart/${btoa(JSON.stringify(chartResult))}`;
    setShareLink(link);
    navigator.clipboard.writeText(link);
    toast({
      title: 'Shareable link copied!',
      description: 'You can now share your chart with others.',
      duration: 2000,
    });
  };

  return (
    <div className="cosmic-bg flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-start justify-between gap-16 flex-grow">
        {/* Left Column - Description */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="relative mb-12">
            <div className="absolute -top-12 -left-4 w-24 h-24 rounded-full bg-purple-600/10 animate-pulse-glow"></div>
            <div className="absolute top-4 -right-8 w-16 h-16 rounded-full bg-indigo-600/10 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            
            <div className="flex justify-center md:justify-start mb-10 relative z-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/20 flex items-center justify-center shadow-[0_0_25px_rgba(159,68,211,0.5)] animate-pulse-glow">
                  <Star className="w-12 h-12 text-astro-glow absolute" />
                  <Moon className="w-8 h-8 text-purple-300 animate-twinkle-slow absolute -right-2 -top-1" />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 font-cinzel text-white leading-tight bg-gradient-to-br from-purple-100 to-purple-400 bg-clip-text text-transparent">
            Discover Your Cosmic Blueprint
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed font-cormorant mb-8">
            Enter your birth details to calculate your personalized natal chart and uncover the planetary 
            influences that shape your life journey.
          </p>
          
          <Card className="bg-navy-800/20 border-purple-500/20 p-8 mt-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)]">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-white font-cinzel">
              <Sparkles className="w-5 h-5 mr-3 text-astro-violet animate-twinkle" />
              The Celestial Map of You
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed font-cormorant">
              Your birth chart is a cosmic snapshot of the sky at the moment you were born. It reveals your 
              sun sign (core identity), moon sign (emotional nature), ascendant (outward persona), and 
              planetary influences that shape your unique cosmic blueprint.
            </p>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="bg-navy-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(159,68,211,0.3)]">
            <h2 className="text-3xl font-bold mb-10 font-cinzel text-white text-center">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <CalendarDays className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Date
                </label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="dd-mm-yyyy"
                  required
                  style={{ color: 'white' }}
                />
              </div>

              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <Clock className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Time (optional)
                </label>
                <Input
                  type="text"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="hh:mm"
                  style={{ color: 'white' }}
                  pattern="^(0[1-9]|1[0-2]):[0-5][0-9]$"
                />
                <select
                  value={birthTimePeriod}
                  onChange={e => setBirthTimePeriod(e.target.value as 'AM' | 'PM')}
                  className="ml-2 bg-navy-800/50 border-purple-500/20 text-white py-2 px-4 rounded-xl"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <p className="text-sm text-gray-400 font-cormorant">For more accurate ascendant calculation</p>
              </div>

              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  <MapPin className="h-5 w-5 text-astro-violet animate-pulse-glow" />
                  Birth Place (optional)
                </label>
                <Input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-7 px-4 rounded-xl transition-all duration-300 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="City, Country"
                  style={{ color: 'white' }}
                />
                <p className="text-sm text-gray-400 font-cormorant">For house system calculations</p>
              </div>

              <div className="space-y-3">
                <label className="text-purple-300 flex items-center gap-2 text-lg font-cinzel">
                  Chart Style
                </label>
                <select
                  value={chartStyle}
                  onChange={e => {
                    setChartStyle(e.target.value as 'western' | 'vedic');
                    setShowStyleInfo(true);
                  }}
                  className="w-full bg-navy-800/50 border-purple-500/20 text-white py-3 px-4 rounded-xl"
                >
                  <option value="western">Western (Tropical)</option>
                  <option value="vedic">Vedic (Kundali)</option>
                </select>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(159,68,211,0.8)] group font-cinzel"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-2">
                      <div className="loading-dot" style={{ animationDelay: '0s' }}></div>
                      <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
                      <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-twinkle-fast" />
                    Calculate Your Chart
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <BackToHome />
      {/* Feature Buttons Always Visible */}
      <div className="container mx-auto px-6 flex flex-col items-center mt-8">
        {!chartResult && (
          <div className="mb-2 text-purple-200 bg-navy-900/60 rounded-lg px-4 py-2 text-center font-cormorant text-sm max-w-md">
            Note: Calculate your birth chart first for these features to provide meaningful insights.
          </div>
        )}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
          <Button onClick={handleSaveChart} className="feature-btn w-full" disabled={!chartResult}>
            Save Chart
          </Button>
          <Button onClick={handleExportPDF} className="feature-btn w-full" variant="outline" disabled={!chartResult}>
            Export as PDF
          </Button>
          <Button onClick={handleShareChartLink} className="feature-btn w-full" variant="outline" disabled={!chartResult}>
            Share Chart
          </Button>
          <Button onClick={() => handleExportChart('current-chart-card')} variant="outline" className="feature-btn w-full" disabled={!chartResult}>
            Export as Image
          </Button>
          <Button onClick={handleAddToCalendar} variant="outline" className="feature-btn w-full" disabled={!chartResult}>
            Add to Calendar
          </Button>
          <Button onClick={handleCompatSubmit} className="feature-btn w-full" disabled={!chartResult}>
            Analyze
          </Button>
        </div>
      </div>
      {/* Chart Result Section */}
      {chartResult && (
        <div className="container mx-auto px-6 py-8 flex flex-col items-center">
          <Card id="current-chart-card" className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-4xl text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              Your Birth Chart
            </h3>
            {/* House System Selector */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
              <label className="text-purple-200 font-cinzel text-lg" htmlFor="house-system-select">House System:</label>
              <select
                id="house-system-select"
                value={houseSystem}
                onChange={handleHouseSystemChange}
                className="bg-navy-900/80 border border-purple-500/30 text-purple-200 rounded-lg px-4 py-2 font-cinzel focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                aria-label="House System Selector"
                role="listbox"
              >
                {HOUSE_SYSTEMS.map(sys => (
                  <option key={sys.value} value={sys.value}>{sys.label}</option>
                ))}
              </select>
            </div>
            {/* Birth Chart Wheel */}
            {chartResult && chartResult.positions && (
              <div className="my-8">
                <div className="flex justify-end mb-2">
                  <Button size="sm" variant="outline" onClick={() => setShowHelp(true)}>
                    How to Read Your Chart?
                  </Button>
                </div>
                {chartStyle === 'western' ? (
                  <BirthChartWheel 
                    positions={chartResult.positions} 
                    onPlanetClick={handlePlanetClick}
                  />
                ) : (
                  <Card className="bg-navy-900/80 border-purple-500/30 p-8 mt-4 w-full max-w-xl mx-auto animate-fade-in text-center">
                    <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Vedic (Kundali) Chart</h3>
                    <div className="text-purple-200 font-cormorant mb-4">
                      (A full Kundali chart will be shown here. For now, this is a placeholder. Vedic calculations use the sidereal zodiac.)
                    </div>
                    <div className="w-full flex justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/North_Indian_Horoscope_Sample.png" alt="Kundali Chart Example" className="w-64 h-64 object-contain rounded-lg border border-purple-500/30" />
                    </div>
                  </Card>
                )}
              </div>
            )}
            
            {/* Selected Planet Interpretation */}
            {selectedPlanet && chartInterpretation && (
              <Card className="bg-navy-900/60 border-purple-500/20 p-6 mt-6 text-left animate-fade-in">
                <h4 className="text-xl font-bold mb-4 text-white font-cinzel">
                  {selectedPlanet} in {chartInterpretation.sign}
                </h4>
                <p className="text-purple-200 font-cormorant mb-4">
                  {chartInterpretation.meaning}
                </p>
                
                {/* Keywords */}
                {chartInterpretation.keywords.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold mb-2 text-white font-cinzel">Keywords:</h5>
                    <div className="flex flex-wrap gap-2">
                      {chartInterpretation.keywords.map((keyword: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Strengths */}
                {chartInterpretation.strengths.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold mb-2 text-white font-cinzel">Strengths:</h5>
                    <ul className="space-y-1">
                      {chartInterpretation.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="text-purple-200 font-cormorant flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Challenges */}
                {chartInterpretation.challenges.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold mb-2 text-white font-cinzel">Challenges:</h5>
                    <ul className="space-y-1">
                      {chartInterpretation.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="text-purple-200 font-cormorant flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Advice */}
                {chartInterpretation.advice.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold mb-2 text-white font-cinzel">Advice:</h5>
                    <ul className="space-y-1">
                      {chartInterpretation.advice.map((advice: string, idx: number) => (
                        <li key={idx} className="text-purple-200 font-cormorant flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Aspects */}
                {chartInterpretation.aspects.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold mb-4 text-white font-cinzel">Key Aspects:</h5>
                    <div className="space-y-4">
                      {chartInterpretation.aspects.map((aspect: any, idx: number) => (
                        <div key={idx} className="bg-navy-800/40 p-4 rounded-lg">
                          <h6 className="text-lg font-semibold text-white font-cinzel mb-2">
                            {aspect.type} with {aspect.planet}
                          </h6>
                          <p className="text-purple-200 font-cormorant mb-3">
                            {aspect.meaning}
                          </p>
                          
                          {/* Aspect Keywords */}
                          {aspect.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {aspect.keywords.map((keyword: string, kIdx: number) => (
                                <span key={kIdx} className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Challenges and Opportunities */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {aspect.challenges.length > 0 && (
                              <div>
                                <h6 className="text-sm font-semibold text-red-400 mb-2">Challenges</h6>
                                <ul className="space-y-1">
                                  {aspect.challenges.map((challenge: string, cIdx: number) => (
                                    <li key={cIdx} className="text-purple-200 text-sm">
                                      {challenge}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {aspect.opportunities.length > 0 && (
                              <div>
                                <h6 className="text-sm font-semibold text-green-400 mb-2">Opportunities</h6>
                                <ul className="space-y-1">
                                  {aspect.opportunities.map((opportunity: string, oIdx: number) => (
                                    <li key={oIdx} className="text-purple-200 text-sm">
                                      {opportunity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
            
            {/* Basic Chart Information */}
            <div className="text-lg text-gray-200 font-cormorant mb-6">
              <div><span className="font-semibold text-purple-300">Birth Date:</span> {chartResult.birthDate}</div>
              <div><span className="font-semibold text-purple-300">Birth Time:</span> {chartResult.birthTime || '—'}</div>
              <div><span className="font-semibold text-purple-300">Birth Place:</span> {chartResult.birthPlace || '—'}</div>
              <div className="text-xs text-gray-400 mt-2">Calculated at: {new Date(chartResult.calculatedAt).toLocaleString()}</div>
            </div>
          </Card>
          {/* Personalized Horoscope Section */}
          {(() => {
            const sign = getSunSign(chartResult.birthDate);
            if (!sign) return null;
            return (
              <Card className="bg-navy-900/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 text-white font-cinzel flex items-center justify-center">
                  <Star className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
                  {sign} Horoscope
                </h3>
                <div className="text-lg text-purple-200 font-cormorant mb-2">{horoscopes[sign]}</div>
                <div className="text-xs text-gray-400">(Based on your sun sign)</div>
              </Card>
            );
          })()}
          {/* Compatibility Analysis Section */}
          <Card className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              Check Compatibility
            </h3>
            <form className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
              <Input
                ref={compatInputRef}
                type="date"
                value={compatDate}
                onChange={e => setCompatDate(e.target.value)}
                className="bg-navy-900/60 border-purple-500/20 text-white px-4 py-3 rounded-xl font-cinzel"
                required
              />
            </form>
            {compatResult && (
              <div className="text-lg text-purple-200 font-cormorant mt-2 animate-fade-in">
                {compatResult}
              </div>
            )}
            <div className="text-xs text-gray-400 mt-2">(Enter another person's birth date to see your sun sign compatibility)</div>
          </Card>
          {/* Chart Interpretation Section */}
          <Card className="bg-navy-900/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-white font-cinzel flex items-center justify-center">
              <Star className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              Chart Interpretation
            </h3>
            <div className="flex flex-col gap-4">
              {chartElements.map(el => (
                <div key={el.key} className="text-left">
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-navy-800/60 border border-purple-500/20 text-white font-cinzel text-lg transition-all duration-300 hover:border-purple-500/40 focus:outline-none ${openElement === el.key ? 'shadow-[0_0_15px_rgba(159,68,211,0.3)]' : ''}`}
                    onClick={() => setOpenElement(openElement === el.key ? null : el.key)}
                  >
                    <span>{el.title}</span>
                    <span className={`ml-2 transition-transform duration-300 ${openElement === el.key ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  {openElement === el.key && (
                    <div className="bg-navy-900/80 border-l-4 border-purple-500/40 mt-2 px-6 py-4 rounded-xl text-purple-200 font-cormorant animate-fade-in">
                      {el.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          {/* Transits & Progressions Section */}
          <Card className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              View Transits
            </h3>
            <form onSubmit={handleTransitCheck} className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
              <Input
                type="date"
                value={transitDate}
                onChange={e => setTransitDate(e.target.value)}
                className="bg-navy-900/60 border-purple-500/20 text-white px-4 py-3 rounded-xl font-cinzel"
                required
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 font-cinzel transition-all duration-300 px-6 py-3">
                Check
              </Button>
            </form>
            {transitMsg && (
              <div className="text-lg text-purple-200 font-cormorant mt-2 animate-fade-in">
                {transitMsg}
              </div>
            )}
            <div className="text-xs text-gray-400 mt-2">(Pick any date to see the cosmic weather for that day!)</div>
          </Card>
          {/* Shareable Link Section */}
          <Card className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              Share Your Chart
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center my-4">
              <Button onClick={handleExportPDF} className="feature-btn" variant="outline">
                Export as PDF
              </Button>
              <Button onClick={handleShareChartLink} className="feature-btn" variant="outline">
                Share Chart
              </Button>
            </div>
            {shareLink && (
              <div className="text-purple-200 text-sm text-center my-2">
                Shareable link: <a href={shareLink} target="_blank" rel="noopener noreferrer" className="underline">{shareLink}</a>
                <div className="flex gap-2 justify-center mt-2">
                  <a href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20birth%20chart!%20${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Twitter</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook</a>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
      {/* Saved Charts Section */}
      {savedCharts.length > 0 && (
        <div className="container mx-auto px-6 py-8 flex flex-col items-center">
          <Card className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-white font-cinzel flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
              Saved Charts
            </h3>
            <div className="flex flex-col gap-4">
              {savedCharts.map((chart, idx) => (
                <div key={idx} id={`saved-chart-card-${idx}`} className="bg-navy-900/60 border border-purple-500/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="text-purple-200 font-cormorant text-sm md:text-base">
                    <div><span className="font-semibold">Birth Date:</span> {chart.birthDate}</div>
                    <div><span className="font-semibold">Birth Time:</span> {chart.birthTime || '—'}</div>
                    <div><span className="font-semibold">Birth Place:</span> {chart.birthPlace || '—'}</div>
                    <div className="text-xs text-gray-400">Saved: {chart.calculatedAt ? new Date(chart.calculatedAt).toLocaleString() : ''}</div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2 md:mt-0 md:ml-4">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-cinzel px-4 py-2 rounded-full transition-all duration-300"
                      onClick={() => handleDeleteChart(idx)}
                    >
                      Delete
                    </button>
                    <button
                      className="border border-purple-500/30 text-purple-200 hover:bg-purple-600/20 font-cinzel px-4 py-2 rounded-full transition-all duration-300"
                      onClick={() => handleExportChart(`saved-chart-card-${idx}`)}
                    >
                      Export as Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      {/* Additional Features Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        <Card className="bg-navy-800/40 border-purple-500/30 p-8 mt-8 w-full max-w-xl animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-white font-cinzel flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2 text-astro-violet animate-twinkle" />
            Additional Features
          </h3>
          <div className="flex flex-wrap gap-4 justify-center items-center my-8">
            <Button onClick={() => setShowGlossary(true)} variant="outline">Glossary</Button>
            <Button onClick={() => setShowLearn(true)} variant="outline">Learn Astrology</Button>
            <Button onClick={() => setShowProgressions(true)} variant="outline">View Progressions</Button>
            <Button onClick={() => setShowSynastry(true)} variant="outline">Synastry Chart</Button>
            <Button onClick={() => setShowTransits(true)} variant="outline">Current Transits</Button>
          </div>
        </Card>
      </div>
      {/* Glossary Modal/Card */}
      {showGlossary && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Astrology Glossary</h3>
          <ul className="space-y-2">
            {GLOSSARY.map((item, idx) => (
              <li key={idx} className="text-purple-200 font-cormorant"><b>{item.term}:</b> {item.definition}</li>
            ))}
          </ul>
          <Button onClick={() => setShowGlossary(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Learn Astrology Modal/Card */}
      {showLearn && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Learn Astrology</h3>
          <ul className="space-y-4">
            {LEARN_ASTROLOGY.map((item, idx) => (
              <li key={idx}>
                <div className="text-lg text-purple-200 font-cinzel mb-1">{item.title}</div>
                <div className="text-purple-200 font-cormorant">{item.content}</div>
              </li>
            ))}
          </ul>
          <Button onClick={() => setShowLearn(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Progressions Modal/Card (placeholder) */}
      {showProgressions && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Progressions (Coming Soon)</h3>
          <div className="text-purple-200 font-cormorant">This feature will let you view your progressed chart and see how your cosmic blueprint evolves over time.</div>
          <Button onClick={() => setShowProgressions(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Synastry Modal/Card (placeholder) */}
      {showSynastry && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Synastry Chart (Coming Soon)</h3>
          <div className="text-purple-200 font-cormorant">This feature will let you compare your chart with another person for relationship insights.</div>
          <Button onClick={() => setShowSynastry(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Transits Modal/Card (placeholder) */}
      {showTransits && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Current Transits (Coming Soon)</h3>
          <div className="text-purple-200 font-cormorant">This feature will show how today's planetary movements affect your natal chart.</div>
          <Button onClick={() => setShowTransits(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Help Modal/Card */}
      {showHelp && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">How to Read Your Birth Chart</h3>
          <ul className="space-y-2 text-purple-200 font-cormorant">
            <li><b>1. Houses:</b> The 12 segments represent different areas of life (self, money, communication, etc.).</li>
            <li><b>2. Planets:</b> The symbols show where each planet was at your birth. Click a planet for details.</li>
            <li><b>3. Signs:</b> The outer ring shows the zodiac signs. Each planet falls in a sign and house.</li>
            <li><b>4. Aspects:</b> Colored lines show relationships (angles) between planets—these reveal strengths and challenges.</li>
            <li><b>5. Hover/Click:</b> Hover or click on chart elements for tooltips and more info.</li>
          </ul>
          <Button onClick={() => setShowHelp(false)} className="mt-6">Close</Button>
        </Card>
      )}
      {/* Style Info Modal/Card */}
      {showStyleInfo && (
        <Card className="bg-navy-900/90 border-purple-500/30 p-8 mt-4 w-full max-w-2xl mx-auto animate-fade-in" role="dialog" aria-modal="true">
          <h3 className="text-2xl font-bold mb-4 text-white font-cinzel">Chart Style Info</h3>
          <ul className="space-y-2 text-purple-200 font-cormorant">
            <li><b>Western (Tropical):</b> The classic circular chart, used in Western astrology. Planets are placed by the tropical zodiac.</li>
            <li><b>Vedic (Kundali):</b> The square/diamond chart, used in Indian astrology. Planets are placed by the sidereal zodiac. Includes Lagna, Rashi, Nakshatra, etc.</li>
          </ul>
          <Button onClick={() => setShowStyleInfo(false)} className="mt-6">Close</Button>
        </Card>
      )}
    </div>
  );
};

export default BirthChart;
