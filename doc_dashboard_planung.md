# Dashboard Planung - H2me

**Status:** Planung (Phase 1)  
**Erstellt:** 2025-10-10  
**Letzte Aktualisierung:** 2025-10-10

---

## 📋 Übersicht

Dashboard für h2m.art - Zentrale Übersicht über:
- Obsidian Files (Reviews, Tasks, Projekte, Logs)
- Nextcloud Daten (Kalender, Tasks, Deck, Mail)
- Termine & Deadlines
- Persönliches Datenmanagement

---

## ✅ Grundsatz-Entscheidungen

### Techstack
- ✅ **Generator:** Node.js
- ✅ **Output:** Static HTML/CSS/JS
- ✅ **Hosting:** Netlify (wie bisherige Pages)
- ✅ **Design:** Yin/Yang/Bian-Stil
- ✅ **Mobile-First:** Nothing Phone 3, Android
- ✅ **Navigation:** Bottom-Bar, Tabs
- ✅ **Content-Ansicht:** Option B (eigene Content-Page)

### Phasen
- **Phase 1:** Static Generator (Obsidian Files + Nextcloud APIs)
- **Phase 2:** Automatisierung (Task Scheduler, Auto-Deploy)
- **Phase 3:** API-Backend (Echtzeit-Updates)

---

## 🍪 Häppchen 1: File-Detection & Struktur

### ✅ Geklärt

**Ordner scannen:**
- ✅ `E:/EntryPoint/a_yang`
- ✅ `E:/EntryPoint/b_bian`
- ✅ `E:/EntryPoint/i_yin`
- ❌ NICHT: `E:/Neuanfang/*` (vorerst)

**Ordner überspringen:**
- `**/ax_vogelfrei/**`
- `**/bx_Archiv/**`
- `**/ix_Archiv/**`

**File-Typen:**
- **Reviews:** `*_REVIEW_*.md` (letzte 3 insgesamt)
- **Tasks:** Obsidian Tasks Plugin Format `- [ ] [due:: YYYY-MM-DD]`
- **Projekte:** Alle `.md` in Yang-Ordnern (außer `doc_*`, `claude_*`)
- **Logs:** 
  - User-Logs: `LogText::` Einträge
  - Claudine-Logs: `LogClaudine::` Einträge (NEU)
  - Zeitraum: Letzter Tag (später: flexible Zeiträume)

**Metadaten:**
- File-Datum: `mtime` (last modified) von Filesystem
- Inline Fields: Infrastruktur vorbereiten, noch nicht parsen
- Frontmatter: Nur `aliases` relevant

**Projekt-Erkennung:**
- Yang-Ordner: Projekte sind in Unterordnern (z.B. `153_H2me/`)
- Exclude: `doc_*`, `claude_*`, `shared_*`, `page_*` (Website-Files)

### 🤔 Offen
- [ ] Exakte Projekt-Ordner-Struktur in EntryPoint klären?
- [ ] Wie Projekt-Status erkennen? (Aktiv/Archiv/Abgeschlossen)

---

## 🍪 Häppchen 2: Nextcloud-Integration

### ✅ Geklärt

**Nextcloud Account:**
- URL: `https://kai.nl.tab.digital`
- Username: `bierstefi.ch`
- App-Passwort: Noch zu erstellen (Name: "Dashboard h2m.art")

**Datenquellen (Phase 1):**
- ✅ Nextcloud Kalender (CalDAV API) - **NUR Kalender-API nutzen**
- ❌ Tasks API (vorerst nicht, da über Kalender sichtbar)
- ❌ Deck API (vorerst nicht, da über Kalender sichtbar)
- ✅ Nextcloud Mail (Ungelesen-Anzahl + Details)

**Kalender-Strategie:**
- **Option A gewählt:** Nur Kalender-API
- Tasks mit Datum erscheinen automatisch im Kalender
- Deck-Karten mit Datum erscheinen automatisch im Kalender
- Vorteil: Eine API für alles, einfacher Start
- Nachteil: Keine Unterscheidung Termin/Task/Deck (erstmal ok)

**Mail-Integration:**
- Posteo via Nextcloud Mail
- Alle ungelesenen Mails
- Inkl. Unterordner
- **Exkl. Spam-Ordner**
- Anzeigen: Betreff + Absender

**Update-Frequenz:**
- 1x täglich reicht vorerst
- Später: Öfter/Echtzeit in Phase 2/3

### 🤔 Offen
- [ ] App-Passwort erstellen
- [ ] Liste aller Kalender-Namen
- [ ] Welche Kalender relevant fürs Dashboard
- [ ] Spam-Ordner-Namen in Nextcloud Mail
- [ ] Wie viele neueste Mails anzeigen? (3? 5? 10?)
- [ ] Mail API Details (Endpoint testen)

---

## 🍪 Häppchen 3: Dashboard-Layout & Navigation

### ✅ Geklärt

**Navigations-Konzept:**
- Tabs (nicht endlos scrollen)
- Bottom-Navigation
- Karten-Metapher: Zoom/Pan wie Google Maps

**Design:**
- YBY-Stil (organisch, philosophisch)
- Dezente Animationen
- Farbzuordnung: Yang/Yin/Bian zu Content-Typen

### 🤔 Offen
- [ ] **JavaScript-Libraries für Zoom/Pan** (Panzoom? D3.js? Leaflet? Custom?)
- [ ] Exakte Tab-Struktur definieren
- [ ] Touch-Gesten (Swipe, Pinch)?
- [ ] Transitions zwischen Tabs?
- [ ] Performance: Wie viele Karten gleichzeitig rendern?

---

## 🍪 Häppchen 4: Content-Darstellung

### ✅ Geklärt

**Darstellung pro Content-Typ:**
- **Reviews:** Titel, Datum (mtime), Kategorie (minimal)
- **Tasks (dringend):** Volltext ausgeschrieben
- **Tasks (normal):** Nur Titel
- **Projekte:** Nur Titel
- **Logs:** LogText/LogClaudine vom letzten Tag
- **Termine:** Nächste 7 Tage (Liste)

**Prioritäten:**
- "Heute/Diese Woche" Section = wichtigste Info zuerst
- Dringende Items prominent

### 🤔 Offen
- [ ] Was macht Task "dringend"? (due < 3 Tage? priority::high?)
- [ ] Log-Format: Wie anzeigen? (Liste? Timeline?)
- [ ] Projekt-Sortierung: Nach Aktivität? Alphabetisch?

---

## 🍪 Häppchen 5: Technische Architektur

### 🤔 Offen
- [ ] Generator-Script Struktur
- [ ] Parser-Pipeline Details
- [ ] Performance bei >50 Files
- [ ] Caching-Strategie
- [ ] Error-Handling
- [ ] Deploy-Workflow

---

## 📊 Dashboard-Sections (Aktueller Stand)

```
┌─────────────────────────────────┐
│ 🔥 HEUTE / DIESE WOCHE          │
│ - Dringende Tasks (Obsidian)    │
│ - Termine heute (Obsidian)      │
│ - [Phase 1] Nextcloud Tasks     │
│ - [Phase 1] Nextcloud Deck      │
│ - [später] Ungelesene Mails     │
├─────────────────────────────────┤
│ 📅 TERMINE (Basic View)         │
│ - Nächste 7 Tage (Liste)        │
│ - Obsidian + Nextcloud Kalender │
│ - [später] 4-Wochen-Kalender    │
│ - [später] Drag & Drop Blöcke   │
├─────────────────────────────────┤
│ 📝 REVIEWS (Letzte 3)           │
│ - Titel, Datum (mtime)          │
│ - Kategorie (Yang/Bian/Yin)     │
├─────────────────────────────────┤
│ 📂 PROJEKTE (Yang-Ordner)       │
│ - Nur Titel                     │
│ - Nach Aktivität sortiert       │
├─────────────────────────────────┤
│ 📋 LOGS (Letzter Tag)           │
│ - User: LogText:: Einträge      │
│ - Claudine: LogClaudine:: (NEU) │
│ - [später] Zeitraum wählbar     │
├─────────────────────────────────┤
│ [später] 📁 NEXTCLOUD FILES     │
│ - Neueste/Zuletzt bearbeitet    │
└─────────────────────────────────┘
```

---

## 🎯 Nächste Schritte

### Sofort
- [x] Planungs-File erstellen
- [ ] Roadmap erstellen
- [ ] Häppchen 2: Nextcloud-Integration detailliert planen
- [ ] LogClaudine:: Format in allgemeine Anweisungen übernehmen

### Phase 1 Implementation
- [ ] Custom Parser für Obsidian Tasks
- [ ] Custom Parser für Log-Einträge
- [ ] Nextcloud API-Clients
- [ ] Dashboard HTML-Generator
- [ ] Mobile-First CSS

### Später
- [ ] Automatisierung (Task Scheduler)
- [ ] API-Backend für Echtzeit
- [ ] Erweiterte Kalender-Features
- [ ] Mail-Integration vollständig
- [ ] Bearbeiten/Erstellen von Content

---

## 💡 Notizen & Erkenntnisse

### LogClaudine:: Format
**Vorschlag:**
```markdown
LogClaudine:: (LogCreated:: 25-10-10 14:23) **DASHBOARD_** Planung gestartet, Häppchen-Struktur definiert
```

**Vorteile:**
- Konsistent mit User-Log-Format
- Inline = Wikilink-Update funktioniert
- Kurz & prägnant für Dashboard-Anzeige
- Maschinenlesbar für Parser

**Implementierung:**
- In neue Chat-Logs einfügen
- In bestehende Logs nachtragen (010_LOG_persoenliches Datenmanagment_claudine.md)
- In allgemeine Anweisungen übernehmen

### File-System Metadaten
- `mtime` (modified time) über Node.js `fs.stat()` abrufbar
- Kein manuelles Pflegen von Datum-Feldern nötig
- Performance: Einmal beim Scan cachen

### Inline Fields vs. Frontmatter
- User nutzt primär Inline Fields wegen Wikilink-Update
- Frontmatter nur für Aliases relevant
- Parser muss beides können, Fokus auf Inline

---

## 🔗 Verwandte Dokumente

- [[doc_dashboard_roadmap.md]] - Zeitplan & Meilensteine
- [[claude_projekt.md]] - Allgemeine Projekt-Anweisungen
- [[doc_struktur.md]] - Projekt-Struktur H2me
- [[doc_tasks.md]] - Todo-Liste H2me

---

**Letzte Änderung:** 2025-10-10 | Häppchen 1 fast abgeschlossen
