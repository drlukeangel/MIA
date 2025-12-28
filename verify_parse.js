const babel = require('@babel/core');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*)<\/script>\s*<\/body>/);

if (!match) {
  console.log('No babel script found');
  process.exit(1);
}

try {
  babel.parseSync(match[1], { presets: ['@babel/preset-react'], sourceType: 'script' });
  console.log('SUCCESS - index.html parses correctly');
} catch(e) {
  console.log('ERROR:', e.message);
  process.exit(1);
}
