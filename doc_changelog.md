# Changelog - h2m.art

## 2025-10-14

### Added
- Representation Switcher System für Yin/Yang/Bian-Seiten
  - SVG-Darstellung (Standard)
  - 3D-Volumen-Darstellung (Three.js)
  - Text-Darstellung (Beschreibungen)
  - Zufalls-Auswahl beim ersten Besuch
  - Manuelles Umschalten via Buttons
  - LocalStorage pro Seite (Auswahl bleibt erhalten)
- `doc_changelog.md` für strukturierte Projekt-Historie

### Changed
- Namenskonventionen etabliert: Hyphen `-` für Code-Files (Web-Standard)
- Files korrekt benannt: `page-yin.html`, `page-yang.html`, `page-bian.html`
- Allgemeine Anweisungen ergänzt um Code-File-Namenskonventionen

### Technical Notes
- Three.js für 3D-Darstellungen
- LocalStorage-Key-Format: `rep_[seitenname]`
- Shared Components: `shared_representation_switcher.css/js`

---

## 2025-10-10

### Added
- Initial deployment auf Netlify
- Domain h2m.art via Namecheap verbunden
- 9-Button-Navigation auf Landing Page
- Yin/Yang/Bian Unterseiten mit SVG-Icons
- Graph-Visualisierungen (Cytoscape, D3)
- 3D-Model-Viewer mit Three.js

### Changed
- Migration von lokalem Setup zu Netlify
- Shared Components extrahiert (Navigation, Graph)

---

**Letzte Aktualisierung:** 2025-10-14
