/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'www.ageucate.com',
        }]
    }
};

export default nextConfig;
