exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: 'MarkdownRemark',
      fields: {
        icon: {
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
                  fields: { id: { eq: source.fields.id } }
                }
              }
            });
          }
        }
      }
    })
  ];
  createTypes(typeDefs);
};
