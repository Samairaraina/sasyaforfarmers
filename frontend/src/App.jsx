import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CropLossPrediction from './pages/CropLossPrediction';
import DiseaseDetection from './pages/DiseaseDetection';
import IrrigationAdvisor from './pages/IrrigationAdvisor';
import CropRecommendation from './pages/CropRecommendation';
import MarketIntelligence from './pages/MarketIntelligence';
import FarmingAssistant from './pages/FarmingAssistant';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Analytics from './pages/Analytics';
import About from './pages/About';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className={`flex-1 ${isHome ? '' : 'pt-20'}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crop-loss" element={<CropLossPrediction />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/irrigation" element={<IrrigationAdvisor />} />
              <Route path="/crop-recommendation" element={<CropRecommendation />} />
              <Route path="/market" element={<MarketIntelligence />} />
              <Route path="/assistant" element={<FarmingAssistant />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
