import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getMockHoroscopeReading } from '@/utils/mockAiResponses';
import { getZodiacSign, getZodiacData } from '@/utils/zodiacData';
import { getCardByName } from '@/utils/tarotData';
import { calculatePlanetaryPositions, getPersonalizedReading, type PlanetaryPositions } from '@/utils/birthChartCalculations';
import { getGeminiResponse } from '@/utils/geminiApi';

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
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
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

  // Proactive daily greeting logic
  useEffect(() => {
    if (userProfile.zodiacSign) {
      const today = new Date().toDateString();
      const lastGreeted = localStorage.getItem('astrobot-last-greeted');
      if (lastGreeted !== today) {
        const signName = userProfile.zodiacSign.charAt(0).toUpperCase() + userProfile.zodiacSign.slice(1);
        const greeting = `Good day${userProfile.name ? ', ' + userProfile.name : ''}! As a ${signName}, here is your cosmic guidance for today:\n\n${getMockHoroscopeReading(signName)}`;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString() + '-greeting',
            role: 'assistant',
            content: greeting,
            timestamp: new Date(),
          },
        ]);
        localStorage.setItem('astrobot-last-greeted', today);
      }
    }
  }, [userProfile.zodiacSign, userProfile.name]);

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
      // Get context from previous messages
      const contextMessages = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the current message
      contextMessages.push({
        role: 'user',
        content: content
      });
      
      // Get response from Gemini API
      const responseContent = await getGeminiResponse(contextMessages);
      
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
    <AstroBotContext.Provider value={{ messages, isLoading, sendMessage, clearMessages, userProfile, setUserProfile }}>
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
  // This function is no longer needed as we're using Gemini API
  return '';
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

