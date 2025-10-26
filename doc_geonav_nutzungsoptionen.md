# GeoNav - Kontext-abhängiger Würfel (Ansatz 3)

**Projekt:** Geometrische Navigation für H2me  
**Erstellt:** 2025-10-24  
**Status:** Konzept-Phase (noch nicht implementiert)  
**Zweck:** Dokumentation des "kontext-abhängigen Würfel"-Ansatzes

---

## Kern-Idee

**EIN Würfel-System, das sich intelligent an den Kontext anpasst:**
- Gleiche Interaktion (Drag/Snap/Click) überall
- Unterschiedlicher Inhalt je nach Seite
- Würfel "weiß" wo er ist und zeigt relevante Navigation

**Beispiele:**
- **Landing:** Würfel zeigt Haupt-Bereiche (Yang/Bian/Yin/Graph/Dashboard/3D)
- **Yang-Seite:** Würfel zeigt Yang-Unter-Konzepte + verwandte Bereiche
- **Graph-Seite:** Würfel zeigt Graph-Varianten + verwandte Tools

---

## Vergleich der Ansätze

### Ansatz 1: Seiten-Gruppen mit eigenem Würfel
- Jede Gruppe hat eigenen Würfel
- Thematische Trennung
- **Problem:** Mehrere Würfel zu pflegen, User muss zurück zur Landing

### Ansatz 2: Hybrid-Navigation
- GeoNav nur für bestimmte Seiten
- Rest klassische Navigation
- **Problem:** Inkonsistente UX

### ✅ Ansatz 3: Kontext-abhängiger Würfel (DIESER)
- **EIN** Würfel-System
- Inhalte ändern sich je nach Kontext
- Konsistente Interaktion überall

**Warum Ansatz 3?**
- User lernt **einmal** wie Würfel funktioniert
- Flexibel erweiterbar (nur Config ändern)
- Skaliert mit wachsender Website
- Kontextuelles Verständnis (Würfel zeigt wo ich bin)

---

## Technisches Konzept

### 1. Zentrale Konfigurations-Datei

**Neue Datei:** `shared-geonav-config.js`

**Struktur:**
```javascript
const GEONAV_CONFIGS = {
  'page-id': {
    title: 'Anzeige-Titel für Info-Overlay',
    faces: [
      { 
        name: 'eindeutige-id',
        label: 'Anzeige-Text auf Fläche',
        color: 0xHEXCODE,
        url: 'ziel-seite.html',
        description: 'Tooltip-Text'
      },
      // ... 5 weitere Flächen
    ]
  }
};
```

**Beispiel-Config für Landing:**
```javascript
'index': {
  title: 'H2me Hauptbereiche',
  faces: [
    { 
      name: 'yang', 
      label: 'Yang', 
      color: 0xffc107,
      url: 'page-yang.html',
      description: 'Aktives, Gestaltendes'
    },
    { 
      name: 'bian', 
      label: 'Bian', 
      color: 0x2196f3,
      url: 'page-bian.html',
      description: 'Transformierendes, Verbindendes'
    },
    { 
      name: 'yin', 
      label: 'Yin', 
      color: 0x9c27b0,
      url: 'page-yin.html',
      description: 'Rezeptives, Bewahrendes'
    },
    { 
      name: 'graph', 
      label: 'Graph', 
      color: 0x4caf50,
      url: 'page-graph.html',
      description: 'Visualisierungen'
    },
    { 
      name: 'dashboard', 
      label: 'Dashboard', 
      color: 0xff9800,
      url: 'page-dashboard.html',
      description: 'Übersicht & Tasks'
    },
    { 
      name: '3d', 
      label: '3D', 
      color: 0x00bcd4,
      url: 'page-3dmodel.html',
      description: '3D Modelle'
    }
  ]
}
```

**Beispiel-Config für Yang-Seite:**
```javascript
'page-yang': {
  title: 'Yang Bereiche',
  faces: [
    // 3x Yang-spezifische Unter-Bereiche
    { 
      name: 'projekte', 
      label: 'Projekte', 
      color: 0xffc107,
      url: 'page-yang-projekte.html',
      description: 'Aktive Projekte'
    },
    { 
      name: 'ideen', 
      label: 'Ideen', 
      color: 0xffeb3b,
      url: 'page-yang-ideen.html',
      description: 'Neue Konzepte'
    },
    { 
      name: 'tools', 
      label: 'Tools', 
      color: 0xff9800,
      url: 'page-yang-tools.html',
      description: 'Werkzeuge'
    },
    // 1x Home-Fläche (zurück)
    { 
      name: 'home', 
      label: '🏠 Home', 
      color: 0x666666,
      url: 'index.html',
      description: 'Zurück zur Startseite'
    },
    // 2x Querverbindungen (andere Philosophien)
    { 
      name: 'to-bian', 
      label: '→ Bian', 
      color: 0x2196f3,
      url: 'page-bian.html',
      description: 'Zum Bian-Bereich'
    },
    { 
      name: 'to-yin', 
      label: '→ Yin', 
      color: 0x9c27b0,
      url: 'page-yin.html',
      description: 'Zum Yin-Bereich'
    }
  ]
}
```

**Beispiel-Config für Graph-Seite:**
```javascript
'page-graph': {
  title: 'Graph Visualisierungen',
  faces: [
    // 3x Graph-Varianten
    { 
      name: 'cytoscape', 
      label: 'Cytoscape', 
      color: 0xff5722,
      url: 'page-cytoscape.html',
      description: 'Cytoscape.js Graph'
    },
    { 
      name: 'force', 
      label: 'Force Layout', 
      color: 0x4caf50,
      url: 'page-flsdgrm.html',
      description: 'Force-Directed'
    },
    { 
      name: 'basic', 
      label: 'Basic Graph', 
      color: 0x8bc34a,
      url: 'page-graph.html',
      description: 'Einfacher Graph'
    },
    // 1x Home
    { 
      name: 'home', 
      label: '🏠 Home', 
      color: 0x666666,
      url: 'index.html',
      description: 'Zurück zur Startseite'
    },
    // 2x Verwandte Bereiche
    { 
      name: '3d', 
      label: '3D Models', 
      color: 0x00bcd4,
      url: 'page-3dmodel.html',
      description: '3D Visualisierung'
    },
    { 
      name: 'dashboard', 
      label: 'Dashboard', 
      color: 0xff9800,
      url: 'page-dashboard.html',
      description: 'Daten-Übersicht'
    }
  ]
}
```

---

### 2. Smart Page Detection

**Funktionen in `shared-geonav.js`:**

```javascript
// Automatisch erkennen auf welcher Seite wir sind
function detectCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop().replace('.html', '');
  
  // Spezialfälle
  if (filename === '' || filename === 'index') {
    return 'index';
  }
  
  return filename;
}

// Config laden basierend auf aktueller Seite
function loadConfig() {
  const currentPage = detectCurrentPage();
  const config = GEONAV_CONFIGS[currentPage];
  
  if (!config) {
    console.log('No GeoNav config for:', currentPage);
    return null;
  }
  
  console.log('✓ Loaded GeoNav config for:', currentPage);
  console.log('  Title:', config.title);
  console.log('  Faces:', config.faces.length);
  
  return config;
}
```

**Wie es funktioniert:**
1. Seite lädt → `detectCurrentPage()` wird aufgerufen
2. Filename wird extrahiert: `page-yang.html` → `page-yang`
3. Config wird gesucht: `GEONAV_CONFIGS['page-yang']`
4. Wenn gefunden → Würfel wird initialisiert
5. Wenn nicht gefunden → Kein Würfel (Fallback zu normaler Navigation)

---

### 3. Dynamischer Würfel-Generator

**Würfel passt sich an Config an:**

```javascript
function initGeoNav() {
  const config = loadConfig();
  
  if (!config) {
    // Kein Würfel für diese Seite
    return;
  }
  
  // Scene Setup (wie im PoC)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, ...);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  
  // Würfel mit Config erstellen
  const cube = createCube(config.faces);
  scene.add(cube);
  
  // Info-Overlay mit Titel updaten
  updateInfoOverlay(config.title);
  
  // Events wie im PoC (Drag, Click, Snap)
  setupDragAndClick(cube, config.faces);
  setupSnap(cube);
  
  // Animation starten
  animate();
}

function createCube(faces) {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Materials basierend auf faces-Config
  const materials = faces.map(face => 
    new THREE.MeshPhongMaterial({ 
      map: createTextTexture(face.label, face.color)
    })
  );
  
  return new THREE.Mesh(geometry, materials);
}

function updateInfoOverlay(title) {
  const overlay = document.querySelector('.info-overlay h2');
  if (overlay) {
    overlay.textContent = `🎲 ${title}`;
  }
}
```

---

## User Experience - Konkrete Beispiele

### Beispiel 1: Navigation vom Landing zu Yang

**User auf `index.html`:**
1. Sieht Würfel mit Titel "H2me Hauptbereiche"
2. Flächen zeigen: Yang/Bian/Yin/Graph/Dashboard/3D
3. Klickt auf **Yang-Fläche** (gelb)
4. → Navigiert zu `page-yang.html`

**User auf `page-yang.html`:**
1. Würfel **lädt neu** mit neuem Kontext
2. Titel ändert sich zu "Yang Bereiche"
3. Flächen zeigen jetzt:
   - Projekte (Yang-Gelb)
   - Ideen (Helles Yang)
   - Tools (Dunkles Yang)
   - 🏠 Home (Grau)
   - → Bian (Blau)
   - → Yin (Lila)
4. User kann:
   - Tiefer in Yang-Bereiche navigieren (Projekte/Ideen/Tools)
   - Zu anderen Philosophien springen (Bian/Yin)
   - Zurück zum Home

---

### Beispiel 2: Querverbindungen entdecken

**User auf `page-graph.html`:**
1. Würfel zeigt "Graph Visualisierungen"
2. Flächen zeigen:
   - Graph-Varianten (Cytoscape/Force/Basic)
   - Home
   - Verwandte Bereiche (3D/Dashboard)
3. User entdeckt **3D-Fläche** (verwandt)
4. Klickt → Navigiert zu `page-3dmodel.html`

**Vorteil:**
- Nicht nur hierarchisch navigieren (hoch/runter)
- Auch lateral zwischen verwandten Bereichen
- Discovery-Effekt (User entdeckt Verbindungen)

---

### Beispiel 3: Immer einen Ausweg

**User ist tief in Unter-Bereichen:**
- `page-yang-projekte-details.html`
- Würfel zeigt immer **Home-Fläche**
- Klick → Zurück zur Landing
- Keine "Sackgasse"

---

## Design-Patterns & Regeln

### Pattern: 6-Flächen-Layout

**Standard-Aufteilung:**
```
3 Haupt-Inhalte (thematisch zur Seite)
+ 1 Home-Fläche (zurück zur Landing)
+ 2 Verwandte Bereiche (Querverbindungen)
= 6 Flächen (Würfel)
```

**Warum 6 Flächen?**
- Würfel hat 6 Flächen (konsistent)
- User lernt EINE Form
- Nicht zu viel, nicht zu wenig

**Alternative Geometrien (später):**
- 4 Flächen → Tetraeder (für weniger Optionen)
- 8 Flächen → Oktaeder (für mehr Optionen)
- **Aktuell:** Immer Würfel (6 Flächen)

---

### Farb-System

**Regel 1: Haupt-Bereiche nutzen Original-Farben**
- Yang: `0xffc107` (Gelb)
- Bian: `0x2196f3` (Blau)
- Yin: `0x9c27b0` (Lila)
- Graph: `0x4caf50` (Grün)
- Dashboard: `0xff9800` (Orange)
- 3D: `0x00bcd4` (Cyan)

**Regel 2: Unter-Bereiche nutzen Nuancen**
- Yang-Projekte: `0xffc107` (Original)
- Yang-Ideen: `0xffeb3b` (Heller)
- Yang-Tools: `0xff9800` (Dunkler)

**Regel 3: Home-Fläche immer neutral**
- Home: `0x666666` (Grau)
- Immer gleich, egal auf welcher Seite

**Regel 4: Querverbindungen nutzen Ziel-Farbe**
- →Bian auf Yang-Seite: `0x2196f3` (Bian-Blau)
- →Yin auf Yang-Seite: `0x9c27b0` (Yin-Lila)

---

### Benennung & Labels

**Haupt-Inhalte:**
- Kurze, prägnante Labels (1-2 Wörter)
- Beispiele: "Projekte", "Ideen", "Tools"

**Home-Fläche:**
- Emoji + Text: "🏠 Home"
- Universell erkennbar

**Querverbindungen:**
- Pfeil + Name: "→ Bian", "→ Yin"
- Zeigt Richtung an

---

## Vorteile dieses Ansatzes

### 1. Konsistente Interaktion
- User lernt **einmal** wie Würfel funktioniert
- Überall gleiche Bedienung (Drag/Snap/Click)
- Wiedererkennungswert
- Keine Verwirrung durch verschiedene Systeme

### 2. Kontextuelles Verständnis
- Würfel zeigt **wo ich bin** (durch Titel + Flächen-Inhalte)
- Würfel zeigt **wohin ich kann** (Navigation)
- Würfel zeigt **verwandte Bereiche** (Discovery)
- Orientierung bleibt erhalten

### 3. Skalierbarkeit
- Neue Seiten? → Einfach Config hinzufügen in `shared-geonav-config.js`
- Neue Unter-Bereiche? → Config erweitern
- Keine Code-Änderungen am Würfel-System selbst
- System wächst mit Website

### 4. Flexibilität
- Seiten können Würfel haben oder nicht (Config-basiert)
- Einfach an/aus per Config
- Keine Seite ist "gezwungen" Würfel zu nutzen
- Fallback: Normale Navigation bleibt verfügbar

### 5. Discovery
- User entdeckt Verbindungen zwischen Bereichen
- Lateral navigation (nicht nur hoch/runter)
- Experimentelles Erkunden möglich

---

## Herausforderungen & Lösungen

### Challenge 1: Navigation-Verwirrung

**Problem:** User verliert Orientierung (wo bin ich?)

**Lösungen:**
1. **Info-Overlay mit Titel**
   - "H2me Hauptbereiche" → Landing
   - "Yang Bereiche" → Yang-Seite
   - "Graph Visualisierungen" → Graph-Seite

2. **Home-Fläche immer vorhanden**
   - Universeller "Escape-Button"
   - Zurück zur Landing
   - Keine Sackgasse

3. **Optional: Breadcrumb**
   - Landing > Yang > Projekte
   - Klassische Orientierung zusätzlich

---

### Challenge 2: Zu viele Configs

**Problem:** Jede neue Seite braucht Config-Eintrag

**Lösungen:**
1. **Template-Configs für Standard-Fälle**
   ```javascript
   function createStandardSubPageConfig(parent, subPages) {
     return {
       title: `${parent} Bereiche`,
       faces: [
         ...subPages, // 3x Unter-Bereiche
         HOME_FACE, // 1x Home
         ...getRelatedFaces(parent, 2) // 2x Verwandte
       ]
     };
   }
   ```

2. **Generator-Script (später)**
   - Auto-generiert Configs aus File-Struktur
   - Reduziert manuelle Arbeit

3. **Fallback-Verhalten**
   - Keine Config? → Kein Würfel
   - Seite funktioniert trotzdem (normale Navigation)

---

### Challenge 3: Mobile Performance

**Problem:** 3D auf Mobile = langsam?

**Lösungen:**
1. **Bereits im PoC getestet**
   - Funktioniert auf Nothing Phone 3
   - Three.js ist optimiert

2. **Touch-Support** (Häppchen 7)
   - Touch-Events statt Mouse-Events
   - Native Mobile-Interaktion

3. **Performance-Fallback** (optional)
   - Bei langsamen Devices: 2D-Grid statt 3D
   - Detect via Performance API

---

### Challenge 4: Barrierefreiheit

**Problem:** 3D ist nicht screenreader-friendly

**Lösungen:**
1. **Alternative Navigation MUSS vorhanden sein**
   - Klassische Nav-Bar zusätzlich
   - Oder Liste von Links

2. **Keyboard-Navigation** (später)
   - Pfeiltasten für Würfel-Drehung
   - Enter für Klick
   - Tab für Flächen-Auswahl

3. **ARIA-Labels**
   - Beschreibung jeder Fläche
   - Screenreader kann vorlesen

---

## Implementierungs-Roadmap

### Phase 1: Config-System (1-2h)
- [ ] `shared-geonav-config.js` erstellen
- [ ] Configs für Landing, Yang, Graph, Bian, Yin
- [ ] `detectCurrentPage()` Funktion
- [ ] `loadConfig()` Funktion
- [ ] Error-Handling (keine Config gefunden)

### Phase 2: Dynamischer Würfel (2-3h)
- [ ] `createCube(faces)` mit variablen Faces
- [ ] `updateInfoOverlay(title)` Funktion
- [ ] Testing: Würfel lädt richtige Config
- [ ] Testing: Würfel zeigt richtige Flächen

### Phase 3: Landing-Integration (1-2h)
- [ ] `index.html` integrieren
- [ ] Entscheidung: Ersetzt oder ergänzt 9-Button-Grid?
- [ ] Lokales Testing
- [ ] Deploy & Online-Test

### Phase 4: Unter-Seiten (3-4h)
- [ ] `page-yang.html` mit Yang-Config
- [ ] Testing: Navigation Landing → Yang → zurück
- [ ] Weitere Seiten (Bian, Yin, Graph)
- [ ] Testing: Querverbindungen funktionieren

### Phase 5: Polish & Refinement (2-3h)
- [ ] Farb-System verfeinern
- [ ] Transitions zwischen Seiten (optional)
- [ ] Mobile-Testing (Touch)
- [ ] Barrierefreiheit (Keyboard, ARIA)

**Total geschätzt:** 9-14h (mit neuer Schätzungs-Formel: ~2-4h real?)

---

## Offene Entscheidungen

### Entscheidung 1: Welche Seiten bekommen Würfel?

**Definitiv:**
- ✅ Landing (`index.html`)
- ✅ Yang (`page-yang.html`)
- ✅ Bian (`page-bian.html`)
- ✅ Yin (`page-yin.html`)
- ✅ Graph (`page-graph.html`)

**Wahrscheinlich:**
- 🤔 3D Models (`page-3dmodel.html`)
- 🤔 Cytoscape (`page-cytoscape.html`)
- 🤔 Force Layout (`page-flsdgrm.html`)

**Wahrscheinlich nicht:**
- ❌ Dashboard (`page-dashboard.html`) - Task-fokussiert, braucht normale Navigation
- ❌ Unter-Unter-Seiten (zu tief in Hierarchie)

---

### Entscheidung 2: Yang/Bian/Yin Unter-Bereiche

**Was könnten Yang-Unter-Bereiche sein?**

**Vorschlag A - Thematisch:**
- Projekte (aktive Yang-Projekte)
- Ideen (neue Konzepte)
- Tools (Yang-Werkzeuge)

**Vorschlag B - Nach Aktivität:**
- Aktiv (in Arbeit)
- Geplant (nächste Schritte)
- Abgeschlossen (Portfolio)

**Vorschlag C - Nach Medium:**
- Code (Programmier-Projekte)
- Design (Visuelle Projekte)
- Text (Schreib-Projekte)

**Analog für Bian & Yin - was macht Sinn?**

---

### Entscheidung 3: Landing-Page

**Option A: Würfel ersetzt 9-Button-Grid**
- Nur noch 3D-Würfel
- Experimentell & einzigartig
- Risiko: User-Verwirrung

**Option B: Toggle zwischen Würfel & Grid**
- Button: "3D-Navigation" ⇄ "Klassische Navigation"
- Beste UX (User wählt)
- Mehr Implementierungs-Aufwand

**Option C: Würfel ergänzt Grid**
- Beide nebeneinander
- Redundant aber sicher
- Nimmt viel Platz

**Empfehlung:** Option B (Toggle)

---

## Technische Details

### File-Struktur

**Neue Files:**
```
153_H2me/
├── shared-geonav-config.js    # Alle Seiten-Configs
├── shared-geonav.js            # Würfel-System (erweitert aus PoC)
├── shared-geonav.css           # Styling für Würfel
└── (bestehende Files unverändert)
```

**Modified Files:**
```
index.html                      # Integration Würfel auf Landing
page-yang.html                  # Integration Würfel (später)
page-bian.html                  # Integration Würfel (später)
page-yin.html                   # Integration Würfel (später)
page-graph.html                 # Integration Würfel (später)
```

---

### Integration in HTML

**Beispiel `index.html`:**
```html
<head>
  <!-- Bestehende Imports -->
  <link rel="stylesheet" href="shared-global.css">
  
  <!-- GeoNav Integration -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="shared-geonav-config.js"></script>
  <script src="shared-geonav.js"></script>
  <link rel="stylesheet" href="shared-geonav.css">
</head>

<body>
  <!-- GeoNav wird automatisch initialisiert -->
  <div id="geonav-container"></div>
  
  <!-- Optional: Fallback Navigation -->
  <nav class="fallback-nav">
    <!-- Links falls GeoNav nicht lädt -->
  </nav>
</body>
```

**Keine weiteren Änderungen nötig!**
- `shared-geonav.js` erkennt automatisch Seite
- Lädt passende Config
- Initialisiert Würfel

---

## Lessons Learned aus PoC

### Was funktioniert gut:
- Three.js ist schnell & zuverlässig
- Drag/Snap/Click Interaktion ist intuitiv
- Raycasting für Klick-Erkennung funktioniert perfekt
- Single-Session Flow ist sehr effizient

### Was zu beachten ist:
- Config-Verwaltung wird zentral sein (gut dokumentieren!)
- Testing auf allen Seiten wichtig (verschiedene Configs)
- Mobile-Testing early (Touch-Events)
- Performance-Monitoring (bei vielen Seiten mit Würfel)

---

## Verwandte Dateien

**PoC-Dokumentation:**
- [[doc_geonav_haeppchen_poc]] - Häppchen-basierte Planung
- [[doc_geonav_roadmap]] - Langzeit-Roadmap
- [[doc_geonav_zeiterfassung]] - Zeitschätzungen vs. Realität
- `page-geonav-poc.html` - Funktionierender PoC

**BOAT-Files (EntryPoint):**
- [[153_BOAT_Geometrische_Navigation_Views_als_Koerper]] - Original-Konzept

**MAKRO & Tasks:**
- [[153_MAKRO_H2me]] - Projekt-Übersicht
- [[153_TASKS_h2me]] - Nächste Schritte

---

## Nächste Schritte (wenn Entscheidung getroffen)

1. **Config-System implementieren**
   - `shared-geonav-config.js` erstellen
   - Configs für alle Haupt-Seiten
   - Testing: Config-Loading funktioniert

2. **Landing-Page Integration**
   - Würfel auf `index.html` integrieren
   - Entscheidung: Ersetzt oder Toggle mit 9-Button?
   - Testing lokal + deployed

3. **Erste Unter-Seite**
   - Yang-Config definieren
   - `page-yang.html` integrieren
   - Testing: Navigation Landing ↔ Yang

4. **Weitere Seiten**
   - Bian, Yin, Graph Configs
   - Integration auf allen Seiten
   - Testing: Querverbindungen

5. **Polish & Refinement**
   - Touch-Support (Häppchen 7)
   - Styling & Polish (Häppchen 8)
   - Barrierefreiheit

---

**Erstellt:** 2025-10-24 17:40  
**Status:** Konzept dokumentiert, wartet auf Entscheidung  
**Für:** [[153_MAKRO_H2me]]

---

## ba_Log

(LogClaudine:: (LogCreated:: 25-10-24 17:40) **KONZEPT-DOC_** Kontext-abhängiger Würfel (Ansatz 3) vollständig dokumentiert: Technisches Konzept, Config-System, UX-Beispiele, Design-Patterns, Implementierungs-Roadmap, offene Entscheidungen)
