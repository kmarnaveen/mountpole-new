
const fs = require('fs');
const content = fs.readFileSync('lib/brands.ts', 'utf8');

const idRegex = /id:\s*"([^"]+)"/g;
let match;
const ids = new Map();
const duplicates = [];

while ((match = idRegex.exec(content)) !== null) {
  const id = match[1];
  if (ids.has(id)) {
    duplicates.push(id);
  } else {
    ids.set(id, true);
  }
}

if (duplicates.length > 0) {
  console.log("Found duplicate IDs:", duplicates);
} else {
  console.log("No duplicate IDs found.");
}
