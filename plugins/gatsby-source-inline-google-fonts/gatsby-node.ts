import { GatsbyNode, NodeInput, PluginOptions } from 'gatsby';
import fetch from 'node-fetch';
import path from 'path';

// Plugin constants
const PLUGIN_NAME = path.basename(__dirname);
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
  { actions, createNodeId, createContentDigest, cache, reporter }: SourceNodesArgs,
  pluginOptions: FontPluginOptions
) => {
  const { createNode } = actions;

  // Return the contents of the given Google Font URL (then cache the resulting
  // CSS to speed up subsequent builds)
  async function getFontCss(fontCssUrl: string): Promise<string> {
    const cachedCss = await cache.get(fontCssUrl);
    if (cachedCss) {
      reporter.info(`[${PLUGIN_NAME}] using cached font CSS`);
      return cachedCss;
    } else {
      reporter.info(`[${PLUGIN_NAME}] font CSS not cached; fetching`);
      // Ensure that css is not a promise by explicitly specifying the type
      try {
        const css: string = await (await fetch(fontCssUrl)).text();
        await cache.set(fontCssUrl, css);
        return css;
      } catch (error) {
        reporter.error(`[${PLUGIN_NAME}] error fetching fonts; falling back to external stylesheet`);
        return '';
      }
    }
  }

  return Promise.all(pluginOptions.fontCssUrls.map(async (fontCssUrl) => {

    const fontData: FontData = {
      url: fontCssUrl,
      css: await getFontCss(fontCssUrl)
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
