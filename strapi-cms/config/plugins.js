module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: 'bkhrease-academic',
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          resource_type: 'auto',
          quality: 'auto:good',
          format: 'auto',
        },
        uploadStream: {
          folder: 'bkhrease-academic',
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          resource_type: 'auto',
          quality: 'auto:good',
          format: 'auto',
        },
        delete: {},
      },
    },
  },
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
});
