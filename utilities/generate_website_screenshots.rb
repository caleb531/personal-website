#!/usr/bin/env ruby

require 'fileutils'
require 'front_matter_parser'

chrome_path = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
website_image_dir = 'assets/images/websites'
resize_image_dir = 'assets/resized'
website_image_extension='jpg'
window_width = 1024
window_height = 640

# Create website image directory if it doesn't already exist
FileUtils.mkdir_p(website_image_dir)
# Remove existing directory containing resized images
FileUtils.remove_dir(resize_image_dir, force=true)

# Generate screenshot for each portfolio website that has configuration
Dir.glob('_websites/*.md') do |website_config_file|

  website_name = File.basename(website_config_file, '.md')
  puts "generating screenshot for #{website_name}"

  parsed = FrontMatterParser::Parser.parse_file(website_config_file)
  system("""#{chrome_path} \
    --headless \
    --disable-gpu \
    --window-size=#{window_width},#{window_height} \
    --hide-scrollbars \
    --screenshot=#{website_image_dir}/#{website_name}.#{website_image_extension} \
    #{parsed['direct_url']}
  """)

end
