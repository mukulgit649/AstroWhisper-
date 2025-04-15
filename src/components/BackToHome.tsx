
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BackToHome = () => {
  return (
    <div className="flex justify-center mt-8">
      <Button asChild variant="outline" className="gap-2">
        <Link to="/">
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  );
};

export default BackToHome;
