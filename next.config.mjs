/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
}

export default nextConfig
