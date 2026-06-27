import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Leaf, Upload, Brain, Search, CheckCircle, ArrowRight, ArrowDown,
  Target, Eye, Zap,
  BarChart3, TrendingUp, Sun, Droplets, Smartphone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const howItWorksSteps = [
  { icon: Upload, color: '#4D7C0F' },
  { icon: Brain, color: '#365314' },
  { icon: Search, color: '#84CC16' },
  { icon: CheckCircle, color: '#EAB308' },
];

const featuresList = [
  { icon: Search, key: 'featureDisease', color: '#4D7C0F' },
  { icon: Sun, key: 'featureWeather', color: '#0EA5E9' },
  { icon: Droplets, key: 'featureIrrigation', color: '#365314' },
  { icon: BarChart3, key: 'featureAnalytics', color: '#84CC16' },
  { icon: TrendingUp, key: 'featureYield', color: '#EAB308' },
  { icon: Smartphone, key: 'featureMobile', color: '#4D7C0F' },
];

export default function About() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'hi';

  return (
    <div className="min-h-screen bg-[#F8F8F2]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ===== 1. HERO SPLIT ===== */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/10 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                {t('about.badge')}
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.1] mb-6">
                {t('about.title')}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-gray-500 leading-relaxed max-w-xl">
                {t('about.description')}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-8">
                <Link to="/disease-detection" className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                  <Zap className="w-5 h-5" />
                  {t('about.cta.button1')}
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                  {t('common.learnMore')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative h-80 lg:h-96"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 left-8 glass-card rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t('about.featureDisease')}</p>
                    <p className="text-sm font-bold text-dark">98%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-12 right-8 glass-card rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Sun className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t('about.featureWeather')}</p>
                    <p className="text-sm font-bold text-dark">32°C</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-12 left-12 glass-card rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t('about.featureAnalytics')}</p>
                    <p className="text-sm font-bold text-dark">+40%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-16 right-16 w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Smartphone className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. MISSION / VISION TIMELINE ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 lg:pl-0 lg:flex lg:items-center lg:gap-16"
            >
              <div className="hidden lg:flex lg:w-1/2 lg:justify-end">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="lg:hidden w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">{t('about.mission.title')}</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-4">{t('about.mission.title')}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">{t('about.mission.text')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative pl-12 lg:pl-0 lg:flex lg:items-center lg:gap-16 lg:flex-row-reverse"
            >
              <div className="hidden lg:flex lg:w-1/2 lg:justify-start">
                <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-10 h-10 text-amber-600" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="lg:hidden w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Eye className="w-7 h-7 text-amber-600" />
                </div>
                <span className="text-xs font-semibold text-amber-600 tracking-widest uppercase mb-2 block">{t('about.vision.title')}</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-4">{t('about.vision.title')}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">{t('about.vision.text')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3. HOW SASYA WORKS ===== */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">{t('about.howItWorks.title')}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-3">{t('about.howItWorks.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            <div className="hidden lg:block absolute top-1/2 left-[18%] right-[18%] h-px bg-gray-200 -translate-y-1/2 z-0" />

            {howItWorksSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-4 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8" />
                  </div>
                  <p className="text-sm lg:text-base font-semibold text-dark">{t(`about.howItWorks.step${i + 1}`)}</p>
                  {i < howItWorksSteps.length - 1 && (
                    <ArrowDown className="lg:hidden w-5 h-5 text-gray-300 mt-3" />
                  )}
                  {i < howItWorksSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 z-20" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. AI FEATURES ===== */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark">{t('about.features.title')}</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuresList.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.key}
                  variants={fadeInUp}
                  className="feature-card group cursor-default"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${f.color}12`, color: f.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-dark mb-1">{t(`about.${f.key}`)}</h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. MEET THE AI ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-lg mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">{t('about.ai.title')}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t('about.ai.text')}
            </p>

            <div className="relative mt-12 h-48 lg:h-56 max-w-lg mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center shadow-lg z-10">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                {[
                  { angle: 0, label: 'ML', color: '#4D7C0F' },
                  { angle: 72, label: 'CV', color: '#0EA5E9' },
                  { angle: 144, label: 'IoT', color: '#EAB308' },
                  { angle: 216, label: 'API', color: '#84CC16' },
                  { angle: 288, label: 'RAG', color: '#365314' },
                ].map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const r = 80;
                  const x = 50 + (r / 2) * Math.cos(rad);
                  const y = 50 + (r / 2) * Math.sin(rad);
                  return (
                    <motion.div
                      key={node.label}
                      className="absolute w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md"
                      style={{
                        backgroundColor: node.color,
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: node.angle / 288,
                      }}
                    >
                      {node.label}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. CTA ===== */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark via-primary to-secondary" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/15 rounded-full animate-float"
              style={{
                left: `${10 + i * 9}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('about.cta.title')}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{t('about.cta.text')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/disease-detection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                {t('about.cta.button1')}
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t('common.learnMore')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
