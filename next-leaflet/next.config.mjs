import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
            },
        ],
    },
}

export default withPayload(nextConfig)
