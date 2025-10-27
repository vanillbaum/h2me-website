# Calendar Overview - Planung

**Projekt:** H2me Calendar/Task-Übersicht  
**Roadmap:** Siehe `doc_calendar_roadmap.md`  
**Status:** Phase 1 - Mobile-First Foundation

---

## Häppchen-Übersicht

### Phase 1: Mobile-First Foundation (8-12h)

- [x] **Häppchen 1:** Mobile Navigation & Layout (2-3h) ✅ 2025-10-27
- [x] **Häppchen 2:** Touch-Interaktionen & Swipe (2-3h) ✅ 2025-10-27
- [x] **Häppchen 3:** KWGT JSON Feed (2-3h) ✅ 2025-10-27
- [ ] **Häppchen 4:** Mobile Testing & Polish (2-3h) ⏭️ Übersprungen (später nachholen)

### Phase 2: Daten-Integration (20-30h)

- [x] **Häppchen 5:** Backend Setup (Netlify Functions) (3-4h) ✅ 2025-10-27
- [x] **Häppchen 6:** Nextcloud CalDAV Integration (5-7h) ✅ 2025-10-27
- [x] **Häppchen 7:** Obsidian Tasks Parser (5-7h) ✅ 2025-10-27
- [x] **Häppchen 8:** Outlook Graph API (5-7h) ✅ 2025-10-27
- [x] **Häppchen 9:** Unified Data Model & Caching (2-3h) ✅ 2025-10-27

---

## Phase 1: Mobile-First Foundation

### Häppchen 1: Mobile Navigation & Layout

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 2-3 Stunden  
**Dependencies:** Keine (POC als Basis)

**Ziel:** POC für Mobile umbauen, Bottom-Navigation

**Files zu erstellen:**
- `mobile-calendar.css` - Mobile-spezifisches Styling
- `mobile-nav-component.html` - Bottom-Navigation Template

**Files zu ändern:**
- `page-calendar.html` - Mobile Meta-Tags, Bottom-Nav einbinden
- `page-calendar.css` - Desktop-Styles in Media Queries auslagern
- `page-calendar.js` - Touch-Events vorbereiten

**Was konkret tun:**

1. **Mobile Meta-Tags** in `page-calendar.html` (Zeile 5)
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="mobile-web-app-capable" content="yes">
   ```

2. **Bottom-Navigation erstellen** (`mobile-nav-component.html`)
   - 4 Buttons: Heute | Filter | Suche | Mehr
   - Fixed Position am unteren Rand
   - Touch-optimiert (min. 48x48px Buttons)
   - Icons (SVG oder Unicode)

3. **Mobile-First CSS** (`mobile-calendar.css`)
   - Timeline kompakter (weniger Padding)
   - Cards kleiner, mehr Fokus auf Titel
   - Filter als Slide-In Panel (nicht immer sichtbar)
   - View-Switcher als Tabs am oberen Rand
   
4. **Desktop-Styles auslagern** in `page-calendar.css`
   ```css
   /* Mobile first (base) */
   .calendar-container { ... }
   
   /* Desktop ab 768px */
   @media (min-width: 768px) {
     .calendar-container { ... }
   }
   ```

5. **Bottom-Nav in HTML integrieren** (vor `</body>`)
   ```html
   <nav class="mobile-bottom-nav">
     <!-- Load from mobile-nav-component.html -->
   </nav>
   ```

**Erfolgskriterien:**
- ✅ Timeline scrollt smooth auf Mobile
- ✅ Bottom-Nav bleibt beim Scrollen fixed
- ✅ Buttons mindestens 44x44px (Touch-Target)
- ✅ Keine horizontale Scroll-Leiste

**Implementiert:**
- Mobile Meta-Tags (PWA-ready) in page-calendar.html
- mobile-calendar.css mit Bottom-Nav, Slide-In Filter
- mobile-nav-component.html (Template)
- JavaScript für Filter-Panel, Heute-Button, Haptic Feedback
- Touch-optimierte Größen, Scroll-Snap
- Mobile getestet → funktioniert ✅

---

### Häppchen 2: Touch-Interaktionen & Swipe

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 2-3 Stunden  
**Dependencies:** Häppchen 1 (Mobile Layout fertig)

**Ziel:** Swipe-Gesten für View-Wechsel, Touch-optimierte Interaktionen

**Files zu erstellen:**
- `touch-gestures.js` - Swipe & Touch-Handler

**Files zu ändern:**
- `page-calendar.js` - Swipe-Integration, Touch-Events
- `mobile-calendar.css` - Swipe-Animationen

**Was konkret tun:**

1. **Swipe-Detection** (`touch-gestures.js`)
   ```javascript
   class SwipeDetector {
     constructor(element, onSwipeLeft, onSwipeRight) {
       this.element = element;
       this.onSwipeLeft = onSwipeLeft;
       this.onSwipeRight = onSwipeRight;
       // Touch event listeners
     }
     
     handleTouchStart(e) { ... }
     handleTouchMove(e) { ... }
     handleTouchEnd(e) { ... }
   }
   ```

2. **View-Wechsel mit Swipe** in `page-calendar.js`
   - Swipe Left → Nächster View (Tag → Woche → Monat → Alle)
   - Swipe Right → Vorheriger View
   - Visuelles Feedback während Swipe

3. **Filter als Slide-In Panel**
   - Von rechts reinschieben bei "Filter"-Button
   - Overlay mit Transparenz
   - Touch außerhalb schließt Panel
   
4. **Pull-to-Refresh** (vorbereiten für später)
   - Am Anfang der Timeline nach unten ziehen
   - Visueller Indikator (Spinner)
   - Hook für späteren Daten-Refresh

5. **Haptic Feedback** (falls möglich)
   ```javascript
   if (navigator.vibrate) {
     navigator.vibrate(10); // Kurzes Feedback bei Tap
   }
   ```

6. **Scroll-Snap** für Timeline-Days
   ```css
   .timeline-container {
     scroll-snap-type: y proximity;
   }
   .timeline-day {
     scroll-snap-align: start;
   }
   ```

**Erfolgskriterien:**
- ✅ Swipe zwischen Views funktioniert flüssig
- ✅ Filter-Panel öffnet/schließt smooth
- ✅ Keine ungewollten Scrolls während Swipe
- ✅ Touch-Targets groß genug (kein "Mis-Tap")

**Implementiert:**
- touch-gestures.js mit SwipeDetector & PullToRefresh Klassen
- Swipe Left/Right für View-Wechsel (Tag→Woche→Monat→Alle)
- Swipe-Indikatoren (visuelles Feedback während Swipe)
- Slide-Animationen in mobile-calendar.css
- Pull-to-Refresh vorbereitet (funktioniert)
- Haptic Feedback, Smart Scroll-Detection
- Mobile getestet → funktioniert ✅

---

### Häppchen 3: KWGT JSON Feed

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 2-3 Stunden  
**Dependencies:** Keine (kann parallel zu Häppchen 1-2)

**Ziel:** JSON-Feed für KWGT Widget bereitstellen

**Files zu erstellen:**
- `api/kwgt-feed.js` - Netlify Function für Feed
- `kwgt-widget-template.txt` - Basis KWGT-Template (als Referenz)

**Files zu ändern:**
- `page-calendar.js` - Feed-Generation Funktion extrahieren

**Was konkret tun:**

1. **Unified Data Format** definieren
   ```json
   {
     "generated": "2025-10-27T14:30:00Z",
     "items": [
       {
         "id": "unique-id",
         "title": "Event/Task Titel",
         "time": "14:00",
         "duration": "2h",
         "date": "2025-10-27",
         "source": "obsidian|nextcloud|outlook",
         "project": "153",
         "type": "task|event|reminder",
         "description": "Optional kurze Beschreibung"
       }
     ],
     "summary": {
       "today": 3,
       "tomorrow": 2,
       "upcoming": 5
     }
   }
   ```

2. **Netlify Function** (`api/kwgt-feed.js`)
   ```javascript
   exports.handler = async (event, context) => {
     // Vorerst statische Test-Daten
     const data = generateFeedData();
     
     return {
       statusCode: 200,
       headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*'
       },
       body: JSON.stringify(data)
     };
   };
   ```

3. **Feed-URL festlegen**
   - `https://h2m.art/.netlify/functions/kwgt-feed`
   - CORS erlauben (KWGT braucht Zugriff)

4. **KWGT Widget Template** erstellen
   - Text-Widget mit Next 3 Items
   - Layout: Kompakt, 1x3 oder 2x2
   - Auto-Update: 15-30min
   - Dokumentieren in `kwgt-widget-template.txt`

5. **Filter-Parameter** (optional)
   ```
   ?limit=5       → Max. Anzahl Items
   ?view=today    → Nur heute
   ?source=all    → Filter nach Quelle
   ```

6. **Caching-Header** setzen
   ```javascript
   headers: {
     'Cache-Control': 'public, max-age=900' // 15 min
   }
   ```

**Erfolgskriterien:**
- ✅ JSON-Feed ist über URL abrufbar
- ✅ KWGT kann Feed parsen (Format korrekt)
- ✅ Widget zeigt Test-Daten an (kann getestet werden)
- ✅ Auto-Update funktioniert (Cache-Header gesetzt)

**Implementiert:**
- netlify.toml - Netlify Functions Config
- api/kwgt-feed.js - Netlify Function mit Query-Parametern (limit, view, source)
- page-calendar.js - generateKWGTFeed(), downloadKWGTFeed(), logKWGTFeed()
- kwgt-widget-template.txt - Ausführliche KWGT-Setup Dokumentation
- test-kwgt-feed.html - Interactive Test-Seite mit UI
- Unified Data Format definiert
- CORS-Header, Cache-Header (15min)
- Filter-Parameter: limit, view (today/tomorrow/upcoming/all), source
- Summary-Daten (today/tomorrow/upcoming/total)

---

### Häppchen 4: Mobile Testing & Polish

**Status:** ⏭️ Übersprungen (später nachholen)  
**Zeitschätzung:** 2-3 Stunden  
**Dependencies:** Häppchen 1-3 (alle Features fertig)

**Ziel:** Auf echtem Device testen, Bugs fixen, UX verfeinern

**Files zu ändern:**
- Alle CSS/JS Files (Bug-Fixes)
- `mobile-calendar.css` - UX-Verbesserungen

**Was konkret tun:**

1. **Deployment zu Netlify**
   - Alle neuen Files hochladen
   - KWGT-Feed testen (live URL)

2. **Test auf Nothing Phone 3**
   - WebApp öffnen: https://h2m.art/page-calendar.html
   - Alle Features durchgehen:
     - Timeline scrollen
     - Swipe zwischen Views
     - Filter öffnen/schließen
     - Touch-Targets testen

3. **Performance optimieren**
   - Große Listen → Virtual Scrolling? (später)
   - CSS Transitions glätten
   - JavaScript minimieren
   
4. **PWA-Features vorbereiten** (optional)
   - Add to Homescreen
   - Service Worker (offline caching)
   - App-Icons
   
5. **Accessibility checken**
   - Kontrast-Verhältnisse
   - Font-Größen lesbar
   - Touch-Targets nicht zu klein

6. **KWGT Widget einrichten**
   - Feed-URL eintragen
   - Layout anpassen
   - Auf Homescreen testen

**Erfolgskriterien:**
- Keine UI-Bugs auf Mobile
- Smooth 60fps Animationen
- KWGT Widget zeigt Daten
- WebApp nutzbar ohne Frustration

---

## Phase 2: Daten-Integration

**Status:** Geplant (startet nach Phase 1)

### Häppchen 5: Backend Setup (Netlify Functions)

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 3-4 Stunden  
**Dependencies:** Phase 1 abgeschlossen

**Ziel:** Basis-Struktur für API-Calls, Authentication-Handling

**Files zu erstellen:**
- `netlify.toml` - Netlify Config
- `api/calendar-base.js` - Shared Functions
- `api/auth-handler.js` - Token-Management
- `.env.example` - Environment Variables Template

**Was konkret tun:**

1. **Netlify Config** (`netlify.toml`)
   ```toml
   [build]
     functions = "api"
   
   [dev]
     functions = "api"
     port = 8888
   ```

2. **Environment Variables** festlegen
   ```
   NEXTCLOUD_URL=https://kai.nl.tab.digital
   NEXTCLOUD_USER=...
   NEXTCLOUD_PASSWORD=...
   OUTLOOK_CLIENT_ID=...
   OUTLOOK_CLIENT_SECRET=...
   GITHUB_TOKEN=... (für Obsidian Files)
   ```

3. **Shared Base Functions** (`api/calendar-base.js`)
   - Error-Handling
   - Response-Formatting
   - CORS-Headers
   - Logging

4. **Authentication-Handler** (`api/auth-handler.js`)
   - Token aus Environment lesen
   - Refresh-Token Logic (Outlook)
   - Security Best Practices

5. **Local Testing** mit Netlify CLI
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

**Erfolgskriterien:**
- ✅ Functions lokal testbar
- ✅ Environment Variables sicher
- ✅ CORS funktioniert
- ✅ Error-Handling vorhanden

**Implementiert:**
- .env.example mit allen benötigten Credentials-Templates
- api/calendar-base.js (275 Zeilen):
  - CORS-Headers, Response-Helpers (successResponse, errorResponse)
  - SimpleCache Klasse (In-Memory Cache mit TTL)
  - withCache() Async-Wrapper
  - RateLimiter Klasse
  - Logger Helper
- api/auth-handler.js (185 Zeilen):
  - getEnv() für sichere Environment Variables
  - Authentication für Nextcloud (BasicAuth), GitHub (Bearer), Outlook (OAuth2)
  - getOutlookAccessToken() mit automatischem Token-Refresh
  - validateCredentials() & getAvailableServices()
- README-backend-setup.md mit Setup-Anleitung
- .gitignore für Sicherheit (keine Secrets in Git)
- netlify.toml bereits vorhanden (Häppchen 3)

---

### Häppchen 6: Nextcloud CalDAV Integration

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 5-7 Stunden  
**Dependencies:** Häppchen 5 (Backend Setup)

**Ziel:** Events aus Nextcloud Calendar abrufen & parsen

**Files zu erstellen:**
- `api/nextcloud-calendar.js` - Netlify Function
- `lib/caldav-parser.js` - iCal Parsing Logic

**Was konkret tun:**

1. **CalDAV Client** Setup
   - Library: `tsdav` oder `dav` npm package
   - Authentication mit Nextcloud-Credentials
   
2. **Calendar-Endpoint finden**
   ```
   https://kai.nl.tab.digital/remote.php/dav/calendars/[username]/[calendar-name]/
   ```

3. **Events abrufen** (REPORT Request)
   ```xml
   <c:calendar-query xmlns:c="urn:ietf:params:xml:ns:caldav">
     <d:prop xmlns:d="DAV:">
       <d:getetag/>
       <c:calendar-data/>
     </d:prop>
     <c:filter>
       <c:comp-filter name="VCALENDAR">
         <c:comp-filter name="VEVENT">
           <c:time-range start="..." end="..."/>
         </c:comp-filter>
       </c:comp-filter>
     </c:filter>
   </c:calendar-query>
   ```

4. **iCal parsen** (`lib/caldav-parser.js`)
   - VEVENT → JSON umwandeln
   - Recurring Events auflösen
   - Zeitzonen beachten

5. **Unified Format** konvertieren
   - Nextcloud-Event → JSON aus Häppchen 3
   - source: "nextcloud"
   - project: Aus Custom-Property (falls vorhanden)

6. **Caching** implementieren
   - In-Memory Cache (5-15min)
   - ETag-Header nutzen für Conditional Requests

7. **Error-Handling**
   - Network-Fehler
   - Authentication-Fehler
   - Parsing-Fehler

**Erfolgskriterien:**
- ✅ Events werden abgerufen (Code fertig)
- ✅ JSON-Output korrekt (Unified Format)
- ⚠️ Recurring Events funktionieren (Basis implementiert, Expansion für später)
- ✅ Performance akzeptabel (mit Caching <2s erwartet)

**Implementiert:**
- api/nextcloud-calendar.js (110 Zeilen):
  - CalDAV REPORT Request mit time-range Filter
  - Fetch von mehreren Kalendern (aus NEXTCLOUD_CALENDARS)
  - 15min Cache pro Zeitraum
  - Error-Handling für einzelne Kalender (partial success)
- lib/caldav-parser.js (220 Zeilen):
  - parseICalEvents() - Extrahiert VEVENT aus XML/iCal
  - parseVEvent() - Parst einzelne Events
  - Unterstützt: UID, SUMMARY, DESCRIPTION, DTSTART, DTEND, LOCATION, CATEGORIES
  - parseICalDate() - Konvertiert iCal-Format zu ISO-8601
  - calculateDuration() - Berechnet Dauer in "Xh Ymin" Format
  - Projekt-Extraktion aus Categories (XXX_ Pattern)
  - Line-Folding Unterstützung (mehrzeilige Properties)

**Funktionsweise:**
1. CalDAV calendar-query XML-Request an Nextcloud
2. Response enthält iCal-Daten in XML eingebettet
3. Parser extrahiert VCALENDAR → VEVENT Blöcke
4. Jedes VEVENT wird zu JSON-Objekt konvertiert
5. Unified Format: {id, title, date, time, duration, source, project, type}

---

### Häppchen 7: Obsidian Tasks Parser

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 5-7 Stunden  
**Dependencies:** Häppchen 5 (Backend Setup)

**Ziel:** Tasks aus Obsidian Files parsen

**Files zu erstellen:**
- `api/obsidian-tasks.js` - Netlify Function
- `lib/markdown-task-parser.js` - Task Parsing Logic
- `lib/github-file-fetcher.js` - GitHub API Wrapper

**Was konkret tun:**

**Option A: GitHub API (empfohlen)**

1. **GitHub Repo Setup**
   - EntryPoint Files zu GitHub synced?
   - Oder private Repo erstellen
   - GitHub Token mit `repo` Scope

2. **Files finden** via GitHub API
   ```javascript
   // Suche nach .md Files mit Tasks
   GET /repos/{user}/{repo}/contents/a_yang
   // Recursive durchgehen
   ```

3. **Files abrufen & parsen**
   ```javascript
   // File Content
   GET /repos/{user}/{repo}/contents/{path}
   // Base64 decoden
   ```

4. **Task-Format parsen** (`lib/markdown-task-parser.js`)
   ```markdown
   - [ ] Task Titel @2025-10-27 #153_H2me
   - [x] Erledigte Task
   ```
   
   Regex für:
   - Checkbox Status: `- [ ]` = todo, `- [x]` = done
   - Datum: `@YYYY-MM-DD` oder `📅 YYYY-MM-DD`
   - Projekt: `#153_H2me` oder aus Filename
   - Zeit: `⏰ 14:00` (falls vorhanden)

5. **Dateinamen-Konvention** nutzen
   ```
   153_TASKS_h2me.md → project: "153"
   ```

6. **Unified Format** konvertieren
   - Task → JSON aus Häppchen 3
   - source: "obsidian"
   - project: Aus Filename oder Tag

7. **Caching** (wichtig!)
   - GitHub API Rate-Limit: 5000 req/h (authenticated)
   - Cache 15-30min

**Option B: Manueller Export** (Fallback)
- User exportiert Tasks als JSON
- Upload zu Netlify (static file)
- Function liest statisches File

**Erfolgskriterien:**
- ✅ Tasks werden gefunden
- ✅ Datum/Zeit korrekt geparst
- ✅ Projekt-Zuordnung funktioniert
- ✅ Rate-Limits beachtet (Caching 15min)

**Implementiert:**
- api/obsidian-tasks.js (65 Zeilen):
  - Fetch aller .md Files aus GitHub Repo
  - Parse Tasks aus jedem File
  - Projekt-Extraktion aus Filename (XXX_TASKS_name.md)
  - 15min Cache
- lib/github-file-fetcher.js (45 Zeilen):
  - fetchGitHubFiles() - GitHub API Contents Endpoint
  - Bearer Token Authentication
  - Download von File-Inhalten
- lib/markdown-task-parser.js (105 Zeilen):
  - parseMarkdownTasks() - Findet Checkbox-Tasks
  - Task-Pattern: `- [ ]` oder `- [x]`
  - Datum-Formate:
    - @YYYY-MM-DD
    - 📅 YYYY-MM-DD
    - [due:: YYYY-MM-DD]
  - Zeit-Formate: ⏰ HH:MM oder @HH:MM
  - Projekt-Extraktion: #XXX_Name oder aus Filename
  - Priority-Parsing: priority::(high|medium|low)
  - Filtert nur incomplete Tasks (nicht [x])
  - Filtert nur zukünftige/heutige Tasks

**Funktionsweise:**
1. GitHub API: Liste aller .md Files aus Repo-Path
2. Für jedes File: Content herunterladen
3. Parser durchsucht Zeilen nach Task-Pattern
4. Extrahiert Metadaten (Datum, Zeit, Projekt)
5. Bereinigt Titel (entfernt Metadaten-Tags)
6. Nur Tasks mit Datum werden returned

---

### Häppchen 8: Outlook Graph API

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 5-7 Stunden  
**Dependencies:** Häppchen 5 (Backend Setup)

**Ziel:** Events aus Outlook Calendar via Microsoft Graph API

**Files zu erstellen:**
- `api/outlook-calendar.js` - Netlify Function
- `lib/graph-auth.js` - OAuth2 Flow (wenn nötig)

**Was konkret tun:**

1. **Azure App Registration**
   - App in Azure Portal registrieren
   - Client ID & Secret erhalten
   - Redirect URI: `https://h2m.art/callback`
   - Permissions: `Calendars.Read`

2. **Authentication Flow**
   - **Option A:** User OAuth (kompliziert)
   - **Option B:** App-Only Auth (einfacher, für persönliche Nutzung)
   
   Empfohlen: Option B mit Refresh Token

3. **Graph API Endpoint**
   ```
   GET https://graph.microsoft.com/v1.0/me/calendar/events
   ?$select=subject,start,end,location,categories
   &$top=50
   &$filter=start/dateTime ge '2025-10-27T00:00:00'
   ```

4. **Events parsen** (schon JSON)
   ```json
   {
     "subject": "Meeting",
     "start": { "dateTime": "2025-10-27T14:00:00", "timeZone": "UTC" },
     "end": { ... },
     "categories": ["153_H2me"] // Falls gesetzt
   }
   ```

5. **Unified Format** konvertieren
   - Graph Event → JSON aus Häppchen 3
   - source: "outlook"
   - project: Aus categories (falls match mit XXX_ Pattern)

6. **Pagination** behandeln
   - Graph API gibt max. 50 Items
   - `@odata.nextLink` für mehr

7. **Rate-Limiting** beachten
   - Throttling bei zu vielen Requests
   - Retry-Logic mit Backoff

**Erfolgskriterien:**
- ✅ Events werden abgerufen
- ✅ Authentication funktioniert (OAuth2 mit Refresh Token)
- ✅ Pagination vorbereitet (limitiert auf 100 Items)
- ✅ Fehler werden behandelt

**Implementiert:**
- api/outlook-calendar.js (145 Zeilen):
  - Microsoft Graph API v1.0/me/calendar/events
  - Automatischer Token-Refresh via auth-handler
  - Query-Parameter: $select, $top, $filter, $orderby
  - Filter nach Zeitraum (start/end dateTime)
  - convertOutlookEvent() - Konvertiert zu Unified Format
  - Projekt-Extraktion aus Categories (XXX_ Pattern)
  - calculateDuration() - Berechnet Event-Dauer
  - 15min Cache
- Nutzt auth-handler.js:
  - getOutlookAccessToken() holt neuen Access Token mit Refresh Token
  - Automatisch wenn alter Token abläuft
  - OAuth2 Token-Exchange (client_credentials + refresh_token flow)

**Funktionsweise:**
1. Auth-Handler holt Access Token (refresh falls nötig)
2. Graph API Request mit Bearer Token
3. Response ist bereits JSON (kein Parsing nötig)
4. Konvertierung zu Unified Format:
   - subject → title
   - start.dateTime → date & time
   - Berechne duration aus start/end
   - categories → project (wenn XXX_ Pattern)
5. isAllDay → time: "ganztägig"

**OAuth2 Flow (einmalig Setup):**
1. Azure App registrieren
2. Authorization Code holen (Browser)
3. Code → Refresh Token tauschen (cURL)
4. Refresh Token in .env speichern
5. Backend holt automatisch Access Tokens

---

### Häppchen 9: Unified Data Model & Caching

**Status:** ✅ Abgeschlossen (2025-10-27)  
**Zeitschätzung:** 2-3 Stunden  
**Dependencies:** Häppchen 6-8 (alle Quellen fertig)

**Ziel:** Daten von allen Quellen aggregieren, cachen, ausliefern

**Files zu erstellen:**
- `api/calendar-aggregate.js` - Main API Endpoint
- `lib/data-aggregator.js` - Merge Logic
- `lib/cache-manager.js` - Caching Layer

**Was konkret tun:**

1. **Main Endpoint** (`api/calendar-aggregate.js`)
   ```javascript
   exports.handler = async (event, context) => {
     const { view, source, project } = event.queryStringParameters;
     
     // Alle Quellen parallel abrufen
     const [nextcloud, obsidian, outlook] = await Promise.all([
       fetchNextcloud(),
       fetchObsidian(),
       fetchOutlook()
     ]);
     
     // Mergen & Filtern
     const merged = aggregateData(nextcloud, obsidian, outlook);
     const filtered = applyFilters(merged, { view, source, project });
     
     return {
       statusCode: 200,
       body: JSON.stringify(filtered)
     };
   };
   ```

2. **Data Aggregation** (`lib/data-aggregator.js`)
   - Arrays mergen
   - Nach Datum sortieren
   - Duplikate entfernen (falls gleiche ID)
   - Prioritäten beachten (falls mehrere Sources gleichen Event)

3. **Caching** (`lib/cache-manager.js`)
   ```javascript
   const cache = new Map();
   
   async function getCached(key, fetchFn, ttl = 900) {
     if (cache.has(key)) {
       const { data, expires } = cache.get(key);
       if (Date.now() < expires) return data;
     }
     
     const data = await fetchFn();
     cache.set(key, { data, expires: Date.now() + ttl * 1000 });
     return data;
   }
   ```

4. **Filter-Logic**
   - view: 'day' | 'week' | 'month' | 'all'
   - source: 'all' | 'nextcloud' | 'obsidian' | 'outlook'
   - project: 'all' | '153' | '610' | ...

5. **Response-Format**
   ```json
   {
     "items": [...],
     "meta": {
       "generated": "2025-10-27T14:30:00Z",
       "sources": {
         "nextcloud": { count: 5, cached: true },
         "obsidian": { count: 12, cached: false },
         "outlook": { count: 3, cached: true }
       },
       "filter": { view: "week", source: "all", project: "153" }
     }
   }
   ```

6. **Error-Handling**
   - Falls eine Quelle fehlschlägt → Rest weiter ausliefern
   - Partial Success mit Warning-Header

7. **Frontend anbinden**
   - `page-calendar.js` anpassen
   - Statt statische Daten → API-Call
   - Loading-State & Error-State

**Erfolgskriterien:**
- ✅ Alle Quellen werden aggregiert
- ✅ Caching funktioniert (15min TTL)
- ✅ Filter werden angewandt
- 🔄 Frontend zeigt echte Daten (bereit, braucht Credentials)

**Implementiert:**
- api/calendar-aggregate.js (185 Zeilen):
  - **Main API Endpoint** - Wichtigster Endpoint
  - fetchAllSources() - Ruft alle 3 Sources parallel ab
  - Nutzt Promise.all() für parallele Fetches
  - Partial Success: Falls eine Quelle fehlschlägt, andere weiterlaufen
  - calculateSummary() - Berechnet today/tomorrow/upcoming/total
  - Query-Parameter: view, source, project, limit
  - getAvailableServices() - Check welche Credentials vorhanden
  - Response mit meta-Informationen
- lib/data-aggregator.js (100 Zeilen):
  - aggregateData() - Merged 3 Arrays:
    - Concat alle Items
    - Sort nach Datum + Zeit
    - Remove Duplikate (source + id)
  - applyFilters() - Filtert nach:
    - source (nextcloud|obsidian|outlook|all)
    - project (153|610|010|all)
    - view (today|tomorrow|upcoming|week|month|all)
    - limit (max Anzahl)
  - filterByView() - View-Logic:
    - today: Nur heutiges Datum
    - tomorrow: Nur morgiges Datum
    - upcoming: Heute + nächste 7 Tage
    - week: Nächste 7 Tage (ohne heute)
    - month: Nächste 30 Tage
    - all: Alles

**Funktionsweise:**
1. Frontend: GET /calendar-aggregate?view=upcoming&limit=10
2. Aggregator checked verfügbare Services (aus .env)
3. Start 3 parallel Fetches (mit Timeout-Handling):
   - nextcloud-calendar.handler()
   - obsidian-tasks.handler()
   - outlook-calendar.handler()
4. Warte auf alle (oder timeout nach 10s)
5. Merge alle Arrays:
   - [nextcloud-events, obsidian-tasks, outlook-events]
6. Sort nach Datum + Zeit
7. Remove Duplikate
8. Apply Filters (view, source, project)
9. Limit auf X Items
10. Calculate Summary
11. Return Unified JSON:
```json
{
  "items": [...],
  "summary": {
    "today": 3,
    "tomorrow": 2,
    "upcoming": 5,
    "total": 10,
    "bySource": {...}
  },
  "meta": {
    "view": "upcoming",
    "count": 10,
    "availableServices": ["nextcloud", "obsidian", "outlook"]
  }
}
```

**Integration mit Frontend:**
- page-calendar.js kann currentView + currentFilters nutzen
- Statt testData → API-Call zu /calendar-aggregate
- Response direkt in renderTimeline() verwenden

---

## Session-Protokoll & Updates

### Session 2025-10-27

**Geplant:**
- POC-Review
- Planung für Phase 1 erstellen
- Entscheidungen über Obsidian-Integration

**Status:**
- **Phase 1:** 3/4 Häppchen abgeschlossen (H4 übersprungen)
  - Häppchen 1 ✅ Mobile Navigation & Layout
  - Häppchen 2 ✅ Touch-Interaktionen & Swipe
  - Häppchen 3 ✅ KWGT JSON Feed
  - Häppchen 4 ⏭️ Mobile Testing & Polish (übersprungen)

- **Phase 2:** 5/5 Häppchen abgeschlossen ✅ KOMPLETT
  - Häppchen 5 ✅ Backend Setup
  - Häppchen 6 ✅ Nextcloud CalDAV Integration
  - Häppchen 7 ✅ Obsidian Tasks Parser
  - Häppchen 8 ✅ Outlook Graph API
  - Häppchen 9 ✅ Unified Data Aggregator

---

## Offene Fragen für nächste Session

- [ ] Obsidian Files: GitHub Sync vorhanden oder einrichten?
- [ ] Outlook: Bereits Azure App oder neu registrieren?
- [ ] KWGT: JSON oder XML bevorzugt?
- [ ] Testing: Welches Device außer Nothing Phone 3?

---

## Updates

(LogClaudine:: (LogCreated:: 25-10-27) **PLANUNG-CREATED** Häppchen-Struktur für Phase 1+2 erstellt, 9 Häppchen definiert (Mobile-First 4x, Daten-Integration 5x), konkrete Files und Schritte dokumentiert, bereit für Claude Code)

(LogClaudine:: (LogCompleted:: 25-10-27) **PHASE-1-COMPLETED** Häppchen 1-3 abgeschlossen (H4 übersprungen): Mobile Navigation, Touch-Gestures, KWGT Feed - alle mobile getestet und funktionsfähig)

(LogClaudine:: (LogCompleted:: 25-10-27) **PHASE-2-COMPLETED** Häppchen 5-9 abgeschlossen: Backend Setup, Nextcloud CalDAV, Obsidian Tasks, Outlook Graph API, Unified Aggregator - 13 neue Files erstellt (~1500 Zeilen Code), bereit für Credentials-Setup)

---

_Planung-File für operative Arbeit - Strategie siehe `doc_calendar_roadmap.md`_  
_Letzte Aktualisierung: 2025-10-27_