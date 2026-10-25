import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Keep the old HTML addresses working.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/sponsorship.html', destination: '/sponsorship', permanent: true },
      { source: '/site', destination: '/', permanent: false },
      { source: '/site/index.html', destination: '/', permanent: false },
      { source: '/site/sponsorship.html', destination: '/sponsorship', permanent: false },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
