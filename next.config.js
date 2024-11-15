/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: config => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@next)/]
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  },
  distDir: 'dist',
  images: {
    domains: []
  },
  env: {
    STORAGE_ENCRYPTION_KEY: '',
    ENCRYPTION_PREF_KEY: '',
    BASEURL: 'https://belaundry-api.sebaris.link/platform/',       
  },
  async rewrites() {
    return {}
  }
}

module.exports = nextConfig
