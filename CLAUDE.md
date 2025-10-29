**Projekt-Typ:** Web-Development - Persönliche Website  
**Status:** Live auf https://h2m.art  
**Lokaler Pfad:** E:\Neuanfang\a_yang\153_H2me\

---

## ⚠️ Allgemeine Anweisungen beachten

**Dieses File enthält projekt-spezifische Anweisungen für H2me.**

Für allgemeine Arbeitsweise, Kommunikation, File-Handling, Wiki-Management etc. siehe:
→ [[550_ANWEISUNG_claude code allgemein]]

Die allgemeinen Anweisungen gelten **immer** und werden durch dieses File **ergänzt**, nicht ersetzt.

---

## 📁 Dokumentations-Struktur (WICHTIG!)

**Dieses Projekt nutzt drei zentrale Files:**

1. **ANWEISUNGEN** (dieses File)
   - Ort: `E:\EntryPoint\i_yin\ii_Dots\153_ANWEISUNG_h2me page app.md`
   - Inhalt: Arbeitsweise, Workflows, Konventionen
   - Für: Claude's Arbeitsrichtlinien

2. **TASKS** (Actionable Todo-Liste)
   - Ort: `E:\EntryPoint\a_yang\a1_jetzt\153_TASKS_h2me.md`
   - Inhalt: Priorisierte Aufgaben (a1_jetzt → a3_chillen)
   - Für: Was ist als Nächstes zu tun?

3. **MAKRO** (Big Picture Übersicht)
   - Ort: `E:\EntryPoint\b_bian\ba_Orientierung\153_MAKRO_H2me.md`
   - Inhalt: Projekt-Übersicht, Status, Verbindungen, Lessons Learned
   - Für: Kontext & Zusammenhänge verstehen

**Im Projekt-Ordner (`E:\Neuanfang\a_yang\153_H2me\`):**
- `claude_projekt.md` - Vollständige technische Anweisungen
- `logs/` - Ausführliche Session-Logs (Details siehe README im Ordner)
- Weitere `doc_*.md` - Spezifische Dokumentationen (Dashboard, Glossar, etc.)

**Log-Dateien:**
- **Obsidian:** `E:\EntryPoint\b_bian\bi_Logs\153_LOG_h2me.md` - Kompakte Timeline mit LogClaudine-Einträgen
- **Projekt-Ordner:** `E:\Neuanfang\a_yang\153_H2me\logs\` - Ausführliche Session-Dokumentation
- **Format:** `doc_log_YYYY-MM-DD_titel.md` für alle Logs im Projekt-Ordner

**Workflow bei neuer Session:**
1. **Obsidian Workspace öffnen:** "153_h2me" Workspace nutzen für projekt-spezifische Ansicht
2. MAKRO lesen für Kontext (Was ist das Projekt? Was läuft?)
3. TASKS checken für Prioritäten (Was steht an?)
4. ANWEISUNGEN befolgen (Wie arbeiten?)
5. Im Projekt-Ordner: `claude_projekt.md` für technische Details

---

## Quick Reference

**Bei Arbeit an diesem Projekt:**

1. **Hinweis:** Obsidian Workspace "153_h2me" verfügbar für fokussierte Projekt-Arbeit
2. Lese MAKRO für Kontext: `E:\EntryPoint\b_bian\ba_Orientierung\153_MAKRO_H2me.md`
3. Check aktuelle Tasks: `E:\EntryPoint\a_yang\a1_jetzt\153_TASKS_h2me.md`
4. Befolge diese Anweisungen (Workflows & Konventionen)
5. Technische Details: `E:\Neuanfang\a_yang\153_H2me\claude_projekt.md`

**Wichtigste Regeln:**

- ✅ **KRITISCH:** Files SOFORT doppelt speichern (siehe unten)
- ✅ Relative Pfade, Forward Slash `/`
- ✅ Lokales Testing VOR Deploy
- ✅ Backup in `archives/` vor großen Änderungen
- ✅ Refactoring: Nur 1-2 Files pro Session
- ✅ Tasks im TASKS-File verwalten
- ✅ Zusammenfassungen im MAKRO-File
- ❌ KEINE absoluten Pfade
- ❌ NICHT alle Files auf einmal umbenennen
- ❌ NIEMALS Files nur in `/home/claude/` lassen

---

## 🔥 KRITISCHE FILE-HANDLING REGELN (NIE VERGESSEN!)

### Problem: Chat-Länge ist unvorhersehbar

**Realität:**
- Chat kann jederzeit abbrechen
- Token-Count ist auf Mobile unsichtbar
- "Wie lang ist Chat?" Fragen sind unzuverlässig  
- `/home/claude/` Files verschwinden bei Chat-Ende

**Lösung: Defensive File-Strategie**

### Bei JEDEM File das erstellt wird:

```markdown
1. File erstellen (egal wo)
2. SOFORT nach E:\Neuanfang\a_yang\153_H2me\ kopieren
3. SOFORT nach /mnt/user-data/outputs/ kopieren
4. User BEIDE Pfade nennen:
   - "Lokal gespeichert: E:\...\datei.html"
   - "Download: [View datei.html](computer:///mnt/user-data/outputs/datei.html)"
```

**KEINE AUSNAHMEN. JEDES FILE. SOFORT.**

### Alle 5 erstellte Files:

```markdown
Kurz pausieren und sagen:
"✅ 5 Files gesichert (lokal + Download-Links).
   Weiter?"
```

### Bei "Files sichern, neuer Chat":

```markdown
1. ALLE Files nach /mnt/user-data/outputs/ kopieren
2. Vollständige Liste mit Download-Links
3. Session-Summary anbieten
4. Für neuen Chat: Kontext-File erstellen
```

### Am Session-Ende (IMMER):

```markdown
1. Prüfen: Sind ALLE Files in outputs/?  
2. Liste mit Download-Links geben
3. Fragen: "Session-Summary erstellen?"
```

---

## Projekt-Struktur

```
153_H2me/
├── index.html               # Landing (9-Button-Nav)
├── page-*.html              # Unterseiten (noch mit `-`)
├── shared-*.css/js          # Shared Components (noch mit `-`)
├── page-*.css/js            # Seiten-spezifisch
├── images/                  # Alle Medien
├── logs/                    # Session-Logs (ausführlich)
│   └── README.md            # Orientierung zu Logs
├── archives/                # Backups
├── claude_projekt.md        # Vollständige Anweisungen
└── doc_*.md                 # Verschiedene Dokumentationen
```

**Hinweis:** Namenskonvention aktuell noch `-` (Hyphen), geplant: Schrittweise auf `_` (Underscore) umstellen.

---

## Seiten (aktuell vorhanden)

- `index.html` - Landing Page mit 9-Button-Navigation
- `page-yang.html`, `page-bian.html`, `page-yin.html` - Philosophie-Bereiche
- `page-graph.html`, `page-cytoscape.html`, `page-flsdgrm.html` - Graph-Visualisierungen
- `page-3dmodel.html` - 3D-Model-Viewer
- **Neu:** `page-dashboard.html` - Dashboard mit 4x4 Grid (Yang/Bian/Yin/FLUUR)

---

## Shared Components

**⚠️ Refactoring läuft:** Einige nutzen noch `-` statt `_`

**Aktuell vorhanden:**
- `shared-global.css` - Basis-Styling
- `shared-nav.css/js/html` - Navigation + Mini-Graph
- `shared-graph.css/js` - Graph-Komponente
- `shared-kakano-theme.css` - Kakano-inspiriertes Theme (neu)

**Für Refactoring siehe:** `153_TASKS_h2me.md` → Langfristig (a3_chillen)

---

## Workflows

### Neue Seite erstellen

1. **Konzept klären** mit User (Was soll die Seite können?)
2. **Template wählen** - Ähnliche Seite als Basis kopieren
3. **Benennen:** `page-[name].html`, `page-[name].css`, `page-[name].js`
4. **Entwickeln:** HTML → CSS → JS → Integration
5. **Navigation updaten:** `shared-nav.html` erweitern
6. **Lokal testen:** Neue Seite + alle Links testen
7. **Deploy:** Netlify Drag & Drop
8. **Online testen:** https://h2m.art aufrufen, neue Seite prüfen

### Shared Component erstellen

**Wann:** Erst ab 2+ Nutzungen (nicht "auf Vorrat")

**Vorgehen:**
1. **Identifizieren:** Code wird auf 2. Seite gebraucht
2. **Extrahieren:** Gemeinsamen Code in `shared-[feature].*` verschieben
3. **Anpassen:** Beide Seiten importieren neues Component
4. **Testen:** Beide Seiten funktionieren korrekt
5. **Deploy & Verify**

### Bestehende Seite erweitern

1. **Code verstehen:** Aktuellen Stand analysieren
2. **Plan erstellen:** Bei >5 Schritten mit User besprechen
3. **Änderungen durchführen:** Minimale Code-Berührung
4. **Lokal testen:** Geänderte Seite + verlinkte Seiten
5. **Deploy & Online-Test**

### Deployment

**Workflow:**
1. **Lokal testen** - ALLE betroffenen Seiten öffnen und prüfen
2. **Netlify öffnen** - Sites → 153_H2me → Deploys Tab
3. **Drag & Drop** - Ganzen `153_H2me` Ordner hochziehen
4. **Warten** - Deploy dauert ~10-30 Sekunden
5. **Online testen** - https://h2m.art öffnen, Änderungen verifizieren

**Bei Problemen:**
- Developer Console (F12) für Fehler checken
- Netlify Deploy Log prüfen
- Zurückrollen zu vorherigem Deploy möglich

### Backup vor großen Änderungen

**Wann:** Vor Refactoring, großen Umbenennungen, strukturellen Änderungen

**Vorgehen:**
1. Ganzen Ordner `153_H2me` kopieren
2. Einfügen in `153_H2me/archives/`
3. Umbenennen: `old_h2me_YYYY-MM-DD_[beschreibung]/`
4. Beispiel: `old_h2me_2025-10-14_vor_refactoring/`

---

## Code-Konventionen

### HTML
- Semantic HTML nutzen (`<nav>`, `<main>`, `<section>`)
- Kommentare für komplexe Strukturen
- Relative Pfade IMMER

### CSS
- Mobile-first (kleinste Breakpoints zuerst)
- CSS Variables für Farben/Größen (YBY-Philosophie)
- Aussagekräftige Klassennamen
- Kommentare für komplexe Layouts

### JavaScript
- Vanilla JS (keine Frameworks ohne Diskussion)
- Funktions-Namen beschreibend
- Error Handling bei API-Calls
- Kommentare bei komplexer Logik

### Pfade
```html
<!-- ✅ Gut: Relativ, Forward Slash -->
<img src="images/logo.svg">
<link href="shared-nav.css">
<script src="page-yang.js"></script>

<!-- ❌ Schlecht: Absolut, Backslash -->
<img src="/images/logo.svg">
<link href="shared-nav.css">
<script src="page-yang.js"></script>
```

---

## Besonderheiten

### Design-Philosophie
- **Yin/Yang/Bian** als Kern-Konzept (organisch, philosophisch)
- **Flache Struktur** - Max. 2 Ordner-Ebenen
- **Experimentell** - Unkonventionelle Navigation erlaubt
- **Mobile-first** - Nothing Phone 3 als primäres Test-Device

### Tech-Stack
- **Frontend:** Vanilla HTML/CSS/JS
- **3D:** Three.js (für `page-3dmodel.html`)
- **Graphs:** Cytoscape.js (für Graph-Visualisierungen)
- **Hosting:** Netlify (kostenlos, Auto-HTTPS, CDN)
- **Domain:** h2m.art (Namecheap, Netlify DNS)

### Component-System
- **Shared Components:** Nur bei 2+ Nutzungen erstellen
- **Wachstum:** Organisch, nicht auf Vorrat
- **Isolation:** Jede Seite lädt nur was sie braucht

---

## Typische Aufgaben & Antwort-Muster

### "Erstelle neue Seite [X]"
1. **Konzept klären** - Was soll die Seite können? Welches Design?
2. **Technologie vorschlagen** - Vanilla JS? Three.js? Cytoscape?
3. **Code erstellen** - HTML, CSS, JS vollständig
4. **Integration erklären** - Wo in Navigation einfügen? Shared Components nutzen?

### "Erweitere Seite [Y] mit [Feature]"
1. **Aktuellen Code verstehen** - Relevante Files lesen
2. **Änderungsplan** - Bei >5 Schritten Plan vorlegen
3. **Implementation** - Minimale Code-Änderungen
4. **Refactoring-Hinweis** - Wird Feature mehrfach gebraucht? → Shared Component

### "Bug auf Seite [Z]"
1. **Debugging-Fragen** - Was passiert genau? Browser? Fehlermeldung?
2. **Code prüfen** - Relevante Files analysieren
3. **Root Cause finden** - Kein temporärer Workaround
4. **Minimaler Fix** - So wenig Code wie möglich ändern
5. **Verify** - Lokal + nach Deploy online testen

### "Deployment-Frage"
1. **Netlify-Status checken** - Ist Deploy-Log hilfreich?
2. **Pfade prüfen** - Oft Pfad-Problem (relativ vs. absolut)
3. **Browser-Cache** - Inkognito-Modus testen
4. **Schritt-für-Schritt** - Deployment-Workflow durchgehen

---

## Kommunikations-Präferenzen

### Erklärungen
- **High-Level first** - Überblick vor Details
- **WARUM betonen** - Nicht nur WAS, sondern auch WARUM
- **Kontext geben** - Kurz, aber im ersten Wurf knapp halten
- **Vertiefung anbieten** - "Soll ich mehr zu [X] erklären?"

### Bei Komplexität
- **Plan vorlegen** bei >5 Schritten oder >10 File-Änderungen
- **Trade-offs diskutieren** bei mehreren Lösungsansätzen
- **Nicht blind loslegen** - Erst klären, dann umsetzen

### Bei Unsicherheit
- **Ehrlich kommunizieren** - "Ich bin unsicher bei [X]"
- **Alternativen anbieten** - Option A vs. B mit Vor-/Nachteilen
- **Nachfragen** - Lieber mehrmals nachfragen als falsch annehmen

### Code-Stil
- **Kommentare** bei komplexer Logik
- **Beschreibende Namen** für Funktionen/Variablen
- **Konsistent** mit bestehendem Code-Stil

---

## Don'ts (Wichtig!)

❌ **NIEMALS Files nur in `/home/claude/` lassen** - Verschwinden bei Chat-Ende!  
❌ **"Wie lang ist Chat?" fragen** - Antwort ist unzuverlässig  
❌ **Absolute Pfade** (`/media/`) - Brechen lokales Testing  
❌ **Alle Files auf einmal umbenennen** - Zu fehleranfällig  
❌ **Frameworks ohne Diskussion** - Vanilla JS bevorzugt  
❌ **localStorage ohne Rückfrage** - User-Präferenz beachten  
❌ **Deploy ohne lokales Testing** - Bugs landen sonst live  
❌ **Backslashes in Pfaden** (`images\bild.svg`) - Web nutzt Forward Slashes  
❌ **Refactoring von >2 Files pro Session** - Fehleranfälligkeit steigt  
❌ **Tasks im falschen File verwalten** - Gehören ins TASKS-File!

---

## Do's (Best Practices)

✅ **FILES SOFORT DOPPELT SPEICHERN** - Lokal + outputs/ IMMER  
✅ **Relative Pfade** (`images/bild.svg`)  
✅ **Forward Slashes** IMMER  
✅ **Lokales Testing** VOR jedem Deploy  
✅ **Backup** vor großen Änderungen  
✅ **Minimale Code-Berührung** - Root Cause fixen, nicht drumherum arbeiten  
✅ **Refactoring schrittweise** - Max. 1-2 Files pro Session  
✅ **Tasks dokumentieren** im TASKS-File (`153_TASKS_h2me.md`)  
✅ **Kontext dokumentieren** im MAKRO-File (`153_MAKRO_H2me.md`)  
✅ **Nachfragen** bei Unsicherheit  
✅ **Plan vorlegen** bei komplexen Aufgaben  
✅ **Session-Ende Protokoll** - Files sichern, Links geben, Summary anbieten

---

## Wichtige Dateien

### Zentrale Projekt-Files (EntryPoint)
- **ANWEISUNGEN:** `E:\EntryPoint\i_yin\ii_Dots\153_ANWEISUNG_h2me page app.md` (dieses File)
- **TASKS:** `E:\EntryPoint\a_yang\a1_jetzt\153_TASKS_h2me.md`
- **MAKRO:** `E:\EntryPoint\b_bian\ba_Orientierung\153_MAKRO_H2me.md`

### Im Projekt-Ordner (E:\Neuanfang\a_yang\153_H2me\)
- **Claude-Anweisungen:** `claude_projekt.md` - Vollständige technische Anweisungen
- **Logs:** `logs/` - Ausführliche Session-Dokumentation
  - `logs/README.md` - Orientierung welches Log wofür
  - Format: `doc_log_YYYY-MM-DD_titel.md`
- **Dashboard-Planung:** `doc_dashboard_planung.md` - Häppchen-basierte Planung
- **Dashboard-Roadmap:** `doc_dashboard_roadmap.md` - Zeitplan & Meilensteine
- **Dashboard-Session:** `doc_dashboard_session_2025-10-24.md` - Session-Protokoll
- **Konzepte:** `doc_adaptive_styling_konzept.md`, `doc_isometric_wohnung_konzept.md`
- **Quick Reference:** `doc_session_quick_reference.md` - Handy-freundlich
- **Glossar:** `doc_glossar.md` - Technische Begriffe erklärt
- **Struktur:** `doc_makro_struktur.md` - Projekt-Struktur Details
- **Archiviert:** `doc_makro_tasks.md`, `doc_deployment.md`, `doc_migration_*.md`

---

## Beispiel-Session Start

**Typischer Chat-Beginn:**

```
User: "H2me weiter. Dashboard Häppchen 2."

Claude antwortet:
1. **Hinweis:** "Du kannst den Obsidian Workspace '153_h2me' öffnen für fokussierte Projekt-Arbeit."
2. MAKRO lesen für Kontext (Was ist Dashboard-Projekt?)
3. TASKS checken (Wo stehen wir bei Häppchen 2?)
4. doc_dashboard_planung.md öffnen (Was ist zu tun?)
5. Arbeiten nach ANWEISUNGEN (diese File)
6. Mit User klären was genau als Nächstes
```

**Bei Unsicherheit:**
- "Ich checke kurz das MAKRO-File für Kontext..."
- "Laut TASKS-File steht [X] an, passt das?"
- "In der Dashboard-Planung sehe ich [Y], sollen wir damit starten?"

---

## Update-Hinweise

**Wenn sich Projekt-Status ändert:**
- MAKRO updaten (ba_LOG erweitern)
- TASKS updaten (Erledigte abhaken, neue hinzufügen)
- ANWEISUNGEN nur bei grundlegenden Workflow-Änderungen

**Wenn neue Features hinzukommen:**
- In MAKRO dokumentieren (Was, Warum, Status)
- In TASKS aufnehmen (Priorisiert)
- In claude_projekt.md technische Details

---

_Bei Unsicherheiten: Erst MAKRO lesen (Kontext), dann TASKS checken (Prioritäten), dann diese Anweisungen befolgen (Workflows)._

---

## Updates

(LogClaudine:: (LogCreated:: 25-10-29 23:30) **PAGE-YIN-UPDATE_** page-yin.html Navigation aktualisiert - 30 HTML-Seiten aufgelistet in 7 Kategorien: Aktuelle Arbeit (Calendar PoC, Status BP), Hauptseiten, Visualisierungen, Features & Prototypen, Tests & Experimente, Style-Varianten (5 Card Designs), Generierte Exports)

(LogClaudine:: (LogCreated:: 25-10-29 23:15) **CALENDAR-POC_** Mobile-First Calendar vollständig implementiert - Alle 14 Häppchen fertig: HTML-Struktur, CSS Mobile-First, Mock-Daten, localStorage, Mini-Week-Visualisierung, Tap-Navigation, Drag-to-Move, Resize-Handle, Tap-to-Edit Modal, Swipe-to-Delete, Transition-Blur, Swipe-Navigation, Polish & Mobile-Optimierung, 958 Zeilen JS)

(LogClaudine:: (LogCreated:: 25-10-25 10:35) **KRITISCHE-RULES_** File-Handling komplett überarbeitet: Doppelte Speicherung SOFORT (lokal + outputs/), "Chat-Länge"-Fragen entfernt (unzuverlässig), Session-Ende Protokoll verschärft, defensive Strategie gegen Chat-Abbrüche, Dashboard-Files aus verlorenem Chat rekonstruiert)

(LogClaudine:: (LogCreated:: 25-10-24 14:30) **DOKU-STRUKTUR_** Projekt-Doku aufgeräumt: Migration-Files archiviert, doc_makro_tasks→doc_deployment_complete.md umbenannt, doc_makro_struktur.md für Menschen neu geschrieben, klare Trennung technisch/verständlich)

(LogClaudine:: (LogCreated:: 25-10-16 11:26) **ANWEISUNGEN-REVIEW_** Allgemeine Anweisungen gestrafft, Namenskonventionen für Code vs Doku klargestellt, Redundanzen entfernt)

(LogClaudine:: (LogCreated:: 25-10-15 19:13) **LOG-STRUKTUR_** 6 ausführliche Logs nach 153_H2me/logs/ verschoben, kompaktes 153_LOG_h2me.md in Obsidian, Workspace-Hinweis ergänzt)

(LogClaudine:: (LogCreated:: 25-10-15 18:59) **BUTTON-SYSTEM_** Zentrale Button-Styles in shared-global.css: .btn-base Klasse + Yang/Bian/Yin Farben, Typography hinzugefügt, Wiki-File 541_CSS_zentrierung_konzepte.md erstellt)

(LogClaudine:: (LogCreated:: 25-10-14 08:41) **DOKU-STRUKTUR_** Drei-File-System eingeführt: ANWEISUNGEN/TASKS/MAKRO Aufteilung geklärt)

---

_Letzte Aktualisierung: 2025-10-29 23:30_
