import { Layout } from '@/components/layout';
import {
  Hero,
  BoldValues,
  ServicesOverview,
  StatisticsAchievements,
} from '@/components/sections';

export default function Home() {
  const seo = {
    title: 'B.Khrease Academic Consult - Distinction with Ease',
    description:
      'Empowering undergraduate students through research excellence and academic mentorship in Nigeria and beyond.',
    keywords: [
      'academic consulting',
      'research mentorship',
      'undergraduate research',
      'Nigeria',
    ],
  };

  // Homepage content data
  const heroData = {
    tagline: 'distinction with ease',
    vision:
      'To be the leading academic consultancy that transforms undergraduate students into confident researchers and thought leaders across Africa and beyond.',
    mission:
      'We empower undergraduate students through comprehensive research mentorship, laboratory assistance, and skills development programs that bridge the gap between academic theory and practical research excellence.',
    ctaButtons: {
      primary: {
        text: 'Explore Services',
        href: '/services',
      },
      secondary: {
        text: 'Meet Our Team',
        href: '/team',
      },
    },
    logo: '/bk.jpg',
  };

  const boldValues = {
    believe:
      'We believe in the potential of every student to achieve academic excellence and make meaningful contributions to their field of study.',
    overcome:
      'We help students overcome academic challenges through personalized mentorship, practical guidance, and unwavering support throughout their research journey.',
    lead: 'We develop leadership qualities in students, empowering them to lead research initiatives and inspire others in their academic communities.',
    deliver:
      'We deliver exceptional results through proven methodologies, expert guidance, and a commitment to excellence that has helped over 1000+ students succeed.',
  };

  const statistics = {
    studentsTrained: 1000,
    foundingYear: 2018,
    partnersCount: 15,
  };

  const registrationDetails = {
    smedan: '2022',
    cac: '2025',
  };

  return (
    <Layout seo={seo}>
      <Hero {...heroData} />
      <BoldValues values={boldValues} />
      <ServicesOverview maxServices={3} />
      <StatisticsAchievements
        statistics={statistics}
        registrationDetails={registrationDetails}
      />
    </Layout>
  );
}
