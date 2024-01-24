/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'app3.lichishop.com',
            },
        ],
    },
};

export default nextConfig;
