module Jekyll
  # Liquid filter which create PayPal donate URL from the given email address
  module DonateURL

    def donate_url(email)
      "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=#{email}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::DonateURL)
