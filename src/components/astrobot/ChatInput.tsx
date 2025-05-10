import { useState } from 'react';
import { SendHorizontal, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  let recognition: any = null;

  // Voice input handler
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        placeholder="Ask for cosmic guidance..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white/10 border-white/10 focus-visible:ring-astro-violet pr-20"
      />
      <Button
        type="button"
        size="icon"
        className={`absolute right-12 top-1 bottom-1 bg-astro-purple/80 hover:bg-astro-violet ${listening ? 'animate-pulse' : ''}`}
        onClick={handleMicClick}
        disabled={isLoading || listening}
        aria-label={listening ? 'Listening...' : 'Start voice input'}
      >
        <Mic className={`h-4 w-4 ${listening ? 'text-astro-glow' : ''}`} />
      </Button>
      <Button
        type="submit"
        size="icon"
        className="absolute right-1 top-1 bottom-1 bg-astro-purple hover:bg-astro-violet"
        disabled={isLoading || !input.trim()}
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
