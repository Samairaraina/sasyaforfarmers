import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { useLanguage } from '../context/LanguageContext';
import {
  DollarSign, TrendingUp, TrendingDown, BarChart3, Leaf,
  AlertCircle, CheckCircle, Clock, ShoppingCart, ArrowUp, ArrowDown, Minus
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

const commodities = ['Wheat', 'Rice', 'Maize', 'Mustard', 'Vegetables'];

const defaultPrices = [
  { name: 'Wheat', price: 2150, change: 2.5, changeDir: 'up' },
  { name: 'Rice', price: 1950, change: 1.2, changeDir: 'up' },
  { name: 'Maize', price: 1820, change: 0.8, changeDir: 'down' },
  { name: 'Mustard', price: 4250, change: 3.1, changeDir: 'up' },
  { name: 'Vegetables', price: 1500, change: 1.5, changeDir: 'down' }
];

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const recommendations = [
  {
    crop: 'Wheat',
    action: 'sellNow',
    reason: 'sellNowReason',
    icon: CheckCircle,
    color: 'from-primary to-secondary',
    bgLight: 'bg-green-50',
    border: 'border-primary/20',
    textColor: 'text-primary'
  },
  {
    crop: 'Rice',
    action: 'sellNow',
    reason: 'sellNowReason',
    icon: CheckCircle,
    color: 'from-primary to-secondary',
    bgLight: 'bg-green-50',
    border: 'border-primary/20',
    textColor: 'text-primary'
  },
  {
    crop: 'Maize',
    action: 'hold',
    reason: 'holdReason',
    icon: Clock,
    color: 'from-accent to-yellow-400',
    bgLight: 'bg-yellow-50',
    border: 'border-accent/20',
    textColor: 'text-accent'
  },
  {
    crop: 'Mustard',
    action: 'wait',
    reason: 'waitReason',
    icon: AlertCircle,
    color: 'from-orange-400 to-orange-300',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-500'
  },
  {
    crop: 'Vegetables',
    action: 'wait',
    reason: 'waitReason',
    icon: AlertCircle,
    color: 'from-orange-400 to-orange-300',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-500'
  }
];

const containerClass = "min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto";

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-5 h-5 text-red-500" />;
  return <Minus className="w-5 h-5 text-gray-400" />;
}

export default function MarketIntelligence() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState('Wheat');
  const [predicted, setPredicted] = useState(null);
  const [prices, setPrices] = useState(defaultPrices);

  useEffect(() => {
    api('/api/market-prices')
      .then(data => {
        if (data.prices) {
          setPrices(data.prices.map(p => ({
            name: p.commodity,
            price: p.price,
            change: p.change,
            changeDir: p.trend,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handlePredict = async () => {
    try {
      const data = await api('/api/predict-price', {
        method: 'POST',
        body: JSON.stringify({ commodity: selected }),
      });
      const step = (data.predictedPrice - data.currentPrice) / 5;
      const months = Array.from({ length: 6 }, (_, i) => Math.round(data.currentPrice + step * i));
      setPredicted({ futurePrice: data.predictedPrice, trend: data.trend, months });
    } catch {
      setPredicted(null);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={containerClass}
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('market.title')}
          </h1>
          <p className="text-gray-500 mt-1">{t('market.subtitle')}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">{t('market.currentPrices')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {prices.map((item) => {
            const cropKey = item.name.toLowerCase();
            return (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="bg-white rounded-2xl card-shadow card-hover p-5 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{t(`market.${cropKey}`)}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-400 mb-2">{t('market.perQuintal')}</p>
                <div className={`flex items-center gap-1 text-xs font-medium ${item.changeDir === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.changeDir === 'up' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {item.change}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">{t('market.pricePrediction')}</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('prediction.cropType')}</label>
            <select
              value={selected}
              onChange={(e) => { setSelected(e.target.value); setPredicted(null); }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
            >
              {commodities.map(c => (
                <option key={c} value={c}>{t(`market.${c.toLowerCase()}`)}</option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePredict}
            className="flex items-center gap-2 px-6 py-2.5 gradient-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <BarChart3 className="w-4 h-4" />
            {language === 'hi' ? 'मूल्य का अनुमान लगाएं' : 'Predict Price'}
          </motion.button>
        </div>
        {predicted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-light-yellow rounded-xl border border-accent/20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('market.predictedPrice')}</p>
                <p className="text-3xl font-bold text-gray-900">₹{predicted.futurePrice.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('market.perQuintal')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('market.trend')}</p>
                <div className="flex items-center gap-2">
                  <TrendIcon trend={predicted.trend} />
                  <span className={`font-medium text-sm ${predicted.trend === 'up' ? 'text-green-600' : predicted.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                    {t(`market.${predicted.trend === 'up' ? 'up' : predicted.trend === 'down' ? 'down' : 'stable'}`)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  {t('market.expectedPrice')}: ₹{predicted.futurePrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">{t('market.recommendation')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <motion.div
                key={rec.crop}
                variants={itemVariants}
                className={`bg-white rounded-2xl card-shadow card-hover p-5 border ${rec.border}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center`}>
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t(`market.${rec.crop.toLowerCase()}`)}</p>
                    <div className={`flex items-center gap-1 text-xs font-medium ${rec.textColor}`}>
                      <Icon className="w-3 h-3" />
                      {t(`market.${rec.action}`)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{t(`market.${rec.reason}`)}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl card-shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'hi' ? 'मूल्य प्रवृत्ति चार्ट' : 'Price Trend Chart'}
          </h2>
        </div>
        {predicted && (
          <div className="space-y-2">
            {predicted.months.map((val, idx) => {
              const max = Math.max(...predicted.months);
              const height = (val / max) * 100;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-8">{monthLabels[idx]}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-primary transition-all duration-700"
                      style={{ width: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-16 text-right">
                    ₹{val.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {!predicted && (
          <div className="text-center py-10 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">
              {language === 'hi'
                ? 'चार्ट देखने के लिए पहले मूल्य का अनुमान लगाएं'
                : 'Predict a price to view the trend chart'}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
