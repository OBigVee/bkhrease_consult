'use client';

import React from 'react';

interface SocialLink {
  name: string;
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

interface SocialMediaLinksProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
  iconClassName?: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/b-khrease-academic-consult',
    ariaLabel: 'Follow B.Khrease Academic Consult on LinkedIn',
    icon: (
      <svg
        className="w-full h-full"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@B.khreaseAcademicConsult',
    ariaLabel: 'Subscribe to B.Khrease Academic Consult on YouTube',
    icon: (
      <svg
        className="w-full h-full"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@bkhreaseacademicconsult',
    ariaLabel: 'Follow B.Khrease Academic Consult on TikTok',
    icon: (
      <svg
        className="w-full h-full"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/bkhreaseacademicconsult',
    ariaLabel: 'Follow B.Khrease Academic Consult on Facebook',
    icon: (
      <svg
        className="w-full h-full"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  variant = 'default',
  className = '',
  iconClassName = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return {
          container: 'flex space-x-6',
          link: 'flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200',
          icon: 'w-6 h-6',
        };
      case 'small':
        return {
          container: 'flex space-x-2',
          link: 'flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors duration-200',
          icon: 'w-4 h-4',
        };
      default:
        return {
          container: 'flex space-x-4',
          link: 'flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200',
          icon: 'w-5 h-5',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`${variantClasses.container} ${className}`}>
      {socialLinks.map(social => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${variantClasses.link} group`}
          aria-label={social.ariaLabel}
          title={social.ariaLabel}
        >
          <div className={`${variantClasses.icon} ${iconClassName}`}>
            {social.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;

// Export individual social links for use in other components
export { socialLinks };
export type { SocialLink };
