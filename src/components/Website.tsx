import Image from 'next/image';
import React from 'react';
import { WebsiteEntry } from './types';

type Props = { website: WebsiteEntry }

function Website({ website }: Props) {
  return (
    <article className="entry website">
      <div className="entry-image website-image">
        <a href={website.direct_url}>
          <Image src={website.image} alt="" width={256} height={160} />
        </a>
      </div>
      <div className="entry-main website-main">

        <h4 className="entry-title website-title">
          <a href={website.direct_url}>
            {website.title}
          </a>
        </h4>

        <div className="website-details">
          <div className="website-years">{website.start_year} &ndash; {website.end_year || 'present'}</div>
          <div className="website-technologies">{website.technologies}</div>
        </div>

      </div>
    </article>
  );
}
export default Website;
