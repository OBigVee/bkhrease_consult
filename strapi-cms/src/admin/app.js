'use strict';

/**
 * Admin panel customization
 */

const config = {
  // Custom branding
  config: {
    // Replace the Strapi logo with B.Khrease logo
    auth: {
      logo: '/uploads/bk_logo_admin.png', // You'll need to upload this
    },
    menu: {
      logo: '/uploads/bk_logo_admin.png',
    },
    // Custom theme colors
    theme: {
      light: {
        colors: {
          primary100: '#f0f9ff',
          primary200: '#e0f2fe',
          primary500: '#0ea5e9',
          primary600: '#0284c7',
          primary700: '#0369a1',
        },
      },
    },
    // Custom head tags
    head: {
      favicon: '/uploads/favicon.ico',
    },
    // Localization
    locales: ['en'],
    // Tutorials
    tutorials: false,
    // Notifications
    notifications: {
      releases: false,
    },
  },

  // Custom webpack configuration
  webpack: (config, webpack) => {
    // Add any custom webpack configuration here
    return config;
  },
};

const bootstrap = app => {
  console.log('Admin panel bootstrapped');
};

export default {
  config,
  bootstrap,
};
