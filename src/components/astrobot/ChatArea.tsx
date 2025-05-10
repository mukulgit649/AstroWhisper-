import { Card, CardContent } from "@/components/ui/card";
import { Message } from '@/contexts/AstroBotContext';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import { useAstroBot } from '@/contexts/AstroBotContext';
import { zodiacSigns } from '@/utils/zodiacData';
import { getMockHoroscopeReading } from '@/utils/mockAiResponses';
import { useState } from 'react';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  isLoaded: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  suggestedQuestions: string[];
  handleSuggestedQuestion: (question: string) => void;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const ChatArea = ({ 
  messages, 
  isLoading, 
  isLoaded,
  sendMessage, 
  clearMessages,
  suggestedQuestions,
  handleSuggestedQuestion,
  fadeInAnimation,
  fadeInLoaded
}: ChatAreaProps) => {
  const { userProfile, setUserProfile } = useAstroBot();
  const [selectedSign, setSelectedSign] = useState('');

  // Handler for sign selection
  const handleSignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sign = e.target.value;
    setSelectedSign(sign);
    setUserProfile((prev: any) => ({ ...prev, zodiacSign: sign }));
  };

  // Get daily guidance if sign is set
  const signData = userProfile.zodiacSign ? zodiacSigns.find(z => z.name.toLowerCase() === userProfile.zodiacSign.toLowerCase()) : null;
  const dailyGuidance = userProfile.zodiacSign ? getMockHoroscopeReading(userProfile.zodiacSign) : null;

  // Context-aware quick replies
  const quickReplies = [
    userProfile.zodiacSign ? `Show my daily horoscope for ${signData?.name}` : 'Show my daily horoscope',
    userProfile.zodiacSign ? `What signs are compatible with ${signData?.name}?` : 'What signs are compatible with me?',
    'Pull a tarot card',
    'Give me a quick astrology tip',
    'What does Mercury retrograde mean?',
    'What is my birth chart?',
  ];

  return (
    <div className={`md:col-span-3 order-1 md:order-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
      <Card className="glass-card overflow-hidden h-[70vh] flex flex-col">
        <CardContent className="p-4 flex-grow overflow-hidden flex flex-col">
          {/* Only show chat history, quick replies, and input. No daily guidance card. */}
          <ChatHistory 
            messages={messages} 
            isLoading={isLoading} 
            clearMessages={clearMessages} 
          />
          {/* Quick Replies: always show at the bottom */}
          <div className="mt-4">
            <SuggestedQuestions 
              questions={quickReplies} 
              onSelectQuestion={handleSuggestedQuestion} 
            />
          </div>
          {/* Input Area */}
          <ChatInput 
            onSendMessage={sendMessage} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatArea;
