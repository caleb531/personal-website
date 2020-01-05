require 'digest/md5'

CACHEBUST_PARAM = '__cachebust='

module Jekyll

  # Liquid filter which appends a cachebuster parameter to the given URL path
  module CachebustURL

    def cachebust(url)
      "#{url}?#{CACHEBUST_PARAM}"
    end

  end

  # Replace cachebust placeholder with actual hash of output file
  Hooks.register :pages, :post_render do |page|
    if /.md/i.match(page.name)
      page.output.scan(CACHEBUST_PARAM).each do |match|
        asset_hash =
        page.output = page.output.gsub(CACHEBUST_PARAM, '#{CACHEBUST_PARAM}#{}')
      end
    end
  end

end

Liquid::Template.register_filter(Jekyll::CachebustURL)
