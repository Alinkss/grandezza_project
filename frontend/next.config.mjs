/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'www.ageucate.com',
        }, {
            protocol: 'https',
            hostname: 'img.icons8.com',
        },]
    }
};

export default nextConfig;
