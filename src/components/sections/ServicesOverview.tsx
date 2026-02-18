'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service, StrapiResponse } from '@/types/strapi';
import { strapiService } from '@/lib/strapi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

interface ServicesOverviewProps {
  services?: Service[];
  showAll?: boolean;
  maxServices?: number;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  services: propServices,
  showAll = false,
  maxServices = 3,
}) => {
  const [services, setServices] = useState<Service[]>(propServices || []);
  const [loading, setLoading] = useState(!propServices);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  // Map service titles to contact form serviceType values
  const getServiceTypeValue = (title: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes('mentorship')) return 'research-mentorship';
    if (lower.includes('laboratory')) return 'laboratory-assistance';
    if (lower.includes('thesis') || lower.includes('project writing'))
      return 'thesis-consultancy';
    if (lower.includes('project')) return 'project-development';
    if (lower.includes('training') || lower.includes('skill'))
      return 'skills-training';
    return 'general-inquiry';
  };

  useEffect(() => {
    if (!propServices) {
      fetchServices();
    }
  }, [propServices]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = (await strapiService.getServices()) as StrapiResponse<
        Service[]
      >;
      const fetchedServices = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setServices(fetchedServices);
    } catch (err) {
      // Fallback to default services when Strapi is not available
      console.warn('Strapi not available, using fallback services:', err);
      const fallbackServices: Service[] = [
        {
          id: 1,
          title: 'Research Mentorship',
          description:
            'Comprehensive guidance for undergraduate research projects, from topic selection to publication.',
          icon: 'research',
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          features: [
            'One-on-one mentorship sessions',
            'Research methodology training',
            'Literature review assistance',
            'Data analysis support',
            'Publication guidance',
          ],
          detailedDescription:
            'Our research mentorship program provides comprehensive support for undergraduate students embarking on their research journey. We guide you through every step of the research process.',
          contactInfo: {
            email: 'research@bkhrease.com',
            phone: '+234 812 235 9970',
          },
        },
        {
          id: 2,
          title: 'Laboratory Assistance',
          description:
            'Expert support for wet and dry lab work, including equipment training and safety protocols.',
          icon: 'laboratory',
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          features: [
            'Equipment operation training',
            'Safety protocol guidance',
            'Experimental design support',
            'Data collection assistance',
            'Quality control measures',
          ],
          detailedDescription:
            'Professional laboratory assistance covering both wet lab and dry lab environments. We ensure you have the skills and knowledge to conduct safe and effective research.',
          contactInfo: {
            email: 'lab@bkhrease.com',
            phone: '+234 812 235 9970',
          },
        },
        {
          id: 3,
          title: 'Thesis & Project Writing',
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          description:
            'Professional assistance with academic writing, formatting, and presentation of research findings.',
          icon: 'thesis',
          features: [
            'Academic writing coaching',
            'Thesis structure guidance',
            'Citation and referencing',
            'Proofreading services',
            'Presentation preparation',
          ],
          detailedDescription:
            'Complete support for thesis and project writing, ensuring your research is presented professionally and meets academic standards.',
          contactInfo: {
            email: 'writing@bkhrease.com',
            phone: '+234 812 235 9970',
          },
        },
      ];
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };

  const displayedServices = showAll ? services : services.slice(0, maxServices);

  const getServiceIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      research: (
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      laboratory: (
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      thesis: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      project: (
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
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      training: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      default: (
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
    };
    return icons[iconName] || icons.default;
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load Services
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={fetchServices} className="btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive academic support designed to elevate your research
              journey and academic success
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onClick={() => setSelectedService(service)}
              >
                {/* Service Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features Preview */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {service.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <svg
                              className="w-4 h-4 text-secondary-500 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-primary-600 font-medium">
                          +{service.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Learn More Button */}
                <button className="w-full bg-gray-50 hover:bg-primary-50 text-primary-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300 group-hover:bg-primary-50 border border-gray-200 group-hover:border-primary-200">
                  Learn More
                  <svg
                    className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* View All Services Button */}
          {!showAll && services.length > maxServices && (
            <div className="text-center mt-12">
              <a
                href="/services"
                className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 inline-flex items-center"
              >
                View All Services
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white mr-4">
                    {getServiceIcon(selectedService.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* If detailedDescription is an array (Blocks), use the renderer */}
                {Array.isArray(selectedService.detailedDescription) ? (
                  <div className="prose max-w-none text-gray-700">
                    <BlocksRenderer
                      content={selectedService.detailedDescription}
                    />
                  </div>
                ) : (
                  /* Fallback for string description or empty detailedDescription */
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description}
                  </p>
                )}

                {/* Features */}
                {selectedService.features &&
                  selectedService.features.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        What&apos;s Included:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <svg
                              className="w-5 h-5 text-secondary-500 mr-3 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Contact Information */}
                {selectedService.contactInfo && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Get Started Today
                    </h4>
                    <div className="space-y-2">
                      {selectedService.contactInfo.email && (
                        <p className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 text-primary-500 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {selectedService.contactInfo.email}
                        </p>
                      )}
                      {selectedService.contactInfo.phone && (
                        <p className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 text-primary-500 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {selectedService.contactInfo.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      const serviceValue = getServiceTypeValue(
                        selectedService?.title || ''
                      );
                      setSelectedService(null);
                      router.push(`/contact?service=${serviceValue}`);
                    }}
                    className="btn-primary flex-1"
                  >
                    Contact Us About This Service
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesOverview;
