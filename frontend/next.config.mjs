/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'www.ageucate.com',
        }, {
            protocol: 'https',
            hostname: 'img.icons8.com',
        },
        {
            protocol: 'https',
            hostname: 'png.klev.club',
        },
        ]
    }
};

export default nextConfig;
