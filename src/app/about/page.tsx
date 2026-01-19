import React from 'react';
import { Layout } from '@/components/layout';

const AboutPage: React.FC = () => {
  const seo = {
    title: 'About Us - B.Khrease Academic Consult',
    description:
      'Learn about B.Khrease Academic Consult - Founded in 2018, we have trained over 1000+ undergraduate students in research excellence across Nigeria and beyond. Discover our journey, achievements, and commitment to academic distinction.',
    keywords: [
      'B.Khrease history',
      'academic consulting Nigeria',
      'Christopher B. Olowosoke',
      'undergraduate research mentorship',
      'SMEDAN registered',
      'CAC registered',
      'research training',
      'academic achievements',
      'IBMT collaboration',
      'CATDD partnership',
    ],
  };

  return (
    <Layout seo={seo}>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  B.Khrease
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering undergraduate students through research excellence
                and academic mentorship since 2018. Our journey is defined by
                distinction with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in{' '}
                    <span className="font-semibold text-primary-600">2018</span>
                    , B.Khrease Academic Consult emerged from a vision to bridge
                    the gap between academic theory and practical research
                    excellence for undergraduate students across Nigeria and
                    beyond.
                  </p>
                  <p>
                    Under the leadership of{' '}
                    <span className="font-semibold text-gray-900">
                      Christopher B. Olowosoke
                    </span>
                    , our organization has grown from a small mentorship
                    initiative to a comprehensive academic consultancy that has
                    transformed the lives of over 1000+ students.
                  </p>
                  <p>
                    We officially registered with{' '}
                    <span className="font-semibold">SMEDAN in 2022</span> and
                    obtained our{' '}
                    <span className="font-semibold">
                      CAC registration in 2025
                    </span>
                    , solidifying our commitment to providing professional,
                    structured, and impactful academic support services.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        2018
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Founded</h3>
                        <p className="text-gray-600">Journey begins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        2022
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          SMEDAN Registration
                        </h3>
                        <p className="text-gray-600">Official recognition</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        2025
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          CAC Registration
                        </h3>
                        <p className="text-gray-600">Corporate status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading academic consultancy that transforms
                  undergraduate students into confident researchers and thought
                  leaders across Africa and beyond.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We empower undergraduate students through comprehensive
                  research mentorship, laboratory assistance, and skills
                  development programs that bridge the gap between academic
                  theory and practical research excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary-600">Achievements</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A track record of excellence and impact in undergraduate
                research mentorship across Nigeria and beyond.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-8 text-white text-center shadow-xl">
                <div className="text-5xl font-bold mb-2">1000+</div>
                <div className="text-xl opacity-90">Students Trained</div>
                <p className="mt-4 text-sm opacity-80">
                  Successfully mentored undergraduate students since 2018
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl p-8 text-white text-center shadow-xl">
                <div className="text-5xl font-bold mb-2">15+</div>
                <div className="text-xl opacity-90">Partner Institutions</div>
                <p className="mt-4 text-sm opacity-80">
                  Collaborations with leading research institutes
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-8 text-white text-center shadow-xl">
                <div className="text-5xl font-bold mb-2">7+</div>
                <div className="text-xl opacity-90">Years of Excellence</div>
                <p className="mt-4 text-sm opacity-80">
                  Consistent quality service since our founding
                </p>
              </div>
            </div>

            {/* Key Achievements List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  ),
                  title: 'Published Books & Software',
                  description:
                    'Authored educational materials and developed research software tools used by students nationwide.',
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  ),
                  title: 'Student Awards & Recognition',
                  description:
                    'Our trained students have won numerous academic awards and research competitions.',
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  ),
                  title: 'IBMT Collaboration',
                  description:
                    'Strategic partnership with the Institute of Biomedical Technology for advanced research training.',
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  ),
                  title: 'CATDD Partnership',
                  description:
                    'Collaboration with the Centre for Advanced Technology Development and Deployment.',
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOLD Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary-600">BOLD</span> Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at B.Khrease Academic
                Consult.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  letter: 'B',
                  title: 'Believe',
                  description:
                    'We believe in the potential of every student to achieve academic excellence and make meaningful contributions to their field of study.',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  letter: 'O',
                  title: 'Overcome',
                  description:
                    'We help students overcome academic challenges through personalized mentorship, practical guidance, and unwavering support throughout their research journey.',
                  color: 'from-green-500 to-green-600',
                },
                {
                  letter: 'L',
                  title: 'Lead',
                  description:
                    'We develop leadership qualities in students, empowering them to lead research initiatives and inspire others in their academic communities.',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  letter: 'D',
                  title: 'Deliver',
                  description:
                    'We deliver exceptional results through proven methodologies, expert guidance, and a commitment to excellence that has helped over 1000+ students succeed.',
                  color: 'from-orange-500 to-orange-600',
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 mx-auto`}
                  >
                    {value.letter}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration & Credentials Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Official Registration & Credentials
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We are a fully registered and recognized academic consultancy
                  committed to professional excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    SMEDAN
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    SMEDAN Registered
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Small and Medium Enterprises Development Agency of Nigeria
                  </p>
                  <div className="text-3xl font-bold text-primary-600">
                    2022
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    CAC
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    CAC Registered
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Corporate Affairs Commission
                  </p>
                  <div className="text-3xl font-bold text-secondary-600">
                    2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container-custom">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Success Story
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Be part of the next generation of research leaders. Let us help
                you achieve distinction with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/services"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Our Services
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
