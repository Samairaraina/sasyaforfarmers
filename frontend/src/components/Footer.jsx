import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const features = [
  { path: '/crop-loss', labelKey: 'nav.cropLoss' },
  { path: '/disease-detection', labelKey: 'nav.diseaseDetection' },
  { path: '/irrigation', labelKey: 'nav.irrigation' },
  { path: '/crop-recommendation', labelKey: 'nav.cropRecommendation' },
  { path: '/market', labelKey: 'nav.market' },
  { path: '/assistant', labelKey: 'nav.assistant' },
];

const resources = [
  { label: 'Blog', href: '#' },
  { label: 'Documentation', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Research', href: '#' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Sasya" className="w-8 h-8 rounded-lg object-contain" />
              <span className="text-lg font-bold text-dark">
                Sasya <span className="text-primary font-semibold">(सस्य)</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
              AI-powered agricultural intelligence platform helping farmers make smarter decisions through data-driven insights.
            </p>

          </div>

          <div>
            <h4 className="text-sm font-semibold text-dark mb-4">{t('nav.features')}</h4>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f.path}>
                  <Link to={f.path} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {t(f.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-dark mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((r) => (
                <li key={r.label}>
                  <a href={r.href} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-dark mb-4">
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a href="mailto:samairaraina140108@gmail.com" className="hover:text-primary transition-colors">
                  samairaraina140108@gmail.com
                </a>
              </li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sasya. {t('common.allRightsReserved')}
          </p>
          <div className="text-sm text-gray-400 text-right">
            <p>{t('common.madeInIndia')}</p>
            <p className="text-xs text-gray-300 mt-0.5">{t('common.developedBy')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
