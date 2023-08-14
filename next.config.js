/** @type {{images: {remotePatterns: [{protocol: string, hostname: string, port: string, pathname: string}], formats: (string)[]}, reactStrictMode: boolean}} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1'],
    },
}

module.exports = nextConfig
