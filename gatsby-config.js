module.exports = {
  siteMetadata: {
    siteUrl: 'https://calebevans.me',
    title: 'Caleb Evans',
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
    'gatsby-source-gravatar',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        commonmark: true,
        defaultLayouts: {
          pages: '../templates/Page.tsx'
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages'
      }
    }
  ]
};
