const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Create App icons directory in public
const appIconsDir = path.join(publicDir, 'App icons');
if (!fs.existsSync(appIconsDir)) {
  fs.mkdirSync(appIconsDir);
}

// Copy all files from App icons to public/App icons
const sourceAppIconsDir = path.join(__dirname, 'App icons');
if (fs.existsSync(sourceAppIconsDir)) {
  const files = fs.readdirSync(sourceAppIconsDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceAppIconsDir, file);
    const destPath = path.join(appIconsDir, file);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file} to public/App icons`);
  });
} else {
  console.error('Source App icons directory not found!');
} 