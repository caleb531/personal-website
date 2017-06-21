module Jekyll
  # Liquid filter which returns the contents of the SVG at the given path
  module InlineSVG

    def inline_svg(svg_path)
      svg_file = File.open(".#{svg_path}", 'r')
      begin
        svg = svg_file.read
        # Strip xmlns attributes, as HTML ignores them
        svg = svg.gsub(/\s*xmlns(:[a-z]+)?=(['"])(.*?)\2\s*/i, '')
        # Strip comments
        svg = svg.gsub(/<!--(.*?)-->/, '')
      ensure
        svg_file.close
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::InlineSVG)
