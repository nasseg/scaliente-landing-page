const BASE_URL = 'https://scaliente.com';
const LANGUAGES = ['fr', 'en', 'de'];

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/affiliate', priority: 0.8, changeFrequency: 'monthly' },
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
      const url = `${BASE_URL}/${lang}${page.path}`;

      const languages = {};
      for (const altLang of LANGUAGES) {
        languages[altLang] = `${BASE_URL}/${altLang}${page.path}`;
      }
      languages['x-default'] = `${BASE_URL}/fr${page.path}`;

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
