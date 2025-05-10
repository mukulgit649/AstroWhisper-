import { useState, useEffect } from 'react';
import { useAstroBot } from '@/contexts/AstroBotContext';
import CosmicInsightsSidebar from '@/components/astrobot/CosmicInsightsSidebar';
import ChatArea from '@/components/astrobot/ChatArea';
import AstroBotHeader from '@/components/astrobot/AstroBotHeader';
import Navbar from '@/components/Navbar';
import BackToHome from '@/components/BackToHome';

const AstroBotContainer = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useAstroBot();
  const [isLoaded, setIsLoaded] = useState(false);

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
    // Add a slight delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const fadeInAnimation = "opacity-0 translate-y-4 transition-all duration-700";
  const fadeInLoaded = "opacity-100 translate-y-0";

  return (
    <div className="relative z-10 pt-4">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-8 pb-16">
        <AstroBotHeader 
          isLoaded={isLoaded}
          fadeInAnimation={fadeInAnimation}
          fadeInLoaded={fadeInLoaded}
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1">
              <CosmicInsightsSidebar 
                isLoaded={isLoaded}
                fadeInAnimation={fadeInAnimation}
                fadeInLoaded={fadeInLoaded}
              />
            </div>
            
            {/* Chat Area */}
            <ChatArea 
              messages={messages}
              isLoading={isLoading}
              isLoaded={isLoaded}
              sendMessage={sendMessage}
              clearMessages={clearMessages}
              suggestedQuestions={suggestedQuestions}
              handleSuggestedQuestion={handleSuggestedQuestion}
              fadeInAnimation={fadeInAnimation}
              fadeInLoaded={fadeInLoaded}
            />
          </div>
        </div>
      </div>
      
      <BackToHome />
    </div>
  );
};

export default AstroBotContainer;
