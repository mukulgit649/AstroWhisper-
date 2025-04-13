
import { Card, CardContent } from "@/components/ui/card";
import { Message } from '@/contexts/AstroBotContext';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';

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
  return (
    <div className={`md:col-span-3 order-1 md:order-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
      <Card className="glass-card overflow-hidden h-[70vh] flex flex-col">
        <CardContent className="p-4 flex-grow overflow-hidden flex flex-col">
          <ChatHistory 
            messages={messages} 
            isLoading={isLoading} 
            clearMessages={clearMessages} 
          />
          
          {/* Suggested Questions */}
          {messages.length < 3 && (
            <SuggestedQuestions 
              questions={suggestedQuestions} 
              onSelectQuestion={handleSuggestedQuestion} 
            />
          )}
          
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
