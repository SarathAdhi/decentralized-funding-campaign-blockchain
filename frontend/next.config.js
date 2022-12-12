/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
