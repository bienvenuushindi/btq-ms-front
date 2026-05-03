/** @type {{images: {remotePatterns: [{protocol: string, hostname: string, port: string, pathname: string}], formats: (string)[]}, reactStrictMode: boolean}} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1', 'localhost', 'res.cloudinary.com', 'm.media-amazon.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '**',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '**',
                pathname: '/**',
            },
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
