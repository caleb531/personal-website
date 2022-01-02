// Attach additional field to each Markdown/MDX GraphQL node (source:
// https://stackoverflow.com/a/53563503/560642)
exports.onCreateNode = ({ node, actions, getNode }) => {
  const nodeType = node.internal.type;
  if (nodeType === 'MarkdownRemark' || nodeType === 'Mdx') {
    // Expose the human-readable ID of this content instance (e.g.
    // connect-four)
    actions.createNodeField({
      node,
      name: 'name',
      value: getNode(node.parent).name
    });
    // Expose the content type of this content instance (e.g. projects)
    actions.createNodeField({
      node,
      name: 'sourceInstanceName',
      value: getNode(node.parent).sourceInstanceName
    });
  }
};
