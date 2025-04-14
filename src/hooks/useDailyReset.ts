
import { useState, useEffect } from 'react';

export const useDailyReset = (key: string) => {
  const [lastResetDate, setLastResetDate] = useState<string>(() => {
    return localStorage.getItem(`${key}_last_reset`) || '';
  });

  const shouldReset = () => {
    const now = new Date();
    const today = now.toDateString();
    const isPastNoon = now.getHours() >= 12;
    
    if (lastResetDate !== today && isPastNoon) {
      setLastResetDate(today);
      localStorage.setItem(`${key}_last_reset`, today);
      return true;
    }
    return false;
  };

  return { shouldReset, lastResetDate };
};
