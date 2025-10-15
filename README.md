# 📚 BibTeX to XML Converter Web App
A web-based tool that converts BibTeX entries into Microsoft Word-compatible XML—right from your browser.

## 🧠 Why This Exists

Microsoft Word supports citation imports via XML, but platforms like Google Scholar and Semantic Scholar typically export citations in BibTeX format. This app bridges the gap by converting BibTeX into Word-friendly XML, making academic writing smoother and more efficient.

---

## 🌐 Features

- 📝 Paste BibTeX text directly into the input box
- 🔗 Provide a URL to fetch BibTeX from supported sources
- ⚙️ Converts to clean XML format compatible with Word’s citation manager
- 📥 Download the generated XML file instantly
- 🐳 Dockerized for easy setup and deployment

---

## 🚀 Quick Start with Docker Compose

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bibtex-to-xml-webapp.git
cd bibtex-to-xml-webapp
```
### 2. Run the App
```bash
docker-compose up --build
```
### 2. Open in Browser
Open your browser and visit: http://localhost/

