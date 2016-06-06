# Personal Website

*Copyright 2016, Caleb Evans*  
*Code released under the MIT license*

This is a [Jekyll](https://jekyllrb.com/)-based personal website I built for
myself. I built the current theme from the Jekyll 3 default theme.

## Setup

### Installing Jekyll

To build this site, you must first install Jekyll (which requires Ruby and
Node):

```bash
gem install jekyll
```

### Serving the site

#### Via Jekyll

To serve the development site locally via Jekyll's Ruby server, run:

```bash
jekyll serve
```

You will then be able to view the site in your browser at `localhost:4000`.

#### Via Apache

Technically, the site runs on Apache, so you should really create an Apache
virtual host for the development site and run it locally as such. Otherwise,
features such as 404 redirection, caching, and gzipping will not be enabled
(because the site's `.htaccess` file will not be executed).
