import React from 'react';
import { Layout } from '@/components/layout';
import TeamPageClient from './TeamPageClient';

const TeamPage: React.FC = () => {
  const seo = {
    title: 'Our Team - B.Khrease Academic Consult',
    description:
      'Meet the dedicated team behind B.Khrease Academic Consult. Our founding core team, sub-team members, and specialists are committed to providing distinction with ease in undergraduate research mentorship.',
    keywords: [
      'B.Khrease team',
      'academic consultants',
      'research mentors',
      'Christopher B. Olowosoke',
      'founding team',
      'academic experts',
      'research specialists',
      'undergraduate mentorship',
      'Nigeria academic consultancy',
    ],
  };

  return (
    <Layout seo={seo}>
      <TeamPageClient />
    </Layout>
  );
};

export default TeamPage;
