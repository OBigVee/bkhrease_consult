'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const ContactInfo: React.FC = () => {
  const contactMethods = [
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: 'Email Us',
      primary: 'Info.bkhrease.ng@gmail.com',
      secondary: 'We typically respond within 24 hours',
      action: {
        text: 'Send Email',
        href: 'mailto:Info.bkhrease.ng@gmail.com',
        external: false,
      },
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'WhatsApp',
      primary: '+234 812 235 9970',
      secondary: 'Available Monday - Friday, 9AM - 6PM WAT',
      action: {
        text: 'Chat on WhatsApp',
        href: 'https://wa.me/2348122359970',
        external: true,
      },
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Location',
      primary: 'Nigeria',
      secondary: 'Serving students nationwide and internationally',
      action: null,
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: 'Business Hours',
      primary: 'Monday - Friday: 9AM - 6PM WAT',
      secondary: 'Saturday: 10AM - 4PM WAT',
      action: null,
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/b-khrease-academic-consult',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@B.khreaseAcademicConsult',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@bkhreaseacademicconsult',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/bkhreaseacademicconsult',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Let&apos;s Start Your Academic Journey
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Whether you need research mentorship, laboratory assistance, or thesis
          consultancy, we&apos;re here to help you achieve distinction with
          ease.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <Card key={index} variant="elevated" className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  {method.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-gray-900 font-medium mb-1">
                  {method.primary}
                </p>
                <p className="text-sm text-gray-600 mb-3">{method.secondary}</p>
                {method.action && (
                  <a
                    href={method.action.href}
                    target={method.action.external ? '_blank' : undefined}
                    rel={
                      method.action.external ? 'noopener noreferrer' : undefined
                    }
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                  >
                    {method.action.text}
                    {method.action.external && (
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Social Media Links */}
      <Card variant="elevated" className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Follow Us on Social Media
        </h3>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest research insights, success stories, and
          academic tips.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200"
              aria-label={`Follow us on ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </Card>

      {/* Quick Info */}
      <Card variant="default" className="p-6 bg-primary-50 border-primary-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Ready to Get Started?
          </h3>
          <p className="text-primary-700 mb-4">
            Join over 1,000 students who have achieved academic excellence with
            our guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:Info.bkhrease.ng@gmail.com"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Send Email
            </a>
            <a
              href="https://wa.me/2348122359970"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactInfo;
