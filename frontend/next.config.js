/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/soma-ai',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
