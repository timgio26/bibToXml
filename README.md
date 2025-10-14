# 📚 BibTeX to XML Converter Web App

Convert BibTeX entries into Microsoft Word-compatible XML—right from your browser.

## 🧠 Why This Exists

Microsoft Word supports citation imports via XML, but platforms like Google Scholar only export in BibTeX format. This web app bridges the gap by converting BibTeX to Word-friendly XML.

## 🌐 Features

- 📝 Paste BibTeX text directly into the input box
- 🔗 Provide a URL to fetch BibTeX from supported sources
- ⚙️ Converts to clean XML format for Word citation manager
- 💡 Simple, fast, and no installation required

## 🚀 How to Use

1. Open the web app in your browser
2. Choose one of the input methods:
   - Paste BibTeX text
   - Enter a URL pointing to a `.bib` file or BibTeX snippet
3. Click **Convert**
4. Download or copy the generated XML

## 🛠️ Tech Stack

- Python (Flask or FastAPI backend)
- HTML/CSS/JavaScript frontend
- Optional: Gunicorn for production deployment

## 📦 Requirements (for local development)

```bash
pip install -r requirements.txt