// Attach additional field to each GraphQL node (source:
// https://stackoverflow.com/a/53563503/560642)
exports.onCreateNode = ({ node, actions, getNode }) => {
  const nodeType = node.internal.type;
  const targetNode = getNode(node.parent) || node;
  // Expose the human-readable ID of this content instance (e.g.
  // connect-four)
  actions.createNodeField({
    node,
    name: 'id',
    value: targetNode.name
  });
  // Expose the content type of this content instance (e.g. projects)
  actions.createNodeField({
    node,
    name: 'contentType',
    value: targetNode.sourceInstanceName
  });
};
