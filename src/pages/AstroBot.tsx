
import { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Moon, Sparkles, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import CosmicBackground from '@/components/CosmicBackground';
import { getMockBotResponse } from '@/utils/mockAiResponses';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AstroBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, cosmic traveler! I am AstroBot, your mystical guide to the celestial wisdom. Ask me about astrology, tarot, life's challenges, or spiritual guidance. How may I illuminate your path today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What does my zodiac sign say about my love life?",
    "How will the current planetary alignments affect me?",
    "What career path aligns with my cosmic energy?",
    "Should I make this important decision now?",
    "What spiritual practice would benefit me most?",
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
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Get response from mock AI
      const responseContent = getMockBotResponse(input);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      <Stars count={150} />
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
              <div className={`space-y-6 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.3s' }}>
                <Card className="glass-card overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-unbounded text-sm font-medium mb-3">Cosmic Insights</h3>
                    
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <Moon className="h-4 w-4 text-astro-glow mr-2" />
                          <span className="text-xs text-foreground/70">Current Moon Phase</span>
                        </div>
                        <div className="text-sm font-medium">Waxing Crescent</div>
                        <div className="text-xs text-foreground/50 mt-1">38% Illumination</div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <Sparkles className="h-4 w-4 text-astro-glow mr-2" />
                          <span className="text-xs text-foreground/70">Planetary Transit</span>
                        </div>
                        <div className="text-sm font-medium">Venus in Leo</div>
                        <div className="text-xs text-foreground/50 mt-1">Creative expression in love</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-unbounded text-sm font-medium mb-3">Today's Energy</h3>
                    
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-sm">Manifestation</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-sm">Intuition</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        <span className="text-sm">Transformation</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className={`md:col-span-3 order-1 md:order-2 ${isLoaded ? fadeInLoaded : fadeInAnimation}`} style={{ transitionDelay: '0.4s' }}>
              <Card className="glass-card overflow-hidden h-[70vh] flex flex-col">
                <CardContent className="p-4 flex-grow overflow-hidden flex flex-col">
                  {/* Chat Messages */}
                  <div className="overflow-y-auto flex-grow mb-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
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
                          </div>
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl py-3 px-4 bg-white/10 rounded-tl-none">
                          <div className="flex items-center mb-1">
                            <div className="w-6 h-6 rounded-full bg-astro-violet/20 flex items-center justify-center mr-2">
                              <Moon className="w-3 h-3" />
                            </div>
                            <div className="text-xs text-foreground/50">
                              AstroBot • {formatTime(new Date())}
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
                    <div className="mb-4">
                      <h4 className="text-xs text-foreground/50 mb-2">Try asking about:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question) => (
                          <button
                            key={question}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-xs px-3 py-1.5 rounded-full bg-astro-purple/20 hover:bg-astro-purple/30 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
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

export default AstroBot;
