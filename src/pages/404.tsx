import React from 'react';
import site from '../data/site.json';
import { withGlobalStaticProps } from '../lib/page';

function PageNotFound() {
  return (
    <div className="page-404">
      <p>Sorry, I couldn't find the page you were looking for.
      Please <a href={`mailto:${site.email}`}>send me an email</a> explaining how you got here and I'll look into it. :)</p>

      <p>In the meantime, watch some <a href="https://www.youtube.com/watch?v=y6GaPkkGZGw">adorable red pandas playing in the snow</a>!</p>
    </div>
  );
}

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      title: 'Well, this is awkward.'
    }
  });
}

export default PageNotFound;
