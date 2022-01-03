const fs = require('fs');

// Read the contents of SVG files (represented by GraphQL nodes) so that the
// <svg> contents can be referenced later for inlining in JSX (source:
// https://stackoverflow.com/a/58151834/560642)
exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'File' && node.extension === 'svg') {
    fs.readFile(node.absolutePath, 'utf8', (_err, data) => {
      actions.createNodeField({
        node,
        name: 'svgContents',
        value: data
      });
    });
  }
};
