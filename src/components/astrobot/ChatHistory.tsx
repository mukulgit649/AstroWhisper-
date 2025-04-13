
import { useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Message } from '@/contexts/AstroBotContext';
import ChatMessage from '@/components/astrobot/ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
  clearMessages: () => void;
}

const ChatHistory = ({ messages, isLoading, clearMessages }: ChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-foreground/60">
          {messages.length > 1 ? `${messages.length - 1} message${messages.length > 2 ? 's' : ''}` : 'New conversation'}
        </div>
        {messages.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearMessages}
            className="text-xs flex items-center h-7 px-2 bg-white/5 hover:bg-white/10"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Clear chat
          </Button>
        )}
      </div>
      
      <div className="overflow-y-auto flex-grow mb-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl py-3 px-4 bg-white/10 rounded-tl-none">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 rounded-full bg-astro-violet/20 flex items-center justify-center mr-2">
                  <div className="w-3 h-3 animate-pulse-fast" />
                </div>
                <div className="text-xs text-foreground/50">
                  AstroBot • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-astro-violet rounded-full mr-1 animate-pulse"></div>
                <div className="w-2 h-2 bg-astro-violet rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-astro-violet rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default ChatHistory;
