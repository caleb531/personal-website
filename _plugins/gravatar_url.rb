require 'digest/md5'

module Jekyll
  # Liquid filter which returns Gravatar URL for the input email address
  module GetGravatarURL

    def gravatar_url(email, size)
      hash = Digest::MD5.hexdigest(email)
      "https://www.gravatar.com/avatar/#{hash}?s=#{size}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::GetGravatarURL)
