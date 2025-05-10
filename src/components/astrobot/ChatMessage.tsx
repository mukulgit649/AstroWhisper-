import { Moon, User, Volume2 } from 'lucide-react';
import { Message } from '@/contexts/AstroBotContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Text-to-speech handler
  const handleListen = () => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech.');
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(message.content);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl py-3 px-4 ${
          message.role === 'user'
            ? 'bg-astro-purple/40 rounded-tr-none'
            : 'bg-white/10 rounded-tl-none'
        }`}
      >
        <div className="flex items-center mb-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
              message.role === 'user' ? 'bg-astro-glow/20' : 'bg-astro-violet/20'
            }`}
          >
            {message.role === 'user' ? (
              <User className="w-3 h-3" />
            ) : (
              <Moon className="w-3 h-3" />
            )}
          </div>
          <div className="text-xs text-foreground/50">
            {message.role === 'user' ? 'You' : 'AstroBot'} • {formatTime(message.timestamp)}
          </div>
          {/* Listen button for assistant messages */}
          {message.role === 'assistant' && (
            <button
              onClick={handleListen}
              className="ml-2 p-1 rounded-full hover:bg-astro-violet/20 transition-colors"
              title="Listen to this message"
              aria-label="Listen to this message"
              type="button"
            >
              <Volume2 className="w-4 h-4 text-astro-violet" />
            </button>
          )}
        </div>
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
