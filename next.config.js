/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['image.tmdb.org', 'images.unsplash.com']
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  }
};

module.exports = nextConfig;