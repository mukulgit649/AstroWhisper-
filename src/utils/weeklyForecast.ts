
import { getZodiacData } from './zodiacData';

export const getWeeklyForecast = (sign: string) => {
  const zodiacData = getZodiacData(sign);
  if (!zodiacData) return null;
  
  // Generate a consistent weekly forecast based on the current week
  const today = new Date();
  const weekNumber = Math.floor((today.getDate() - 1) / 7) + 1;
  
  const areas = [
    'Career & Goals',
    'Love & Relationships',
    'Health & Wellness',
    'Personal Growth'
  ];
  
  return areas.map(area => {
    const seed = `${sign}-${area}-${weekNumber}-${today.getMonth()}`;
    const hash = Array.from(seed).reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Use zodiac traits to generate more personalized predictions
    const predictions = [
      `A favorable time for ${zodiacData.traits[0].toLowerCase()} endeavors`,
      `Focus on your ${zodiacData.traits[1].toLowerCase()} nature`,
      `Embrace your ${zodiacData.traits[2].toLowerCase()} side`,
      `Channel your ${zodiacData.traits[3].toLowerCase()} energy`
    ];
    
    return {
      area,
      prediction: predictions[Math.abs(hash) % predictions.length]
    };
  });
};
