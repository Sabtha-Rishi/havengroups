const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix ease: [x, y, z, w] to ease: [x, y, z, w] as any (or cast it) to bypass TS error in framer-motion
  if (content.includes('ease: [')) {
    content = content.replace(/ease:\s*\[([0-9.,\s]+)\]/g, 'ease: [$1] as any');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ease in:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'components/home'));
console.log('Done fixing framer-motion typing.');
