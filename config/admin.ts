export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
