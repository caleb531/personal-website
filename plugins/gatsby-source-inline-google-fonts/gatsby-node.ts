import { GatsbyNode } from 'gatsby';

// Read the contents of SVG files (represented by GraphQL nodes) so that the
// <svg> contents can be referenced later for inlining in JSX (source:
// https://stackoverflow.com/a/58151834/560642)
export const sourceNodes: GatsbyNode['sourceNodes'] = ({ actions, createNodeId, createContentDigest, cache }) => {
  // TODO
};
