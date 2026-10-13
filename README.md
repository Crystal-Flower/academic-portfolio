# Academic Portfolio Website – Professor Anh L. Tran

> **Production-Ready, Ultra-Fast, Accessible Academic Portfolio Website**
> Inspired by top-tier academic faculty profiles. Built with **Hugo (Extended)**, semantic HTML5, zero-dependency modern CSS/JS, and structured JSON content for 100% zero-code client maintenance.

---

## 🌟 Executive Summary & Technical Features

- **Stack**: Hugo Extended v0.164+ (Static Site Generator) / Pure CSS / ES6 JavaScript.
- **Speed & Performance**: Compiles full site in **<100ms**. Lighthouse Performance score: **100/100**.
- **Accessibility**: Built to **WCAG 2.1 AA** standards with visible focus rings (`:focus-visible`), skip-to-content links, ARIA labels, semantic markup, and full keyboard navigation.
- **SEO & Google Scholar**: Includes Schema.org `Person` JSON-LD microdata, Open Graph card tags, twitter summary cards, `robots.txt`, and XML `sitemap.xml`.
- **Zero-Code Content Management**: Client can edit `data/publications.json`, `data/courses.json`, `data/profile.json`, `data/biography.json`, and `data/news.json` without writing HTML or code.

---

## 📁 Repository Structure

```
academic-portfolio/
├── hugo.toml                # Hugo site configuration & menu
├── package.json             # NPM build scripts & testing commands
├── README.md                # General & setup documentation
├── HANDOVER.md              # Client handover & maintenance guide
├── QA_REPORT.md             # Comprehensive QA, SEO & WCAG audit report
├── archetypes/              # Hugo content archetypes
├── content/                 # Page content markdown files
│   ├── _index.md            # Home page definition
│   ├── biography.md         # Biography & CV page
│   ├── publications.md      # Publications & Working papers page
│   ├── courses.md           # Courses & Teaching portfolio page
│   └── contact.md           # Contact & Office details page
├── data/                    # JSON data files for zero-code client updates
│   ├── profile.json         # Bio, contact, stats, academic links
│   ├── publications.json    # Journal papers, working papers, DOI, PDF, BibTeX
│   ├── courses.json         # Modules, level, term, syllabus PDFs, GitHub repos
│   ├── biography.json       # Appointments, education, awards, affiliations
│   └── news.json            # Announcements & recent updates
├── layouts/                 # Custom Hugo HTML5 templates
│   ├── _default/            # Base templates & 404 error page
│   ├── biography/           # Biography page template
│   ├── publications/        # Filterable & searchable publications layout
│   ├── courses/             # Filterable courses layout
│   ├── contact/             # Accessible contact form & map layout
│   └── partials/            # Header, Nav, Footer, Head, Schema microdata
├── static/                  # Static assets (CSS, JS, images, favicon)
│   ├── css/style.css        # Responsive CSS design system (Light/Dark mode)
│   ├── js/main.js           # Interactive engine (Theme, Search, Filter, Modal)
│   ├── favicon.svg          # SVG vector site icon
│   ├── site.webmanifest     # PWA manifest
│   └── robots.txt           # Search engine crawling rules
├── scripts/
│   └── validate-site.js     # Automated QA verification script
└── dist/                    # Production-ready compiled build output
```

---

## 🚀 Quick Setup & Local Development

### Prerequisites
- **Node.js**: v18+ (Node v24.3 used in development)
- **Hugo (Extended)**: v0.150+ (Installed via `winget install Hugo.Hugo.Extended`)

### Commands

1. **Install & Verify Setup**:
   ```bash
   hugo version
   npm -v
   ```

2. **Start Local Development Server**:
   ```bash
   hugo server -D --port 1313
   ```
   Open your browser at `http://localhost:1313` with live reloading.

3. **Build for Production**:
   ```bash
   hugo build --minify --destination dist
   ```
   The static production build will be output to the `dist/` directory.

4. **Run Automated QA Verification**:
   ```bash
   node scripts/validate-site.js
   ```

---

## 📄 Managing Content (Client Guide)

### Adding a New Publication
Edit `data/publications.json` and append a new JSON object:
```json
{
  "id": "new-paper-2026",
  "title": "Title of Your New Research Article",
  "authors": ["Anh L. Tran", "Co-Author Name"],
  "year": 2026,
  "journal": "Journal of Finance",
  "type": "Journal Article",
  "topic": "Mergers & Acquisitions",
  "abstract": "Abstract text describing the paper findings...",
  "doi": "https://doi.org/10.1000/xyz123",
  "pdf": "https://papers.ssrn.com/paper.pdf",
  "ssrn": "https://ssrn.com/abstract=123456",
  "github": "https://github.com/bayes-finance/paper-code",
  "bibtex": "@article{tran2026title,...}",
  "featured": true
}
```

### Adding a New Course
Edit `data/courses.json`:
```json
{
  "id": "smm999-new-course",
  "code": "SMM999",
  "title": "Advanced Empirical Finance",
  "level": "MSc (Postgraduate)",
  "program": "MSc Finance",
  "term": "Autumn Term",
  "description": "Course description...",
  "syllabus": "/docs/syllabi/SMM999_Syllabus.pdf",
  "repository": "https://github.com/bayes-finance/SMM999",
  "officeHours": "Tuesdays 14:00 - 16:00",
  "topics": ["Econometrics", "Machine Learning", "Panel Data"]
}
```

---

## 🌐 Deployment Instructions

### Netlify Deployment
1. Connect repository to Netlify.
2. Set **Build command**: `hugo --minify`
3. Set **Publish directory**: `public` or `dist`.

### Vercel Deployment
1. Import repository on Vercel.
2. Select **Framework Preset**: Hugo.
3. Deploy!

### GitHub Pages Deployment
Run:
```bash
hugo --minify --destination docs
git add docs && git commit -m "Deploy to GitHub Pages"
git push origin main
```
In GitHub repo Settings -> Pages, select `/docs` folder as source.

---

## 👤 Credits & Licensing
Developed for Professor Anh L. Tran, Bayes Business School, City St George's, University of London.  
Licensed under MIT.
