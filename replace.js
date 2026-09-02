const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /logoUrl=\{settings\.logo_url\}/g;
      const regex2 = /logoUrl=\{\s*settings\.logo_url\s*\}/g;
      
      let modified = false;
      if (regex.test(content) || regex2.test(content)) {
        content = content.replace(regex, 'lightLogoUrl={settings.light_logo_url}\n        darkLogoUrl={settings.dark_logo_url}');
        content = content.replace(regex2, 'lightLogoUrl={settings.light_logo_url}\n        darkLogoUrl={settings.dark_logo_url}');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'app'));
replaceInDir(path.join(__dirname, 'components'));
console.log('Done');
