const StyleDictionary = require('style-dictionary');

console.log('Starting Style Dictionary build...');

// Registriamo un transformer per gestire gli oggetti tipografici
StyleDictionary.registerTransform({
  name: 'typography/flatten',
  type: 'value',
  matcher: function(prop) {
    return typeof prop.value === 'object' && prop.value !== null;
  },
  transformer: function(prop) {
    // Se il valore è un oggetto, lo trasformiamo in proprietà CSS separate
    if (prop.value.fontFamily) {
      return `
        font-family: var(${prop.value.fontFamily.replace(/[{}]/g, '')});
        font-weight: var(${prop.value.fontWeight.replace(/[{}]/g, '')});
        line-height: var(${prop.value.lineHeight.replace(/[{}]/g, '')});
        font-size: var(${prop.value.fontSize.replace(/[{}]/g, '')});
        letter-spacing: var(${prop.value.letterSpacing.replace(/[{}]/g, '')});
      `.trim();
    }
    return prop.value;
  }
});

// Creiamo un nuovo gruppo di trasformazione
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css',
    'typography/flatten'
  ]
});

StyleDictionary.extend({
  source: ['./tokens.json'],
  parsers: [{
    pattern: /\.json$/,
    parse: ({ contents }) => {
      const tokens = JSON.parse(contents);
      return tokens.global || tokens;
    }
  }],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: './',
      files: [{
        destination: 'styles.css',
        format: 'css/variables',
        options: {
          showFileHeader: false,
          selector: ':root'
        }
      }]
    }
  }
}).buildAllPlatforms();

console.log('Style Dictionary build completed!');
