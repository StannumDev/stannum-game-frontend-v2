/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.mux.com',
            },
            {
                protocol: 'https',
                hostname: 'stannumgame2025.s3.sa-east-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'stannumgame2025.s3.sa-east-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
