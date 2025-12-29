const babel = require('@babel/core');
const fs = require('fs');

const working = fs.readFileSync('backup/v1/v2/index.working.html', 'utf8');
const broken = fs.readFileSync('index.html', 'utf8');

// Get the scripts
const wMatch = working.match(/<script type="text\/babel">([\s\S]*)<\/script>\s*<\/body>/);
const bMatch = broken.match(/<script type="text\/babel">([\s\S]*)<\/script>\s*<\/body>/);

const wScript = wMatch[1];
const bScript = bMatch[1];

// Get differences using unified diff parsing
const wLines = wScript.split('\n');
const bLines = bScript.split('\n');

// Start with working, apply changes from broken one at a time
let testScript = wScript;
let workingInsertions = [];

// Find unique sections in broken file
let bIdx = 0;
let wIdx = 0;

while (bIdx < bLines.length && wIdx < wLines.length) {
  if (bLines[bIdx] === wLines[wIdx]) {
    bIdx++;
    wIdx++;
    continue;
  }

  // Found difference - this is either an insertion or a change
  // Collect consecutive different lines from broken
  const startB = bIdx;
  let insertedLines = [];

  // Check if this is an insertion (new lines in broken not in working)
  while (bIdx < bLines.length && (wIdx >= wLines.length || bLines[bIdx] !== wLines[wIdx])) {
    // Check if we can find a sync point
    let syncFound = false;
    for (let k = wIdx; k < Math.min(wIdx + 20, wLines.length); k++) {
      if (bLines[bIdx] === wLines[k]) {
        // Found sync point - the lines before were inserted
        syncFound = true;
        wIdx = k;
        break;
      }
    }
    if (syncFound) break;
    insertedLines.push(bLines[bIdx]);
    bIdx++;
  }

  if (insertedLines.length > 0) {
    workingInsertions.push({
      afterLine: wIdx,
      lines: insertedLines,
      firstLine: insertedLines[0].substring(0, 60)
    });
  }
}

console.log(`Found ${workingInsertions.length} insertions`);

// Test each insertion individually
for (let i = 0; i < workingInsertions.length; i++) {
  const insertion = workingInsertions[i];

  // Create test script with just this insertion
  const beforeLines = wLines.slice(0, insertion.afterLine);
  const afterLines = wLines.slice(insertion.afterLine);
  const testCode = beforeLines.join('\n') + '\n' + insertion.lines.join('\n') + '\n' + afterLines.join('\n');

  try {
    babel.parseSync(testCode, { presets: ['@babel/preset-react'], sourceType: 'script' });
  } catch(e) {
    console.log(`\n===== INSERTION ${i+1} BREAKS =====`);
    console.log(`After working line ${insertion.afterLine}, adds ${insertion.lines.length} lines`);
    console.log(`First line: ${insertion.firstLine}...`);
    console.log(`Error: ${e.message.split('\n')[0]}`);

    // Show the content
    console.log('\nInserted content:');
    insertion.lines.slice(0, 10).forEach((l, idx) => console.log(`  ${idx+1}: ${l.substring(0, 80)}`));
    if (insertion.lines.length > 10) console.log(`  ... and ${insertion.lines.length - 10} more lines`);
  }
}
