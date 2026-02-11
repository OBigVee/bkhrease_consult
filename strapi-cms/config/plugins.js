module.exports = ({ env }) => {
  const uploadConfig = env('CLOUDINARY_NAME')
    ? {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
          http_options: {
            timeout: 120000,
          },
        },
        actionOptions: {
          upload: {
            folder: 'bkhrease-academic',
            resource_type: 'image',
          },
          uploadStream: {
            folder: 'bkhrease-academic',
            resource_type: 'image',
          },
          delete: {},
        },
      },
    }
    : {
      // Fallback to local provider
      config: {
        provider: 'local',
        options: {
          sizeLimit: 10000000, // 10MB
        },
      },
    };

  return {
    upload: uploadConfig,
    // Email plugin for notifications
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'localhost'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('EMAIL_DEFAULT_FROM', 'noreply@bkhrease.ng'),
          defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'info@bkhrease.ng'),
        },
      },
    },
  };
};
