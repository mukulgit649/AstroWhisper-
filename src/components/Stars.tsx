
import { useEffect, useRef } from 'react';

interface StarsProps {
  count?: number;
}

const Stars: React.FC<StarsProps> = ({ count = 100 }) => {
  const starsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    container.innerHTML = '';
    
    const { clientWidth, clientHeight } = document.documentElement;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random delay for twinkling
      star.style.setProperty('--delay', `${Math.random() * 4}`);
      
      // Different animation duration for variety
      star.style.animationDuration = `${2 + Math.random() * 4}s`;
      
      // Subtle opacity variation
      star.style.opacity = `${0.3 + Math.random() * 0.7}`;
      
      container.appendChild(star);
    }
  }, [count]);

  return (
    <div ref={starsContainerRef} className="fixed inset-0 z-0 pointer-events-none"></div>
  );
};

export default Stars;
