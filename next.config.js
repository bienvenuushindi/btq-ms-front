/** @type {{images: {remotePatterns: [{protocol: string, hostname: string, port: string, pathname: string}], formats: (string)[]}, reactStrictMode: boolean}} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1','res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagsapi.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
