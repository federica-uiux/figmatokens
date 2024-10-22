const fs = require('fs');
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

try {
  // Leggiamo il contenuto del file styles.css
  const currentStyles = fs.readFileSync('styles.css', 'utf8');

  // Aggiungiamo la classe .container
  const updatedStyles = currentStyles + '\n' + containerStyles;

  // Sovrascriviamo il file con il nuovo contenuto
  fs.writeFileSync('styles.css', updatedStyles, 'utf8');
  console.log('.container styles added successfully!');
} catch (err) {
  console.error('Error while adding .container styles:', err);
}
