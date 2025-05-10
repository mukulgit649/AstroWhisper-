export interface PlanetPosition {
  sign: string;
  degree: number;
}

export interface PlanetaryPositions {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  ascendant: PlanetPosition;
}

export interface PersonalizedReading {
  summary: string;
  aspects: string[];
  recommendations: string[];
}

export const calculatePlanetaryPositions = (birthDate: Date, birthTime: string, latitude: number, longitude: number): PlanetaryPositions => {
  // For now, return consistent data based on birth parameters
  // This mimics an astronomical calculation service
  
  // Extract day, month, year to create deterministic but varied results
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  // Simple hash function to get consistent but varied signs
  const getZodiacSign = (base: number): string => {
    const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const signIndex = Math.abs((base + day + month + year) % 12);
    return signs[signIndex];
  };
  
  // Get degree based on date components
  const getDegree = (base: number): number => {
    return Math.abs((base + day * month) % 30);
  };
  
  return {
    sun: { sign: getZodiacSign(0), degree: getDegree(7) },
    moon: { sign: getZodiacSign(2), degree: getDegree(13) },
    mercury: { sign: getZodiacSign(1), degree: getDegree(21) },
    venus: { sign: getZodiacSign(4), degree: getDegree(17) },
    mars: { sign: getZodiacSign(6), degree: getDegree(5) },
    jupiter: { sign: getZodiacSign(8), degree: getDegree(9) },
    saturn: { sign: getZodiacSign(10), degree: getDegree(25) },
    uranus: { sign: getZodiacSign(11), degree: getDegree(11) },
    neptune: { sign: getZodiacSign(12), degree: getDegree(13) },
    pluto: { sign: getZodiacSign(13), degree: getDegree(15) },
    ascendant: { sign: getZodiacSign(birthTime.length), degree: getDegree(3) },
  };
};

export const getPersonalizedReading = (positions: PlanetaryPositions): PersonalizedReading => {
  const { sun, moon, mercury, venus, mars, ascendant } = positions;
  
  // Generate summary based on sun and moon signs
  const summary = `Your Sun in ${sun.sign} indicates ${getSunDescription(sun.sign)}, while your Moon in ${moon.sign} reveals ${getMoonDescription(moon.sign)} in your emotional life. With Mercury in ${mercury.sign}, you tend to think and communicate in a ${getMercuryDescription(mercury.sign)} manner.`;
  
  // Generate aspects
  const aspects = [
    `Sun (${sun.sign}) ${getAspect(sun, moon)} Moon (${moon.sign}) - ${getAspectMeaning("Sun", "Moon")}`,
    `Sun (${sun.sign}) ${getAspect(sun, mercury)} Mercury (${mercury.sign}) - ${getAspectMeaning("Sun", "Mercury")}`,
    `Moon (${moon.sign}) ${getAspect(moon, venus)} Venus (${venus.sign}) - ${getAspectMeaning("Moon", "Venus")}`,
    `Venus (${venus.sign}) ${getAspect(venus, mars)} Mars (${mars.sign}) - ${getAspectMeaning("Venus", "Mars")}`
  ];
  
  // Generate recommendations
  const recommendations = [
    `Focus on developing your ${sun.sign} strengths through ${getRecommendation(sun.sign)}`,
    `When feeling emotionally overwhelmed, try ${getRecommendation(moon.sign)}`,
    `Enhance your communication by ${getRecommendation(mercury.sign)}`,
    ascendant ? `Present yourself to the world by embracing your ${ascendant.sign} ascendant through ${getRecommendation(ascendant.sign)}` : 
      `Balance your ${venus.sign} desires with your ${mars.sign} drive through conscious action`
  ];
  
  return {
    summary,
    aspects,
    recommendations
  };
};

// Helper functions to generate personalized content
const getSunDescription = (sign: string): string => {
  const descriptions: Record<string, string> = {
    "Aries": "a pioneering spirit and natural leadership abilities",
    "Taurus": "a grounded, practical approach to life and strong determination",
    "Gemini": "intellectual curiosity and versatile communication skills",
    "Cancer": "nurturing instincts and emotional intelligence",
    "Leo": "creative self-expression and natural charisma",
    "Virgo": "analytical abilities and attention to practical details",
    "Libra": "a diplomatic nature and desire for harmony in relationships",
    "Scorpio": "emotional intensity and transformative power",
    "Sagittarius": "philosophical outlook and love of freedom",
    "Capricorn": "ambition, discipline and strategic long-term planning",
    "Aquarius": "innovative thinking and humanitarian ideals",
    "Pisces": "intuitive understanding and compassionate connection to others"
  };
  
  return descriptions[sign] || "a unique blend of cosmic energies";
};

const getMoonDescription = (sign: string): string => {
  const descriptions: Record<string, string> = {
    "Aries": "a need for independence and quick emotional responses",
    "Taurus": "a strong need for security and comfort in your environment",
    "Gemini": "intellectual processing of emotions and need for variety",
    "Cancer": "deep emotional sensitivity and strong nurturing instincts",
    "Leo": "a warm-hearted approach and need for recognition",
    "Virgo": "analytical processing of emotions and attention to emotional details",
    "Libra": "a balanced approach to emotions and need for harmony",
    "Scorpio": "profound emotional depths and transformative emotional experiences",
    "Sagittarius": "optimism and philosophical approach to emotions",
    "Capricorn": "disciplined emotional responses and practical emotional needs",
    "Aquarius": "unique emotional processing and intellectual approach to feelings",
    "Pisces": "boundless compassion and intuitive emotional connections"
  };
  
  return descriptions[sign] || "a complex emotional landscape";
};

const getMercuryDescription = (sign: string): string => {
  const descriptions: Record<string, string> = {
    "Aries": "direct and pioneering",
    "Taurus": "methodical and practical",
    "Gemini": "versatile and curious",
    "Cancer": "intuitive and protective",
    "Leo": "dramatic and expressive",
    "Virgo": "analytical and precise",
    "Libra": "diplomatic and balanced",
    "Scorpio": "probing and intense",
    "Sagittarius": "expansive and optimistic",
    "Capricorn": "structured and disciplined",
    "Aquarius": "innovative and progressive",
    "Pisces": "imaginative and empathetic"
  };
  
  return descriptions[sign] || "unique and personalized";
};

const getAspect = (planet1: PlanetPosition, planet2: PlanetPosition): string => {
  // Simple algorithm to determine cosmic aspects
  const aspects = ["trine", "square", "sextile", "opposition", "conjunction"];
  const hash = (planet1.sign.length + planet2.sign.length + planet1.degree + planet2.degree) % aspects.length;
  return aspects[hash];
};

const getAspectMeaning = (planet1: string, planet2: string): string => {
  const meanings: Record<string, string> = {
    "Sun-Moon": "Harmony between your conscious self and emotional needs",
    "Sun-Mercury": "Integration of identity and communication style",
    "Moon-Venus": "Connection between emotional needs and relationship desires",
    "Venus-Mars": "Balance between your receptive and assertive energies",
    "Sun-Mars": "Alignment of will and action",
    "Moon-Mercury": "Integration of feelings and thoughts",
    "Mercury-Venus": "Harmony between mind and aesthetic sensibilities",
    "Mercury-Mars": "Powerful communication and mental drive"
  };
  
  const key = [planet1, planet2].sort().join("-");
  return meanings[key] || "A significant cosmic influence on your personality";
};

const getRecommendation = (sign: string): string => {
  const recommendations: Record<string, string> = {
    "Aries": "physical activities that channel your energy positively",
    "Taurus": "creating beautiful and comfortable spaces that ground you",
    "Gemini": "diverse intellectual pursuits that satisfy your curiosity",
    "Cancer": "nurturing activities that connect you with loved ones",
    "Leo": "creative self-expression and heartfelt sharing",
    "Virgo": "organizing systems that bring order to your environment",
    "Libra": "aesthetic pursuits that create harmony and balance",
    "Scorpio": "deep transformative practices and emotional exploration",
    "Sagittarius": "philosophical study and adventurous experiences",
    "Capricorn": "setting achievable goals and building lasting structures",
    "Aquarius": "innovative thinking and connecting with community",
    "Pisces": "spiritual practices and artistic expression"
  };
  
  return recommendations[sign] || "practices aligned with your cosmic blueprint";
};
