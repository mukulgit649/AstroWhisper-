import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';

const TarotCardDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;

  if (!card) {
    navigate('/tarot');
    return null;
  }

  return (
    <div className="min-h-screen cosmic-bg flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center relative py-12 md:py-20">
        <div className="w-full max-w-xl mx-auto bg-navy-900/70 border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(159,68,211,0.3)] px-6 py-10 flex flex-col items-center animate-fade-in-up">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 self-start text-purple-300 hover:text-purple-100 font-cinzel text-lg transition-colors"
          >
            ← Back
          </button>
          <div className="w-40 h-64 rounded-xl overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br from-purple-800/80 to-indigo-800/70 border-2 border-purple-500/30 shadow-lg">
            {card.image ? (
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Sparkles className="w-20 h-20 text-purple-400 opacity-80" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-2 text-center">{card.name}</h1>
          <span className={`text-lg font-cinzel mb-4 ${card.isReversed ? 'text-rose-400' : 'text-green-400'} font-semibold`}>{card.isReversed ? 'Reversed' : 'Upright'}</span>
          <p className="text-gray-300 font-cormorant text-lg text-center mb-6">{card.description}</p>

          {/* Keywords */}
          {card.keywords && card.keywords.length > 0 && (
            <div className="w-full mb-4">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((kw: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm font-cinzel">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Upright & Reversed Meanings */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {card.upright && card.upright.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-green-300 mb-2">Upright Meanings</h3>
                <ul className="list-disc list-inside text-green-200 font-cormorant text-base space-y-1">
                  {card.upright.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {card.reversed && card.reversed.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-rose-300 mb-2">Reversed Meanings</h3>
                <ul className="list-disc list-inside text-rose-200 font-cormorant text-base space-y-1">
                  {card.reversed.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Symbolism */}
          {card.symbolism && card.symbolism.length > 0 && (
            <div className="w-full mb-4">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2">Symbolism</h3>
              <ul className="list-disc list-inside text-purple-200 font-cormorant text-base space-y-1">
                {card.symbolism.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Advice & Warning */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {card.advice && card.advice.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-blue-300 mb-2">Advice</h3>
                <ul className="list-disc list-inside text-blue-200 font-cormorant text-base space-y-1">
                  {card.advice.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {card.warning && card.warning.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-yellow-300 mb-2">Warning</h3>
                <ul className="list-disc list-inside text-yellow-200 font-cormorant text-base space-y-1">
                  {card.warning.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Affirmations */}
          {(card.affirmation || card.reversedAffirmation) && (
            <div className="w-full mb-4">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2">Affirmations</h3>
              {card.affirmation && <p className="text-purple-200 font-cormorant mb-1">Upright: <span className="italic">{card.affirmation}</span></p>}
              {card.reversedAffirmation && <p className="text-rose-200 font-cormorant">Reversed: <span className="italic">{card.reversedAffirmation}</span></p>}
            </div>
          )}

          {/* Numerology, Astrological, Mythology */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {card.numerology && (
              <div>
                <h3 className="text-lg font-cinzel text-purple-300 mb-2">Numerology</h3>
                <p className="text-purple-200 font-cormorant">{card.numerology}</p>
              </div>
            )}
            {card.astrological && (
              <div>
                <h3 className="text-lg font-cinzel text-purple-300 mb-2">Astrological</h3>
                <p className="text-purple-200 font-cormorant">{card.astrological}</p>
              </div>
            )}
            {card.mythology && (
              <div>
                <h3 className="text-lg font-cinzel text-purple-300 mb-2">Mythology</h3>
                <p className="text-purple-200 font-cormorant">{card.mythology}</p>
              </div>
            )}
          </div>

          {/* Crystals & Colors */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {card.crystals && card.crystals.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-purple-300 mb-2">Crystals</h3>
                <div className="flex flex-wrap gap-2">
                  {card.crystals.map((crystal: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm font-cinzel">{crystal}</span>
                  ))}
                </div>
              </div>
            )}
            {card.colors && card.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-cinzel text-purple-300 mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {card.colors.map((color: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30 text-purple-100 text-sm font-cinzel">{color}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <BackToHome />
      </div>
    </div>
  );
};

export default TarotCardDetail; 