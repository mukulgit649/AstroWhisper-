import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Horoscope from "./pages/Horoscope";
import Tarot from "./pages/Tarot";
import AstroBot from "./pages/AstroBot";
import BirthChart from "./pages/BirthChart";
import NotFound from "./pages/NotFound";
import LearnAstrology from './pages/LearnAstrology';
import TarotSpread from './pages/TarotSpread';
import TarotCardDetail from './pages/TarotCardDetail';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/tarot/spread" element={<TarotSpread />} />
          <Route path="/tarot/card/:cardName" element={<TarotCardDetail />} />
          <Route path="/astrobot" element={<AstroBot />} />
          <Route path="/birthchart" element={<BirthChart />} />
          <Route path="/learn" element={<LearnAstrology />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
