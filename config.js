const StyleDictionary = require('style-dictionary');

// Aggiungiamo logging per debug
console.log('Starting Style Dictionary build...');

// Configuriamo Style Dictionary per gestire la struttura specifica del tuo JSON
StyleDictionary.extend({
  source: ['./tokens.json'], // Percorso esplicito
  parsers: [{
    pattern: /\.json$/,
    parse: ({ contents }) => {
      // Estraiamo solo la parte 'global' dal JSON
      const tokens = JSON.parse(contents);
      return tokens.global || tokens;
    }
  }],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: './',  // Generiamo direttamente nella root
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

console.log('Style Dictionary build completed!');
// Aggiungiamo la classe .container al file styles.css
const containerStyles = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}\n`;

fs.appendFileSync('styles.css', containerStyles, 'utf8');
console.log('.container styles added!');
