import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Leaf, Search, DollarSign, Droplets, MessageCircle,
  BarChart3, Shield, ArrowRight, ArrowUpRight, ChevronRight,
  Sun, CloudRain, Wind, TrendingUp, Activity,
  Thermometer, Droplet, MapPin, AlertCircle, Bell, Clock,
  Wheat, Bug, LineChart, Zap
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const featureList = [
  {
    key: 'cropLoss', icon: BarChart3, path: '/crop-loss',
    color: '#365314', bgColor: '#3653140d',
    viz: 'chart'
  },
  {
    key: 'disease', icon: Bug, path: '/disease-detection',
    color: '#4D7C0F', bgColor: '#4D7C0F0d',
    viz: 'leaf'
  },
  {
    key: 'irrigation', icon: Droplets, path: '/irrigation',
    color: '#0EA5E9', bgColor: '#0EA5E90d',
    viz: 'water'
  },
  {
    key: 'cropRecommendation', icon: Wheat, path: '/crop-recommendation',
    color: '#84CC16', bgColor: '#84CC160d',
    viz: 'crops'
  },
  {
    key: 'market', icon: DollarSign, path: '/market',
    color: '#4D7C0F', bgColor: '#4D7C0F0d',
    viz: 'trend'
  },
  {
    key: 'assistant', icon: MessageCircle, path: '/assistant',
    color: '#365314', bgColor: '#3653140d',
    viz: 'chat'
  },
];

const stats = [
  { value: 50000, suffix: '+', labelKey: 'landing.stats.farmers' },
  { value: 92, suffix: '%', labelKey: 'landing.stats.accuracy' },
  { value: 15, suffix: '+', labelKey: 'landing.stats.crops' },
  { value: 24, suffix: '/7', labelKey: 'landing.stats.support' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const dur = 2000;
    const step = target / (dur / 16);
    const timer = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function MiniChart() {
  const bars = [30, 55, 40, 65, 45, 75, 60, 80, 70, 85];
  return (
    <div className="flex items-end gap-0.75 h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className={`flex-1 rounded-t-sm ${i >= bars.length - 2 ? 'bg-accent' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

function MiniLeaf() {
  const spots = [{ x: '35%', y: '30%' }, { x: '60%', y: '45%' }, { x: '45%', y: '65%' }];
  return (
    <div className="relative h-12 flex items-center justify-center">
      <Leaf className="w-10 h-10 text-primary/30" />
      {spots.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
          className="absolute w-2 h-2 rounded-full bg-red-400"
          style={{ left: s.x, top: s.y }}
        />
      ))}
    </div>
  );
}

function MiniWater() {
  return (
    <div className="h-12 flex items-end">
      <div className="w-full bg-blue-50 rounded-lg overflow-hidden h-10 relative border border-blue-100">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '65%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 w-full bg-linear-to-t from-blue-400 to-blue-300/70 rounded-t-sm"
        >
          <div className="absolute top-1 left-2 text-[8px] text-white/80 font-medium">65%</div>
        </motion.div>
      </div>
    </div>
  );
}

function MiniCrops() {
  const crops = [
    { label: 'W', color: '#EAB308' },
    { label: 'R', color: '#84CC16' },
    { label: 'M', color: '#4D7C0F' },
    { label: 'C', color: '#365314' },
  ];
  return (
    <div className="flex items-center gap-1.5 h-12 justify-center">
      {crops.map((c, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: c.color }}
        >
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}

function MiniTrend() {
  const points = [20, 35, 28, 45, 38, 55, 48, 62, 58, 70];
  const max = 70;
  const w = 160;
  const h = 48;
  const step = w / (points.length - 1);
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84CC16" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${pathD} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#trendGrad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#4D7C0F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {[points[0], points[points.length - 1]].map((p, i) => {
        const x = i === 0 ? 0 : (points.length - 1) * step;
        const y = h - (p / max) * h;
        return <motion.circle key={i} cx={x} cy={y} r="3" fill="#4D7C0F" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} />;
      })}
    </svg>
  );
}

function MiniChat() {
  return (
    <div className="h-12 flex flex-col justify-end gap-1.5">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '75%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="h-5 bg-gray-100 rounded-full px-2 flex items-center text-[8px] text-gray-500 overflow-hidden whitespace-nowrap"
      >
        How to treat leaf blight?
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '90%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="h-5 bg-primary/10 rounded-full px-2 flex items-center text-[8px] text-primary self-end overflow-hidden whitespace-nowrap"
      >
        Apply Neem oil &amp; remove infected leaves
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex items-center gap-1 text-[8px] text-gray-400 ml-1"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        AI is typing...
      </motion.div>
    </div>
  );
}

const miniViz = {
  chart: MiniChart,
  leaf: MiniLeaf,
  water: MiniWater,
  crops: MiniCrops,
  trend: MiniTrend,
  chat: MiniChat,
};

function DashboardPreview() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
      <div className="absolute -inset-8 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-4xl blur-3xl" />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">

        <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-gray-100/60 bg-gray-50/30">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-auto flex items-center gap-3 text-xs text-gray-400">
            <span className="hidden sm:inline">sasya.ai/dashboard</span>
            <MapPin className="w-3 h-3" />
            <span>Punjab, India</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Crop Health', value: '89', unit: '%', detail: '+5% vs last week', icon: Activity, color: '#4D7C0F', bg: '#4D7C0F0d', valColor: 'text-primary' },
              { label: 'Disease Risk', value: 'Low', unit: '', detail: 'No threats detected', icon: Shield, color: '#84CC16', bg: '#84CC160d', valColor: 'text-green-600' },
              { label: 'Soil Moisture', value: '62', unit: '%', detail: 'Adequate level', icon: Droplet, color: '#0EA5E9', bg: '#0EA5E90d', valColor: 'text-cyan-600' },
              { label: 'Weather', value: '28°C', unit: '', detail: 'Sunny, Hum 62%', icon: Sun, color: '#EAB308', bg: '#EAB3080d', valColor: 'text-yellow-600' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="rounded-xl p-3.5 border border-gray-100/80"
                  style={{ backgroundColor: `${item.bg}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                    <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  </div>
                  <p className={`text-xl font-bold ${item.valColor}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{item.value}{item.unit}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.detail}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-3 mb-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Yield Prediction</span>
                <LineChart className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex items-end gap-1.5 h-28">
                {[20, 42, 30, 55, 40, 68, 50, 78, 60, 85, 70, 90, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-t-sm relative group"
                    style={{ background: i >= 9 ? 'linear-gradient(to top, #FACC15, #EAB308)' : 'linear-gradient(to top, #4D7C0F, #84CC16)' }}
                  >
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">{h} q/ha</div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan','Mar','May','Jul','Sep','Nov'].map((m, i) => (
                  <span key={i} className="text-[10px] text-gray-400">{m}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rainfall</span>
                <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="flex items-end gap-1 h-20">
                {[60, 45, 80, 35, 70, 50, 90].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                    className="flex-1 rounded-t-sm bg-linear-to-t from-blue-300 to-blue-200"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => (
                  <span key={i} className="text-[9px] text-gray-400">{d}</span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-2">142mm this week</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { label: 'Temperature Trend', value: '28°C avg', detail: 'Optimal for wheat', bars: [35, 55, 45, 60, 50, 65, 55, 70, 60, 75], color: ['from-orange-300', 'to-orange-200'] },
                { label: 'Wind Speed', value: '12 km/h', detail: 'Light breeze', bars: [40, 60, 30, 70, 50, 45, 65, 35, 55, 40], color: ['from-gray-400', 'to-gray-300'] },
              ].map((section, si) => (
                <motion.div
                  key={si}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + si * 0.08 }}
                  className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{section.label}</span>
                  </div>
                  <p className="text-sm font-bold text-dark">{section.value}</p>
                  <p className="text-[10px] text-gray-400 mb-1.5">{section.detail}</p>
                  <div className="flex items-end gap-0.5 h-8">
                    {section.bars.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${h}%` } : {}}
                        transition={{ duration: 0.3, delay: 0.7 + i * 0.03 }}
                        className={`flex-1 rounded-t-sm bg-linear-to-t ${section.color[0]} ${section.color[1]}`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Insights</span>
                <Zap className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark">Irrigation Alert</p>
                    <p className="text-[11px] text-gray-400">Best time to irrigate: Tomorrow 6 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-3 h-3 text-accent-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark">Disease Watch</p>
                    <p className="text-[11px] text-gray-400">Monitor for powdery mildew in next 5 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3 h-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark">Market Update</p>
                    <p className="text-[11px] text-gray-400">Wheat prices up 3.2% this week</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feat, index }) {
  const VizComponent = miniViz[feat.viz];
  const Icon = feat.icon;
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={feat.path}
        className="group block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 30px ${feat.color}18, 0 2px 8px ${feat.color}10`;
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = feat.color + '30';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)';
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.borderColor = '#f1f5f1';
        }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: feat.bgColor }}
            >
              <Icon className="w-5 h-5" style={{ color: feat.color }} />
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white" />
            </div>
          </div>

          <h3 className="text-sm font-bold text-dark mb-1.5 group-hover:text-primary transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t(`features.${feat.key}`)}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            {t(`features.${feat.key}Desc`)}
          </p>

          <div className="pb-1">
            {VizComponent && <VizComponent />}
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-4 sm:pb-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 group-hover:text-primary transition-colors">
            Learn More
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Landing() {
  const { t } = useTranslation();
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-linear-to-br from-cream via-bg to-white" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-linear-to-br from-primary/3 to-secondary/3 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-[1.1] mb-5 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-sm"
                >
                  {t('hero.cta1')}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:text-primary transition-all bg-white/50"
                >
                  {t('hero.cta2')}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {['#365314', '#4D7C0F', '#84CC16', '#FACC15'].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  <span className="font-semibold text-gray-500">4,000+</span> farmers joined this month
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-16 relative">
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark via-primary to-secondary opacity-95" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="stat-card"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/70 font-medium">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-primary/4 blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-secondary/4 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-accent/3 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              FEATURES
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-[1.75rem] sm:text-4xl font-bold text-dark mb-4 tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t('features.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              {t('features.subtitle')}
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureList.map((feat, i) => (
              <FeatureCard key={feat.key} feat={feat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-secondary/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              DASHBOARD
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-[1.75rem] sm:text-4xl font-bold text-dark mb-4 tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Intelligence at Your Fingertips
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              A unified dashboard showing all your farm analytics, weather data, disease alerts, and market intelligence.
            </motion.p>
          </motion.div>

          <DashboardPreview />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-8"
          >
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-sm"
            >
              Explore Full Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary to-secondary" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t('landing.cta.title')}
            </h2>
            <p className="text-base text-white/80 mb-8 max-w-lg mx-auto">
              {t('landing.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary-dark text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-all shadow-sm"
              >
                {t('landing.cta.button1')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                {t('landing.cta.button2')}
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
