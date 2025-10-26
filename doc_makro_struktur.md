# H2me - Projektübersicht & Struktur

**Was ist H2me?** Eine persönliche Website auf h2m.art, die deine Yin/Yang/Bian-Philosophie visualisiert und interaktiv erlebbar macht.

**Status:** Live auf https://h2m.art  
**Letzte Aktualisierung:** 2025-10-24

---

## 🎯 Worum geht's?

H2me ist deine persönliche Website, die:
- Deine Philosophie (Yin/Yang/Bian) visuell darstellt
- Verschiedene Darstellungsformen nutzt (2D-SVG, 3D-Volumen, Text)
- Experimentelle Navigation bietet (9-Button-Grid, Graph-Visualisierungen)
- Offen ist für zukünftige Erweiterungen (Dashboard, 3D-Navigation)

**Design-Philosophie:** Organisch, künstlerisch, spielerisch - keine klassische "Corporate"-Website.

---

## 📁 Wie ist das Projekt aufgebaut?

### Flache Struktur = Einfach & übersichtlich

Alle wichtigen Dateien liegen direkt im Hauptordner, nicht verschachtelt in Unterordnern.

```
153_H2me/
├── index.html                    # Startseite (9-Button-Navigation)
├── page-yang.html                # Yang-Seite
├── page-bian.html                # Bian-Seite  
├── page-yin.html                 # Yin-Seite
├── page-graph.html               # Graph-Visualisierung
├── page-cytoscape.html           # Alternative Graph-Darstellung
├── page-3dmodel.html             # 3D-Model-Viewer
│
├── shared-global.css             # Basis-Styling für alle Seiten
├── shared-nav.css/js/html        # Navigation (oben mit Mini-Graph)
├── shared-graph.css/js           # Graph-Visualisierung
├── shared-representation-switcher.css/js  # Umschalten zwischen Darstellungen
├── shared-theme.js               # Theme-Management
│
├── page-*.css/js                 # Seiten-spezifische Styles & Scripts
│
├── images/                       # Bilder (SVGs, PNGs)
├── media/                        # Andere Medien (Videos, 3D-Modelle)
├── logs/                         # Session-Logs (ausführlich)
├── archives/                     # Alte Versionen, abgeschlossene Projekte
├── components/                   # In Entwicklung befindliche Komponenten
│
└── doc_*.md                      # Dokumentationen (für Menschen & Claude)
```

---

## 🧩 Namenskonventionen

### HTML-Seiten
- **Startseite:** `index.html` (Standard für Web)
- **Unterseiten:** `page-[name].html`
  - Beispiel: `page-yang.html`, `page-graph.html`
  - Hyphen `-` weil das Web-Standard ist

### Styling (CSS)
- **Global:** `shared-global.css` (Basis für alle Seiten)
- **Komponenten:** `shared-[feature].css` (Navigation, Graph, etc.)
- **Seiten-spezifisch:** `page-[name].css` (nur für diese Seite)

### Funktionen (JavaScript)
- **Komponenten:** `shared-[feature].js` (Navigation, Theme, etc.)
- **Seiten-spezifisch:** `page-[name].js` (nur für diese Seite)

### Dokumentation
- **Für Menschen & Claude:** `doc_[thema].md`
- **Subprojekte:** `doc_[subprojekt]_[typ].md`
  - Beispiel: `doc_dashboard_planung.md`, `doc_geonav_roadmap.md`

---

## 🎨 Wie funktioniert das Design-System?

### Yin/Yang/Bian Farben
Die drei philosophischen Bereiche haben eigene Farbwelten:
- **Yang:** Warm, aktiv, nach außen gerichtet
- **Bian:** Verbindend, transformierend, zwischen den Polen
- **Yin:** Kühl, passiv, nach innen gerichtet

Diese Farben werden über CSS-Variablen gesteuert (in `shared-global.css`).

### Verschiedene Darstellungsformen
Auf den Yin/Yang/Bian-Seiten kannst du zwischen 3 Darstellungen wechseln:
1. **SVG:** Flache, künstlerische Icons (Standard)
2. **3D-Volumen:** Interaktive 3D-Objekte (Three.js)
3. **Text:** Beschreibungen in Worten

Die Auswahl wird im Browser gespeichert (localStorage) und bleibt erhalten.

---

## 🛠️ Technologien (Was wird verwendet?)

### Basis
- **HTML/CSS/JavaScript:** Die Grundlagen des Web
- **Kein Framework:** Alles "von Hand" gebaut für maximale Kontrolle

### Spezielle Bibliotheken
- **Three.js:** Für 3D-Modelle und 3D-Darstellungen
- **Cytoscape.js:** Für Graph-Visualisierungen
- **D3.js:** Für weitere Visualisierungen (später)

### Hosting & Deployment
- **Netlify:** Kostenlos, automatisches HTTPS, sehr schnell (CDN)
- **Domain:** h2m.art (bei Namecheap gekauft)
- **Deployment:** Manuell via Drag & Drop (später evtl. Git)

---

## 🌱 Wie wächst das Projekt?

### Komponenten-System
Neue Features werden erst **einmal** auf einer Seite gebaut. Wenn sie auf einer **zweiten** Seite gebraucht werden, werden sie zu einem "Shared Component" extrahiert.

**Beispiel:**
1. Navigation wird auf `page-yang.html` gebaut
2. Wird auch für `page-bian.html` gebraucht
3. → Wird zu `shared-nav.css/js` extrahiert
4. Beide Seiten laden jetzt das Shared Component

**Warum so?** Keine Features "auf Vorrat" bauen - nur was wirklich gebraucht wird.

### Aktuelle Subprojekte

**Dashboard (in Planung):**
- Zentrale Übersicht über Obsidian-Daten und Nextcloud-Kalender
- Siehe: `doc_dashboard_planung.md`, `doc_dashboard_roadmap.md`

**Geometrische Navigation (Konzept):**
- Alternative 3D-Navigation via geometrische Körper (Würfel, Tetraeder, etc.)
- Siehe: `doc_geonav_haeppchen_poc.md`, `doc_geonav_roadmap.md`

---

## 🔄 Workflow: Wie wird gearbeitet?

### Neue Seite erstellen
1. Ähnliche bestehende Seite als Template kopieren
2. Umbenennen: `page-[name].html`
3. Anpassen: Inhalt, Styling, Funktionen
4. Lokal testen (Doppelklick auf HTML-Datei)
5. Auf Netlify deployen (Drag & Drop des ganzen Ordners)
6. Online testen: https://h2m.art

### Bestehende Seite erweitern
1. Änderungen machen
2. Lokal testen
3. Deployen
4. Online testen

### Backup vor großen Änderungen
Vor Refactoring oder großen Umbauten: Ganzen Ordner kopieren nach `archives/old_h2me_YYYY-MM-DD_[beschreibung]/`

---

## 📚 Wichtige Dokumentationen

### Für alltägliche Arbeit
- **claude_projekt.md** - Technische Anweisungen für Claude
- **doc_changelog.md** - Was hat sich wann geändert?
- **doc_glossar.md** - Erklärungen technischer Begriffe

### Für Subprojekte
- **Dashboard:** `doc_dashboard_planung.md`, `doc_dashboard_roadmap.md`
- **GeoNav:** `doc_geonav_haeppchen_poc.md`, `doc_geonav_roadmap.md`

### Abgeschlossene Projekte
- **Deployment:** `doc_deployment_complete.md` - Wie h2m.art online ging
- **Migration:** In `archives/deployment_2025-10-08/` - 9button nach H2me

---

## 🎯 Was macht H2me besonders?

### Experimentell & Spielerisch
- Unkonventionelle Navigation (9-Button-Grid, Graph-Ansicht)
- Mehrere Darstellungsformen für denselben Inhalt
- Organisches Design statt "klassischer" Website

### Mobile-First
- Optimiert für Nothing Phone 3
- Touch-freundlich
- Responsive auf allen Geräten

### Wachsend & Lernend
- Projekt entwickelt sich organisch weiter
- Neue Features werden eingebaut wenn sie Sinn machen
- Dokumentation wächst mit

---

## 🔮 Zukunftspläne

### Kurzfristig (in Arbeit)
- Dashboard für persönliche Daten (Obsidian, Nextcloud)
- Geometrische 3D-Navigation (Proof of Concept)

### Mittelfristig
- Erweiterte Kalender-Integration
- Mehr Visualisierungs-Optionen
- Graph-Navigation verbessern

### Langfristig
- 3D-Räume zwischen Seiten
- Gamification-Elemente
- Erweiterte Interaktivität

---

## 💡 Prinzipien

**Design:**
- Organisch über geometrisch
- Spielerisch über ernst
- Balance zwischen Chaos und Struktur

**Technik:**
- Einfachheit über Komplexität
- Verstehen über "Einfach nutzen"
- Wachsen über auf Vorrat bauen

**Workflow:**
- Kleine Schritte (Häppchen) über große Würfe
- Testen über Vermuten
- Dokumentieren über Vergessen

---

**Fragen?** Siehe Glossar (`doc_glossar.md`) für technische Begriffe oder frag einfach!

---

*Letzte Aktualisierung: 2025-10-24*

---

## Updates

(LogClaudine:: (LogCreated:: 25-10-24 14:30) **DOKU-STRUKTUR_** File für Menschen neu geschrieben: Weniger technisch, mehr Kontext, Prinzipien & Zukunftspläne ergänzt, klare Struktur mit Emojis)
