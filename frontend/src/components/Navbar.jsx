import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ChevronDown, BarChart3, Leaf, Search, DollarSign, Droplets, MessageCircle, Shield, Sprout, Globe } from 'lucide-react';

const featureModules = [
  { path: '/crop-loss', labelKey: 'nav.cropLoss', icon: BarChart3 },
  { path: '/disease-detection', labelKey: 'nav.diseaseDetection', icon: Search },
  { path: '/irrigation', labelKey: 'nav.irrigation', icon: Droplets },
  { path: '/crop-recommendation', labelKey: 'nav.cropRecommendation', icon: Leaf },
  { path: '/market', labelKey: 'nav.market', icon: DollarSign },
  { path: '/assistant', labelKey: 'nav.assistant', icon: MessageCircle },
  { path: '/schemes', labelKey: 'nav.schemes', icon: Shield },
];

const solutions = [
  { path: '/dashboard', labelKey: 'nav.forFarmers', icon: Sprout },
  { path: '/market', labelKey: 'nav.forAgribusiness', icon: DollarSign },
  { path: '/analytics', labelKey: 'nav.forResearchers', icon: BarChart3 },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const featuresRef = useRef(null);
  const solutionsRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (featuresRef.current && !featuresRef.current.contains(e.target)) setFeaturesOpen(false);
      if (solutionsRef.current && !solutionsRef.current.contains(e.target)) setSolutionsOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Sasya" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-bold text-dark" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Sasya <span className="text-primary font-semibold">(सस्य)</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === '/' ? 'text-primary bg-primary/8' : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {t('nav.home')}
            </Link>

            <div ref={featuresRef} className="relative">
              <button
                onClick={() => { setFeaturesOpen(!featuresOpen); setSolutionsOpen(false); setLangOpen(false); }}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  featuresOpen ? 'text-primary bg-primary/8' : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {t('nav.features')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                  >
                    {featureModules.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setFeaturesOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          {t(item.labelKey)}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={solutionsRef} className="relative">
              <button
                onClick={() => { setSolutionsOpen(!solutionsOpen); setFeaturesOpen(false); setLangOpen(false); }}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  solutionsOpen ? 'text-primary bg-primary/8' : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {t('nav.solutions')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                  >
                    {solutions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSolutionsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          {t(item.labelKey)}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/analytics"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === '/analytics' ? 'text-primary bg-primary/8' : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {t('nav.analytics')}
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === '/about' ? 'text-primary bg-primary/8' : 'text-gray-600 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {t('nav.about')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setFeaturesOpen(false); setSolutionsOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-all bg-white/50"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'हिंदी' : 'EN'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden"
                  >
                    <button
                      onClick={() => { setLanguage('en'); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === 'en' ? 'text-primary font-medium bg-primary/5' : 'text-gray-700 hover:bg-primary/5'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setLanguage('hi'); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === 'hi' ? 'text-primary font-medium bg-primary/5' : 'text-gray-700 hover:bg-primary/5'}`}
                    >
                      हिंदी
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-all shadow-sm"
            >
              {t('nav.getStarted')}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all">
                <Sprout className="w-4 h-4" /> {t('nav.home')}
              </Link>

              <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('nav.features')}</p>
              {featureModules.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-all">
                    <Icon className="w-4 h-4" /> {t(item.labelKey)}
                  </Link>
                );
              })}

              <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('nav.solutions')}</p>
              {solutions.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-all">
                    <Icon className="w-4 h-4" /> {t(item.labelKey)}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-gray-100">
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-all">
                  {t('nav.getStarted')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
