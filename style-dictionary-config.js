const StyleDictionary = require('style-dictionary');

StyleDictionary.extend({
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/',
      files: [{
        destination: 'styles.css',
        format: 'css/variables',
        options: {
          showFileHeader: false,
        }
      }]
    }
  }
}).buildAllPlatforms();
