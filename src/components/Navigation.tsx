import classNames from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import navigation from '../data/navigation.json';

function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav
      className={classNames('site-header-nav', {
        'site-header-nav-open': isNavOpen
      })}
    >
      <button
        className="site-header-nav-toggle"
        aria-label="Menu"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <img src="/icons/nav-toggle.svg" alt="Toggle Navigation" />
      </button>
      <ul className="site-header-nav-list">
        {navigation.map((navigationLink) => {
          return (
            <li key={navigationLink.url} onClick={() => setIsNavOpen(false)}>
              <Link href={navigationLink.url}>{navigationLink.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navigation;
