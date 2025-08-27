/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ This tells Vercel/Next.js to deploy even if ESLint finds errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
