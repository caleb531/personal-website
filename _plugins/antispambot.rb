require 'uri'

module Jekyll
  # Liquid filter which returns an email address encoded as hex HTML entities
  # (to deter email harvesting)
  module Antispambot

    def antispambot(email)
      email_chars = email.split('')
      encoded_email = ''
      email_chars.each { |c|
        encoded_email += '&#x' + c.ord.to_s(16) + ';'
      }
      encoded_email
    end

  end
end

Liquid::Template.register_filter(Jekyll::Antispambot)
