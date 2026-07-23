import { getDictionary } from '../../../i18n';
import ComparisonPage from '@/components/comparison/ComparisonPage';
import { buildComparisonMetadata, COMPARISON_PAGES } from '@/lib/comparison-pages';

const slug = 'scaliente-vs-triple-whale';

export const generateStaticParams = () => ['fr', 'en', 'de'].map((lang) => ({ lang }));

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return buildComparisonMetadata({ lang, slug, page: dict[COMPARISON_PAGES[slug].dictionaryKey], fallbackDescription: dict.metadata.description });
}

export default async function Page({ params }) {
    const { lang } = await params;
    return <ComparisonPage dict={await getDictionary(lang)} lang={lang} slug={slug} />;
}
