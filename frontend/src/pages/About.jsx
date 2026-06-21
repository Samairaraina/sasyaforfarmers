import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Target, Eye, Heart } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const cards = [
    { icon: Sprout, key: 'mission', color: '#4D7C0F' },
    { icon: Target, key: 'vision', color: '#365314' },
    { icon: Eye, key: 'approach', color: '#84CC16' },
    { icon: Heart, key: 'belief', color: '#EAB308' },
  ];

  return (
    <div className="min-h-screen bg-bg" dir={language === 'hi' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-medium mb-5">
            <Sprout className="w-3.5 h-3.5" />
            {t('about.badge')}
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mb-5 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t('about.title')}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="bg-white rounded-[1.5rem] p-6 border border-gray-100 shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.color}12` }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <h3 className="text-base font-bold text-dark mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {t(`about.${card.key}.title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`about.${card.key}.text`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-dark via-primary to-secondary rounded-[1.5rem] p-8 sm:p-10 text-center text-white"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t('about.cta.title')}
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
            {t('about.cta.text')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
