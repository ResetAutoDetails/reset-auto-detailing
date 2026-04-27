const fs = require('fs');

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!key) {
  console.error('Error: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set.');
  process.exit(1);
}

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.replace(/%%GOOGLE_MAPS_API_KEY%%/g, key);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    console.log(`  injected key → ${file}`);
  }
});
console.log('Build complete.');
