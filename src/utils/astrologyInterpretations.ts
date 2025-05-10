export interface PlanetInterpretation {
  meaning: string;
  keywords: string[];
  challenges: string[];
  strengths: string[];
  advice: string[];
}

export interface AspectInterpretation {
  meaning: string;
  keywords: string[];
  challenges: string[];
  opportunities: string[];
}

export const getPlanetInterpretation = (planet: string, sign: string): PlanetInterpretation => {
  const interpretations: Record<string, Record<string, PlanetInterpretation>> = {
    Sun: {
      Aries: {
        meaning: "Your core identity is bold, pioneering, and action-oriented. You're a natural leader who thrives on challenges and new beginnings.",
        keywords: ["Courageous", "Independent", "Energetic", "Direct", "Pioneering"],
        challenges: ["Impatience", "Aggressiveness", "Self-centeredness"],
        strengths: ["Leadership", "Initiative", "Courage", "Honesty"],
        advice: ["Practice patience", "Consider others' perspectives", "Channel energy constructively"]
      },
      Taurus: {
        meaning: "You have a grounded, practical approach to life. Your essence is stable, reliable, and focused on building lasting value.",
        keywords: ["Stable", "Practical", "Sensual", "Patient", "Determined"],
        challenges: ["Stubbornness", "Resistance to change", "Materialism"],
        strengths: ["Reliability", "Persistence", "Practical wisdom", "Financial acumen"],
        advice: ["Embrace change when necessary", "Practice flexibility", "Balance material and spiritual values"]
      }
      // Add more signs for Sun
    },
    Moon: {
      Aries: {
        meaning: "Your emotions are quick, passionate, and independent. You process feelings through action and need freedom in emotional expression.",
        keywords: ["Passionate", "Independent", "Spontaneous", "Direct", "Courageous"],
        challenges: ["Impulsiveness", "Emotional volatility", "Impatience"],
        strengths: ["Emotional courage", "Honesty", "Quick recovery", "Initiative"],
        advice: ["Practice emotional patience", "Develop deeper emotional connections", "Channel passion constructively"]
      },
      Taurus: {
        meaning: "You need security, comfort, and stability in your emotional life. Your feelings are steady, loyal, and deeply connected to physical comforts.",
        keywords: ["Stable", "Loyal", "Sensual", "Patient", "Grounded"],
        challenges: ["Possessiveness", "Resistance to change", "Material attachment"],
        strengths: ["Emotional stability", "Loyalty", "Sensual awareness", "Practical support"],
        advice: ["Practice emotional flexibility", "Develop non-material sources of security", "Share your resources"]
      }
      // Add more signs for Moon
    }
    // Add more planets
  };

  return interpretations[planet]?.[sign] || {
    meaning: "This planet's influence is unique to your chart.",
    keywords: [],
    challenges: [],
    strengths: [],
    advice: []
  };
};

export const getAspectInterpretation = (planet1: string, planet2: string, aspect: string): AspectInterpretation => {
  const interpretations: Record<string, AspectInterpretation> = {
    "conjunction": {
      meaning: "A powerful blending of energies where the planets work together as one force.",
      keywords: ["Intensity", "Focus", "Integration", "Power", "Unity"],
      challenges: ["Overwhelm", "Lack of perspective", "Extremes"],
      opportunities: ["Strong manifestation", "Clear direction", "Deep understanding"]
    },
    "opposition": {
      meaning: "A dynamic tension that creates balance through opposing forces.",
      keywords: ["Balance", "Awareness", "Choice", "Integration", "Perspective"],
      challenges: ["Conflict", "Indecision", "Polarization"],
      opportunities: ["Growth through challenge", "Broader perspective", "Creative solutions"]
    },
    "trine": {
      meaning: "A harmonious flow of energy that brings natural talents and opportunities.",
      keywords: ["Harmony", "Flow", "Talent", "Ease", "Support"],
      challenges: ["Complacency", "Taking things for granted", "Lack of motivation"],
      opportunities: ["Natural abilities", "Easy success", "Creative expression"]
    },
    "square": {
      meaning: "A challenging aspect that creates tension and promotes growth through struggle.",
      keywords: ["Challenge", "Growth", "Action", "Change", "Development"],
      challenges: ["Frustration", "Conflict", "Obstacles"],
      opportunities: ["Personal growth", "Strength building", "Transformation"]
    },
    "sextile": {
      meaning: "A supportive aspect that creates opportunities through harmonious interaction.",
      keywords: ["Opportunity", "Support", "Growth", "Harmony", "Development"],
      challenges: ["Missed chances", "Lack of initiative", "Underutilization"],
      opportunities: ["Easy growth", "Natural talents", "Supportive relationships"]
    }
  };

  return interpretations[aspect] || {
    meaning: "This aspect creates a unique interaction between these planets.",
    keywords: [],
    challenges: [],
    opportunities: []
  };
}; 