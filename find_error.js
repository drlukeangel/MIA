const babel = require('@babel/core');
const fs = require('fs');

const working = fs.readFileSync('backup/v1/v2/index.working.html', 'utf8');
const broken = fs.readFileSync('index.html', 'utf8');

const wMatch = working.match(/<script type="text\/babel">([\s\S]*)<\/script>\s*<\/body>/);
const bMatch = broken.match(/<script type="text\/babel">([\s\S]*)<\/script>\s*<\/body>/);

// Verify working parses
try {
  babel.parseSync(wMatch[1], { presets: ['@babel/preset-react'], sourceType: 'script' });
  console.log('Working file parses OK');
} catch(e) {
  console.log('Working file error:', e.message);
  process.exit(1);
}

// Get the diff hunks
const wLines = wMatch[1].split('\n');
const bLines = bMatch[1].split('\n');

// Find sections that are different and test adding each
let i = 0, j = 0;
let testContent = wMatch[1];

console.log('Finding differing sections...');

while (i < wLines.length && j < bLines.length) {
  if (wLines[i] === bLines[j]) {
    i++; j++;
    continue;
  }

  // Found a difference - collect the new content from broken
  let newContent = [];
  let startJ = j;

  // Find where they sync up again
  while (j < bLines.length) {
    // Check if this line exists in working file nearby
    let foundSync = false;
    for (let k = i; k < Math.min(i + 50, wLines.length); k++) {
      if (bLines[j] === wLines[k]) {
        // Found sync point
        i = k;
        foundSync = true;
        break;
      }
    }
    if (foundSync) break;
    newContent.push(bLines[j]);
    j++;
  }

  if (newContent.length > 0 && newContent.length < 100) {
    console.log(`\nDiff at line ${startJ+1}: ${newContent.length} new lines`);
    console.log('First line:', newContent[0]?.substring(0, 80));

    // Test if adding this content breaks the file
    // Insert at the right position
    const insertPoint = wLines.slice(0, i).join('\n');
    const testCode = insertPoint + '\n' + newContent.join('\n') + '\n' + wLines.slice(i).join('\n');

    try {
      babel.parseSync(testCode, { presets: ['@babel/preset-react'], sourceType: 'script' });
    } catch(e) {
      console.log('  ^^^ THIS SECTION CAUSES ERROR:', e.message.split('\n')[0]);
    }
  }

  if (newContent.length === 0) {
    i++; j++;
  }
}

console.log('\nDone analyzing');
