require 'uri'

module Jekyll
  # Liquid filter which returns mailto: link for the given email
  module Mailto

    def mailto(email, subject='')
      encoded_subject = URI.encode_www_form_component(subject)
      mailto_url = "mailto:#{email}?subject=#{encoded_subject}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::Mailto)
