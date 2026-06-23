import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import {
  Thermometer, Droplets, Wind, Sun, Leaf, AlertTriangle,
  TrendingUp, Gauge, MapPin, User, Save, Sprout
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const states = [
  'Uttar Pradesh', 'Maharashtra', 'Punjab', 'Haryana', 'Madhya Pradesh',
  'Bihar', 'Rajasthan', 'Gujarat', 'Karnataka', 'Tamil Nadu',
  'Andhra Pradesh', 'West Bengal'
];

const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty'];
const cropTypes = ['Wheat', 'Rice', 'Maize', 'Mustard', 'Sugarcane', 'Cotton'];

function CircularProgress({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score > 70 ? '#4D7C0F' : score > 40 ? '#EAB308' : '#DC2626';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference}
          strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{score}%</span>
        <span className="text-xs text-gray-500 mt-1">
          {score > 70 ? 'Good' : score > 40 ? 'Moderate' : 'Critical'}
        </span>
      </div>
    </div>
  );
}

function RiskBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-medium" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [profile, setProfile] = useState({
    name: '', state: '', district: '', farmSize: '', soilType: '', cropType: ''
  });

  const [saved, setSaved] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const loc = profile.state || 'Punjab';
    api(`/api/weather/${encodeURIComponent(loc)}`)
      .then(data => { setWeather(data); setWeatherLoading(false); })
      .catch(() => setWeatherLoading(false));
  }, [profile.state]);

  const handleChange = (field) => (e) => {
    setProfile(prev => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const riskItems = [
    { key: 'drought', value: 35, color: '#4D7C0F' },
    { key: 'flood', value: 20, color: '#4D7C0F' },
    { key: 'pest', value: 55, color: '#EAB308' },
    { key: 'diseaseRisk', value: 42, color: '#EAB308' }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t('dashboard.title')}
            </h1>
            <p className="text-gray-500 mt-1">
              {language === 'hi' ? 'स्वागत है, किसान भाई!' : 'Welcome, Farmer!'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.farmProfile')}</h2>
        </div>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.name')}</label>
            <input
              type="text" value={profile.name} onChange={handleChange('name')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder={t('dashboard.name')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.state')}</label>
            <select
              value={profile.state} onChange={handleChange('state')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
            >
              <option value="">{language === 'hi' ? 'चुनें' : 'Select...'}</option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.district')}</label>
            <input
              type="text" value={profile.district} onChange={handleChange('district')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder={t('dashboard.district')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.farmSize')}</label>
            <input
              type="number" value={profile.farmSize} onChange={handleChange('farmSize')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="0.0"
              min="0" step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.soilType')}</label>
            <select
              value={profile.soilType} onChange={handleChange('soilType')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
            >
              <option value="">{language === 'hi' ? 'चुनें' : 'Select...'}</option>
              {soilTypes.map(s => (
                <option key={s} value={s}>{t(`prediction.${s.toLowerCase()}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.cropType')}</label>
            <select
              value={profile.cropType} onChange={handleChange('cropType')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
            >
              <option value="">{language === 'hi' ? 'चुनें' : 'Select...'}</option>
              {cropTypes.map(c => (
                <option key={c} value={c}>{t(`prediction.${c.toLowerCase()}`)}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {saved ? (
                <span className="flex items-center gap-1">
                  <Save className="w-4 h-4" /> {language === 'hi' ? 'सहेजा गया!' : 'Saved!'}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save className="w-4 h-4" /> {t('dashboard.save')}
                </span>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow card-hover overflow-hidden">
          <div className="gradient-primary px-5 py-3 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-white text-sm">{t('dashboard.cropHealth')}</h3>
          </div>
          <div className="p-5">
            <CircularProgress score={78} />
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600">
                {language === 'hi' ? 'आपकी फसलें स्वस्थ हैं' : 'Your crops are healthy'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {language === 'hi' ? 'पिछले सप्ताह से +5%' : '+5% from last week'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow card-hover overflow-hidden">
          <div className="bg-accent/10 px-5 py-3 flex items-center gap-2 border-b border-accent/10">
            <Sun className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-gray-900 text-sm">{t('dashboard.weather')}</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              {weatherLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="text-center p-3 bg-gray-50 rounded-xl animate-pulse">
                      <div className="w-5 h-5 mx-auto mb-1 bg-gray-200 rounded" />
                      <div className="h-6 w-12 mx-auto mb-1 bg-gray-200 rounded" />
                      <div className="h-3 w-16 mx-auto bg-gray-200 rounded" />
                    </div>
                  ))
                : [
                    { icon: Thermometer, label: t('dashboard.temperature'), value: weather ? `${Math.round(weather.temperature)}°C` : '—' },
                    { icon: Droplets, label: t('dashboard.humidity'), value: weather ? `${weather.humidity}%` : '—' },
                    { icon: Droplets, label: t('dashboard.rainfall'), value: weather ? `${weather.rainfall || 0}mm` : '—' },
                    { icon: Wind, label: t('dashboard.windSpeed'), value: weather ? `${Math.round(weather.windSpeed)} km/h` : '—' }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                        <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow card-hover overflow-hidden">
          <div className="bg-red-50 px-5 py-3 flex items-center gap-2 border-b border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-900 text-sm">{t('dashboard.risk')}</h3>
          </div>
          <div className="p-5 space-y-4">
            {riskItems.map(item => (
              <RiskBar
                key={item.key}
                label={t(`dashboard.${item.key}`)}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow card-hover overflow-hidden">
          <div className="gradient-warm px-5 py-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-dark" />
            <h3 className="font-semibold text-dark text-sm">{t('dashboard.yieldForecast')}</h3>
          </div>
          <div className="p-5">
            <div className="text-center mb-4">
              <Gauge className="w-10 h-10 mx-auto text-primary mb-2" />
              <p className="text-3xl font-bold text-gray-900">45.2</p>
              <p className="text-sm text-gray-500">
                {t('dashboard.expectedYield')} ({t('dashboard.perHectare')})
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">
                  {language === 'hi' ? 'पिछले सीज़न से +12%' : '+12% from last season'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'hi' ? 'उपज में सुधार जारी' : 'Yield improvement ongoing'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: AlertTriangle, label: t('nav.cropLoss'),
            desc: language === 'hi' ? 'फसल हानि का पूर्वानुमान लगाएं' : 'Predict crop losses',
            path: '/crop-loss', color: 'from-primary to-secondary'
          },
          {
            icon: Leaf, label: t('nav.diseaseDetection'),
            desc: language === 'hi' ? 'फसल रोगों की पहचान करें' : 'Detect crop diseases',
            path: '/disease-detection', color: 'from-accent to-yellow-400'
          },
          {
            icon: User, label: t('nav.assistant'),
            desc: language === 'hi' ? 'AI कृषि सहायक से पूछें' : 'Ask AI farming assistant',
            path: '/assistant', color: 'from-secondary to-green-400'
          }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <Link key={i} to={card.path}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl card-shadow card-hover p-6 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{card.label}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
