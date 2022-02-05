import React from 'react';

type Props = { content: string, animationDelay?: number };

function SvgIcon({ content, animationDelay = null }: Props) {
  return (
    <div
      className="svg-icon-wrapper"
      style={animationDelay !== null ? { 'animationDelay': `${animationDelay}ms` } : {}}
      // Because the SVG content is coming from my own server, it is relatively
      // safe to insert into the DOM with dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: content }} />
  );
}
export default SvgIcon;
