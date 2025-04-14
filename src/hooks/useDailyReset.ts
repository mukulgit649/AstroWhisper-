
import { useState, useEffect } from 'react';

export const useDailyReset = (key: string) => {
  const [lastResetDate, setLastResetDate] = useState<string>(() => {
    return localStorage.getItem(`${key}_last_reset`) || '';
  });

  const shouldReset = () => {
    const now = new Date();
    const today = now.toDateString();
    const isPastNoon = now.getHours() >= 12;
    
    // Get stored date (if any)
    const storedDate = lastResetDate ? new Date(lastResetDate) : null;
    
    // Need to reset if:
    // 1. No previous reset date exists, or
    // 2. It's a new day and past noon, or
    // 3. It's the same day but now past noon and the last reset was before noon
    if (!storedDate) {
      setLastResetDate(today);
      localStorage.setItem(`${key}_last_reset`, today);
      return true;
    } else if (today !== storedDate.toDateString() && isPastNoon) {
      setLastResetDate(today);
      localStorage.setItem(`${key}_last_reset`, today);
      return true;
    } else if (today === storedDate.toDateString() && isPastNoon && storedDate.getHours() < 12) {
      setLastResetDate(today);
      localStorage.setItem(`${key}_last_reset`, today);
      return true;
    }
    
    return false;
  };

  // Check for reset on initial load
  useEffect(() => {
    shouldReset();
  }, []);

  return { shouldReset, lastResetDate };
};
