import { Layout } from '@/components/layout';
import { NewsListing } from '@/components/sections';

export default function NewsPage() {
  const seo = {
    title: 'News & Updates - B.Khrease Academic Consult',
    description:
      'Stay updated with the latest news, events, publications, and achievements from B.Khrease Academic Consult.',
    keywords: [
      'academic news',
      'research updates',
      'events',
      'publications',
      'achievements',
      'B.Khrease',
    ],
  };

  return (
    <Layout seo={seo}>
      <NewsListing />
    </Layout>
  );
}
