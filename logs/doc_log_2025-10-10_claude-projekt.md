# Log: H2me Webpage

## 2025-10-10 - Claude Projekt-Anweisungen für 153_H2me erstellt

**Chat:** "Claude language settings in German"

**Thema:** Projekt-spezifische Anweisungen für H2me Web-Projekt erstellt

**Was wurde erreicht:**

### Claude-Projekt-Anweisungen erstellt
- **claude_projekt.md** im Projekt-Ordner erstellt
- **Project Knowledge** Text-Snippet für schnellen Zugriff
- Vollständige Dokumentation für Claude-Arbeit an diesem Projekt

**Speicherort:**
- `E:\Neuanfang\a_yang\153_H2me\claude_projekt.md`

### Inhalt dokumentiert

**Projekt-Kontext:**
- Live auf https://h2m.art
- Netlify Hosting
- Yin/Yang/Bian-Philosophie als Kern-Konzept

**Ordner-Struktur:**
- Landing Page: `index.html` (9-Button-Navigation)
- Unterseiten: `page_*.html`
- Shared Components: `shared_*.css/js`
- Seiten-spezifisch: `page_*.css/js`
- Medien: `media/` mit Unterordnern
- Dokumentation: `doc_*.md`

**Aktuelle Seiten:**
- `page_yang.html`, `page_bian.html`, `page_yin.html` (Philosophie-Bereiche)
- `page_graph.html`, `page_cytoscape.html`, `page_flsdgrm.html` (Visualisierungen)
- `page_3dmodel.html` (3D-Model-Viewer)

**Shared Components:**
- `shared_global.css` - Basis-Styling
- `shared_nav.*` - Navigation (⚠️ noch mit `-`, wird zu `_` migriert)
- `shared_graph.*` - Graph-Visualisierung (⚠️ noch mit `-`, wird zu `_` migriert)

**Technologie-Stack:**
- Frontend: Vanilla HTML/CSS/JS
- 3D: Three.js
- Graph: Cytoscape.js, D3.js
- Hosting: Netlify

### Workflows definiert

**1. Neue Seite erstellen:**
- Template von bestehender Seite kopieren
- Als `page_[name].html` benennen
- CSS/JS erstellen bei Bedarf
- Navigation in `shared_nav.html` updaten
- Lokal testen → Deploy → Online testen

**2. Shared Component erstellen:**
- Erst ab 2+ Nutzungen
- Code aus `page_*.css/js` extrahieren
- In `shared_[feature].css/js` verschieben
- Beide Seiten updaten und testen

**3. Deployment:**
- Lokal testen (ALLE betroffenen Seiten)
- Netlify: Sites → 153_H2me → Deploy
- Drag & Drop ganzer Ordner
- Online testen auf h2m.art

**4. Backup:**
- Vor größeren Änderungen Ordner-Snapshot in `archives/`
- Benennen: `old_h2me_YYYY-MM-DD/`

### Namenskonventionen geklärt

**Aktuelle Konventionen:**
- HTML: `page_[name].html`, `index.html`
- CSS: `shared_[feature].css`, `page_[name].css`
- JS: `shared_[feature].js`, `page_[name].js`
- Docs: `doc_[typ].md`
- Underscore `_` für alle Trennungen

**Refactoring-Status:**
- ⚠️ Einige alte Files noch mit `-` statt `_`
- Schrittweise Migration läuft
- Siehe `doc_tasks.md` → "Technische Schulden / Refactoring"

### Typische Aufgaben dokumentiert

**"Erstelle neue Seite [X]":**
- Konzept klären → Technologie vorschlagen → Code erstellen → Integration erklären

**"Erweitere Seite [Y] mit [Feature]":**
- Aktuellen Code verstehen → Änderungsplan → Implementation → Refactoring-Hinweis

**"Bug auf Seite [Z]":**
- Debugging-Fragen → Code prüfen → Root Cause finden → Minimaler Fix → Verify

### Kommunikations-Präferenzen festgelegt

- Erklärungen: High-Level first, dann Details, WARUM betonen
- Bei Komplexität (>5 Schritte): Plan vorlegen vor Umsetzung
- Bei Unsicherheit: Ehrlich kommunizieren, Alternativen anbieten
- Code-Stil: Kommentare bei komplexer Logik, beschreibende Namen

### Don'ts definiert

❌ Absolute Pfade (`/media/`)  
❌ Alle Files auf einmal umbenennen  
❌ Frameworks ohne Diskussion  
❌ localStorage ohne Rückfrage  
❌ Deploy ohne lokales Testing

**Dateien:**
- `E:\Neuanfang\a_yang\153_H2me\claude_projekt.md` erstellt
- Project Knowledge Text-Snippet als Artifact

**Status:** 
- Vollständige Projekt-Anweisungen dokumentiert
- Bereit für Claude-Arbeit am Projekt
- Refactoring-Status transparent

**Verwandte Dateien:**
- `doc_struktur.md` - Menschenlesbare Projekt-Übersicht
- `doc_tasks.md` - Todo-Liste & Refactoring-Tracker
- `doc_deployment.md` - Netlify Hosting-Infos
- `doc_glossar.md` - Technische Begriffe

**Besonderheiten:**
- Design soll organisch/künstlerisch sein (nicht corporate)
- Yin/Yang/Bian-Philosophie als Kern-Konzept
- Experimentelle Features (3D, Graph-Viz)
- Mobile-first approach

---
