exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            id
            slug
            title
            description
          }
        }
      }
    }
  `);
  data.allMarkdownRemark.nodes.forEach((node) => {
    const { slug } = node.frontmatter;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/Page.tsx`),
      context: { slug }
    });
  });
};
