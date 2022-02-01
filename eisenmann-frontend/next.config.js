module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.DJANGO_API_URL_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL_ENV,
  },
}
