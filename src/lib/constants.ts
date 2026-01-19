export const SITE_CONFIG = {
  name: 'B.Khrease Academic Consult',
  tagline: 'Distinction with Ease',
  description: 'Undergraduate research mentorship in Nigeria and beyond',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bkhrease.com',
  contact: {
    email: 'Info.bkhrease.ng@gmail.com',
    phone: '+2348122359970',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/b-khrease-academic-consult',
    youtube: 'https://www.youtube.com/@B.khreaseAcademicConsult',
    tiktok: 'https://www.tiktok.com/@bkhreaseacademicconsult',
    facebook: 'https://www.facebook.com/bkhreaseacademic',
  },
  statistics: {
    studentsTrained: 1000,
    foundingYear: 2018,
    smedanRegistration: 2022,
    cacRegistration: 2025,
  },
} as const;

export const BOLD_VALUES = {
  believe:
    'We believe in the potential of every student to achieve academic excellence',
  overcome: 'We help students overcome challenges in their research journey',
  lead: 'We lead by example in providing quality academic mentorship',
  deliver: "We deliver results that make a lasting impact on students' careers",
} as const;
