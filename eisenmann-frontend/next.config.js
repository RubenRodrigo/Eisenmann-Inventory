/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET_ENV,
    BASE_URL: process.env.BASE_URL_ENV,
    API_URL: process.env.API_BACKEND_URL_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL_ENV
  },
}

module.exports = nextConfig
