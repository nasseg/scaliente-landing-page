import { DEFAULT_LANGUAGE, LANGUAGES, SITE_URL } from '@/lib/site';
import { GUIDE_SLUGS } from '@/lib/guide-pages';

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/affiliate', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tools/roas-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare/scaliente-vs-trueprofit', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/compare/scaliente-vs-triple-whale', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/compare/scaliente-vs-lifetimely', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/profit-dashboard', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/ad-tracking', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/product-analytics', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/multi-shop', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/multi-currency', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/reports', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/pixel-attribution', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/features/ai-customer-service', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  ...GUIDE_SLUGS.map((slug) => ({ path: `/guides/${slug}`, priority: 0.8, changeFrequency: 'monthly' })),
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-sale', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal-mentions', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap() {
  const entries = [];

  for (const page of pages) {
    for (const lang of LANGUAGES) {
      const url = `${SITE_URL}/${lang}${page.path}`;

      const languages = {};
      for (const altLang of LANGUAGES) {
        languages[altLang] = `${SITE_URL}/${altLang}${page.path}`;
      }
      languages['x-default'] = `${SITE_URL}/${DEFAULT_LANGUAGE}${page.path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
