import React from 'react';

// By default, Gatsby compiles Sass to CSS as a inline <style> tag on the page;
// however, we'd prefer the production build to load styles via <link> tag
// instead; source:
// <https://github.com/gatsbyjs/gatsby/issues/1526#issuecomment-583740341>
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  // To prevent issues with live reloading of code changes in the development
  // environment, we do not want to mutate the <style> tag in Development mode
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  const headComponents = getHeadComponents();

  // Replace every injected <style> tag with an equivalent <link> tag (using
  // the <style> tag's data-href attribute to identify the path to the compiled
  // CSS bundle)
  const transformedHeadComponents = headComponents.map((node) => {
    if (node.type === 'style') {
      const globalStyleHref = node.props['data-href'];
      if (globalStyleHref) {
        return <link href={globalStyleHref} rel="stylesheet" type="text/css" />;
      } else {
        return node;
      }
    } else {
      return node;
    }
  });
  replaceHeadComponents(transformedHeadComponents);
};
