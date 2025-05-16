/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/callback",
        destination: "/api/auth/callback",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/api/auth/login?screen_hint=signup",
        permanent: true,
      },
    ];
  },
  env: {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
};

module.exports = nextConfig;
