import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

const performanceData = [
  { month: 0, current: 38, previous: 32 },
  { month: 1, current: 42, previous: 36 },
  { month: 2, current: 45, previous: 39 },
  { month: 3, current: 48, previous: 42 },
  { month: 4, current: 52, previous: 44 },
  { month: 5, current: 50, previous: 43 },
  { month: 6, current: 46, previous: 40 },
  { month: 7, current: 44, previous: 38 },
  { month: 8, current: 47, previous: 41 },
  { month: 9, current: 49, previous: 42 },
  { month: 10, current: 51, previous: 44 },
  { month: 11, current: 53, previous: 46 }
];

const rainfallData = [
  { month: 0, rainfall: 15, average: 18 },
  { month: 1, rainfall: 12, average: 15 },
  { month: 2, rainfall: 20, average: 22 },
  { month: 3, rainfall: 35, average: 30 },
  { month: 4, rainfall: 60, average: 55 },
  { month: 5, rainfall: 95, average: 85 },
  { month: 6, rainfall: 180, average: 160 },
  { month: 7, rainfall: 210, average: 190 },
  { month: 8, rainfall: 140, average: 130 },
  { month: 9, rainfall: 55, average: 50 },
  { month: 10, rainfall: 25, average: 28 },
  { month: 11, rainfall: 18, average: 20 }
];

const forecastData = [
  { month: 0, yield: 42 },
  { month: 1, yield: 44 },
  { month: 2, yield: 47 },
  { month: 3, yield: 50 },
  { month: 4, yield: 48 },
  { month: 5, yield: 46 }
];

const diseaseData = [
  { name: 'Leaf Blight', value: 35 },
  { name: 'Powdery Mildew', value: 25 },
  { name: 'Rust', value: 20 },
  { name: 'Bacterial Wilt', value: 12 },
  { name: 'Other', value: 8 }
];

const diseaseColors = ['#4D7C0F', '#84CC16', '#EAB308', '#FEF9C3', '#1F2937'];

const soilData = [
  { parameter: 'pH Level', value: 6.8 },
  { parameter: 'Nitrogen', value: 75 },
  { parameter: 'Phosphorus', value: 62 },
  { parameter: 'Potassium', value: 80 },
  { parameter: 'Organic Carbon', value: 55 },
  { parameter: 'Moisture', value: 45 }
];

const marketData = [
  { month: 0, wheat: 2150, rice: 1850, maize: 1600 },
  { month: 1, wheat: 2200, rice: 1880, maize: 1620 },
  { month: 2, wheat: 2180, rice: 1920, maize: 1650 },
  { month: 3, wheat: 2250, rice: 1950, maize: 1680 },
  { month: 4, wheat: 2300, rice: 1980, maize: 1700 },
  { month: 5, wheat: 2280, rice: 2000, maize: 1720 },
  { month: 6, wheat: 2350, rice: 2050, maize: 1750 },
  { month: 7, wheat: 2400, rice: 2080, maize: 1780 },
  { month: 8, wheat: 2380, rice: 2100, maize: 1800 },
  { month: 9, wheat: 2420, rice: 2120, maize: 1820 },
  { month: 10, wheat: 2450, rice: 2150, maize: 1850 },
  { month: 11, wheat: 2480, rice: 2180, maize: 1880 }
];

function StatCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl card-shadow card-hover p-5 flex items-center gap-4"
    >
      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
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

export default function Analytics() {
  const { t } = useTranslation();
  const months = t('analytics.months', { returnObjects: true });

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
          value="42.5 q/ha"
          trend="+8%"
          trendUp
        />
        <StatCard
          icon={Droplets}
          label={t('analytics.rainfallAnalysis')}
          value="780 mm"
          trend="+12%"
          trendUp
        />
        <StatCard
          icon={Leaf}
          label={t('analytics.cropPerformance')}
          value="78/100"
          trend="+5%"
          trendUp
        />
        <StatCard
          icon={DollarSign}
          label={t('analytics.marketPrices')}
          value="₹2,450/q"
          trend="-2%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard icon={Activity} title={t('analytics.cropPerformance')}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
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
            <BarChart data={rainfallData}>
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
            <AreaChart data={forecastData}>
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
                data={diseaseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {diseaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={diseaseColors[index % diseaseColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </RePieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {diseaseData.map((item, index) => (
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
            <BarChart data={soilData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 100]} />
              <YAxis dataKey="parameter" type="category" tick={{ fontSize: 12 }} width={110} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {soilData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4D7C0F' : '#84CC16'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard icon={DollarSign} title={t('analytics.marketPrices')} gradient="gradient-warm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData}>
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
