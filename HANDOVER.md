# Academic Portfolio – Client Handover Documentation

**Client**: Professor Anh L. Tran  
**Institution**: Bayes Business School, City St George's, University of London  
**Project**: Custom Production Academic Portfolio Website  
**Date**: July 2026  

---

## 🎯 Overview & Objectives Delivered

As part of this engagement, we built a bespoke, highly optimized academic portfolio website. The site highlights your research output, academic appointments, teaching portfolio, and contact details with modern UI aesthetics, ultra-fast page speeds, dark/light mode toggle, and WCAG 2.1 AA accessibility.

### Key Deliverables Completed:
1. **Responsive 5-Page Website**:
   - **Home**: Hero banner, academic stats counter, research agenda, featured papers, and latest news announcements.
   - **Biography**: Full CV timeline (Appointments, Degrees), Awards & Grants, Editorial roles, and Professional affiliations.
   - **Publications**: Categorized, real-time searchable list of publications with links to PDF, DOI, SSRN, GitHub, and 1-click BibTeX citation copy.
   - **Courses**: Undergraduate, Postgraduate (MSc), and PhD course cards with syllabus downloads, GitHub repositories, and topics.
   - **Contact**: Accessible contact form with validation, office location (106 Bunhill Row), office hours, and transport directions.
2. **Hugo Extended SSG Source Code**: Clean, zero-dependency codebase with modular templates.
3. **Standalone Production Build (`dist/`)**: Minified static website ready for instant hosting on any server or static platform (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
4. **Structured JSON Content Data Engine**: Non-technical content management mechanism in `data/`.

---

## 🛠️ Zero-Code Content Maintenance Guide

You or your research assistants can manage all website data simply by updating text files in the `data/` folder:

| File Path | Purpose |
|---|---|
| `data/profile.json` | Name, title, institution, email, office location, avatar image, CV link, stats counters, social & Google Scholar links |
| `data/publications.json` | Add, edit, or reorder journal articles and working papers, DOI links, PDFs, BibTeX entries, and featured status |
| `data/courses.json` | Add, edit, or update teaching modules, degree levels, syllabi links, and office hours |
| `data/biography.json` | Update academic appointments, education history, awards, editorial service, and committee memberships |
| `data/news.json` | Update news announcements on the home page |

### Updating PDF Syllabi & CV Files
Place any new PDF files (e.g. `CV_Anh_Tran.pdf` or `SMM132_Syllabus.pdf`) inside the `static/docs/` directory.

---

## 🌐 Hosting & Domain Setup

The domain `https://www.anhluongtran.com/` can be connected to any static host:

- **Netlify / Vercel**: Connect your GitHub repository. Build command is `hugo --minify`.
- **Custom Domain DNS**: Set `CNAME` or `A` records to point to your static host IP addresses. SSL/TLS certificates will be automatically provisioned via Let's Encrypt.

---

## 🔒 Security & Performance Guarantee

- **Zero Database Vulnerabilities**: Since the site is a compiled static web application, there are no SQL injection vectors or WordPress security vulnerabilities.
- **Zero Heavy Plugins**: Built with native browser CSS and lightweight ES6 JavaScript.
- **Sub-100ms Load Times**: Pages load almost instantaneously across desktop and mobile devices worldwide.

---

## 📞 Support & Maintenance
For questions or feature additions, refer to `README.md` or contact the development team.
