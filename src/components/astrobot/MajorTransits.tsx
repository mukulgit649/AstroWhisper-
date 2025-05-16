import { useAstroBot } from '@/contexts/AstroBotContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Calendar, Sparkles } from 'lucide-react';

const MajorTransits = () => {
  const { userProfile } = useAstroBot();

  // Mock data for major transits - this would be calculated based on birth chart
  const majorTransits = [
    {
      type: 'Saturn Return',
      description: 'A significant period of growth and responsibility',
      startDate: '2024-03-15',
      endDate: '2024-12-31',
      icon: Calendar,
      color: 'text-astro-violet'
    },
    {
      type: 'Mercury Retrograde',
      description: 'A time for reflection and review',
      startDate: '2024-09-02',
      endDate: '2024-09-25',
      icon: Sparkles,
      color: 'text-astro-lilac'
    },
    {
      type: 'Jupiter Transit',
      description: 'Expansion and opportunity in your career sector',
      startDate: '2024-05-01',
      endDate: '2024-12-31',
      icon: Star,
      color: 'text-astro-glow'
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-cinzel">Major Transits</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {majorTransits.map((transit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-white/5 ${transit.color}`}>
                  <transit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground/90">{transit.type}</h4>
                  <p className="text-sm text-foreground/70">{transit.description}</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    {new Date(transit.startDate).toLocaleDateString()} - {new Date(transit.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MajorTransits; 