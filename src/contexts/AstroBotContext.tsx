
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getMockBotResponse } from '@/utils/mockAiResponses';

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

const AstroBotContext = createContext<AstroBotContextType | undefined>(undefined);

export const AstroBotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, cosmic traveler! I am AstroBot, your mystical guide to the celestial wisdom. Ask me about astrology, tarot, life's challenges, or spiritual guidance. How may I illuminate your path today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 1) { // Only save if we have more than the initial message
      localStorage.setItem('astrobot-messages', JSON.stringify(messages));
    }
  }, [messages]);

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
    
    try {
      // Analyze user message to determine topic
      const topic = analyzeMessageTopic(content);
      
      // Get response with context awareness
      const responseContent = await getContextAwareBotResponse(content, messages, topic);
      
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
  
  if (lowerMessage.includes('horoscope') || lowerMessage.includes('zodiac') || lowerMessage.includes('birth chart') || lowerMessage.includes('natal chart')) {
    return 'astrology';
  }
  
  if (lowerMessage.includes('tarot') || lowerMessage.includes('card') || lowerMessage.includes('reading')) {
    return 'tarot';
  }
  
  if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('marriage')) {
    return 'love';
  }
  
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('profession')) {
    return 'career';
  }
  
  if (lowerMessage.includes('money') || lowerMessage.includes('finance') || lowerMessage.includes('wealth') || lowerMessage.includes('investment')) {
    return 'finance';
  }
  
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('healing')) {
    return 'health';
  }
  
  return 'general';
};

// Helper function to get more context-aware responses
const getContextAwareBotResponse = async (
  message: string, 
  previousMessages: Message[],
  topic: string
): Promise<string> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Extract some context from the conversation history
  const userMessages = previousMessages
    .filter(msg => msg.role === 'user')
    .slice(-3) // Get the last 3 user messages for context
    .map(msg => msg.content);
  
  const conversationContext = userMessages.length > 1 
    ? "Based on your recent questions about " + userMessages.join(", ") + ", "
    : "";
  
  // Get the base response
  let response = getMockBotResponse(message);
  
  // Personalize the response with the user's name if available
  if (message.toLowerCase().includes('my name is')) {
    const nameMatch = message.match(/my name is (\w+)/i);
    if (nameMatch && nameMatch[1]) {
      const name = nameMatch[1];
      response = `Thank you for sharing your name, ${name}. ${response}`;
    }
  }
  
  // Add topic-specific enhancements
  if (topic === 'astrology' && message.toLowerCase().includes('sign')) {
    // Try to extract zodiac sign from the message
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const mentionedSign = signs.find(sign => message.toLowerCase().includes(sign));
    
    if (mentionedSign) {
      response += `\n\nAs a ${mentionedSign.charAt(0).toUpperCase() + mentionedSign.slice(1)}, you're particularly influenced by the cosmic energies of ${getSignRuler(mentionedSign)}. This gives you a special connection to ${getSignElement(mentionedSign)} energy.`;
    }
  }
  
  return response;
};

// Helper function to get planetary ruler for a zodiac sign
const getSignRuler = (sign: string): string => {
  const rulers: Record<string, string> = {
    'aries': 'Mars',
    'taurus': 'Venus',
    'gemini': 'Mercury',
    'cancer': 'the Moon',
    'leo': 'the Sun',
    'virgo': 'Mercury',
    'libra': 'Venus',
    'scorpio': 'Pluto and Mars',
    'sagittarius': 'Jupiter',
    'capricorn': 'Saturn',
    'aquarius': 'Uranus and Saturn',
    'pisces': 'Neptune and Jupiter'
  };
  
  return rulers[sign] || 'the planets';
};

// Helper function to get element for a zodiac sign
const getSignElement = (sign: string): string => {
  const elements: Record<string, string> = {
    'aries': 'fire',
    'taurus': 'earth',
    'gemini': 'air',
    'cancer': 'water',
    'leo': 'fire',
    'virgo': 'earth',
    'libra': 'air',
    'scorpio': 'water',
    'sagittarius': 'fire',
    'capricorn': 'earth',
    'aquarius': 'air',
    'pisces': 'water'
  };
  
  return elements[sign] || 'universal';
};
