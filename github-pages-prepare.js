/**
 * This script prepares the build output for GitHub Pages deployment
 * - Creates 404.html from index.html for SPA routing
 * - Adds base tag to set the correct base path for GitHub Pages
 * 
 * Usage: node github-pages-prepare.js [repository-name]
 * Example: node github-pages-prepare.js crimson-adventure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get repository name from command line args
const repoName = process.argv[2] || '';
if (!repoName) {
  console.error('Please provide repository name as argument');
  console.error('Example: node github-pages-prepare.js crimson-adventure');
  process.exit(1);
}

// Periksa lokasi build output dari Vite (biasanya dist atau dist/public)
let distDir;
const rootDistDir = path.join(__dirname, 'dist');
const publicDistDir = path.join(__dirname, 'dist/public');

if (fs.existsSync(publicDistDir) && fs.existsSync(path.join(publicDistDir, 'index.html'))) {
  console.log('✓ Found build output in dist/public directory');
  distDir = publicDistDir;
} else if (fs.existsSync(rootDistDir) && fs.existsSync(path.join(rootDistDir, 'index.html'))) {
  console.log('✓ Found build output in dist directory');
  distDir = rootDistDir;
} else {
  console.error('Could not find build output directory with index.html. Please run build first.');
  process.exit(1);
}

// File paths
const indexHtmlPath = path.join(distDir, 'index.html');
const notFoundHtmlPath = path.join(distDir, '404.html');

// Check if index.html exists
if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in the dist directory. Please run build first.');
  process.exit(1);
}

// Read index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Add base tag if not already present
if (!indexHtml.includes('<base href')) {
  indexHtml = indexHtml.replace(
    '<head>',
    `<head>\n  <base href="/${repoName}/">`
  );
  
  // Fix asset paths - src="/assets/..." should be src="assets/..."
  indexHtml = indexHtml.replace(/src="\/assets\//g, 'src="assets/');
  indexHtml = indexHtml.replace(/href="\/assets\//g, 'href="assets/');
  
  // Write modified index.html
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log(`✓ Added base tag to index.html for repository: ${repoName}`);
  console.log(`✓ Fixed asset paths to be relative`);
}

// Create 404.html from index.html
fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
console.log('✓ Created 404.html from index.html');

console.log('✓ Build prepared for GitHub Pages deployment');