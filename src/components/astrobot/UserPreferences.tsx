import { useState } from 'react';
import { useAstroBot, UserProfile } from '@/contexts/AstroBotContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Calendar, Star, Sparkles } from 'lucide-react';

const UserPreferences = () => {
  const { userProfile, setUserProfile } = useAstroBot();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    'Notification' in window && Notification.permission === 'granted'
  );

  const handleNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Your browser does not support notifications');
      return;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    } else if (Notification.permission === 'denied') {
      alert('Please enable notifications in your browser settings');
      return;
    }

    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: notificationsEnabled
      }
    }));
  };

  const handlePreferenceChange = (key: keyof NonNullable<UserProfile['preferences']>) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences?.[key]
      }
    }));
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-cinzel">Cosmic Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-astro-violet" />
            <Label htmlFor="notifications">Enable Notifications</Label>
          </div>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationPermission}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-astro-violet" />
            <Label htmlFor="daily-horoscope">Daily Horoscope</Label>
          </div>
          <Switch
            id="daily-horoscope"
            checked={userProfile.preferences?.dailyHoroscope}
            onCheckedChange={() => handlePreferenceChange('dailyHoroscope')}
            disabled={!notificationsEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-astro-violet" />
            <Label htmlFor="weekly-insights">Weekly Insights</Label>
          </div>
          <Switch
            id="weekly-insights"
            checked={userProfile.preferences?.weeklyInsights}
            onCheckedChange={() => handlePreferenceChange('weeklyInsights')}
            disabled={!notificationsEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-astro-violet" />
            <Label htmlFor="tarot-streak">Tarot Reading Streak</Label>
          </div>
          <Switch
            id="tarot-streak"
            checked={userProfile.preferences?.tarotStreak}
            onCheckedChange={() => handlePreferenceChange('tarotStreak')}
            disabled={!notificationsEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferences; 