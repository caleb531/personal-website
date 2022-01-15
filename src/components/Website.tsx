import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { WebsiteData } from './types';

type Props = { website: WebsiteData }

function Website({ website }: Props) {
  return (
    <article className="entry website">
      <div className="entry-image website-image">
        <a href={website.frontmatter.direct_url}>
          <GatsbyImage image={getImage(website.image)} alt="" />
        </a>
      </div>
      <div className="entry-main website-main">

        <h4 className="entry-title website-title">
          <a href={website.frontmatter.direct_url}>
            {website.frontmatter.title}
          </a>
        </h4>

        <div className="website-details">
          <div className="website-years">{website.frontmatter.start_year} &ndash; {website.frontmatter.end_year || 'present'}</div>
          <div className="website-technologies">{website.frontmatter.technologies}</div>
        </div>

      </div>
    </article>
  );
}
export default Website;
