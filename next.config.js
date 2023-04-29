/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org']
  },
  swcMinify: true
}

module.exports = nextConfig
