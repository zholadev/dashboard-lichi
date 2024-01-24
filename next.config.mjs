/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
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
