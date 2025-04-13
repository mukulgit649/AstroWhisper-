
import { useState, useEffect, useRef } from 'react';
import { SendHorizontal, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarsBackground from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';
import ChatMessage from '@/components/astrobot/ChatMessage';
import SuggestedQuestions from '@/components/astrobot/SuggestedQuestions';
import CosmicInsightsSidebar from '@/components/astrobot/CosmicInsightsSidebar';
import { AstroBotProvider, useAstroBot } from '@/contexts/AstroBotContext';

const AstroBotContent = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useAstroBot();
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What does my zodiac sign say about my love life?",
    "How will the current planetary alignments affect me?",
    "What career path aligns with my cosmic energy?",
    "Should I make this important decision now?",
    "What spiritual practice would benefit me most?",
    "Can you give me a quick tarot reading?",
    "How can I balance my chakras?",
    "What does my birth chart indicate about my purpose?",
  ];

  useEffect(() => {
    setIsLoaded(true);
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <StarsBackground count={150} />
      <CosmicBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10 container mx-auto px-4 py-12">
        <div className={`text-center mb-8 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4 glow-text">
            Ask AstroBot
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Consult with our mystical AI companion for cosmic guidance and astrological wisdom.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1">
              <CosmicInsightsSidebar 
                isLoaded={isLoaded}
                fadeInAnimation={fadeInAnimation}
                fadeInLoaded={fadeInLoaded}
              />
            </div>
            
            {/* Chat Area */}
            <div className={`md:col-span-3 order-1 md:order-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
              <Card className="glass-card overflow-hidden h-[70vh] flex flex-col">
                <CardContent className="p-4 flex-grow overflow-hidden flex flex-col">
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
                  
                  {/* Chat Messages */}
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
                  
                  {/* Suggested Questions */}
                  {messages.length < 3 && (
                    <SuggestedQuestions 
                      questions={suggestedQuestions} 
                      onSelectQuestion={handleSuggestedQuestion} 
                    />
                  )}
                  
                  {/* Input Area */}
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const AstroBot = () => {
  return (
    <AstroBotProvider>
      <AstroBotContent />
    </AstroBotProvider>
  );
};

export default AstroBot;
