exports.onCreateNode = ({ node, actions, getNode }) => {
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

// Attach additional field to each GraphQL node (source:
// https://stackoverflow.com/a/53563503/560642)
exports.createResolvers = function ({ createResolvers, getNode }) {
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
                // Markdown file
                name: { eq: source.name }
              }
            }
          });
        }
      }
    }
  });
};
