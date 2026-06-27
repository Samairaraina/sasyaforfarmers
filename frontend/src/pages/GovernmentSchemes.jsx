import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  IndianRupee,
  FileText,
  CheckCircle,
  ExternalLink,
  Search,
  MapPin,
  Filter,
  BookOpen,
  Users,
  Landmark,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];

const schemesData = [
  {
    id: 'pmkisan',
    icon: IndianRupee,
    nameKey: 'schemes.pmkisan.name',
    descKey: 'schemes.pmkisan.description',
    ministryKey: 'schemes.pmkisan.ministry',
    state: 'All India',
    benefit: '₹6,000/year',
    applyUrl: 'https://pmkisan.gov.in',
    details: {
      description: 'schemes.pmkisan.detail.desc',
      eligibility: 'schemes.pmkisan.detail.eligibility',
      benefits: 'schemes.pmkisan.detail.benefits',
      howToApply: 'schemes.pmkisan.detail.howToApply',
      website: 'https://pmkisan.gov.in',
    },
  },
  {
    id: 'pmfby',
    icon: Shield,
    nameKey: 'schemes.pmfby.name',
    descKey: 'schemes.pmfby.description',
    ministryKey: 'schemes.pmfby.ministry',
    state: 'All India',
    benefit: null,
    applyUrl: 'https://pmfby.gov.in',
    details: {
      description: 'schemes.pmfby.detail.desc',
      eligibility: 'schemes.pmfby.detail.eligibility',
      benefits: 'schemes.pmfby.detail.benefits',
      howToApply: 'schemes.pmfby.detail.howToApply',
      website: 'https://pmfby.gov.in',
    },
  },
  {
    id: 'soilhealth',
    icon: FileText,
    nameKey: 'schemes.soilhealth.name',
    descKey: 'schemes.soilhealth.description',
    ministryKey: 'schemes.soilhealth.ministry',
    state: 'All India',
    benefit: null,
    applyUrl: 'https://soilhealth.dac.gov.in',
    details: {
      description: 'schemes.soilhealth.detail.desc',
      eligibility: 'schemes.soilhealth.detail.eligibility',
      benefits: 'schemes.soilhealth.detail.benefits',
      howToApply: 'schemes.soilhealth.detail.howToApply',
      website: 'https://soilhealth.dac.gov.in',
    },
  },
  {
    id: 'pmksy',
    icon: BookOpen,
    nameKey: 'schemes.pmksy.name',
    descKey: 'schemes.pmksy.description',
    ministryKey: 'schemes.pmksy.ministry',
    state: 'All India',
    benefit: null,
    applyUrl: 'https://pmksy.gov.in',
    details: {
      description: 'schemes.pmksy.detail.desc',
      eligibility: 'schemes.pmksy.detail.eligibility',
      benefits: 'schemes.pmksy.detail.benefits',
      howToApply: 'schemes.pmksy.detail.howToApply',
      website: 'https://pmksy.gov.in',
    },
  },
  {
    id: 'kcc',
    icon: Landmark,
    nameKey: 'schemes.kcc.name',
    descKey: 'schemes.kcc.description',
    ministryKey: 'schemes.kcc.ministry',
    state: 'All India',
    benefit: 'Up to ₹3,00,000',
    applyUrl: 'https://www.kisansmartcard.in',
    details: {
      description: 'schemes.kcc.detail.desc',
      eligibility: 'schemes.kcc.detail.eligibility',
      benefits: 'schemes.kcc.detail.benefits',
      howToApply: 'schemes.kcc.detail.howToApply',
      website: 'https://www.kisansmartcard.in',
    },
  },
  {
    id: 'enam',
    icon: Users,
    nameKey: 'schemes.enam.name',
    descKey: 'schemes.enam.description',
    ministryKey: 'schemes.enam.ministry',
    state: 'All India',
    benefit: null,
    applyUrl: 'https://enam.gov.in',
    details: {
      description: 'schemes.enam.detail.desc',
      eligibility: 'schemes.enam.detail.eligibility',
      benefits: 'schemes.enam.detail.benefits',
      howToApply: 'schemes.enam.detail.howToApply',
      website: 'https://enam.gov.in',
    },
  },
  {
    id: 'upkisanbima',
    icon: MapPin,
    nameKey: 'schemes.upkisanbima.name',
    descKey: 'schemes.upkisanbima.description',
    ministryKey: 'schemes.upkisanbima.ministry',
    state: 'Uttar Pradesh',
    benefit: '₹5,00,000 coverage',
    applyUrl: 'https://up.gov.in',
    details: {
      description: 'schemes.upkisanbima.detail.desc',
      eligibility: 'schemes.upkisanbima.detail.eligibility',
      benefits: 'schemes.upkisanbima.detail.benefits',
      howToApply: 'schemes.upkisanbima.detail.howToApply',
      website: 'https://up.gov.in',
    },
  },
  {
    id: 'mahaasadhar',
    icon: MapPin,
    nameKey: 'schemes.mahaasadhar.name',
    descKey: 'schemes.mahaasadhar.description',
    ministryKey: 'schemes.mahaasadhar.ministry',
    state: 'Maharashtra',
    benefit: '₹10,000/year',
    applyUrl: 'https://maharashtra.gov.in',
    details: {
      description: 'schemes.mahaasadhar.detail.desc',
      eligibility: 'schemes.mahaasadhar.detail.eligibility',
      benefits: 'schemes.mahaasadhar.detail.benefits',
      howToApply: 'schemes.mahaasadhar.detail.howToApply',
      website: 'https://maharashtra.gov.in',
    },
  },
  {
    id: 'pbkisansathi',
    icon: MapPin,
    nameKey: 'schemes.pbkisansathi.name',
    descKey: 'schemes.pbkisansathi.description',
    ministryKey: 'schemes.pbkisansathi.ministry',
    state: 'Punjab',
    benefit: '₹4,000/acre',
    applyUrl: 'https://punjab.gov.in',
    details: {
      description: 'schemes.pbkisansathi.detail.desc',
      eligibility: 'schemes.pbkisansathi.detail.eligibility',
      benefits: 'schemes.pbkisansathi.detail.benefits',
      howToApply: 'schemes.pbkisansathi.detail.howToApply',
      website: 'https://punjab.gov.in',
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.2 } },
};

export default function GovernmentSchemes() {
  const { t } = useTranslation();
  useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch = t(scheme.nameKey).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState =
      selectedState === 'All' || scheme.state === 'All India' || scheme.state === selectedState;
    return matchesSearch && matchesState;
  });

  const openModal = (scheme) => setSelectedScheme(scheme);
  const closeModal = () => setSelectedScheme(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAF5' }}>
      <div
        className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #4D7C0F 0%, #84CC16 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white" />
          <div className="absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            {t('schemes.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-green-100 sm:text-xl"
          >
            {t('schemes.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('schemes.filter.search')}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 shadow-sm outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
          </div>

          <div className="relative min-w-50">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-700 shadow-sm outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            >
              <option value="All">{t('schemes.filter.allStates')}</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <Filter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme, index) => {
            const IconComponent = scheme.icon;
            return (
              <motion.div
                key={scheme.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)' }}
              >
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ background: 'linear-gradient(135deg, #4D7C0F 0%, #84CC16 100%)' }}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t(scheme.nameKey)}</h3>
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: '#FEF9C3',
                          color: '#EAB308',
                        }}
                      >
                        {scheme.state === 'All India' ? t('schemes.badge.allIndia') : scheme.state}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {t(scheme.descKey)}
                  </p>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Landmark className="h-3.5 w-3.5" />
                      <span>{t(scheme.ministryKey)}</span>
                    </div>
                    {scheme.benefit && (
                      <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#4D7C0F' }}>
                        <IndianRupee className="h-3.5 w-3.5" />
                        <span>{scheme.benefit}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openModal(scheme)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #4D7C0F 0%, #84CC16 100%)' }}
                    >
                      <BookOpen className="h-4 w-4" />
                      {t('schemes.viewDetails')}
                    </button>
                    <a
                      href={scheme.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-80"
                      style={{ borderColor: '#4D7C0F', color: '#4D7C0F' }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('schemes.applyNow')}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-lg text-gray-500">{t('schemes.noResults')}</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedScheme && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className="relative px-6 py-8 text-white sm:px-8"
                style={{ background: 'linear-gradient(135deg, #4D7C0F 0%, #84CC16 100%)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                    {React.createElement(selectedScheme.icon, { className: 'h-7 w-7' })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t(selectedScheme.nameKey)}</h2>
                    <span
                      className="mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: '#FEF9C3', color: '#EAB308' }}
                    >
                      {selectedScheme.state === 'All India'
                        ? t('schemes.badge.allIndia')
                        : selectedScheme.state}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                  x
                </button>
              </div>

              <div className="space-y-6 px-6 py-6 sm:px-8">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-900">
                    <BookOpen className="h-5 w-5" style={{ color: '#4D7C0F' }} />
                    {t('schemes.modal.description')}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(selectedScheme.details.description)}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-900">
                    <CheckCircle className="h-5 w-5" style={{ color: '#84CC16' }} />
                    {t('schemes.modal.eligibility')}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(selectedScheme.details.eligibility)}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-900">
                    <IndianRupee className="h-5 w-5" style={{ color: '#EAB308' }} />
                    {t('schemes.modal.benefits')}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(selectedScheme.details.benefits)}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-900">
                    <ExternalLink className="h-5 w-5" style={{ color: '#4D7C0F' }} />
                    {t('schemes.modal.howToApply')}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(selectedScheme.details.howToApply)}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={selectedScheme.details.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #4D7C0F 0%, #84CC16 100%)' }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t('schemes.modal.visitWebsite')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
