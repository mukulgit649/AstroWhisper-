import CosmicJourneyCard from './CosmicJourneyCard';
import BadgesCard from './BadgesCard';

interface CosmicInsightsProps {
  className?: string;
  isLoaded: boolean;
  fadeInAnimation: string;
  fadeInLoaded: string;
}

const CosmicInsightsSidebar = ({ 
  className, 
  isLoaded, 
  fadeInAnimation, 
  fadeInLoaded 
}: CosmicInsightsProps) => {
  return (
    <div className={`space-y-4 ${isLoaded ? fadeInLoaded : fadeInAnimation}`}> 
      <CosmicJourneyCard />
      <BadgesCard />
    </div>
  );
};

export default CosmicInsightsSidebar;
