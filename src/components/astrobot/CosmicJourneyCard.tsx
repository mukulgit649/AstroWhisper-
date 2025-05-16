import { useAstroBot } from '@/contexts/AstroBotContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const signEmoji: Record<string, string> = {
  aries: '♈️', taurus: '♉️', gemini: '♊️', cancer: '♋️', leo: '♌️', virgo: '♍️',
  libra: '♎️', scorpio: '♏️', sagittarius: '♐️', capricorn: '♑️', aquarius: '♒️', pisces: '♓️'
};

const CosmicJourneyCard = () => {
  const { userProfile } = useAstroBot();
  const name = userProfile.name || 'Starseeker';
  const sign = userProfile.zodiacSign ? userProfile.zodiacSign.toLowerCase() : '';
  const signIcon = signEmoji[sign] || '✨';
  const streak = userProfile.interactionStreak || 0;
  const mood = userProfile.lastCheckInMood ? `Mood: ${userProfile.lastCheckInMood}` : '';

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">🌌 My Cosmic Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-base font-semibold mb-1">{signIcon} {name}</div>
        {sign && <div className="text-sm mb-1">Sign: {sign.charAt(0).toUpperCase() + sign.slice(1)}</div>}
        <div className="text-sm mb-1">🔥 Streak: {streak} days</div>
        {mood && <div className="text-sm mb-1">{mood}</div>}
        <div className="text-xs text-foreground/60 mt-2">Keep returning for more cosmic wisdom and unlock new badges!</div>
      </CardContent>
    </Card>
  );
};

export default CosmicJourneyCard; 