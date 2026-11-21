/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 禁用严格模式，提升开发环境性能
  poweredByHeader: false,
  //devIndicators: false,
  compress: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.01bai.com',
        port: '99',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oss.01bai.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  }
}

export default nextConfig;
