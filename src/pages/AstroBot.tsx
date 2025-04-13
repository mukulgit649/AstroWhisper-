
import { AstroBotProvider } from '@/contexts/AstroBotContext';
import AstroBotContainer from '@/components/astrobot/AstroBotContainer';

const AstroBot = () => {
  return (
    <AstroBotProvider>
      <AstroBotContainer />
    </AstroBotProvider>
  );
};

export default AstroBot;
