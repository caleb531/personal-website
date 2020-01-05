require 'uri'
require 'uglifier'

# The list of scripts to uglify
scripts = ['assets/scripts/site.js']

# Uglify all designated scripts when building for a production environment
Jekyll::Hooks.register :site, :post_write do |site|

  if ENV['JEKYLL_ENV'] == 'production'
    scripts.each do |script_path_rel|
      script_path_abs = File.join(site.config['destination'], script_path_rel)
      File.write(script_path_abs, Uglifier.compile(File.read(script_path_rel)))
    end
  end

end
