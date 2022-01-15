// Attach additional field to each GraphQL node (source:
// https://stackoverflow.com/a/53563503/560642)
export const onCreateNode = ({ node, actions, getNode }) => {
  const targetNode = getNode(node.parent) || node;
  actions.createNodeField({
    node,
    name: 'name',
    value: targetNode.name
  });
  actions.createNodeField({
    node,
    name: 'collection',
    value: targetNode.sourceInstanceName
  });
};

// Define resolvers to create foreign-key associations between Markdown files
// and static assets
export const createResolvers = function ({ createResolvers, getNode }) {
  createResolvers({
    MarkdownRemark: {
      icon: {
        type: 'File',
        resolve: (source, args, context, info) => {
          return context.nodeModel.findOne({
            type: 'File',
            query: {
              filter: {
                // Icon must be an SVG file
                extension: { eq: 'svg' },
                // Icon must have the same filename (minus extension) as the
                // source Markdown file
                name: { eq: source.fields.name }
              }
            }
          });
        }
      },
      image: {
        type: 'File',
        resolve: (source, args, context, info) => {
          return context.nodeModel.findOne({
            type: 'File',
            query: {
              filter: {
                // Image must be a JPEG image
                extension: { eq: 'jpg' },
                // Image must have the same filename (minus extension) as the
                // source Markdown file
                name: { eq: source.fields.name }
              }
            }
          });
        }
      }
    }
  });
};
