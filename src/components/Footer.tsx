
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sun, MessageCircle, ScrollText, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-white py-16">
      {/* Begin Your Cosmic Journey Section */}
      <div className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cinzel text-white">
            Begin Your Cosmic Journey Today
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Sign up now to unlock premium astrological insights, save your readings,
            and receive personalized celestial guidance tailored to your unique birth chart.
          </p>
          <Button 
            variant="default"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg rounded-full"
          >
            Create Free Account
          </Button>
        </div>
      </div>

      {/* Cosmic Services Section */}
      <div className="container mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-6 font-cinzel">Cosmic Services</h2>
        <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Explore our mystical AI-powered tools to gain insight into your past, present, and future.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/horoscope" className="group p-6 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 transition-all">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/30">
              <Sun className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Daily Horoscope</h3>
            <p className="text-gray-400 mb-4">
              Receive personalized daily guidance based on your zodiac sign and planetary alignments.
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
              Read today's stars <ChevronRight className="ml-2" />
            </span>
          </Link>

          <Link to="/tarot" className="group p-6 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 transition-all">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/30">
              <ScrollText className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tarot Reading</h3>
            <p className="text-gray-400 mb-4">
              Draw virtual tarot cards with AI-generated interpretations tailored to your spiritual journey.
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
              Pull your cards <ChevronRight className="ml-2" />
            </span>
          </Link>

          <Link to="/astrobot" className="group p-6 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 transition-all">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/30">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Ask AstroBot</h3>
            <p className="text-gray-400 mb-4">
              Chat with our mystical AI companion for personalized guidance on life's burning questions.
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
              Start chatting <ChevronRight className="ml-2" />
            </span>
          </Link>

          <Link to="/birthchart" className="group p-6 rounded-xl bg-navy-900/50 hover:bg-navy-900/70 transition-all">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-900/30">
              <Book className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Birth Chart</h3>
            <p className="text-gray-400 mb-4">
              Generate your complete astrological blueprint based on your exact birth time and location.
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
              Map your stars <ChevronRight className="ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
