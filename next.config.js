const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enforce a trailing slash on all page URLs
  trailingSlash: true,
  // URL redirects
  async redirects() {
    return [
      {
        source: '/portfolio/',
        destination: '/projects/',
        permanent: true
      },
      {
        source: '/projects/:subpath(.+)',
        destination: 'https://projects.calebevans.me/:subpath',
        permanent: true
      }
    ];
  },
  // Security headers
  async headers() {
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Content-Security-Policy',
        /* eslint-disable-next-line quotes */
        value: "default-src 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src data: https://fonts.gstatic.com; img-src 'self' data: https://www.gravatar.com https://www.google-analytics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; prefetch-src 'self'"
      }
    ];
    // The HSTS header should only be sent for HTTPS websites; because localhost is server over plain HTTP, we do not want to enable HSTS there
    if (process.env.NODE_ENV === 'production') {
      headers.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=15552000; includeSubDomains'
      });
    }
    return [{ source: '/:path*', headers }];
  }
};

module.exports = nextConfig;
