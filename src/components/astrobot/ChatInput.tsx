
import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

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
        className="bg-white/10 border-white/10 focus-visible:ring-astro-violet pr-12"
      />
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
