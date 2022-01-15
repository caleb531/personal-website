const { register } = require('esbuild-register/dist/node');

// Enable Gatsby to recognize TypeScript gatsby-* API files
register({ target: 'node16' });

module.exports = require('./gatsby-config.ts');
