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
      }
    ];
    if (process.env.NODE_ENV === 'production') {
      // The HSTS header should only be sent for HTTPS websites; because
      // localhost is server over plain HTTP, we do not want to enable HSTS
      // there
      headers.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=15552000; includeSubDomains'
      });
      // Only apply Content Security Policy for production build
      headers.push({
        key: 'Content-Security-Policy',
        /* eslint-disable quotes */
        value:
          "default-src 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src data: https://fonts.gstatic.com; img-src 'self' data: https://www.gravatar.com https://www.google-analytics.com https://www.googletagmanager.com; script-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; prefetch-src 'self'"
        /* eslint-enable quotes */
      });
    }
    return [{ source: '/:path*', headers }];
  }
};

module.exports = nextConfig;
