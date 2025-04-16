
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getMockBotResponse } from '@/utils/mockAiResponses';
import { getZodiacSign, getZodiacData } from '@/utils/zodiacData';
import { getCardByName } from '@/utils/tarotData';
import { calculatePlanetaryPositions, getPersonalizedReading, type PlanetaryPositions } from '@/utils/birthChartCalculations';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AstroBotContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

interface UserProfile {
  name?: string;
  zodiacSign?: string;
  interests?: string[];
  birthDate?: Date;
  birthTime?: string;
  birthPlace?: string;
  birthChart?: PlanetaryPositions;
  relationshipStatus?: string;
  careerInterests?: string[];
  mentalWellnessGoals?: string[];
}

const AstroBotContext = createContext<AstroBotContextType | undefined>(undefined);

export const AstroBotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, cosmic traveler! I am AstroBot, your mystical guide to celestial wisdom. Ask me about astrology, tarot, life's challenges, or spiritual guidance. How may I illuminate your path today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});

  // Load messages from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('astrobot-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (err) {
        console.error('Failed to parse saved messages:', err);
      }
    }
    
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('astrobot-user-profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.birthDate) {
          parsedProfile.birthDate = new Date(parsedProfile.birthDate);
        }
        setUserProfile(parsedProfile);
      } catch (err) {
        console.error('Failed to parse saved user profile:', err);
      }
    }
    
    // Check for birth chart data from the BirthChart page
    const birthDateStr = localStorage.getItem('userBirthDate');
    const birthTimeStr = localStorage.getItem('userBirthTime');
    const birthPlaceStr = localStorage.getItem('userBirthPlace');
    
    if (birthDateStr) {
      const birthDate = new Date(birthDateStr);
      
      setUserProfile(prev => {
        // Only update if we have new data
        if (prev.birthDate?.toDateString() !== birthDate.toDateString() || 
            prev.birthTime !== birthTimeStr || 
            prev.birthPlace !== birthPlaceStr) {
          
          // Calculate some dummy coordinates based on birth place (in a real app, use geocoding)
          const latitude = birthPlaceStr ? birthPlaceStr.length * 1.5 % 90 : 0;
          const longitude = birthPlaceStr ? birthPlaceStr.length * 2.5 % 180 : 0;
          
          // Calculate planetary positions
          const birthChart = calculatePlanetaryPositions(
            birthDate, 
            birthTimeStr || '12:00', 
            latitude, 
            longitude
          );
          
          const zodiacSign = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());
          
          return { 
            ...prev, 
            birthDate,
            birthTime: birthTimeStr || prev.birthTime,
            birthPlace: birthPlaceStr || prev.birthPlace,
            zodiacSign,
            birthChart
          };
        }
        return prev;
      });
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 1) { // Only save if we have more than the initial message
      localStorage.setItem('astrobot-messages', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Save user profile to localStorage when it changes
  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      localStorage.setItem('astrobot-user-profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const extractUserInfo = (content: string) => {
    // Extract name
    const nameMatch = content.match(/my name is ([A-Za-z]+)/i) || content.match(/I am ([A-Za-z]+)/i) || content.match(/I'm ([A-Za-z]+)/i);
    if (nameMatch && nameMatch[1]) {
      setUserProfile(prev => ({ ...prev, name: nameMatch[1] }));
    }
    
    // Extract birth date
    const dateMatch = content.match(/born on ([0-9]{1,2}[\/-][0-9]{1,2}[\/-][0-9]{2,4})/i) || 
                      content.match(/birthday is ([0-9]{1,2}[\/-][0-9]{1,2}[\/-][0-9]{2,4})/i) ||
                      content.match(/([0-9]{1,2}[\/-][0-9]{1,2}[\/-][0-9]{2,4})/i);
    
    if (dateMatch && dateMatch[1]) {
      const dateStr = dateMatch[1];
      try {
        const birthDate = new Date(dateStr);
        if (!isNaN(birthDate.getTime())) {
          const zodiacSign = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());
          setUserProfile(prev => ({ 
            ...prev, 
            birthDate,
            zodiacSign
          }));
        }
      } catch (err) {
        console.error('Error parsing date:', err);
      }
    }
    
    // Extract zodiac sign
    const zodiacMatch = content.match(/I(?:'m| am) an? ([A-Za-z]+)(?: sign)?/i) || 
                       content.match(/my sign is ([A-Za-z]+)/i) ||
                       content.match(/my zodiac is ([A-Za-z]+)/i);
    
    if (zodiacMatch && zodiacMatch[1]) {
      const potentialSign = zodiacMatch[1].toLowerCase();
      const zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                          'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
      
      if (zodiacSigns.includes(potentialSign)) {
        setUserProfile(prev => ({ ...prev, zodiacSign: potentialSign }));
      }
    }
    
    // Extract interests
    const interestMatches = [
      content.match(/interested in ([A-Za-z, ]+)/i),
      content.match(/I like ([A-Za-z, ]+)/i),
      content.match(/I love ([A-Za-z, ]+)/i),
      content.match(/passion for ([A-Za-z, ]+)/i)
    ].filter(Boolean);
    
    if (interestMatches.length > 0) {
      const newInterests: string[] = [];
      
      interestMatches.forEach(match => {
        if (match && match[1]) {
          const interests = match[1].split(/,| and | or /).map(i => i.trim()).filter(Boolean);
          newInterests.push(...interests);
        }
      });
      
      if (newInterests.length > 0) {
        setUserProfile(prev => {
          const existingInterests = prev.interests || [];
          return {
            ...prev,
            interests: [...new Set([...existingInterests, ...newInterests])]
          };
        });
      }
    }
    
    // Extract relationship status
    const relationshipMatches = [
      content.match(/(?:I'm|I am) (single|married|divorced|engaged|dating|in a relationship|widowed)/i),
      content.match(/(?:my|in) (marriage|relationship|partnership)/i)
    ].filter(Boolean);
    
    if (relationshipMatches.length > 0 && relationshipMatches[0] && relationshipMatches[0][1]) {
      setUserProfile(prev => ({
        ...prev,
        relationshipStatus: relationshipMatches[0]![1].toLowerCase()
      }));
    }
    
    // Extract career-related information
    const careerMatches = [
      content.match(/(?:I|my) (?:work|job|career|profession) (?:as|in|at) (?:a |an |the )?([A-Za-z, ]+)/i),
      content.match(/(?:I'm|I am) (?:a |an |the )?([A-Za-z]+ist|[A-Za-z]+er|[A-Za-z]+or|engineer|designer|developer|doctor|teacher|student)/i)
    ].filter(Boolean);
    
    if (careerMatches.length > 0 && careerMatches[0] && careerMatches[0][1]) {
      const careerInfo = careerMatches[0]![1].trim();
      setUserProfile(prev => {
        const careerInterests = prev.careerInterests || [];
        return {
          ...prev,
          careerInterests: [...new Set([...careerInterests, careerInfo])]
        };
      });
    }
    
    // Extract mental wellness goals
    const wellnessMatches = [
      content.match(/(?:I|my) (?:struggle|dealing|coping) with ([A-Za-z, ]+)/i),
      content.match(/(?:feeling|feel|felt) (anxious|depressed|stressed|overwhelmed|worried|tired|exhausted|burnt out)/i),
      content.match(/(?:improve|better|enhance) (?:my) (mental health|wellness|mindfulness|peace|calm|focus|concentration)/i)
    ].filter(Boolean);
    
    if (wellnessMatches.length > 0 && wellnessMatches[0] && wellnessMatches[0][1]) {
      const wellnessInfo = wellnessMatches[0]![1].trim();
      setUserProfile(prev => {
        const mentalWellnessGoals = prev.mentalWellnessGoals || [];
        return {
          ...prev,
          mentalWellnessGoals: [...new Set([...mentalWellnessGoals, wellnessInfo])]
        };
      });
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Extract user information from the message
    extractUserInfo(content);
    
    try {
      // Analyze user message to determine topic
      const topic = analyzeMessageTopic(content);
      
      // Get response with context awareness
      const responseContent = await getContextAwareBotResponse(content, messages, topic, userProfile);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message if something goes wrong
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sensing some cosmic interference. Could you rephrase your question, or ask me something else?",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Greetings, cosmic traveler! I am AstroBot, your mystical guide to the celestial wisdom. Ask me about astrology, tarot, life's challenges, or spiritual guidance. How may I illuminate your path today?",
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem('astrobot-messages');
  };

  return (
    <AstroBotContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
      {children}
    </AstroBotContext.Provider>
  );
};

export const useAstroBot = () => {
  const context = useContext(AstroBotContext);
  if (context === undefined) {
    throw new Error('useAstroBot must be used within an AstroBotProvider');
  }
  return context;
};

// Helper function to analyze message topic
const analyzeMessageTopic = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('horoscope') || lowerMessage.includes('zodiac') || lowerMessage.includes('birth chart') || lowerMessage.includes('natal chart') || lowerMessage.includes('astrology') || lowerMessage.includes('planet') || lowerMessage.includes('star sign')) {
    return 'astrology';
  }
  
  if (lowerMessage.includes('tarot') || lowerMessage.includes('card reading') || lowerMessage.includes('fortune') || lowerMessage.includes('divination')) {
    return 'tarot';
  }
  
  if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('marriage') || lowerMessage.includes('dating') || lowerMessage.includes('breakup')) {
    return 'love';
  }
  
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('profession') || lowerMessage.includes('business')) {
    return 'career';
  }
  
  if (lowerMessage.includes('money') || lowerMessage.includes('finance') || lowerMessage.includes('wealth') || lowerMessage.includes('investment') || lowerMessage.includes('financial')) {
    return 'finance';
  }
  
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('healing') || lowerMessage.includes('medical') || lowerMessage.includes('exercise')) {
    return 'health';
  }
  
  if (lowerMessage.includes('meditation') || lowerMessage.includes('spirit') || lowerMessage.includes('chakra') || lowerMessage.includes('energy') || lowerMessage.includes('soul') || lowerMessage.includes('aura') || lowerMessage.includes('mind')) {
    return 'spirituality';
  }
  
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('stress') || lowerMessage.includes('depression') || lowerMessage.includes('mental health') || lowerMessage.includes('therapy') || lowerMessage.includes('counseling')) {
    return 'mental_wellness';
  }
  
  return 'general';
};

// Helper function to get more context-aware responses
const getContextAwareBotResponse = async (
  message: string, 
  previousMessages: Message[],
  topic: string,
  userProfile: UserProfile
): Promise<string> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Add personalization based on user profile
  const personalizedGreeting = userProfile.name ? `${userProfile.name}, ` : '';
  
  // Get the base response for the topic
  let response = getMockBotResponse(message);
  let personalized = false;
  
  // Use birth chart data if available for more personalized readings
  if (userProfile.birthChart) {
    const personalizedReading = getPersonalizedReading(userProfile.birthChart);
    
    if (message.toLowerCase().includes('birth chart') || message.toLowerCase().includes('natal chart')) {
      response = `${personalizedGreeting}based on your birth chart, ${personalizedReading.summary} The most significant aspect in your chart suggests ${personalizedReading.aspects[0]}.`;
      personalized = true;
    }
    
    if (message.toLowerCase().includes('recommendation') || message.toLowerCase().includes('advice') || message.toLowerCase().includes('suggestion')) {
      const randomRecommendation = personalizedReading.recommendations[Math.floor(Math.random() * personalizedReading.recommendations.length)];
      response = `${personalizedGreeting}the stars suggest: ${randomRecommendation}. This aligns with your ${userProfile.birthChart.sun.sign} sun and ${userProfile.birthChart.moon.sign} moon energies.`;
      personalized = true;
    }
  }
  
  // Special handling for specific query types
  if (topic === 'astrology' && userProfile.zodiacSign) {
    const zodiacData = getZodiacData(userProfile.zodiacSign);
    if (zodiacData) {
      if (message.toLowerCase().includes('compatibility') || message.toLowerCase().includes('compatible')) {
        response = `${personalizedGreeting}as a ${zodiacData.name}, you are most compatible with ${zodiacData.compatibility.join(', ')}. ${zodiacData.compatibility[0]} and ${zodiacData.compatibility[1]} signs especially complement your ${zodiacData.element} energy, creating balanced and harmonious connections.`;
        personalized = true;
      } else if (message.toLowerCase().includes('strength') || message.toLowerCase().includes('weakness')) {
        response = `${personalizedGreeting}your ${zodiacData.name} strengths include being ${zodiacData.strengths.join(', ')}. However, you may need to be mindful of tendencies toward being ${zodiacData.weaknesses.join(', ')}. Balancing these energies is key to your personal growth.`;
        personalized = true;
      } else if (message.toLowerCase().includes('element') || message.toLowerCase().includes('planet')) {
        response = `${personalizedGreeting}your sign ${zodiacData.name} is a ${zodiacData.element} sign ruled by ${zodiacData.ruling_planet}. This gives you a special connection to ${zodiacData.element.toLowerCase()} energy, which manifests in your ${zodiacData.strengths[0].toLowerCase()} and ${zodiacData.strengths[1].toLowerCase()} nature.`;
        personalized = true;
      } else if (!personalized && (message.toLowerCase().includes('tell me about') || message.toLowerCase().includes('what does') || message.toLowerCase().includes('describe'))) {
        response = `${personalizedGreeting}as a ${zodiacData.name}, ${zodiacData.description} Your ruling planet is ${zodiacData.ruling_planet}, and your element is ${zodiacData.element}.`;
        personalized = true;
      }
    }
  }
  
  if (topic === 'tarot') {
    const cardMatch = message.match(/(?:card|about|meaning of|interpret) (?:the )?([\w\s]+)(?:card)?/i);
    if (cardMatch && cardMatch[1]) {
      const cardName = cardMatch[1].trim();
      const card = getCardByName(cardName);
      
      if (card) {
        response = `${personalizedGreeting}The ${card.name} card (${card.arcana} arcana) represents ${card.keywords.join(', ')}. ${card.description} When upright, it suggests ${card.upright.join(', ')}. When reversed, it can indicate ${card.reversed.join(', ')}.`;
        personalized = true;
      }
    } else if (message.toLowerCase().includes('reading') || message.toLowerCase().includes('draw a card') || message.toLowerCase().includes('pull a card')) {
      // Simple one-card drawing simulation
      const randomIndex = Math.floor(Math.random() * 78) % 10; // Using only 10 cards we have
      const randomCard = randomIndex < 5 ? randomIndex : 9 - randomIndex; // Maps 0-9 to 0-4,5-9
      
      const card = getCardByName(['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Star', 'The Moon', 'The Sun', 'Death', 'The Tower'][randomCard]);
      
      if (card) {
        const isReversed = Math.random() > 0.7; // 30% chance of reversed
        const position = isReversed ? 'reversed' : 'upright';
        const meanings = isReversed ? card.reversed : card.upright;
        
        response = `${personalizedGreeting}I've drawn ${card.name} (${position}) for you. This ${card.arcana} arcana card represents ${card.keywords.join(', ')}. In the ${position} position, it suggests ${meanings.join(', ')}. ${card.description} Consider how this energy might be manifesting in your life right now.`;
        personalized = true;
      }
    }
  }
  
  // Enhanced context-aware responses for relationship/love topics
  if (topic === 'love') {
    // If we know relationship status
    if (userProfile.relationshipStatus) {
      if (userProfile.zodiacSign) {
        const zodiacData = getZodiacData(userProfile.zodiacSign);
        if (zodiacData) {
          if (userProfile.relationshipStatus.includes('single')) {
            response = `${personalizedGreeting}as a ${zodiacData.name} who is currently single, your ${zodiacData.element} energy attracts partners who appreciate your ${zodiacData.strengths[0].toLowerCase()} nature. The stars suggest focusing on self-development through ${zodiacData.element.toLowerCase()} practices before your next relationship. Your ${zodiacData.ruling_planet} ruler indicates that authentic connections will form when you embrace your ${zodiacData.traits[0].toLowerCase()} qualities.`;
          } else if (userProfile.relationshipStatus.includes('married') || userProfile.relationshipStatus.includes('relationship')) {
            response = `${personalizedGreeting}in your current relationship, your ${zodiacData.name} traits of being ${zodiacData.strengths[0].toLowerCase()} and ${zodiacData.strengths[1].toLowerCase()} can create harmony. Your partner likely appreciates your ${zodiacData.element.toLowerCase()} energy. To deepen your connection, embrace the balanced qualities of your ruling planet ${zodiacData.ruling_planet} by being more ${zodiacData.traits[2].toLowerCase()} in how you express love.`;
          } else {
            response = `${personalizedGreeting}in matters of the heart, your ${zodiacData.name} energy gives you a ${zodiacData.traits[0].toLowerCase()} and ${zodiacData.traits[1].toLowerCase()} approach to relationships. With ${zodiacData.ruling_planet} as your ruling planet, you tend to express love through ${zodiacData.element.toLowerCase()} qualities. Currently, the cosmos suggests focusing on authentic connections that honor your need for ${zodiacData.strengths[2].toLowerCase()}.`;
          }
          personalized = true;
        }
      }
    } else if (userProfile.zodiacSign) {
      const zodiacData = getZodiacData(userProfile.zodiacSign);
      if (zodiacData) {
        response = `${personalizedGreeting}in matters of the heart, your ${zodiacData.name} energy gives you a ${zodiacData.traits[0].toLowerCase()} and ${zodiacData.traits[1].toLowerCase()} approach to relationships. With ${zodiacData.ruling_planet} as your ruling planet, you tend to express love through ${zodiacData.element.toLowerCase()} qualities. Currently, the cosmos suggests focusing on authentic connections that honor your need for ${zodiacData.strengths[2].toLowerCase()}.`;
        personalized = true;
      }
    }
  }
  
  // Enhanced context-aware responses for career-related topics
  if (topic === 'career') {
    if (userProfile.zodiacSign) {
      const zodiacData = getZodiacData(userProfile.zodiacSign);
      if (zodiacData) {
        if (userProfile.careerInterests && userProfile.careerInterests.length > 0) {
          const careerField = userProfile.careerInterests[0];
          response = `${personalizedGreeting}your work in ${careerField} aligns with your ${zodiacData.name} qualities of being ${zodiacData.strengths[0].toLowerCase()} and ${zodiacData.strengths[1].toLowerCase()}. Your ${zodiacData.element} nature thrives in environments that allow for ${zodiacData.traits[2].toLowerCase()} expression. With ${zodiacData.ruling_planet} as your planetary ruler, you'll find success by incorporating more ${zodiacData.element.toLowerCase()} approaches to your professional challenges.`;
        } else {
          response = `${personalizedGreeting}professionally, your ${zodiacData.name} energy excels in careers that value your ${zodiacData.strengths.join(' and ')} qualities. With a ${zodiacData.element} nature, you thrive in ${getElementalCareerAdvice(zodiacData.element)} environments. Your planetary ruler ${zodiacData.ruling_planet} suggests you'll find fulfillment in roles that allow you to express your natural ${zodiacData.traits[0].toLowerCase()} tendencies.`;
        }
        personalized = true;
      }
    }
  }
  
  // Enhanced context-aware responses for mental wellness topics
  if (topic === 'mental_wellness' || topic === 'health') {
    if (userProfile.zodiacSign) {
      const zodiacData = getZodiacData(userProfile.zodiacSign);
      if (zodiacData) {
        if (userProfile.mentalWellnessGoals && userProfile.mentalWellnessGoals.length > 0) {
          const wellnessGoal = userProfile.mentalWellnessGoals[0];
          response = `${personalizedGreeting}for managing ${wellnessGoal}, your ${zodiacData.name} energy responds well to ${getElementalWellnessAdvice(zodiacData.element)} practices. As a ${zodiacData.element} sign ruled by ${zodiacData.ruling_planet}, you might find relief through activities that engage your natural ${zodiacData.strengths[1].toLowerCase()} tendencies. Consider incorporating more ${zodiacData.element.toLowerCase()}-based practices into your daily routine.`;
        } else {
          response = `${personalizedGreeting}for mental wellness, your ${zodiacData.name} nature benefits from ${getElementalWellnessAdvice(zodiacData.element)} practices. Your ${zodiacData.element} energy responds well to ${zodiacData.element.toLowerCase()}-based healing modalities. With ${zodiacData.ruling_planet} as your planetary ruler, finding balance through ${zodiacData.traits[2].toLowerCase()} activities will particularly support your wellbeing.`;
        }
        personalized = true;
      }
    }
  }
  
  // General personalization if no specific handling was triggered
  if (!personalized && userProfile.name) {
    response = `${personalizedGreeting}${response}`;
  }
  
  // Use interests to personalize advice if appropriate
  if (userProfile.interests && userProfile.interests.length > 0 && 
    (topic === 'career' || topic === 'spirituality' || message.toLowerCase().includes('advice') || message.toLowerCase().includes('recommendation'))) {
    const relevantInterests = userProfile.interests.slice(0, 2).join(' and ');
    response += ` I notice your interest in ${relevantInterests} could provide unique insights on this journey.`;
  }
  
  return response;
};

// Helper function for career advice based on elemental energy
const getElementalCareerAdvice = (element: string): string => {
  const advice: Record<string, string> = {
    'Fire': 'dynamic, leadership-oriented, and creative',
    'Earth': 'structured, practical, and results-oriented',
    'Air': 'intellectual, communicative, and collaborative',
    'Water': 'empathetic, intuitive, and emotionally supportive'
  };
  
  return advice[element] || 'balanced and authentic';
};

// Helper function for wellness advice based on elemental energy
const getElementalWellnessAdvice = (element: string): string => {
  const advice: Record<string, string> = {
    'Fire': 'active, energizing, and transformative',
    'Earth': 'grounding, nature-based, and routine-focused',
    'Air': 'mentally stimulating, social, and variety-filled',
    'Water': 'flowing, emotionally expressive, and deeply contemplative'
  };
  
  return advice[element] || 'holistic and balanced';
};

