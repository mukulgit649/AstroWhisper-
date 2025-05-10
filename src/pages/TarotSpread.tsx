import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import BackToHome from '@/components/BackToHome';
import Navbar from '@/components/Navbar';
import { Sparkles } from 'lucide-react';

const spreadPositions = [
  'Past',
  'Present',
  'Future',
  'Advice',
  'Obstacles',
  'External Influences',
  'Outcome'
];

const TarotSpread = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { spreadCards, question } = location.state || {};

  if (!spreadCards || spreadCards.length !== 7) {
    // If no cards, redirect back to tarot page
    navigate('/tarot');
    return null;
  }

  return (
    <div className="min-h-screen cosmic-bg flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center relative py-12 md:py-20">
        <div className="w-full max-w-6xl mx-auto bg-navy-900/60 border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(159,68,211,0.3)] px-4 md:px-8 py-8 md:py-12 flex flex-col items-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-cinzel text-white leading-tight text-center">
            Your 7-Card Spread
          </h1>
          {/* Top row: 7 cards horizontally */}
          <div className="w-full flex flex-row justify-center gap-4 md:gap-6 mb-10 overflow-x-auto">
            {spreadCards.map((card, index) => (
              <div
                key={index}
                className={`flex flex-col items-center w-32 md:w-36 relative select-none`}
              >
                <div
                  className={`w-28 h-44 rounded-xl overflow-hidden mb-2 flex items-center justify-center bg-gradient-to-br from-purple-800/80 to-indigo-800/70 border-2 border-purple-500/30 shadow-lg animate-revolve-card animate-glow-card relative`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {/* Sparkles overlay */}
                  <span className="absolute top-2 left-3 animate-sparkle-twinkle z-10">
                    <Sparkles className="w-6 h-6 text-astro-glow opacity-80" />
                  </span>
                  <span className="absolute bottom-3 right-4 animate-sparkle-twinkle2 z-10">
                    <Sparkles className="w-4 h-4 text-purple-300 opacity-60" />
                  </span>
                  <span className="absolute bottom-2 left-6 animate-sparkle-twinkle3 z-10">
                    <Sparkles className="w-3 h-3 text-indigo-300 opacity-50" />
                  </span>
                  {/* Always show Sparkles icon instead of image */}
                  <Sparkles className="w-16 h-16 text-purple-400 opacity-80 relative z-0" />
                </div>
                <span
                  className="text-lg md:text-xl font-cinzel text-white text-center font-semibold"
                  style={{ display: 'block', minHeight: '2.5rem' }}
                >
                  {card.name}
                </span>
              </div>
            ))}
          </div>
          {/* Add animation style for revolving cards, glow, and sparkles */}
          <style>{`
            @keyframes revolve-card {
              0% { transform: rotateY(0deg); }
              60% { transform: rotateY(360deg); }
              100% { transform: rotateY(360deg); }
            }
            .animate-revolve-card {
              animation: revolve-card 1.2s cubic-bezier(0.77,0,0.175,1) both;
              will-change: transform;
              backface-visibility: hidden;
              perspective: 800px;
            }
            @keyframes glow-card {
              0%, 100% { box-shadow: 0 0 24px 6px #a259e6cc, 0 0 0 0 #fff0; border-color: #a259e6cc; }
              50% { box-shadow: 0 0 48px 16px #a259e6ff, 0 0 0 0 #fff0; border-color: #fff; }
            }
            .animate-glow-card {
              animation: glow-card 2.2s ease-in-out infinite;
              border: 2px solid #a259e6cc;
            }
            @keyframes sparkle-twinkle {
              0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.2) rotate(15deg); }
            }
            .animate-sparkle-twinkle {
              animation: sparkle-twinkle 1.6s ease-in-out infinite;
            }
            @keyframes sparkle-twinkle2 {
              0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
              50% { opacity: 0.9; transform: scale(1.3) rotate(-10deg); }
            }
            .animate-sparkle-twinkle2 {
              animation: sparkle-twinkle2 2.1s ease-in-out infinite;
            }
            @keyframes sparkle-twinkle3 {
              0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
              50% { opacity: 0.8; transform: scale(1.1) rotate(8deg); }
            }
            .animate-sparkle-twinkle3 {
              animation: sparkle-twinkle3 1.3s ease-in-out infinite;
            }
          `}</style>
          {/* Details below */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
            {spreadCards.map((card, index) => (
              <Card
                key={index}
                className="bg-navy-900/70 border border-purple-500/30 p-6 rounded-xl shadow-[0_0_20px_rgba(159,68,211,0.2)] flex flex-col items-start cursor-pointer hover:border-purple-400/70 hover:shadow-[0_0_30px_rgba(159,68,211,0.3)] transition-all duration-200"
                onClick={() => navigate('/tarot/card/' + encodeURIComponent(card.name), { state: { card } })}
              >
                <span className="text-lg font-cinzel text-purple-300 mb-1 uppercase tracking-wider">{spreadPositions[index]}</span>
                <span className="text-2xl font-cinzel font-bold mb-1 text-white">{card.name}</span>
                <span className={`text-base font-cinzel mb-2 ${card.isReversed ? 'text-rose-400' : 'text-green-400'} font-semibold`}>{card.isReversed ? 'Reversed' : 'Upright'}</span>
                <span className="text-gray-300 font-cormorant text-base">{card.description}</span>
              </Card>
            ))}
          </div>
        </div>
        <BackToHome />
      </div>
    </div>
  );
};

export default TarotSpread; 