const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace text inputs for hero_image_url with FileUpload
  if (content.includes('hero_image_url')) {
    if (content.match(/<input value=\{form\.hero_image_url\} onChange=\{\(e\) => set\('hero_image_url', e\.target\.value\)\}.*?\/>/)) {
      if (!content.includes('import { FileUpload }')) {
        content = content.replace(/import \{.*?\} from 'lucide-react'/, "$&\nimport { FileUpload } from '@/components/admin/FileUpload'");
      }
      content = content.replace(
        /<Field label="Hero Image URL">\s*<input value=\{form\.hero_image_url\} onChange=\{\(e\) => set\('hero_image_url', e\.target\.value\)\}.*?\/>\s*<\/Field>/,
        `<FileUpload label="Hero Image URL" value={form.hero_image_url} onChange={(url) => set('hero_image_url', url)} />`
      );
      changed = true;
    }
  }

  if (content.includes('thumbnail_url')) {
    if (content.match(/<input value=\{form\.thumbnail_url\} onChange=\{\(e\) => set\('thumbnail_url', e\.target\.value\)\}.*?\/>/)) {
      if (!content.includes('import { FileUpload }')) {
        content = content.replace(/import \{.*?\} from 'lucide-react'/, "$&\nimport { FileUpload } from '@/components/admin/FileUpload'");
      }
      content = content.replace(
        /<Field label="Thumbnail URL">\s*<input value=\{form\.thumbnail_url\} onChange=\{\(e\) => set\('thumbnail_url', e\.target\.value\)\}.*?\/>\s*<\/Field>/,
        `<FileUpload label="Thumbnail URL" value={form.thumbnail_url} onChange={(url) => set('thumbnail_url', url)} />`
      );
      changed = true;
    }
  }

  if (content.includes('photo_url')) {
    if (content.match(/<input value=\{form\.photo_url\} onChange=\{\(e\) => set\('photo_url', e\.target\.value\)\}.*?\/>/)) {
      if (!content.includes('import { FileUpload }')) {
        content = content.replace(/import \{.*?\} from 'lucide-react'/, "$&\nimport { FileUpload } from '@/components/admin/FileUpload'");
      }
      content = content.replace(
        /<Field label="Photo URL">\s*<input value=\{form\.photo_url\} onChange=\{\(e\) => set\('photo_url', e\.target\.value\)\}.*?\/>\s*<\/Field>/,
        `<FileUpload label="Photo URL" value={form.photo_url} onChange={(url) => set('photo_url', url)} />`
      );
      changed = true;
    }
  }
  
  if (content.includes('media_url')) {
    if (content.match(/<input value=\{form\.media_url\} onChange=\{\(e\) => set\('media_url', e\.target\.value\)\}.*?\/>/)) {
      if (!content.includes('import { FileUpload }')) {
        content = content.replace(/import \{.*?\} from 'lucide-react'/, "$&\nimport { FileUpload } from '@/components/admin/FileUpload'");
      }
      content = content.replace(
        /<Field label="Media URL \(Video\/Audio\)">\s*<input value=\{form\.media_url\} onChange=\{\(e\) => set\('media_url', e\.target\.value\)\}.*?\/>\s*<\/Field>/,
        `<FileUpload label="Media URL (Video/Audio)" value={form.media_url} onChange={(url) => set('media_url', url)} accept="video/*,audio/*" />`
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'app/admin'));
console.log('Done mapping FileUploads.');
