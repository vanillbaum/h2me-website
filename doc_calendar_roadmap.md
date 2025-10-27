# Calendar Overview - Roadmap

## Vision & Ziel

**Zentrale Mobile-First Kalender/Task-Übersicht** für alle wichtigen Quellen

**Primäre Use-Cases:**
1. **Mobile WebApp** - Schneller Überblick auf Smartphone
2. **KWGT Widget** - Direkt auf Android Homescreen
3. **Desktop** - Falls mal am PC

**Quellen (Priorität):**
1. Nextcloud Calendar (kai.nl.tab.digital) - Events & Termine
2. Obsidian Tasks (EntryPoint Files) - Aufgaben & Projekte
3. Outlook Calendar - Berufliche Termine
4. Nextcloud Tasks (später) - Zusätzliche Tasks

**Kern-Prinzipien:**
- Mobile-first (Nothing Phone 3 als Ziel-Device)
- Einfache, übersichtliche Timeline
- Schnelles Filtern nach Quelle/Projekt
- Später: Direkte Interaktion (abhaken, verschieben)

---

## Aktueller Stand

### POC (Desktop-fokussiert) ✅
**Erstellt:** 2025-10-27  
**Status:** Abgeschlossen, muss für Mobile umgebaut werden

**Was funktioniert:**
- Timeline-Layout mit statischen Test-Daten
- Filter (Quelle, Projekt)
- View-Switcher (Tag/Woche/Monat/Alle)

**Was fehlt:**
- Mobile-Optimierung
- Echte Daten-Anbindung
- KWGT-Integration

### Nächste Schritte
→ Siehe `doc_calendar_planung.md` für konkrete Häppchen

---

## Phasen & Meilensteine

### Phase 1: Mobile-First Foundation
**Geschätzt:** 8-12 Stunden  
**Status:** In Planung

**Ziel:** POC für Mobile umbauen + KWGT-Feed

**Deliverables:**
- Mobile-optimiertes Layout (Bottom-Nav, Swipe, Touch)
- JSON/XML Feed-Endpoint für KWGT
- Basis-Widget Template

**Technische Entscheidungen:**
- Pure CSS (keine JS-Frameworks)
- Touch-Gesten mit Vanilla JS
- Statische Daten vorerst

### Phase 2: Daten-Integration
**Geschätzt:** 20-30 Stunden  
**Status:** Geplant

**Ziel:** Echte Daten aus allen Quellen

**Deliverables:**
- Nextcloud CalDAV Integration
- Obsidian Tasks Parser
- Outlook Graph API
- Unified Data Model

**Technische Entscheidungen:**
- **Backend:** Netlify Functions (serverless)
- **Authentication:** Token in Backend, nicht Client
- **Caching:** LocalStorage für Offline-Nutzung
- **Update:** Manuelles Refresh + später Polling

**Risiken:**
- CORS-Probleme bei APIs
- Obsidian File-Zugriff (lokal vs. GitHub)
- Rate-Limiting (Microsoft Graph)

### Phase 3: Interaktive Features
**Geschätzt:** 15-20 Stunden  
**Status:** Später

**Ziel:** Read-only → Interactive

**Deliverables:**
- Tasks abhaken
- Termine verschieben (drag & drop)
- Zurück zu Quelle synchronisieren
- Erweiterte Filter

**Abhängig von:** Phase 2 (braucht bidirektionale API-Calls)

---

## Technische Architektur

### Frontend
```
page-calendar.html
├─ mobile-calendar.css (mobile-first)
├─ desktop-calendar.css (media queries)
└─ calendar-core.js (Daten + Logik)
```

### Backend (Netlify Functions)
```
/api/calendar
  ├─ /nextcloud → CalDAV Calls
  ├─ /outlook → Graph API Calls
  ├─ /obsidian → File Parsing (GitHub API?)
  └─ /aggregate → Unified JSON Response

/api/kwgt
  └─ JSON Feed für KWGT Widget
```

### KWGT Integration
- Widget erhält JSON von `/api/kwgt`
- Zeigt nächste X Events/Tasks
- Update-Intervall: 15-30min (KWGT-Einstellung)

### Daten-Flow
```
Quellen (Nextcloud/Obsidian/Outlook)
    ↓
Netlify Functions (Auth, Aggregation)
    ↓
Unified JSON (normalisiertes Format)
    ↓
    ├─→ WebApp (Timeline-Rendering)
    └─→ KWGT Widget (JSON Feed)
```

---

## Offene Fragen & Entscheidungen

### Kritisch (vor Phase 2)
- [ ] **Obsidian-Integration:** Wie Files abrufen?
  - Option A: GitHub Sync → GitHub API (empfohlen)
  - Option B: Manueller Export → Upload zu Netlify
  - Option C: Lokaler Watcher → WebSocket (komplex)

- [ ] **KWGT-Format:** XML oder JSON?
  - JSON: Einfacher zu generieren
  - XML: KWGT-Standard, mehr Features?

- [ ] **Netlify Functions:** Kostenlos ausreichend?
  - Free Tier: 125k requests/month
  - Pro User: ~100 requests/day = 3k/month
  - → Ja, sollte reichen

### Mittel (während Phase 2)
- [ ] **Caching-Strategie:** Wie lange Daten behalten?
- [ ] **Error-Handling:** Was bei API-Ausfall?
- [ ] **Offline-Mode:** Was zeigen wenn keine Verbindung?

### Niedrig (Phase 3+)
- [ ] YBY-Styles anwenden?
- [ ] Zusätzliche Views (Kalender-Grid)?
- [ ] Notifications/Reminders?

---

## Ressourcen & Links

### APIs & Dokumentation
- **Nextcloud CalDAV:** https://docs.nextcloud.com/server/latest/developer_manual/client_apis/WebDAV/
- **Microsoft Graph Calendar:** https://learn.microsoft.com/en-us/graph/api/resources/calendar
- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **KWGT Documentation:** https://help.kustom.rocks/

### Potenzielle Libraries
- **ical.js** - iCalendar Parsing (für Nextcloud)
- **date-fns** - Datum-Utilities (leichtgewichtig)
- **Hammer.js** - Touch-Gesten (falls native nicht reicht)

### Verwandte H2me Files
- `shared-global.css` - Basis-Styling
- `shared-nav.html/css/js` - Navigation (später Integration)
- `doc_calendar_planung.md` - Konkrete Häppchen-Planung

### Inspiration & Referenzen
- Material Design Mobile Calendar
- Google Calendar Widget
- Obsidian Calendar Plugin

---

## Risiken & Mitigation

**Technisch:**
- ⚠️ **CORS bei API-Calls** → Netlify Functions als Proxy
- ⚠️ **Rate-Limiting (Microsoft)** → Caching + Request-Batching
- ⚠️ **Obsidian File-Zugriff** → GitHub Sync empfohlen

**Zeitlich:**
- ⚠️ **Phase 2 komplex** → Kann 30h+ werden statt 20h
- ⚠️ **KWGT neue Technologie** → Lernkurve einplanen

**Funktional:**
- ⚠️ **Offline-Nutzung** → Caching-Strategie essentiell
- ⚠️ **Sync-Konflikte** → Erst in Phase 3 relevant

---

## Updates

(LogClaudine:: (LogCreated:: 25-10-27 [Zeit erfragen]) **ROADMAP-REWRITE_** Strategischer umgebaut: Mobile-first Fokus, KWGT Integration, Netlify Functions Architektur, kompaktere Phasen, weniger Details (Details → Planung-File))

(LogClaudine:: (LogCreated:: 25-10-27 [Zeit erfragen]) **POC-COMPLETE_** Calendar POC erstellt mit Timeline-Layout, statischen Test-Daten, Filter-System (Quelle/Projekt), View-Switcher (Tag/Woche/Monat/Alle), mobile-responsive)

---

_Roadmap-File für strategische Übersicht - Details siehe `doc_calendar_planung.md`_  
_Letzte Aktualisierung: 2025-10-27_
