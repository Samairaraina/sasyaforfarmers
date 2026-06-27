import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { useLanguage } from '../context/LanguageContext';
import { BarChart3, TrendingUp, Droplets, Leaf, Activity, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

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

const diseaseColors = ['#4D7C0F', '#84CC16', '#EAB308', '#FEF9C3', '#1F2937'];

function StatCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl card-shadow card-hover p-5 flex items-center gap-4"
    >
      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1 mt-1 text-xs ${trendUp ? 'text-primary' : 'text-red-500'}`}>
            {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ChartCard({ icon: Icon, title, children, gradient }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl card-shadow card-hover overflow-hidden"
    >
      <div className={`${gradient || 'gradient-primary'} px-5 py-3 flex items-center gap-2`}>
        <Icon className="w-5 h-5 text-white" />
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="p-5">
        {children}
      </div>
    </motion.div>
  );
}

const MONTH_MAP = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

export default function Analytics() {
  const { t } = useTranslation();
  const months = t('analytics.months', { returnObjects: true });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    api('/api/analytics')
      .then(data => {
        setChartData({
          performanceData: data.cropPerformance.map(d => ({ month: MONTH_MAP[d.month] ?? 0, current: d.currentYear, previous: d.previousYear })),
          rainfallData: data.rainfallData.map(d => ({ month: MONTH_MAP[d.month] ?? 0, rainfall: d.rainfall, average: d.average })),
          forecastData: data.yieldForecast.map(d => ({ month: MONTH_MAP[d.month] ?? 0, yield: d.yield })),
          diseaseData: data.diseaseStats,
          soilData: data.soilHealth,
          marketData: data.marketPrices.map(d => ({ month: MONTH_MAP[d.month] ?? 0, wheat: d.wheat, rice: d.rice, maize: d.maize })),
          summary: data.summary,
        });
      })
      .catch(() => {});
  }, []);

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
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t('analytics.title')}
            </h1>
            <p className="text-gray-500 mt-1">
              {t('analytics.subtitle')}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={TrendingUp}
          label={t('analytics.cropPerformance')}
          value={chartData ? `${chartData.summary.avgYield} q/ha` : '—'}
          trend={chartData ? '+8%' : ''}
          trendUp
        />
        <StatCard
          icon={Droplets}
          label={t('analytics.rainfallAnalysis')}
          value={chartData ? `${chartData.summary.totalRainfall} mm` : '—'}
          trend={chartData ? '+12%' : ''}
          trendUp
        />
        <StatCard
          icon={Leaf}
          label={t('analytics.cropPerformance')}
          value={chartData ? `${chartData.summary.cropHealth}/100` : '—'}
          trend={chartData ? '+5%' : ''}
          trendUp
        />
        <StatCard
          icon={DollarSign}
          label={t('analytics.marketPrices')}
          value={chartData ? `₹${chartData.summary.marketPriceIndex.toLocaleString('en-IN')}/q` : '—'}
          trend={chartData ? '-2%' : ''}
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard icon={Activity} title={t('analytics.cropPerformance')}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.performanceData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tickFormatter={(v) => months[v]} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelFormatter={(v) => months[v]}
              />
              <Line type="monotone" dataKey="current" stroke="#4D7C0F" strokeWidth={2} dot={{ fill: '#4D7C0F' }} name="Current Year" />
              <Line type="monotone" dataKey="previous" stroke="#EAB308" strokeWidth={2} dot={{ fill: '#EAB308' }} name="Previous Year" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard icon={Droplets} title={t('analytics.rainfallAnalysis')} gradient="gradient-warm">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.rainfallData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tickFormatter={(v) => months[v]} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelFormatter={(v) => months[v]}
              />
              <Bar dataKey="rainfall" fill="#4D7C0F" radius={[4, 4, 0, 0]} name="Rainfall (mm)" />
              <Line type="monotone" dataKey="average" stroke="#EAB308" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Average" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard icon={TrendingUp} title={t('analytics.yieldForecasts')}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData?.forecastData || []}>
              <defs>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4D7C0F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4D7C0F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tickFormatter={(v) => months[v]} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelFormatter={(v) => months[v]}
              />
              <Area type="monotone" dataKey="yield" stroke="#4D7C0F" strokeWidth={2} fill="url(#yieldGradient)" name="Yield (q/ha)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard icon={Activity} title={t('analytics.diseaseStats')} gradient="gradient-warm">
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={chartData?.diseaseData || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {(chartData?.diseaseData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={diseaseColors[index % diseaseColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </RePieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {(chartData?.diseaseData || []).map((item, index) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: diseaseColors[index] }} />
                <span className="text-xs text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard icon={Leaf} title={t('analytics.soilHealth')}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.soilData || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 100]} />
              <YAxis dataKey="parameter" type="category" tick={{ fontSize: 12 }} width={110} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {(chartData?.soilData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4D7C0F' : '#84CC16'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard icon={DollarSign} title={t('analytics.marketPrices')} gradient="gradient-warm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.marketData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tickFormatter={(v) => months[v]} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelFormatter={(v) => months[v]}
              />
              <Line type="monotone" dataKey="wheat" stroke="#4D7C0F" strokeWidth={2} dot={false} name="Wheat" />
              <Line type="monotone" dataKey="rice" stroke="#EAB308" strokeWidth={2} dot={false} name="Rice" />
              <Line type="monotone" dataKey="maize" stroke="#84CC16" strokeWidth={2} dot={false} name="Maize" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}
