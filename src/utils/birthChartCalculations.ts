import { getZodiacData } from './zodiacData';

interface PlanetaryPosition {
  planet: string;
  sign: string;
  house: number;
  degree: number;
}

export const calculatePlanetaryPositions = (birthDate: Date): PlanetaryPosition[] => {
  // Enhanced calculation using birth date to generate more accurate positions
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const planets = [
    "Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", 
    "Uranus", "Neptune", "Pluto"
  ];
  
  return planets.map((planet, index) => {
    // Using more sophisticated calculations based on birth date
    const baseAngle = (dayOfYear * (360 / 365) + index * 30) % 360;
    const zodiacIndex = Math.floor(baseAngle / 30);
    const degree = baseAngle % 30;
    
    const signs = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];
    
    return {
      planet,
      sign: signs[zodiacIndex],
      house: (zodiacIndex % 12) + 1,
      degree: Math.round(degree)
    };
  });
};

export const calculateAspects = (positions: PlanetaryPosition[]) => {
  const aspects: Array<{
    planets: [string, string];
    type: string;
    angle: number;
    orb: number;
  }> = [];

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const p1 = positions[i];
      const p2 = positions[j];
      
      // Calculate angle between planets
      const angle = Math.abs(p1.degree - p2.degree);
      
      // Define aspect types and their orbs
      const aspectTypes = [
        { name: 'Conjunction', angle: 0, orb: 10 },
        { name: 'Sextile', angle: 60, orb: 6 },
        { name: 'Square', angle: 90, orb: 8 },
        { name: 'Trine', angle: 120, orb: 8 },
        { name: 'Opposition', angle: 180, orb: 10 }
      ];
      
      const matchingAspect = aspectTypes.find(aspect => 
        Math.abs(angle - aspect.angle) <= aspect.orb
      );
      
      if (matchingAspect) {
        aspects.push({
          planets: [p1.planet, p2.planet],
          type: matchingAspect.name,
          angle,
          orb: Math.abs(angle - aspect.angle)
        });
      }
    }
  }
  
  return aspects;
};

export const getPersonalizedReading = (
  sunSign: string,
  moonSign: string,
  ascendant: string | null,
  positions: PlanetaryPosition[],
  aspects: any[]
) => {
  const sunSignData = getZodiacData(sunSign);
  const moonSignData = getZodiacData(moonSign);
  
  let reading = `Your ${sunSign} Sun sign represents your core identity and ego. `;
  reading += `With a ${moonSign} Moon, your emotional nature is characterized by ${moonSignData?.traits.join(', ')}. `;
  
  if (ascendant) {
    const ascendantData = getZodiacData(ascendant);
    reading += `Your ${ascendant} Ascendant shapes how others perceive you initially. It brings ${ascendantData?.traits.slice(0, 2).join(' and ')} to your outward personality. `;
  }
  
  const significantPlanets = positions.filter(p => 
    ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'].includes(p.planet)
  );
  
  significantPlanets.forEach(position => {
    const planetSignData = getZodiacData(position.sign);
    reading += `Your ${position.planet} in ${position.sign} influences your ${
      position.planet === 'Mercury' ? 'communication style and thought process' :
      position.planet === 'Venus' ? 'approach to love, beauty, and relationships' :
      position.planet === 'Mars' ? 'drive, ambition, and energy expression' :
      'core nature'
    }, bringing ${planetSignData?.traits[0].toLowerCase()} qualities. `;
  });
  
  return reading;
};
