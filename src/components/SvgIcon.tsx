import React from 'react';

type Props = { content: string };

function SvgIcon({ content }: Props) {
  return (
    <div
      className="svg-icon-wrapper"
      dangerouslySetInnerHTML={{ __html: content }} />
  );
}
export default SvgIcon;
