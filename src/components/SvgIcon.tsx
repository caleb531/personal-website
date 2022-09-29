import React from 'react';

type Props = { content: string };

function SvgIcon({ content }: Props) {
  return (
    <div
      className="svg-icon-wrapper"
      // Because the SVG content is coming from my own server, it is relatively
      // safe to insert into the DOM with dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
export default SvgIcon;
