import React from 'react';
import { withGlobalStaticProps } from '../lib/page';

function PageNotFound() {
  return (
    <div className="page-500">
      <p>
        Sorry, my server errored out. Please{' '}
        <a href="mailto:caleb@calebevans.me">email me</a> with the URL page you
        were trying to access, and I'll check it out.
      </p>
    </div>
  );
}

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      title: 'Internal Server Error'
    }
  });
}

export default PageNotFound;
