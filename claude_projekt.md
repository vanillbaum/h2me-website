# Claude Projekt-Anweisungen: 153_H2me

**Projekt-Typ:** Web-Development (Persönliche Website)  
**Status:** Live auf https://h2m.art  
**Letzte Aktualisierung:** 2025-10-10

---

## Projekt-Kontext

**Zweck:** Persönliche Website für h2m.art - Darstellung von Yin/Yang/Bian-Philosophie  
**Deployment:** Netlify (harmonious-faloodeh-d0a0fa.netlify.app)  
**Domain:** https://h2m.art  
**Basis-Dokumentation:** Siehe `doc_struktur.md` für menschenlesbare Übersicht

---

## Ordner-Struktur

```
153_H2me/
├── index.html                    # Landing (9-Button-Navigation)
├── page-*.html                   # Unterseiten
├── shared-*.css/js               # Shared Components
├── page-*.css/js                 # Seiten-spezifisch
├── media/                        # Medien
│   ├── images/
│   ├── videos/
│   ├── 3d/
│   └── svg/
├── components/                   # In Entwicklung
├── archives/                     # Alte Versionen
├── doc_struktur.md              # Projekt-Dokumentation (human-readable)
├── doc_tasks.md                 # Todo-Liste & Refactoring
├── doc_deployment.md            # Hosting-Infos
├── doc_glossar.md               # Technische Begriffe
└── claude_projekt.md            # Diese Datei (Claude-Anweisungen)
```

---

## Haupt-Seiten (aktuell vorhanden)

- `index.html` - Landing Page mit 9-Button-Navigation
- `page-yang.html` - Yang-Bereich (Aktiv/Extern/Produzieren)
- `page-bian.html` - Bian-Bereich (Verbindend/Transformierend)
- `page-yin.html` - Yin-Bereich (Passiv/Intern/Sammeln)
- `page-graph.html` - Graph-Visualisierung
- `page-cytoscape.html` - Cytoscape-basierter Graph
- `page-flsdgrm.html` - Flussdiagramm
- `page-3dmodel.html` - 3D-Model-Viewer

---

## Shared Components (aktuell vorhanden)

**CSS:**
- `shared-global.css` - Basis-Styling für alle Seiten
- `shared-nav.css` - Navigation-Styling (⚠️ noch mit `-`, soll zu `_`)
- `shared-graph.css` - Graph-Visualisierung-Styling (⚠️ noch mit `-`, soll zu `_`)

**JavaScript:**
- `shared-nav.js` - Navigation-Logik (⚠️ noch mit `-`, soll zu `_`)
- `shared-graph.js` - Graph-Visualisierung-Logik (⚠️ noch mit `-`, soll zu `_`)

**HTML-Templates:**
- `shared-nav.html` - Navigation-Template (⚠️ noch mit `-`, soll zu `_`)

---

## Technologie-Stack

- **Frontend:** Vanilla HTML/CSS/JS (kein Framework)
- **3D:** Three.js (für page_3dmodel.html)
- **Graph:** Cytoscape.js, D3.js (für Visualisierungen)
- **Hosting:** Netlify (automatisches HTTPS, CDN)
- **Version Control:** Aktuell manuell, später Git geplant

---

## Workflow-Regeln für dieses Projekt

### 1. Neue Seite erstellen

**Vorgehen:**
1. Kopiere Template von bestehender ähnlicher Seite
2. Benenne nach Konvention: `page_[name].html`
3. Erstelle `page-[name].css` wenn seiten-spezifisches Styling nötig
4. Erstelle `page-[name].js` wenn seiten-spezifische Funktionen nötig
5. Update Navigation in `shared_nav.html` (neuer Button/Link)
6. Teste lokal (öffne index.html und neue Seite)
7. Deploy auf Netlify

**Typische Seiten-Struktur:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Seitentitel] - h2m.art</title>
  
  <!-- Basis-Styling -->
  <link rel="stylesheet" href="shared_global.css">
  
  <!-- Shared Components nach Bedarf -->
  <link rel="stylesheet" href="shared_nav.css">
  <link rel="stylesheet" href="shared_graph.css">
  
  <!-- Seiten-spezifisches Styling -->
  <link rel="stylesheet" href="page_[name].css">
</head>
<body>
  <!-- Navigation (wird via JS geladen) -->
  <div id="navigation"></div>
  
  <!-- Seiten-Inhalt -->
  <main>
    <!-- ... -->
  </main>
  
  <!-- Scripts -->
  <script src="shared_nav.js"></script>
  <script src="page_[name].js"></script>
</body>
</html>
```

### 2. Shared Component erstellen/extrahieren

**Wann:**
- Erst wenn Feature von 2+ Seiten genutzt wird
- NICHT "auf Vorrat" entwickeln

**Vorgehen:**
1. Identifiziere wiederkehrenden Code in `page_*.css` oder `page_*.js`
2. Extrahiere in neues File: `shared_[feature].css` oder `shared_[feature].js`
3. Entferne Code aus den Seiten-spezifischen Files
4. Importiere Shared Component in beiden Seiten
5. Teste beide Seiten gründlich
6. Dokumentiere im Kommentar: "Wird genutzt von: page_x.html, page_y.html"

### 3. Deployment auf Netlify

**Vorgehen:**
1. **Lokal testen:** Alle betroffenen Seiten im Browser öffnen und testen
2. **Netlify öffnen:** https://app.netlify.com → Sites → 153_H2me
3. **Deploy:** Deploys → "Deploy site" (schwarzer Button oben rechts)
4. **Upload:** Drag & Drop des GESAMTEN `153_H2me` Ordners
5. **Warten:** Deploy dauert ~30 Sekunden
6. **Online testen:** https://h2m.art öffnen und alle betroffenen Seiten prüfen

**Wichtig:**
- IMMER ganzen Ordner hochladen, nicht einzelne Files
- Bei Problemen: "Site settings" → "Deploys" → älteres Deploy zurücksetzen

### 4. Backup vor größeren Änderungen

**Wann:**
- Vor Refactoring (z.B. Namenskonventionen anpassen)
- Vor größeren Feature-Änderungen
- Vor strukturellen Umbauten

**Vorgehen:**
1. Kopiere gesamten `153_H2me` Ordner
2. Verschiebe in `153_H2me/archives/`
3. Benenne: `old_h2me_YYYY-MM-DD_[kurze_beschreibung]/`
4. Beispiel: `old_h2me_2025-10-08_before_refactoring/`

---

## Refactoring-Status

### ⚠️ Aktuelle Inkonsistenzen

**Problem:** Einige Files nutzen noch `-` (Hyphen) statt `_` (Underscore)

**Betroffene Files:**
- `shared-nav.css` → soll werden: `shared_nav.css`
- `shared-nav.js` → soll werden: `shared_nav.js`
- `shared-nav.html` → soll werden: `shared_nav.html`
- `shared-graph.css` → soll werden: `shared_graph.css`
- `shared-graph.js` → soll werden: `shared_graph.js`
- `shared-global.css` → soll werden: `shared_global.css`

**Migration-Plan:** Siehe `doc_tasks.md` → Sektion "Technische Schulden / Refactoring"

**Vorgehen bei Umbenennung:**
1. IMMER nur 1-2 Files pro Session
2. File umbenennen
3. Alle Referenzen in HTML-Files mit Suche & Ersetze updaten
4. Lokal testen (ALLE Seiten öffnen, nicht nur betroffene)
5. Deploy auf Netlify
6. Online testen auf h2m.art
7. In `doc_tasks.md` als erledigt markieren
8. Bei Problemen: Sofort aus `archives/` Backup zurückholen

---

## Besonderheiten dieses Projekts

### Design-Philosophie
- **Yin/Yang/Bian-Konzept** ist zentral
- Organisch/künstlerisch, NICHT corporate
- Experimentell, spielerisch
- Balance zwischen Chaos und Struktur

### Technische Besonderheiten
- **Flache Struktur:** Max. 2 Ordner-Ebenen
- **Keine Frameworks:** Vanilla JS für maximale Kontrolle
- **Relative Pfade:** Alles funktioniert lokal UND online
- **Component-basiert:** Aber ohne Build-Step
- **Mobile-first:** Responsive Design prioritär

### User-Präferenzen (Projektinhaber)
- Bevorzugt einfache Lösungen über komplexe
- Will Dinge verstehen, nicht nur nutzen
- Schätzt Erklärungen (WARUM, nicht nur WAS)
- AuDHS-gerecht: Klare Strukturen, aber Flexibilität

---

## Code-Stil für dieses Projekt

### HTML
- Semantische Tags nutzen (`<main>`, `<nav>`, `<section>`)
- Klare Kommentare bei komplexen Strukturen
- IDs für JavaScript-Hooks, Classes für Styling

### CSS
- Mobile-first (min-width Media Queries)
- Klassen-Namen beschreibend, nicht kryptisch
- Kommentare bei nicht-offensichtlichen Tricks
- Variablen für wiederkehrende Werte

### JavaScript
- Kommentare nur bei komplexer Logik
- Funktionsnamen beschreibend
- Error Handling bei kritischen Stellen
- console.log() für Debugging ist OK (werden später entfernt)

---

## Typische Aufgaben & Lösungen

### "Neue Feature-Seite erstellen"
**Beispiel:** "Erstelle eine Seite für Timeline-Visualisierung"

**Antwort-Struktur:**
1. **Konzept klären:** "Wie soll die Timeline aussehen? Daten aus File oder hardcoded?"
2. **Technologie vorschlagen:** "Ich würde [Bibliothek] vorschlagen weil..."
3. **Implementierung:** Code in Artifact
4. **Integration erklären:** "Diese Files musst du erstellen/ändern..."
5. **Testing-Hinweis:** "Teste lokal, dann deploy auf Netlify"

### "Bestehende Seite erweitern"
**Beispiel:** "Füge Filterung zum Graph hinzu"

**Antwort-Struktur:**
1. **Aktuellen Code verstehen:** "Ich lese page_graph.html und shared_graph.js..."
2. **Änderungsplan:** "Ich würde folgendes ändern: ..."
3. **Code-Änderungen:** Mit Kommentaren wo was hinkommt
4. **Refactoring-Hinweis:** "Falls Filter auch für Cytoscape gebraucht wird → shared_filter.js extrahieren"

### "Bug fixen"
**Beispiel:** "Navigation funktioniert nicht auf page_bian.html"

**Antwort-Struktur:**
1. **Debugging-Fragen:** "Bekommst du Fehlermeldung in Console (F12)?"
2. **Code prüfen:** Öffne betroffene Files und suche Problem
3. **Root Cause:** "Problem ist X wegen Y"
4. **Fix:** Minimale Änderung mit Erklärung
5. **Verify:** "Teste ob Problem gelöst ist"

---

## Kommunikations-Stil für dieses Projekt

### Beim Code-Erklären
- **High-Level first:** "Das Skript macht X, indem es Y nutzt"
- **Dann Details:** "Lass mich die wichtigen Teile erklären..."
- **WARUM betonen:** Nicht nur WAS, sondern auch WARUM diese Lösung

### Bei Problemen
- **Ehrlich sein:** "Ich bin unsicher bei X" ist OK
- **Keine verschleiernde Sprache:** Klare Aussagen
- **Alternativen anbieten:** "Wir könnten A oder B machen, Vor-/Nachteile..."

### Bei Komplexität
- **Komplexitäts-Check:** Bei >5 Schritten oder >10 File-Änderungen nachfragen
- **Plan vorlegen:** Nicht sofort loslegen bei großen Tasks
- **Schrittweise:** Lieber 3 kleine Commits als 1 riesiger

---

## Wichtige Pfade (schneller Zugriff)

**Projekt-Root:**
```
E:\Neuanfang\a_yang\153_H2me\
```

**Dokumentation:**
```
E:\Neuanfang\a_yang\153_H2me\doc_struktur.md
E:\Neuanfang\a_yang\153_H2me\doc_tasks.md
E:\Neuanfang\a_yang\153_H2me\doc_deployment.md
E:\Neuanfang\a_yang\153_H2me\doc_glossar.md
```

**Haupt-Files:**
```
E:\Neuanfang\a_yang\153_H2me\index.html
E:\Neuanfang\a_yang\153_H2me\shared_global.css
```

---

## Don'ts für dieses Projekt

❌ **NICHT** absolute Pfade nutzen (`/media/images/`)  
❌ **NICHT** alle Files auf einmal umbenennen (Refactoring)  
❌ **NICHT** Frameworks einführen ohne Diskussion  
❌ **NICHT** localStorage nutzen ohne vorher zu fragen  
❌ **NICHT** komplexe Build-Tools ohne Notwendigkeit  
❌ **NICHT** deployen ohne lokales Testing  

---

## Changelog dieser Anweisungen

**2025-10-10:** Initial erstellt
- Projekt-Struktur dokumentiert
- Workflow-Regeln definiert
- Refactoring-Status aufgenommen
- Code-Stil-Guidelines hinzugefügt

---

*Dieses File wird bei strukturellen Änderungen am Projekt aktualisiert.*  
*Bei Unsicherheiten: Dieses File lesen, dann `doc_struktur.md` konsultieren.*
