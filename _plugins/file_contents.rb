module Jekyll
  # Liquid filter which returns the contents of the file at the given path
  module GetFileContents

    def file_contents(file_path)
      file = File.open(".#{file_path}", 'r')
      begin
        return file.read
      ensure
        file.close
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::GetFileContents)
