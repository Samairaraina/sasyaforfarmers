import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { Upload, Search, Leaf, AlertTriangle, CheckCircle, FlaskConical, Shield, Droplets, Bug, Timer, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DISEASES = [
  {
    id: 'leaf-blight',
    name: 'Leaf Blight',
    scientificName: 'Helminthosporium turcicum',
    symptoms: [
      'disease.symptoms.leafBlight.0',
      'disease.symptoms.leafBlight.1',
      'disease.symptoms.leafBlight.2',
    ],
    causes: [
      'disease.causes.leafBlight.0',
      'disease.causes.leafBlight.1',
      'disease.causes.leafBlight.2',
    ],
    prevention: [
      'disease.prevention.leafBlight.0',
      'disease.prevention.leafBlight.1',
      'disease.prevention.leafBlight.2',
    ],
    treatment: 'disease.treatment.leafBlight',
    fertilizers: ['disease.fertilizers.leafBlight.0', 'disease.fertilizers.leafBlight.1'],
    organicSolutions: [
      'disease.organicSolutions.leafBlight.0',
      'disease.organicSolutions.leafBlight.1',
      'disease.organicSolutions.leafBlight.2',
    ],
    chemicalSolutions: [
      'disease.chemicalSolutions.leafBlight.0',
      'disease.chemicalSolutions.leafBlight.1',
      'disease.chemicalSolutions.leafBlight.2',
    ],
    expectedRecoveryTime: 'disease.expectedRecoveryTime.leafBlight',
  },
  {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe graminis',
    symptoms: [
      'disease.symptoms.powderyMildew.0',
      'disease.symptoms.powderyMildew.1',
      'disease.symptoms.powderyMildew.2',
    ],
    causes: [
      'disease.causes.powderyMildew.0',
      'disease.causes.powderyMildew.1',
      'disease.causes.powderyMildew.2',
    ],
    prevention: [
      'disease.prevention.powderyMildew.0',
      'disease.prevention.powderyMildew.1',
      'disease.prevention.powderyMildew.2',
    ],
    treatment: 'disease.treatment.powderyMildew',
    fertilizers: ['disease.fertilizers.powderyMildew.0', 'disease.fertilizers.powderyMildew.1'],
    organicSolutions: [
      'disease.organicSolutions.powderyMildew.0',
      'disease.organicSolutions.powderyMildew.1',
      'disease.organicSolutions.powderyMildew.2',
    ],
    chemicalSolutions: [
      'disease.chemicalSolutions.powderyMildew.0',
      'disease.chemicalSolutions.powderyMildew.1',
      'disease.chemicalSolutions.powderyMildew.2',
    ],
    expectedRecoveryTime: 'disease.expectedRecoveryTime.powderyMildew',
  },
  {
    id: 'rust',
    name: 'Rust',
    scientificName: 'Puccinia spp.',
    symptoms: [
      'disease.symptoms.rust.0',
      'disease.symptoms.rust.1',
      'disease.symptoms.rust.2',
    ],
    causes: [
      'disease.causes.rust.0',
      'disease.causes.rust.1',
      'disease.causes.rust.2',
    ],
    prevention: [
      'disease.prevention.rust.0',
      'disease.prevention.rust.1',
      'disease.prevention.rust.2',
    ],
    treatment: 'disease.treatment.rust',
    fertilizers: ['disease.fertilizers.rust.0', 'disease.fertilizers.rust.1'],
    organicSolutions: [
      'disease.organicSolutions.rust.0',
      'disease.organicSolutions.rust.1',
      'disease.organicSolutions.rust.2',
    ],
    chemicalSolutions: [
      'disease.chemicalSolutions.rust.0',
      'disease.chemicalSolutions.rust.1',
      'disease.chemicalSolutions.rust.2',
    ],
    expectedRecoveryTime: 'disease.expectedRecoveryTime.rust',
  },
  {
    id: 'bacterial-wilt',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    symptoms: [
      'disease.symptoms.bacterialWilt.0',
      'disease.symptoms.bacterialWilt.1',
      'disease.symptoms.bacterialWilt.2',
    ],
    causes: [
      'disease.causes.bacterialWilt.0',
      'disease.causes.bacterialWilt.1',
      'disease.causes.bacterialWilt.2',
    ],
    prevention: [
      'disease.prevention.bacterialWilt.0',
      'disease.prevention.bacterialWilt.1',
      'disease.prevention.bacterialWilt.2',
    ],
    treatment: 'disease.treatment.bacterialWilt',
    fertilizers: ['disease.fertilizers.bacterialWilt.0', 'disease.fertilizers.bacterialWilt.1'],
    organicSolutions: [
      'disease.organicSolutions.bacterialWilt.0',
      'disease.organicSolutions.bacterialWilt.1',
      'disease.organicSolutions.bacterialWilt.2',
    ],
    chemicalSolutions: [
      'disease.chemicalSolutions.bacterialWilt.0',
      'disease.chemicalSolutions.bacterialWilt.1',
      'disease.chemicalSolutions.bacterialWilt.2',
    ],
    expectedRecoveryTime: 'disease.expectedRecoveryTime.bacterialWilt',
  },
];

const DISEASE_NAMES = ['Leaf Blight', 'Powdery Mildew', 'Rust', 'Bacterial Wilt', 'Healthy'];

function CircularProgress({ percentage, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-dark">{percentage}%</span>
    </div>
  );
}

export default function DiseaseDetection() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImage(file);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setResult(null);
    try {
      const data = await api('/api/detect-disease', { method: 'POST' });
      if (data.healthy) {
        setResult({ name: 'Healthy', confidence: data.confidence, data: null });
      } else {
        const diseaseData = DISEASES.find((d) => d.name === data.diseaseName) || null;
        setResult({ name: data.diseaseName, confidence: data.confidence, data: diseaseData });
      }
    } catch {
      setResult(null);
    }
    setAnalyzing(false);
  };

  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 shadow-lg">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-dark">{t('disease.title')}</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">{t('disease.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                  : 'border-gray-300 bg-white hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

              {!imagePreview ? (
                <div className="py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-warm mb-6">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">{t('disease.dropzone.title')}</h3>
                  <p className="text-gray-500 mb-4">{t('disease.dropzone.subtitle')}</p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <Upload className="w-5 h-5" />
                    {t('disease.dropzone.button')}
                  </span>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded plant"
                    className="max-h-80 mx-auto rounded-xl object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {imagePreview && !analyzing && !result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6"
                >
                  <button
                    onClick={handleAnalyze}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 gradient-primary text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                  >
                    <Search className="w-6 h-6" />
                    {t('disease.analyze')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {analyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex flex-col items-center gap-4 p-8 bg-white rounded-2xl card-shadow"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
                <p className="text-lg font-medium text-dark">{t('disease.analyzing')}</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full animate-pulse" />
                </div>
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                  <div className={`p-6 ${result.name === 'Healthy' ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          result.name === 'Healthy' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {result.name === 'Healthy' ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-8 h-8 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-dark">
                          {result.name === 'Healthy'
                            ? t('disease.result.healthy')
                            : t(`disease.result.name.${result.data.id}`)}
                        </h2>
                        {result.name !== 'Healthy' && result.data && (
                          <p className="text-gray-500 italic">{result.data.scientificName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center py-4">
                      <p className="text-sm font-medium text-gray-500 mb-3">{t('disease.result.confidence')}</p>
                      <CircularProgress percentage={result.confidence} />
                    </div>

                    {result.data && (
                      <>
                        <div className="p-5 rounded-xl bg-orange-50 border border-orange-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Info className="w-5 h-5 text-orange-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.causes')}</h3>
                          </div>
                          <ul className="space-y-2">
                            {result.data.causes.map((cause, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                {t(cause)}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Bug className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.symptoms')}</h3>
                          </div>
                          <ul className="space-y-2">
                            {result.data.symptoms.map((symp, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {t(symp)}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-purple-50 border border-purple-100">
                          <div className="flex items-center gap-3 mb-3">
                            <FlaskConical className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.treatment')}</h3>
                          </div>
                          <p className="text-gray-700">{t(result.data.treatment)}</p>
                        </div>

                        <div className="p-5 rounded-xl bg-amber-50 border border-amber-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-5 h-5 text-amber-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.prevention')}</h3>
                          </div>
                          <ul className="space-y-2">
                            {result.data.prevention.map((prev, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                {t(prev)}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.organicSolutions')}</h3>
                          </div>
                          <ul className="space-y-2">
                            {result.data.organicSolutions.map((sol, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                {t(sol)}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-green-50 border border-green-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Droplets className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.chemicalSolutions')}</h3>
                          </div>
                          <ul className="space-y-2">
                            {result.data.chemicalSolutions.map((sol, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                {t(sol)}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-cyan-50 border border-cyan-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Timer className="w-5 h-5 text-cyan-600" />
                            <h3 className="font-semibold text-dark">{t('disease.result.expectedRecoveryTime')}</h3>
                          </div>
                          <p className="text-gray-700 font-medium">{t(result.data.expectedRecoveryTime)}</p>
                        </div>
                      </>
                    )}

                    {result.name === 'Healthy' && (
                      <div className="p-5 rounded-xl bg-green-50 border border-green-100">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-dark">{t('disease.result.healthyMessage')}</h3>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <Upload className="w-5 h-5" />
                      {t('disease.newAnalysis')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
