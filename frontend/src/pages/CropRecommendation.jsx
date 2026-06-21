import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sprout, Leaf, TrendingUp, Droplets, Calendar, Sun, MapPin, Beaker, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const mockData = {
  'Kharif_Loamy': [
    { nameKey: 'recommendation.crops.rice', yield: 45, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 120 },
    { nameKey: 'recommendation.crops.maize', yield: 38, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 90 },
    { nameKey: 'recommendation.crops.sugarcane', yield: 70, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 365 },
  ],
  'Kharif_Clay': [
    { nameKey: 'recommendation.crops.rice', yield: 42, profit: 3, water: 'High', waterKey: 'recommendation.high', period: 120 },
    { nameKey: 'recommendation.crops.sugarcane', yield: 65, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 365 },
    { nameKey: 'recommendation.crops.cotton', yield: 25, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 180 },
  ],
  'Kharif_Sandy': [
    { nameKey: 'recommendation.crops.maize', yield: 30, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 90 },
    { nameKey: 'recommendation.crops.groundnut', yield: 20, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 135 },
    { nameKey: 'recommendation.crops.millet', yield: 18, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 75 },
  ],
  'Kharif_Silty': [
    { nameKey: 'recommendation.crops.rice', yield: 48, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 120 },
    { nameKey: 'recommendation.crops.maize', yield: 40, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 90 },
    { nameKey: 'recommendation.crops.jute', yield: 22, profit: 2, water: 'Medium', waterKey: 'recommendation.medium', period: 100 },
  ],
  'Kharif_Peaty': [
    { nameKey: 'recommendation.crops.rice', yield: 50, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 120 },
    { nameKey: 'recommendation.crops.sugarcane', yield: 72, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 365 },
    { nameKey: 'recommendation.crops.taro', yield: 15, profit: 2, water: 'High', waterKey: 'recommendation.high', period: 210 },
  ],
  'Rabi_Loamy': [
    { nameKey: 'recommendation.crops.wheat', yield: 42, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 120 },
    { nameKey: 'recommendation.crops.mustard', yield: 15, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 110 },
    { nameKey: 'recommendation.crops.barley', yield: 30, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 100 },
  ],
  'Rabi_Clay': [
    { nameKey: 'recommendation.crops.wheat', yield: 38, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 120 },
    { nameKey: 'recommendation.crops.mustard', yield: 14, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 110 },
    { nameKey: 'recommendation.crops.chickpea', yield: 20, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 100 },
  ],
  'Rabi_Sandy': [
    { nameKey: 'recommendation.crops.barley', yield: 25, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 100 },
    { nameKey: 'recommendation.crops.mustard', yield: 12, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 110 },
    { nameKey: 'recommendation.crops.millet', yield: 15, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 75 },
  ],
  'Rabi_Silty': [
    { nameKey: 'recommendation.crops.wheat', yield: 44, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 120 },
    { nameKey: 'recommendation.crops.barley', yield: 32, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 100 },
    { nameKey: 'recommendation.crops.lentil', yield: 12, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 90 },
  ],
  'Rabi_Peaty': [
    { nameKey: 'recommendation.crops.wheat', yield: 46, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 120 },
    { nameKey: 'recommendation.crops.mustard', yield: 16, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 110 },
    { nameKey: 'recommendation.crops.peas', yield: 18, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 90 },
  ],
  'Zaid_Loamy': [
    { nameKey: 'recommendation.crops.cucumber', yield: 25, profit: 3, water: 'High', waterKey: 'recommendation.high', period: 60 },
    { nameKey: 'recommendation.crops.pumpkin', yield: 30, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 75 },
    { nameKey: 'recommendation.crops.watermelon', yield: 35, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 80 },
  ],
  'Zaid_Clay': [
    { nameKey: 'recommendation.crops.rice', yield: 35, profit: 3, water: 'High', waterKey: 'recommendation.high', period: 120 },
    { nameKey: 'recommendation.crops.pumpkin', yield: 28, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 75 },
    { nameKey: 'recommendation.crops.okra', yield: 12, profit: 2, water: 'Medium', waterKey: 'recommendation.medium', period: 50 },
  ],
  'Zaid_Sandy': [
    { nameKey: 'recommendation.crops.watermelon', yield: 30, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 80 },
    { nameKey: 'recommendation.crops.melon', yield: 22, profit: 2, water: 'Low', waterKey: 'recommendation.low', period: 65 },
    { nameKey: 'recommendation.crops.groundnut', yield: 18, profit: 3, water: 'Low', waterKey: 'recommendation.low', period: 135 },
  ],
  'Zaid_Silty': [
    { nameKey: 'recommendation.crops.cucumber', yield: 27, profit: 3, water: 'High', waterKey: 'recommendation.high', period: 60 },
    { nameKey: 'recommendation.crops.okra', yield: 14, profit: 2, water: 'Medium', waterKey: 'recommendation.medium', period: 50 },
    { nameKey: 'recommendation.crops.pumpkin', yield: 32, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 75 },
  ],
  'Zaid_Peaty': [
    { nameKey: 'recommendation.crops.watermelon', yield: 38, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 80 },
    { nameKey: 'recommendation.crops.pumpkin', yield: 34, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 75 },
    { nameKey: 'recommendation.crops.cucumber', yield: 28, profit: 3, water: 'High', waterKey: 'recommendation.high', period: 60 },
  ],
};

const defaultResults = [
  { nameKey: 'recommendation.crops.wheat', yield: 42, profit: 4, water: 'Medium', waterKey: 'recommendation.medium', period: 120 },
  { nameKey: 'recommendation.crops.rice', yield: 45, profit: 4, water: 'High', waterKey: 'recommendation.high', period: 120 },
  { nameKey: 'recommendation.crops.maize', yield: 38, profit: 3, water: 'Medium', waterKey: 'recommendation.medium', period: 90 },
];

const getWaterColor = (water) => {
  switch (water) {
    case 'Low': return 'text-green-600 bg-green-100';
    case 'Medium': return 'text-yellow-600 bg-yellow-100';
    case 'High': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const CropRecommendation = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [soil, setSoil] = useState('Loamy');
  const [location, setLocation] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [season, setSeason] = useState('Kharif');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    const key = `${season}_${soil}`;
    const data = mockData[key] || defaultResults;
    setTimeout(() => {
      setResults(data);
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-10"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="p-3 rounded-full gradient-primary shadow-lg">
              <Sprout size={32} className="text-white" />
            </div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-3"
          >
            {t('recommendation.title')}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('recommendation.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#FFFFFF] rounded-2xl card-shadow p-6 sm:p-8 mb-8"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  <MapPin size={16} className="inline mr-1 text-[#4D7C0F]" />
                  {t('recommendation.soilType')}
                </label>
                <select
                  value={soil}
                  onChange={(e) => setSoil(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all duration-200"
                >
                  <option value="Loamy">{t('recommendation.loamy')}</option>
                  <option value="Clay">{t('recommendation.clay')}</option>
                  <option value="Sandy">{t('recommendation.sandy')}</option>
                  <option value="Silty">{t('recommendation.silty')}</option>
                  <option value="Peaty">{t('recommendation.peaty')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  <MapPin size={16} className="inline mr-1 text-[#4D7C0F]" />
                  {t('recommendation.location')}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('recommendation.locationPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  <Droplets size={16} className="inline mr-1 text-[#4D7C0F]" />
                  {t('recommendation.rainfall')}
                </label>
                <input
                  type="number"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  placeholder={t('recommendation.rainfallPlaceholder')}
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  <Sun size={16} className="inline mr-1 text-[#4D7C0F]" />
                  {t('recommendation.season')}
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all duration-200"
                >
                  <option value="Kharif">{t('recommendation.kharif')}</option>
                  <option value="Rabi">{t('recommendation.rabi')}</option>
                  <option value="Zaid">{t('recommendation.zaid')}</option>
                </select>
              </div>
            </div>

            <div className="mt-6 text-center">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3.5 gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('recommendation.analyzing')}
                  </>
                ) : (
                  <>
                    <Beaker size={20} />
                    {t('recommendation.submit')}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {results && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <TrendingUp size={24} className="text-[#4D7C0F]" />
              <h2 className="text-2xl font-bold text-[#1F2937]">
                {t('recommendation.results')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((crop, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="relative bg-[#FFFFFF] rounded-2xl card-shadow card-hover p-6 overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 gradient-warm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        <CheckCircle size={14} />
                        {t('recommendation.recommended')}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl ${index === 0 ? 'gradient-primary' : 'bg-[#FEF9C3]'}`}>
                      <Sprout size={20} className={index === 0 ? 'text-white' : 'text-[#4D7C0F]'} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      {t(crop.nameKey)}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Leaf size={16} className="text-[#84CC16]" />
                        <span className="text-sm">{t('recommendation.expectedYield')}</span>
                      </div>
                      <span className="font-semibold text-[#1F2937]">{crop.yield} {t('recommendation.quintalsPerHectare')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp size={16} className="text-[#84CC16]" />
                        <span className="text-sm">{t('recommendation.profitability')}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {renderStars(crop.profit)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Droplets size={16} className="text-[#84CC16]" />
                        <span className="text-sm">{t('recommendation.waterRequirement')}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getWaterColor(crop.water)}`}>
                        {t(crop.waterKey)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-[#84CC16]" />
                        <span className="text-sm">{t('recommendation.growingPeriod')}</span>
                      </div>
                      <span className="font-semibold text-[#1F2937]">{crop.period} {t('recommendation.days')}</span>
                    </div>
                  </div>

                  {index === 0 && (
                    <div className="mt-4 pt-4 border-t border-dashed border-[#EAB308]/30">
                      <div className="flex items-center gap-2 text-[#EAB308]">
                        <Star size={16} className="fill-[#EAB308]" />
                        <span className="text-sm font-semibold">{t('recommendation.bestMatch')}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!results && submitted && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 rounded-full bg-[#FEF9C3] inline-flex mb-4">
              <MapPin size={40} className="text-[#EAB308]" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">
              {t('recommendation.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('recommendation.tryAgain')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
