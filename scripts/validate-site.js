const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

const expectedFiles = [
  'index.html',
  'biography/index.html',
  'publications/index.html',
  'courses/index.html',
  'contact/index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'css/style.css',
  'js/main.js',
  'images/profile.webp'
];

console.log('--------------------------------------------------');
console.log('RUNNING AUTOMATED QA & INTEGRITY VERIFICATION');
console.log('--------------------------------------------------');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASSED: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAILED: ${message}`);
  }
}

// Test 1: Verify all key build output files exist
expectedFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  assert(fs.existsSync(filePath), `File build output exists: dist/${file}`);
});

// Test 2: Inspect index.html for SEO, Schema, and Semantic HTML
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

assert(/<header[^>]*class=["']?site-header["']?/i.test(indexHtml), 'Contains semantic <header> element');
assert(/<nav[^>]*aria-label=["']?Main Navigation["']?/i.test(indexHtml), 'Contains accessible <nav> element with aria-label');
assert(/<main[^>]*id=["']?main-content["']?/i.test(indexHtml), 'Contains semantic <main> element with skip-to-content target');
assert(/<footer[^>]*class=["']?site-footer["']?/i.test(indexHtml), 'Contains semantic <footer> element');
assert(/class=["']?skip-link["']?/i.test(indexHtml), 'Contains WCAG AA skip-to-content accessibility link');
assert(indexHtml.includes('schema.org'), 'Contains Schema.org Person JSON-LD microdata');
assert(indexHtml.includes('og:title'), 'Contains Open Graph meta title tag');
assert(indexHtml.includes('og:image'), 'Contains Open Graph meta image tag');
assert(indexHtml.includes('site.webmanifest'), 'Contains PWA Web Manifest reference');
assert(indexHtml.includes('theme-toggle'), 'Contains dark/light mode toggle control');

// Test 3: Inspect publications page for filter & BibTeX modal structure
const pubHtml = fs.readFileSync(path.join(distDir, 'publications', 'index.html'), 'utf8');
assert(/id=["']?pub-search["']?/i.test(pubHtml), 'Publications page contains real-time search bar');
assert(/pub-filter-tab/i.test(pubHtml), 'Publications page contains topic filter tabs');
assert(/btn-bibtex/i.test(pubHtml), 'Publications page contains BibTeX citation modal buttons');

// Test 4: Inspect courses page for level filter tabs
const courseHtml = fs.readFileSync(path.join(distDir, 'courses', 'index.html'), 'utf8');
assert(/course-filter-tab/i.test(courseHtml), 'Courses page contains degree level filter tabs');
assert(/Download Syllabus \(PDF\)/i.test(courseHtml), 'Courses page contains syllabus PDF external links');

// Test 5: Inspect contact page for accessible form
const contactHtml = fs.readFileSync(path.join(distDir, 'contact', 'index.html'), 'utf8');
assert(/id=["']?academic-contact-form["']?/i.test(contactHtml), 'Contact page contains academic contact form');
assert(/form-error/i.test(contactHtml), 'Contact page contains accessible field error message containers');

console.log('--------------------------------------------------');
console.log(`QA RESULTS: ${passedTests}/${totalTests} TESTS PASSED CLEANLY.`);
console.log('--------------------------------------------------');

if (passedTests !== totalTests) {
  process.exit(1);
}
