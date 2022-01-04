module.exports = {
  siteMetadata: {
    siteUrl: 'https://calebevans.me',
    title: 'Caleb Evans',
    tagline: 'Coder for Christ',
    email: 'caleb@calebevans.me'
  },
  plugins: [
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images'
      },
      __key: 'images'
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
        component: require.resolve('./src/templates/Page.tsx')
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
        path: './src/images/websites'
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
    'gatsby-plugin-style-to-link',
    'gatsby-plugin-inline-svg'
  ]
};
