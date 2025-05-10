import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/perspective.css'
import { Route } from 'react-router-dom'
import LearnAstrology from './pages/LearnAstrology'

// Add custom animations to the global CSS
const customStyles = document.createElement('style');
customStyles.textContent = `
  @keyframes pulse-fast {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  .animate-pulse-fast {
    animation: pulse-fast 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
document.head.appendChild(customStyles);

createRoot(document.getElementById("root")!).render(<App />);
