'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    console.log('🚀 Strapi started successfully!');
  },
};

async function seedInitialData(strapi) {
  try {
    // Create categories first
    const categories = await Promise.all([
      strapi.entityService.create('api::category.category', {
        data: {
          name: 'Research Methods',
          slug: 'research-methods',
          description:
            'Articles about research methodologies and best practices',
          color: '#3b82f6',
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::category.category', {
        data: {
          name: 'Career Advice',
          slug: 'career-advice',
          description: 'Career guidance and professional development tips',
          color: '#10b981',
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::category.category', {
        data: {
          name: 'Success Stories',
          slug: 'success-stories',
          description: 'Student achievements and success stories',
          color: '#f59e0b',
          publishedAt: new Date(),
        },
      }),
    ]);

    // Create founder team member
    const founder = await strapi.entityService.create(
      'api::team-member.team-member',
      {
        data: {
          name: 'Christopher B. Olowosoke',
          role: 'Founder & Lead Academic Consultant',
          bio: 'Christopher is the visionary founder of B.Khrease Academic Consult with extensive experience in undergraduate research mentorship and academic excellence.',
          category: 'founding-core',
          order: 1,
          isFounder: true,
          qualifications:
            'PhD in Academic Research, MSc in Educational Leadership',
          specializations:
            'Research Methodology, Academic Writing, Student Mentorship',
          socialLinks: {
            email: 'christopher@bkhrease.ng',
            linkedin: 'https://linkedin.com/in/christopher-olowosoke',
          },
          publishedAt: new Date(),
        },
      }
    );

    // Create sample team members
    await Promise.all([
      strapi.entityService.create('api::team-member.team-member', {
        data: {
          name: 'Dr. Sarah Johnson',
          role: 'Senior Research Mentor',
          bio: 'Dr. Johnson specializes in laboratory procedures and wet lab research methodologies.',
          category: 'sub-team',
          order: 1,
          qualifications: 'PhD in Biochemistry',
          specializations: 'Wet Lab Procedures, Biochemical Analysis',
          socialLinks: {
            email: 'sarah@bkhrease.ng',
          },
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::team-member.team-member', {
        data: {
          name: 'Michael Chen',
          role: 'Data Analysis Specialist',
          bio: 'Michael helps students with statistical analysis and data interpretation for their research projects.',
          category: 'sub-team',
          order: 2,
          qualifications: 'MSc in Statistics',
          specializations:
            'Statistical Analysis, Data Visualization, Research Software',
          socialLinks: {
            email: 'michael@bkhrease.ng',
          },
          publishedAt: new Date(),
        },
      }),
    ]);

    // Create services
    await Promise.all([
      strapi.entityService.create('api::service.service', {
        data: {
          title: 'Research Mentorship Programs',
          description:
            'Comprehensive mentorship for undergraduate research projects',
          detailedDescription:
            '<p>Our research mentorship programs provide students with one-on-one guidance throughout their research journey. From topic selection to final presentation, our experienced mentors ensure students develop strong research skills and produce high-quality work.</p>',
          icon: 'research',
          features: [
            'One-on-one mentorship',
            'Research methodology training',
            'Literature review guidance',
            'Data analysis support',
          ],
          contactInfo: {
            email: 'Info.bkhrease.ng@gmail.com',
            phone: '+2348122359970',
            whatsapp: '+2348122359970',
          },
          order: 1,
          isActive: true,
          price: 'Contact for pricing',
          duration: '3-6 months',
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::service.service', {
        data: {
          title: 'Laboratory Assistance',
          description: 'Expert guidance for wet and dry lab procedures',
          detailedDescription:
            '<p>Get professional assistance with laboratory procedures, equipment usage, and experimental design. Our lab specialists help students navigate complex laboratory environments safely and effectively.</p>',
          icon: 'laboratory',
          features: [
            'Wet lab procedures',
            'Dry lab techniques',
            'Equipment training',
            'Safety protocols',
          ],
          contactInfo: {
            email: 'Info.bkhrease.ng@gmail.com',
            phone: '+2348122359970',
            whatsapp: '+2348122359970',
          },
          order: 2,
          isActive: true,
          price: 'Contact for pricing',
          duration: 'Flexible',
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::service.service', {
        data: {
          title: 'Thesis Consultancy',
          description:
            'Professional support for thesis writing and development',
          detailedDescription:
            '<p>Comprehensive thesis consultancy services including structure planning, writing guidance, and review processes. We help students create compelling and academically rigorous thesis documents.</p>',
          icon: 'thesis',
          features: [
            'Thesis planning',
            'Writing guidance',
            'Review and feedback',
            'Defense preparation',
          ],
          contactInfo: {
            email: 'Info.bkhrease.ng@gmail.com',
            phone: '+2348122359970',
            whatsapp: '+2348122359970',
          },
          order: 3,
          isActive: true,
          price: 'Contact for pricing',
          duration: '2-4 months',
          publishedAt: new Date(),
        },
      }),
    ]);

    // Create homepage content
    await strapi.entityService.create('api::homepage.homepage', {
      data: {
        tagline: 'distinction with ease',
        vision:
          'To be the leading academic consultancy empowering undergraduate students across Nigeria and beyond to achieve research excellence and academic distinction.',
        mission:
          'We provide comprehensive research mentorship, laboratory assistance, and academic support services that enable students to excel in their undergraduate studies and develop strong research capabilities.',
        boldValues: {
          believe:
            'We believe in the potential of every student to achieve academic excellence and make meaningful contributions to their field of study.',
          overcome:
            'We help students overcome academic challenges through personalized mentorship, expert guidance, and proven methodologies.',
          lead: 'We lead by example in providing quality research mentorship and setting new standards for academic support services.',
          deliver:
            "We deliver results that exceed expectations, creating lasting impact on students' academic and professional journeys.",
        },
        statistics: {
          studentsTrained: 1000,
          foundingYear: 2018,
          partnersCount: 15,
          projectsCompleted: 750,
          awardsWon: 50,
          registrationDetails: [
            {
              organization: 'SMEDAN',
              year: 2022,
              registrationNumber: 'SMEDAN/2022/BK001',
              description:
                'Small and Medium Enterprises Development Agency of Nigeria registration',
            },
            {
              organization: 'CAC',
              year: 2025,
              registrationNumber: 'CAC/2025/BK002',
              description: 'Corporate Affairs Commission business registration',
            },
          ],
        },
        seo: {
          metaTitle:
            'B.Khrease Academic Consult - Undergraduate Research Mentorship',
          metaDescription:
            'Leading academic consultancy providing research mentorship, laboratory assistance, and thesis consultancy for undergraduate students in Nigeria and beyond.',
          keywords: [
            'academic consultancy',
            'research mentorship',
            'undergraduate research',
            'Nigeria',
            'thesis writing',
            'laboratory assistance',
          ],
        },
        publishedAt: new Date(),
      },
    });

    // Create sample blog posts
    await Promise.all([
      strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: 'Getting Started with Undergraduate Research',
          slug: 'getting-started-undergraduate-research',
          excerpt:
            'A comprehensive guide for students beginning their research journey, covering essential steps and best practices.',
          content:
            '<h2>Introduction to Undergraduate Research</h2><p>Starting your research journey as an undergraduate can be both exciting and overwhelming. This guide will help you navigate the initial steps and set you up for success.</p><h3>Choosing Your Research Topic</h3><p>The first step in any research project is selecting a topic that interests you and aligns with your academic goals...</p>',
          author: founder.id,
          categories: [categories[0].id],
          tags: ['research', 'undergraduate', 'getting started', 'methodology'],
          readingTime: 8,
          seo: {
            metaTitle:
              'Getting Started with Undergraduate Research - B.Khrease Academic',
            metaDescription:
              'Learn the essential steps to begin your undergraduate research journey with expert guidance from B.Khrease Academic Consult.',
            keywords: [
              'undergraduate research',
              'research methodology',
              'academic writing',
              'student guide',
            ],
          },
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: 'Building a Successful Academic Career',
          slug: 'building-successful-academic-career',
          excerpt:
            'Essential tips and strategies for students looking to build a strong foundation for their academic and professional careers.',
          content:
            '<h2>Planning Your Academic Journey</h2><p>Building a successful academic career requires strategic planning, dedication, and the right support system. Here are key strategies to help you succeed...</p>',
          author: founder.id,
          categories: [categories[1].id],
          tags: [
            'career',
            'academic success',
            'professional development',
            'planning',
          ],
          readingTime: 6,
          seo: {
            metaTitle: 'Building a Successful Academic Career - Expert Advice',
            metaDescription:
              'Discover proven strategies for building a successful academic career with guidance from experienced mentors at B.Khrease Academic.',
            keywords: [
              'academic career',
              'professional development',
              'student success',
              'career planning',
            ],
          },
          publishedAt: new Date(),
        },
      }),
    ]);

    // Create sample news items
    await Promise.all([
      strapi.entityService.create('api::news-item.news-item', {
        data: {
          title: 'B.Khrease Students Win National Research Competition',
          slug: 'students-win-national-research-competition',
          content:
            '<p>We are proud to announce that three of our mentored students have won top prizes in the National Undergraduate Research Competition 2025. This achievement demonstrates the effectiveness of our mentorship programs.</p>',
          type: 'achievement',
          excerpt:
            'Three B.Khrease mentored students win top prizes in national competition',
          priority: 'high',
          seo: {
            metaTitle: 'B.Khrease Students Win National Research Competition',
            metaDescription:
              'B.Khrease Academic Consult mentored students achieve top prizes in National Undergraduate Research Competition 2025.',
            keywords: [
              'student achievement',
              'research competition',
              'academic success',
              'mentorship',
            ],
          },
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create('api::news-item.news-item', {
        data: {
          title: 'Upcoming Webinar: Advanced Research Methodologies',
          slug: 'upcoming-webinar-advanced-research-methodologies',
          content:
            '<p>Join us for an exclusive webinar on advanced research methodologies. Learn from our expert mentors about cutting-edge research techniques and best practices.</p>',
          type: 'event',
          eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          registrationLink: 'https://bkhrease.com/register-webinar',
          isUpcoming: true,
          excerpt: 'Learn advanced research methodologies from expert mentors',
          priority: 'medium',
          seo: {
            metaTitle:
              'Advanced Research Methodologies Webinar - B.Khrease Academic',
            metaDescription:
              'Join our upcoming webinar on advanced research methodologies. Register now for expert insights and practical guidance.',
            keywords: [
              'webinar',
              'research methodology',
              'academic training',
              'online event',
            ],
          },
          publishedAt: new Date(),
        },
      }),
    ]);

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}
