import React from 'react';
import Navigation from './Navigation';

function Header() {

  return (
    <header id="site-header">
      <a href="/" id="site-title-link" rel="home">
        <img src="" alt="" srcSet="{{ site.email | gravatar_url: retina_header_image_size }} 2x" width="{{ site.data.gravatar.header_image_size }}" height="{{ site.data.gravatar.header_image_size }}" id="site-header-image" />
      </a>
      <Navigation />
    </header>
  );
}
export default Header;
