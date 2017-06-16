module Jekyll
  # Liquid filter which returns the given SVG string without comments and xmlns
  # attributes
  module CleanUpSvg

    def clean_up_svg(svg)
      # Strip xmlns attributes, as HTML ignores them
      svg = svg.gsub(/\s*xmlns(:[a-z]+)?=(['"])(.*?)\2\s*/i, '')
      # Strip comments
      svg = svg.gsub(/<!--(.*?)-->/, '')
    end

  end
end

Liquid::Template.register_filter(Jekyll::CleanUpSvg)
