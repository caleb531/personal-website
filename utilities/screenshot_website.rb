#!/usr/bin/env ruby

require 'fileutils'
require 'front_matter_parser'

chrome_path = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
website_image_dir = 'assets/images/websites'
resize_image_dir = 'assets/images/resized'
website_image_extension='jpg'
window_width = 1024
window_height = 640
# The delay (in milliseconds) to wait before taking the screenshot
screenshot_delay = 1000

# Create website image directory if it doesn't already exist
FileUtils.mkdir_p(website_image_dir)
# Remove existing directory containing resized images
FileUtils.remove_dir(resize_image_dir, force=true)

# Generate screenshot for the specified file path(s); otherwise, default to
# every file in the _websites directory
website_config_files = ARGV
if website_config_files.empty?
  website_config_files = Dir.glob('_websites/*.md')
end

# Generate screenshot for each portfolio website that has configuration
website_config_files.each do |website_config_file|

  website_name = File.basename(website_config_file, '.md')
  puts "generating screenshot for #{website_name}"

  parsed = FrontMatterParser::Parser.parse_file(website_config_file)
  system("""#{chrome_path} \
    --headless \
    --disable-gpu \
    --disk-cache-dir=/dev/null \
    --window-size=#{window_width},#{window_height} \
    --hide-scrollbars \
    --virtual-time-budget=#{screenshot_delay} \
    --screenshot=#{website_image_dir}/#{website_name}.#{website_image_extension} \
    #{parsed['direct_url']}
  """)

end
