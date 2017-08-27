# Personal Website

*Copyright 2013-2017, Caleb Evans*  
*Code released under the MIT license*

This is a [Jekyll](https://jekyllrb.com/)-based personal website I created for
myself. I built the current theme from the Jekyll 3 default theme. I am
releasing the full source code for the site so that others may benefit from the
code I've written.

## Setup

### Installing Jekyll

The site requires Jekyll 3 (which in turn requires Ruby 2 and Node):

```bash
gem install jekyll
```

You can also install the site's required gems via Bundler:

```bash
gem install bundler
bundle install
```

### Serving the site

#### Via Jekyll

To serve the development site locally via Jekyll's Ruby server, run:

```bash
bundle exec jekyll serve
```

You will then be able to view the site in your browser at `localhost:4000`.

#### Via Apache

Technically, the site runs on Apache, so you should really create an Apache
virtual host for the development site and run it locally as such. Otherwise,
features such as 404 redirection, caching, and gzipping will not be enabled
(because the site's `.htaccess` file will not be executed).

When serving via Apache, run `bundle exec jekyll build --watch` to build the
site and watch for changes.
