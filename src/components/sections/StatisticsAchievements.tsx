'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Statistic {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface StatisticsAchievementsProps {
  statistics: {
    studentsTrained: number;
    foundingYear: number;
    partnersCount?: number;
  };
  registrationDetails?: {
    smedan: string;
    cac: string;
  };
}

const StatisticsAchievements: React.FC<StatisticsAchievementsProps> = ({
  statistics,
  registrationDetails = {
    smedan: '2022',
    cac: '2025',
  },
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    {}
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: Statistic[] = React.useMemo(
    () => [
      {
        id: 'students',
        value: statistics.studentsTrained,
        label: 'Students Trained',
        suffix: '+',
        color: 'from-blue-500 to-blue-600',
        description: 'Undergraduate students successfully mentored',
        icon: (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        ),
      },
      {
        id: 'experience',
        value: new Date().getFullYear() - statistics.foundingYear,
        label: 'Years of Excellence',
        suffix: '+',
        color: 'from-green-500 to-green-600',
        description: `Established in ${statistics.foundingYear}`,
        icon: (
          <svg
            className="w-8 h-8"
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
      },
      {
        id: 'partners',
        value: statistics.partnersCount || 10,
        label: 'Partner Institutions',
        suffix: '+',
        color: 'from-purple-500 to-purple-600',
        description: 'Including IBMT, CATDD and more',
        icon: (
          <svg
            className="w-8 h-8"
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
      },
      {
        id: 'success',
        value: 95,
        label: 'Success Rate',
        suffix: '%',
        color: 'from-orange-500 to-orange-600',
        description: 'Students achieving their academic goals',
        icon: (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
      },
    ],
    [
      statistics.studentsTrained,
      statistics.foundingYear,
      statistics.partnersCount,
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach(stat => {
        animateCounter(stat.id, stat.value);
      });
    }
  }, [isVisible, stats]);

  const animateCounter = (id: string, targetValue: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let currentValue = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentValue = Math.min(currentValue + increment, targetValue);

      setAnimatedValues(prev => ({
        ...prev,
        [id]: Math.floor(currentValue),
      }));

      if (step >= steps || currentValue >= targetValue) {
        setAnimatedValues(prev => ({
          ...prev,
          [id]: targetValue,
        }));
        clearInterval(timer);
      }
    }, duration / steps);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Impact
            </span>{' '}
            & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers that reflect our commitment to academic excellence and
            student success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
              </div>

              {/* Value */}
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.prefix}
                  <span
                    className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {animatedValues[stat.id] || 0}
                  </span>
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {stat.label}
                </h3>
              </div>

              {/* Description */}
              {stat.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              )}

              {/* Decorative Element */}
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Details */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Official <span className="text-primary-600">Registrations</span>
            </h3>
            <p className="text-gray-600">
              Officially recognized and registered with relevant authorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SMEDAN Registration */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-primary-800 mb-2">
                  SMEDAN Registered
                </h4>
                <p className="text-primary-700 font-semibold">
                  {registrationDetails.smedan}
                </p>
                <p className="text-sm text-primary-600 mt-1">
                  Small & Medium Enterprises Development Agency
                </p>
              </div>
            </div>

            {/* CAC Registration */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl border border-secondary-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                  <svg
                    className="w-8 h-8"
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
                </div>
                <h4 className="text-lg font-bold text-secondary-800 mb-2">
                  CAC Registered
                </h4>
                <p className="text-secondary-700 font-semibold">
                  {registrationDetails.cac}
                </p>
                <p className="text-sm text-secondary-600 mt-1">
                  Corporate Affairs Commission
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to become part of our success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300">
              Start Your Journey
            </button>
            <button className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary-300">
              View Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsAchievements;
