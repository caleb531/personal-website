require 'digest/md5'

module Jekyll

  # Liquid filter which appends a cachebuster parameter to the given URL path
  module CachebustURL

    def cachebust(url)
      url + (url.include?('?') ? '&' : '?') + '_cachebust='
    end

  end

  # Replace cachebust placeholder with actual hash of output file
  Hooks.register :site, :post_write do |site|
    site.pages.each do |page|
      # site.pages could include non-Markdown static files such as robots.txt or
      # sitemap.xml, so we want to filter those out
      if /.md/i.match(page.name)
        cachebusted_output = page.output.gsub(/(?<=")[^"]+[?&]_cachebust=(?=")/).each do |url|
          # Strip base path and domain name from URL, if either are present
          url_path = url.sub(site.config['baseurl'], '')
          url_path = url_path.sub(site.config['url'], '')
          # Strip query parameters
          url_path = url_path.sub(/\?.*$/, '')
          # Make path relative to destination directory
          file_path = File.join(site.config['destination'], url_path)
          hash = Digest::MD5.hexdigest(File.read(file_path))
          url + hash
        end
        File.write(page.destination(''), cachebusted_output)
      end
    end
  end

end

Liquid::Template.register_filter(Jekyll::CachebustURL)
