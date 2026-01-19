'use client';

import React from 'react';
import Image from 'next/image';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Logo from '@/components/ui/Logo';

interface HeroProps {
  tagline: string;
  vision: string;
  mission: string;
  ctaButtons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  backgroundImage?: string;
  logo?: string;
}

const Hero: React.FC<HeroProps> = ({
  tagline,
  vision,
  mission,
  ctaButtons,
  backgroundImage,
  logo,
}) => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {backgroundImage && (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo */}
          {logo && (
            <div className="mb-8 animate-fade-in flex justify-center">
              <Logo
                size="xl"
                priority={true}
                showText={false}
                variant="default"
                className="shadow-lg"
              />
            </div>
          )}

          {/* Company Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              B.Khrease
            </span>
            <br />
            <span className="text-gray-800">Academic Consult</span>
          </h1>

          {/* Tagline */}
          <div className="mb-12 animate-slide-up delay-200">
            <p className="text-2xl md:text-4xl font-semibold text-primary-700 mb-2">
              {tagline}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 animate-slide-up delay-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
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
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">{vision}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-secondary-700 mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
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
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">{mission}</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-500">
            <button
              onClick={() => scrollToSection(ctaButtons.primary.href)}
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300"
              aria-label={`Navigate to ${ctaButtons.primary.text}`}
            >
              {ctaButtons.primary.text}
            </button>
            <button
              onClick={() => scrollToSection(ctaButtons.secondary.href)}
              className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary-300"
              aria-label={`Navigate to ${ctaButtons.secondary.text}`}
            >
              {ctaButtons.secondary.text}
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
