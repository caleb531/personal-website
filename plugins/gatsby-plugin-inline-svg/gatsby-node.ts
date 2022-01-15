import fs from 'fs';

// Strip out extraneous information from the contents of an SVG file
function minifySVGContents(data) {
  return data
    .replace(/\s*xmlns(:[a-z]+)?=(['"])(.*?)\2\s*/gi, '')
    .replace(/<!--(.*?)-->/gi, '');
}

// Read the contents of SVG files (represented by GraphQL nodes) so that the
// <svg> contents can be referenced later for inlining in JSX (source:
// https://stackoverflow.com/a/58151834/560642)
export const onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'File' && node.extension === 'svg') {
    fs.readFile(node.absolutePath, 'utf8', (_err, data) => {
      actions.createNodeField({
        node,
        name: 'svgContents',
        value: minifySVGContents(data)
      });
    });
  }
};
