import { useAstroBot } from '@/contexts/AstroBotContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BadgesCard = () => {
  const { userProfile } = useAstroBot();
  const streak = userProfile.interactionStreak || 0;
  // Example badge logic
  const badges = [];
  if (streak >= 3) badges.push({ emoji: '🔥', label: '3-Day Streak' });
  if (streak >= 7) badges.push({ emoji: '🌟', label: '1-Week Streak' });
  if (userProfile.preferences?.tarotStreak) badges.push({ emoji: '🔮', label: 'Tarot Explorer' });
  // Add more badges as needed

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">🏅 Streaks & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        {badges.length === 0 && <div className="text-sm">No badges yet. Keep exploring!</div>}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-sm">
              <span>{badge.emoji}</span> {badge.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesCard; 