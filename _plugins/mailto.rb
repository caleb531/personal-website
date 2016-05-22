require 'uri'

module Jekyll
  # Liquid filter which returns mailto: link for the given email
  module Mailto

    # Create mailto: link to the given email with an optional subject
    def mailto(email, subject='')
      encoded_subject = URI.escape(subject)
      mailto_url = "mailto:#{email}?subject=#{subject}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::Mailto)
