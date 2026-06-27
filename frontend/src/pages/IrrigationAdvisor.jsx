import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { Droplets, Thermometer, Calendar, Sun, Leaf, AlertCircle, CheckCircle, Clock, CloudSun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } },
};

const cropStages = ['vegetative', 'flowering', 'fruiting', 'maturity'];

const conservationTips = [
  { icon: Clock, key: 'tip1' },
  { icon: Sun, key: 'tip2' },
  { icon: Leaf, key: 'tip3' },
  { icon: CloudSun, key: 'tip4' },
];

const stageBaseWater = { vegetative: 8, flowering: 12, fruiting: 15, maturity: 5 };

function getNextIrrigationDays(soilMoisture) {
  if (soilMoisture < 30) return 1;
  if (soilMoisture < 50) return 2;
  if (soilMoisture < 75) return 3;
  return 4;
}

function generateSchedule(stage, soilMoisture) {
  const base = stageBaseWater[stage] || 8;
  const factor = 1 + (100 - soilMoisture) / 100;
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const schedule = [];
  let waterToday = parseFloat((base * factor).toFixed(1));
  for (let i = 0; i < 7; i++) {
    const adjusted = parseFloat((waterToday * (1 + (i % 3 === 0 ? 0.15 : i % 3 === 1 ? -0.05 : 0.1))).toFixed(1));
    const recommended = soilMoisture < 60 || i % 3 === 0;
    schedule.push({ day: days[i], amount: Math.max(1, adjusted), recommended });
  }
  return schedule;
}

export default function IrrigationAdvisor() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [soilMoisture, setSoilMoisture] = useState(50);
  const [cropStage, setCropStage] = useState('vegetative');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGetRecommendation = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await api('/api/irrigation-advice', {
        method: 'POST',
        body: JSON.stringify({ soilMoisture, cropStage }),
      });
      const schedule = generateSchedule(cropStage, soilMoisture);
      setResult({ waterRequired: data.waterRequired, nextDays: data.nextIrrigation, schedule });
    } catch {
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-light-yellow via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-lg mb-2">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {t('irrigation.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('irrigation.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 md:p-8 card-shadow"
          >
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <Thermometer className="w-5 h-5 text-accent" />
                {t('irrigation.soilMoisture')}
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #4D7C0F ${soilMoisture}%, #e5e7eb ${soilMoisture}%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span className="text-xl font-bold text-primary">{soilMoisture}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <Leaf className="w-5 h-5 text-secondary" />
                {t('irrigation.cropGrowthStage')}
              </label>
              <select
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {cropStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {t(`irrigation.stages.${stage}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex justify-center pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetRecommendation}
                disabled={loading}
                className="px-10 py-3.5 gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    {t('irrigation.loading')}
                  </>
                ) : (
                  <>
                    <Droplets className="w-5 h-5" />
                    {t('irrigation.getRecommendation')}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {result && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="bg-linear-to-br from-primary to-green-700 rounded-2xl p-6 md:p-8 text-white card-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {t('irrigation.recommendationTitle')}
                    </h3>
                    <p className="text-lg text-green-50 leading-relaxed">
                      {soilMoisture < 30
                        ? t('irrigation.recommendation.critical')
                        : soilMoisture < 50
                        ? t('irrigation.recommendation.moderate')
                        : t('irrigation.recommendation.good')}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 card-shadow card-hover"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-50">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {t('irrigation.waterRequired')}
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    {result.waterRequired}{' '}
                    <span className="text-base font-normal text-gray-500">
                      {t('irrigation.litersPerSqMeter')}
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 card-shadow card-hover"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-amber-50">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {t('irrigation.nextIrrigation')}
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-accent">
                    {t('irrigation.inDays', { count: result.nextDays })}
                  </p>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 md:p-8 card-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-purple-50">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    {t('irrigation.weeklySchedule')}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="pb-3 font-semibold text-gray-600">
                          {t('irrigation.schedule.day')}
                        </th>
                        <th className="pb-3 font-semibold text-gray-600">
                          {t('irrigation.schedule.waterAmount')}
                        </th>
                        <th className="pb-3 font-semibold text-gray-600">
                          {t('irrigation.schedule.status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((entry, idx) => (
                        <tr
                          key={entry.day}
                          className={`border-b border-gray-50 transition-colors ${
                            entry.recommended ? 'bg-green-50/50' : ''
                          }`}
                        >
                          <td className="py-3 font-medium text-gray-700">
                            {t(`irrigation.days.${entry.day}`)}
                          </td>
                          <td className="py-3 text-gray-600">
                            {entry.amount} {t('irrigation.litersPerSqMeter')}
                          </td>
                          <td className="py-3">
                            {entry.recommended ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                <CheckCircle className="w-4 h-4" />
                                {t('irrigation.schedule.recommended')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                                <AlertCircle className="w-4 h-4" />
                                {t('irrigation.schedule.optional')}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 md:p-8 card-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-emerald-50">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    {t('irrigation.conservationTips')}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {conservationTips.map(({ icon: Icon, key }) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 p-4 rounded-xl gradient-warm card-hover"
                    >
                      <div className="p-2 rounded-lg bg-white/70">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {t(`irrigation.tips.${key}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
