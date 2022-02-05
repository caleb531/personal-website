import { GatsbyConfig } from 'gatsby';

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  siteUrl: 'https://calebevans.me',
  siteTitle: 'Caleb Evans',
  siteTagline: 'Coder for Christ',
  siteDescription: 'Hi, I\'m Caleb, a web developer who lives for Christ by coding enjoyable apps and useful tools. Come see what I\'ve made!',
  siteEmail: 'caleb@calebevans.me',
  twitterUsername: '@caleb531',
  googleSiteVerification: 'hgENNCrZvitO_dtrCT_F6VdV1YspqEDh-nBMoq0dL5g'
};

export const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-sass',
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-32415253-1'
    }
  },
  {
    resolve: 'gatsby-source-gravatar',
    options: {
      // Generate an empty node to silence the "The plugin has generated no
      // Gatsby nodes" warning, since we are instead using the plugin's
      // toUrl() function to generate all gravatar URLs
      emails: ['']
    }
  },
  'gatsby-plugin-image',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-minify-html',
  'gatsby-plugin-graphql-codegen',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/images'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'icons',
      path: './static/icons'
    }
  },
  'gatsby-transformer-remark',
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      commonmark: true
    }
  },
  // Per the Gatsby docs, using gatsby-plugin-layout prevents static elements
  // like the header/footer from unmounting/remounting when navigating
  // between pages
  {
    resolve: 'gatsby-plugin-layout',
    options: {
      component: require.resolve('./src/layouts/Page.tsx')
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: './src/pages'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'projects',
      path: './src/projects'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'websites',
      path: './src/websites'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'contact-links',
      path: './src/contact-links'
    }
  },
  'gatsby-plugin-content-fields',
  'gatsby-plugin-inline-svg',
  'gatsby-plugin-style-to-link',
  {
    resolve: 'gatsby-source-inline-google-fonts',
    options: {
      fontCssUrls: [
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=fallback'
      ]
    }
  }
];
