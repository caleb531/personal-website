require 'digest/md5'

module Jekyll
  # Liquid filter which returns Gravatar URL for the input email address
  module GetGravatarURL

    private :hash

    # Compute md5 hash for the given email address
    def hash(email)
      email_address = email ? email.downcase.strip : ''
      Digest::MD5.hexdigest(email_address)
    end

    # Build Gravatar URL for the given email address
    def get_gravatar_url(email, size)
      "https://www.gravatar.com/avatar/#{hash(email)}?s=#{size}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::GetGravatarURL)
