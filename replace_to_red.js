const fs = require('fs');
const path = require('path');

const RED = '#E52521';
const RED_TINT = '#FF4D4D';
const RED_HOVER = '#cc1c18';
const RED_RGB = '229, 37, 33';

function replaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let originalContent = content;

      // Hex codes
      content = content.replace(/#eb8f24/gi, RED);
      content = content.replace(/#ffb459/gi, RED_TINT);
      content = content.replace(/#FF6A1A/gi, RED);
      content = content.replace(/#FFB27A/gi, RED_TINT);
      content = content.replace(/#d17c1b/gi, RED_HOVER); // Orange hover -> Red hover
      content = content.replace(/#e65a12/gi, RED_HOVER); // Another orange hover

      // RGBA replacements
      content = content.replace(/235,\s*143,\s*36/g, RED_RGB);
      content = content.replace(/255,\s*106,\s*26/g, RED_RGB);

      // Tailwind orange classes -> red
      content = content.replace(/bg-orange-/g, 'bg-red-');
      content = content.replace(/text-orange-/g, 'text-red-');
      content = content.replace(/border-orange-/g, 'border-red-');
      content = content.replace(/ring-orange-/g, 'ring-red-');
      content = content.replace(/from-orange-/g, 'from-red-');
      content = content.replace(/to-orange-/g, 'to-red-');
      content = content.replace(/via-orange-/g, 'via-red-');
      
      // CSS variables and classes
      content = content.replace(/--color-orange/g, '--color-red');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'app'));
replaceInDir(path.join(__dirname, 'components'));
replaceInDir(path.join(__dirname, 'lib'));
console.log('Done');
