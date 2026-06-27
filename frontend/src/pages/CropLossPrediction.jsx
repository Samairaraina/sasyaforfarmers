import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { api } from '../api'
import { BarChart3, TrendingDown, AlertTriangle, CheckCircle, Thermometer, Droplets, MapPin, Leaf, Brain, Beaker, Lightbulb } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const cropOptions = ['wheat', 'rice', 'maize', 'mustard', 'sugarcane', 'cotton']
const soilOptions = ['loamy', 'clay', 'sandy', 'silty', 'peaty']

const riskLevels = {
  Low: { label: 'prediction.low', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
  Moderate: { label: 'prediction.moderate', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle },
  High: { label: 'prediction.high', color: 'text-orange-600', bg: 'bg-orange-100', icon: AlertTriangle },
  Critical: { label: 'prediction.critical', color: 'text-red-600', bg: 'bg-red-100', icon: TrendingDown },
}

const seasons = ['prediction.kharif', 'prediction.rabi', 'prediction.zaid', 'prediction.current']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const CropLossPrediction = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()

  const [formData, setFormData] = useState({
    crop: 'wheat',
    location: '',
    soil: 'loamy',
    temperature: '',
    rainfall: '',
    humidity: '',
  })

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setResults(null)

    try {
      const data = await api('/api/predict-loss', {
        method: 'POST',
        body: JSON.stringify({
          cropType: formData.crop,
          temperature: Number(formData.temperature),
          rainfall: Number(formData.rainfall),
          humidity: Number(formData.humidity),
        }),
      })

      const seasonData = seasons.map((s) => ({
        label: s,
        value: s === 'prediction.current' ? data.predictedYield : +(data.predictedYield * 0.7 + Math.random() * data.predictedYield * 0.6).toFixed(1),
      }))

      setResults({
        yield: data.predictedYield,
        loss: data.lossPercentage,
        risk: riskLevels[data.riskLevel] || riskLevels.Low,
        recommendations: data.recommendations,
        seasonData,
      })
    } catch {
      setResults(null)
    }
    setLoading(false)
  }

  return (
    <div className="page-container bg-bg" dir={language === 'hi' ? 'rtl' : 'ltr'}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-dark sm:text-4xl">
            {t('prediction.title')}
          </h1>
          <p className="mt-2 text-gray-600">{t('prediction.subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="card-shadow rounded-2xl bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                  <Beaker className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{t('prediction.input_heading')}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    <Leaf className="mr-1.5 inline h-4 w-4 text-primary" />
                    {t('prediction.crop_type')}
                  </label>
                  <select value={formData.crop} onChange={handleChange('crop')} className="input-field">
                    {cropOptions.map((c) => (
                      <option key={c} value={c}>{t(`prediction.${c}`)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    <MapPin className="mr-1.5 inline h-4 w-4 text-secondary" />
                    {t('prediction.location')}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={handleChange('location')}
                    placeholder={t('prediction.location_placeholder')}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    <Droplets className="mr-1.5 inline h-4 w-4 text-blue-500" />
                    {t('prediction.soil_data')}
                  </label>
                  <select value={formData.soil} onChange={handleChange('soil')} className="input-field">
                    {soilOptions.map((s) => (
                      <option key={s} value={s}>{t(`prediction.${s}`)}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      <Thermometer className="mr-1.5 inline h-4 w-4 text-red-500" />
                      {t('prediction.temperature')}
                    </label>
                    <input type="number" value={formData.temperature} onChange={handleChange('temperature')} placeholder="°C" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      <Droplets className="mr-1.5 inline h-4 w-4 text-blue-500" />
                      {t('prediction.rainfall')}
                    </label>
                    <input type="number" value={formData.rainfall} onChange={handleChange('rainfall')} placeholder="mm" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      <Droplets className="mr-1.5 inline h-4 w-4 text-cyan-500" />
                      {t('prediction.humidity')}
                    </label>
                    <input type="number" value={formData.humidity} onChange={handleChange('humidity')} placeholder="%" className="input-field" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3">
                  {loading ? (
                    <><svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{t('prediction.analyzing')}</>
                  ) : (
                    <><Brain className="h-5 w-5" />{t('prediction.predict')}</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-3">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="card-shadow flex flex-col items-center justify-center rounded-2xl bg-white p-12"
                >
                  <div className="relative mb-6">
                    <div className="h-20 w-20 animate-ping rounded-full bg-secondary/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="h-10 w-10 animate-pulse text-primary" />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">{t('prediction.analyzing_data')}</p>
                  <p className="mt-1 text-sm text-gray-500">{t('prediction.please_wait')}</p>
                </motion.div>
              )}

              {results && !loading && (
                <motion.div key="results" variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants} className="card-shadow overflow-hidden rounded-2xl bg-white">
                    <div className="gradient-primary px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-white" />
                        <h3 className="text-lg font-semibold text-white">{t('prediction.results')}</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      <div className="p-6 text-center">
                        <p className="text-sm font-medium text-gray-500">{t('prediction.predicted_yield')}</p>
                        <p className="mt-2 text-4xl font-bold text-primary">{results.yield}</p>
                        <p className="mt-1 text-sm text-gray-500">{t('prediction.quintals_per_hectare')}</p>
                      </div>
                      <div className="p-6 text-center">
                        <p className="text-sm font-medium text-gray-500">{t('prediction.estimated_loss')}</p>
                        <p className={`mt-2 text-4xl font-bold ${results.risk.color}`}>{results.loss}%</p>
                        <p className="mt-1 text-sm text-gray-500">{t('prediction.of_potential')}</p>
                      </div>
                      <div className="p-6 text-center">
                        <p className="text-sm font-medium text-gray-500">{t('prediction.risk_level')}</p>
                        <div className="mt-3 flex justify-center">
                          <span className={`inline-flex items-center gap-1.5 rounded-full ${results.risk.bg} ${results.risk.color} px-4 py-1.5 text-sm font-semibold`}>
                            <results.risk.icon className="h-4 w-4" />
                            {t(results.risk.label)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="card-shadow rounded-2xl bg-white p-6">
                    <h3 className="mb-4 text-sm font-semibold text-gray-700">{t('prediction.risk_meter')}</h3>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${results.loss}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          results.loss < 10 ? 'bg-green-500' : results.loss < 20 ? 'bg-yellow-500' : results.loss < 30 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="card-shadow rounded-2xl bg-white p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      <h3 className="text-sm font-semibold text-gray-700">{t('prediction.recommendations')}</h3>
                    </div>
                    <div className="space-y-3">
                      {results.recommendations.map((rec, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.15 }}
                          className="flex items-start gap-3 rounded-xl bg-light-yellow/60 p-4 card-hover"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20">
                            <Lightbulb className="h-4 w-4 text-accent" />
                          </div>
                          <p className="text-sm text-gray-700">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="card-shadow rounded-2xl bg-white p-6">
                    <div className="mb-6 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h3 className="text-sm font-semibold text-gray-700">{t('prediction.seasonal_comparison')}</h3>
                    </div>
                    <div className="flex items-end justify-between gap-3 sm:gap-4">
                      {results.seasonData.map((s, idx) => {
                        const maxVal = Math.max(...results.seasonData.map((d) => d.value))
                        const heightPct = maxVal > 0 ? (s.value / maxVal) * 100 : 0
                        const isCurrent = s.label === 'prediction.current'
                        return (
                          <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(heightPct, 8)}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
                              className={`w-full rounded-t-lg sm:max-w-[60px] ${
                                isCurrent ? 'bg-linear-to-t from-primary to-secondary' : 'bg-linear-to-t from-accent to-light-yellow'
                              }`}
                              style={{ minHeight: '12px' }}
                            />
                            <div className="text-center">
                              <p className="text-xs font-semibold text-gray-800">{s.value}</p>
                              <p className="text-[10px] text-gray-500">{t(s.label)}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {!results && !loading && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="card-shadow flex flex-col items-center justify-center rounded-2xl bg-white p-12"
                >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-light-yellow">
                    <Brain className="h-10 w-10 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">{t('prediction.no_data_title')}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t('prediction.no_data_desc')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default CropLossPrediction
