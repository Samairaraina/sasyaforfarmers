import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MapPin, Leaf, ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'hi';

  return (
    <div className="min-h-screen bg-[#F8F8F2]" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              {t('contact.badge')}
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.1] mb-6">
              {t('contact.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 max-w-xl mx-auto">
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <motion.a
              variants={fadeInUp}
              href="mailto:samairaraina140108@gmail.com"
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{t('contact.email')}</h3>
              <p className="text-gray-500 text-sm break-all">samairaraina140108@gmail.com</p>
            </motion.a>

            <motion.div
              variants={fadeInUp}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{t('contact.location')}</h3>
              <p className="text-gray-500 text-sm">{t('contact.country')}</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Leaf className="w-4 h-4" />
              {t('contact.tagline')}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
