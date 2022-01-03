// Attach additional field to each GraphQL node (source:
// https://stackoverflow.com/a/53563503/560642)
exports.createResolvers = function ({ createResolvers }) {
  createResolvers({
    MarkdownRemark: {
      entryIcon: {
        type: 'File',
        resolve: (source, args, context, info) => {
          return context.nodeModel.findOne({
            type: 'File',
            query: {
              filter: {
                // Icon must be an SVG file
                extension: { eq: 'svg' },
                // Icon must have the same filename (minus extension) as the
                // Markdown file
                fields: { entryId: { eq: source.fields.entryId } }
              }
            }
          });
        }
      }
    }
  });
};
