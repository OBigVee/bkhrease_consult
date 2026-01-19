module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Admin panel customization
  url: env('ADMIN_URL', '/admin'),
  autoOpen: false,
  watchIgnoreFiles: ['./src/**/*.test.js', './src/**/*.spec.js'],
  // Session configuration
  session: {
    keys: env.array('SESSION_KEYS', ['default-key']),
  },
  // Admin panel branding
  options: {
    auth: {
      providers: ['local'],
    },
  },
});
