import { GatsbyNode, NodeInput, PluginOptions } from 'gatsby';
import fetch from 'node-fetch';

// Constants for the font content type
const FONT_NODE_TYPE = 'GoogleFontCss';

// Node types for this plugin
interface FontData {
  url: string;
  css: string;
}
interface FontPluginOptions extends PluginOptions {
  fontCssUrls: string[];
}
type SourceNodesArgs = Parameters<GatsbyNode['sourceNodes']>[0];

// Pre-fetches Google Font CSS URLs during the Gatsby build step, and saves the
// CSS contents to GraphQL so they can be inlined as <style> tags with
// react-helmet (documentation on creating a source plugin:
// https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/)
export const sourceNodes = (
  { actions, createNodeId, createContentDigest, cache }: SourceNodesArgs,
  pluginOptions: FontPluginOptions
) => {
  const { createNode } = actions;

  async function fetchFontCss(fontCssUrl: string): Promise<string> {
    return (await fetch(fontCssUrl)).text();
  }

  return Promise.all(pluginOptions.fontCssUrls.map(async (fontCssUrl) => {

    const fontData: FontData = {
      url: fontCssUrl,
      css: await fetchFontCss(fontCssUrl)
    };
    const nodeMeta: NodeInput = {
      id: createNodeId(`${FONT_NODE_TYPE}-${fontCssUrl}`),
      parent: null,
      children: [],
      internal: {
        type: FONT_NODE_TYPE,
        mediaType: 'text/css',
        content: JSON.stringify(fontData),
        contentDigest: createContentDigest(fontData)
      },
      url: fontCssUrl
    };
    const node = Object.assign({}, fontData, nodeMeta);
    createNode(node);

  }));

};
