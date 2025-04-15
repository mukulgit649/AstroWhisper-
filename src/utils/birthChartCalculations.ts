interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
}

interface Aspect {
  planet1: string;
  planet2: string;
  aspectType: string;
  orb: number;
  influence: 'harmonious' | 'challenging' | 'neutral';
}

export const calculateAspects = (planetPositions: PlanetPosition[]): Aspect[] => {
  const aspects: Aspect[] = [];
  
  for (let i = 0; i < planetPositions.length; i++) {
    for (let j = i + 1; j < planetPositions.length; j++) {
      const planet1 = planetPositions[i];
      const planet2 = planetPositions[j];
      
      // Calculate the angle between planets
      const angle = Math.abs(planet1.degree - planet2.degree);
      
      // Check for conjunction (0°)
      if (angle <= 10 || angle >= 350) {
        aspects.push({
          planet1: planet1.planet,
          planet2: planet2.planet,
          aspectType: 'Conjunction',
          orb: angle <= 10 ? angle : 360 - angle,
          influence: 'neutral'
        });
      }
      
      // Check for opposition (180°)
      else if (angle >= 170 && angle <= 190) {
        aspects.push({
          planet1: planet1.planet,
          planet2: planet2.planet,
          aspectType: 'Opposition',
          orb: Math.abs(180 - angle),
          influence: 'challenging'
        });
      }
      
      // Check for trine (120°)
      else if ((angle >= 110 && angle <= 130) || (angle >= 230 && angle <= 250)) {
        aspects.push({
          planet1: planet1.planet,
          planet2: planet2.planet,
          aspectType: 'Trine',
          orb: Math.abs(120 - (angle % 120)),
          influence: 'harmonious'
        });
      }
      
      // Check for square (90°)
      else if ((angle >= 80 && angle <= 100) || (angle >= 260 && angle <= 280)) {
        aspects.push({
          planet1: planet1.planet,
          planet2: planet2.planet,
          aspectType: 'Square',
          orb: Math.abs(90 - (angle % 90)),
          influence: 'challenging'
        });
      }
      
      // Check for sextile (60°)
      else if ((angle >= 50 && angle <= 70) || (angle >= 290 && angle <= 310)) {
        aspects.push({
          planet1: planet1.planet,
          planet2: planet2.planet,
          aspectType: 'Sextile',
          orb: Math.abs(60 - (angle % 60)),
          influence: 'harmonious'
        });
      }
    }
  }
  
  return aspects;
};

export const calculateHouses = (birthTime: Date, latitude: number, longitude: number): number[] => {
  // Placeholder for actual astronomical calculations
  // In a real app, you would use a proper astronomical library
  
  // This is a simplified placeholder that returns 12 random house cusps
  return Array(12).fill(0).map((_, i) => {
    // Generate a value between 0-360 for each house cusp
    return (i * 30 + Math.random() * 10 - 5) % 360;
  });
};

export const interpretAspect = (aspect: Aspect): string => {
  const { planet1, planet2, aspectType, influence } = aspect;
  
  const interpretations: Record<string, Record<string, string>> = {
    Conjunction: {
      harmonious: `The conjunction between ${planet1} and ${planet2} brings a powerful fusion of energies, enhancing your ${planet1.toLowerCase()} qualities with ${planet2.toLowerCase()} influences.`,
      challenging: `The conjunction between ${planet1} and ${planet2} creates intensity and potential tension between your ${planet1.toLowerCase()} expression and ${planet2.toLowerCase()} needs.`,
      neutral: `The conjunction between ${planet1} and ${planet2} merges these planetary energies, requiring conscious integration of ${planet1.toLowerCase()} and ${planet2.toLowerCase()} qualities.`
    },
    Opposition: {
      harmonious: `The opposition between ${planet1} and ${planet2} creates a dynamic tension that can lead to growth through balancing ${planet1.toLowerCase()} and ${planet2.toLowerCase()} energies.`,
      challenging: `The opposition between ${planet1} and ${planet2} may manifest as conflict between your ${planet1.toLowerCase()} needs and ${planet2.toLowerCase()} expression.`,
      neutral: `The opposition between ${planet1} and ${planet2} highlights polarities in your life between ${planet1.toLowerCase()} and ${planet2.toLowerCase()} areas.`
    },
    Trine: {
      harmonious: `The trine between ${planet1} and ${planet2} creates a harmonious flow of energy, allowing your ${planet1.toLowerCase()} qualities to enhance your ${planet2.toLowerCase()} expression.`,
      challenging: `Despite the typically harmonious nature of trines, this aspect between ${planet1} and ${planet2} may lead to complacency in ${planet1.toLowerCase()} and ${planet2.toLowerCase()} areas.`,
      neutral: `The trine between ${planet1} and ${planet2} offers natural talents and ease between your ${planet1.toLowerCase()} and ${planet2.toLowerCase()} expressions.`
    },
    Square: {
      harmonious: `While squares are typically challenging, this aspect between ${planet1} and ${planet2} can motivate growth through resolving tension between ${planet1.toLowerCase()} and ${planet2.toLowerCase()} areas.`,
      challenging: `The square between ${planet1} and ${planet2} creates friction and challenges between your ${planet1.toLowerCase()} expression and ${planet2.toLowerCase()} needs.`,
      neutral: `The square between ${planet1} and ${planet2} presents growth opportunities through working with the tension between ${planet1.toLowerCase()} and ${planet2.toLowerCase()} energies.`
    },
    Sextile: {
      harmonious: `The sextile between ${planet1} and ${planet2} offers opportunities for your ${planet1.toLowerCase()} qualities to work cooperatively with your ${planet2.toLowerCase()} expression.`,
      challenging: `Though sextiles are typically favorable, this aspect between ${planet1} and ${planet2} requires conscious effort to utilize the potential between these areas.`,
      neutral: `The sextile between ${planet1} and ${planet2} presents opportunities for growth when you actively connect your ${planet1.toLowerCase()} and ${planet2.toLowerCase()} energies.`
    }
  };
  
  return interpretations[aspectType]?.[influence] || 
    `This ${aspectType} between ${planet1} and ${planet2} influences how these planetary energies interact in your chart.`;
};
