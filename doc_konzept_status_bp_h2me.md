# Konzept: page-status-bp-h2me-2025-10-29.html

## Überblick

**Ziel:** Interaktive HTML-Seite die Big Picture + H2me Status visualisiert

**Perspektive:** H2me ist zentral, aber aus großer Perspektive - H2me als Teil des EntryPoint-Ökosystems zeigen, nicht "H2me mit ein bisschen Kontext", sondern "Big Picture mit H2me als Knotenpunkt"

**Hauptfunktionen:**
- 📊 Mindmap des gesamten EntryPoint-Systems
- 🌐 Netzwerk-Graph der Ideen-Verbindungen
- 📈 Entwicklungsstadien (Traum → Konzept → Entwicklung → Live)
- 🎨 7 Farbwelten (Lebensdomänen)
- 🔄 Content-Flow Visualisierung
- 💡 Meta-Erkenntnisse & System-Evolution

**Speicherort:** `E:\Neuanfang\a_yang\153_H2me\page-status-bp-h2me-2025-10-29.html`

---

## Datenquellen

### 1. BOATs (Träume)
**Pfad:** `E:\EntryPoint\a_yang\a5_traeumend\`  
**Pattern:** `*_BOAT_*.md`

**Zu extrahieren:**
- Filename & Number
- Title (aus Dateiname)
- estimated_hours (Frontmatter)
- Kern-Idee:
  - **Primär:** `## ba_BOAT → ### Kern-Idee → ![[#zerlegt]]`
  - **Fallback:** Elevator Pitch generieren aus BOAT-Content
- Up-Links (aus `# ia_Verbindungen → Up::`)
- Sister-Links (aus `Sister::`)
- Related-Links (aus `Related::`)
- **Alle anderen `[[wikilinks]]` im Content** (für erweiterte Link-Analyse)

**Scoring für Mindmap:**
```
Score = (Up-Links × 3) + (Sister-Links × 2) + (Related-Links × 1) + (Alle anderen Wikilinks × 0.5) + (Hours × 0.1)
```

**⚠️ NICHT FIX:** Scoring-Formel ist flexibel und kann während Entwicklung angepasst werden

**Sortierung:**
1. Prio 1: BOATs mit Verlinkungen
2. Prio 2: Nach estimated_hours

**Mindmap-Darstellung:**
- Top 7 BOATs individuell anzeigen
- Rest als "Weitere BOATs (+X)" zusammengefasst

### 2. THOUGHTS (Konzepte)
**Pfad:** `E:\EntryPoint\b_bian\bb_Thoughts\`  
**Pattern:** `*_THOUGHTS.md`

**Zu extrahieren:**
- Date (aus Filename)
- Status (Frontmatter: "in arbeit" / "abgeschlossen")
- Inputs nach Typ (alle `### [Kategorie] | [Titel]` Sections)
- Anzahl Inputs

### 3. MAKROs (Big Picture)
**Pfad:** `E:\EntryPoint\b_bian\ba_Orientierung\`

**Files:**
- `000_MAKRO_big picture.md`
- `000_META_thoughts.md` → **Wie andere Files behandeln, als Teil der Gesamtanalyse**
- `000_TASK_big picture.md`
- `153_MAKRO_H2me.md`

**Zu extrahieren:**
- Projekte (nach Nummernkreisen)
- 7 Farbkategorien (GRAU=010, ROT=123/153/017, GRÜN, ORANGE, BLAU, VIOLETT, GELB)
- Meta-Content wird integriert in Gesamtstruktur (nicht speziell extrahiert)
- Offene Fragen

### 4. H2me Status
**Pfad:** `E:\Neuanfang\a_yang\153_H2me\`

**Files:**
- `doc_dashboard_planung.md`
- `doc_tasks.md`
- Alle `*.html` Files (für Live-Pages Liste)

**Zu extrahieren:**
- **Aktive Projekte = alle `.html` Files** (außer page-status-bp-h2me-2025-10-29.html)
  - ⚠️ **Auch "fertige" sind aktiv** - es gibt nur Zwischenstände, nichts ist final fertig
- In Progress (aus doc_tasks.md)
- Planned Features (aus doc_dashboard_planung.md)

### 5. Aktive Projekte
**Pfade:** 
- `E:\EntryPoint\a_yang\a1_jetzt\`
- `E:\EntryPoint\a_yang\a2_aktuell\`
- `E:\EntryPoint\a_yang\a3_chillen\`

**Pattern:** `*_PROJEKT_*.md`, `*_WF_*.md`

**Zu extrahieren:**
- Filename & Number
- Status (basierend auf Ordner: jetzt/aktuell/chillen)

---

## Datenstrukturen (JSON Output)

### ideas.json
```json
{
  "dreams": [
    {
      "id": "boat-001",
      "filename": "XXX_BOAT_Thema_Beschreibung.md",
      "number": "XXX",
      "title": "Dashboard 3D Navigation",
      "core_idea": "...",
      "hours": 40,
      "up_links": ["153_MAKRO_H2me"],
      "sister_links": ["boat-002"],
      "related_links": ["thought-2025-10-15"],
      "score": 125.4,
      "rank": 1,
      "cluster": "ui",
      "status": "dream"
    }
  ],
  "concepts": [
    {
      "id": "thought-2025-10-15",
      "date": "2025-10-15",
      "inputs_count": 5,
      "themes": ["dashboard", "yby"],
      "status": "abgeschlossen"
    }
  ],
  "in_development": [
    {
      "id": "h2me",
      "title": "H2me Website",
      "status": "active",
      "progress": "60%",
      "live_url": "https://h2m.art"
    }
  ],
  "live": [
    {
      "id": "h2me-live",
      "title": "h2m.art",
      "url": "https://h2m.art",
      "pages": ["index.html", "page-yin.html", "page-yang.html", ...]
    }
  ]
}
```

### mindmap.json
```json
{
  "nodes": [
    {
      "id": "root",
      "label": "EntryPoint-Ökosystem",
      "type": "root",
      "level": 0
    },
    {
      "id": "yang",
      "label": "Yang (Projekte/Aktionen)",
      "type": "yang",
      "level": 1,
      "parent": "root",
      "collapsible": true
    },
    {
      "id": "boats",
      "label": "BOATs (15 Träume)",
      "type": "yang",
      "level": 2,
      "parent": "yang",
      "count": 15,
      "collapsible": true
    },
    {
      "id": "boat-dashboard-3d",
      "label": "Dashboard 3D Navigation",
      "type": "yang",
      "level": 3,
      "parent": "boats",
      "hours": 40,
      "status": "dream",
      "score": 125.4,
      "rank": 1
    },
    {
      "id": "boats-rest",
      "label": "Weitere BOATs (+8)",
      "type": "yang-group",
      "level": 3,
      "parent": "boats",
      "count": 8,
      "collapsible": true
    },
    {
      "id": "bian",
      "label": "Bian (Prozesse/Entwicklung)",
      "type": "bian",
      "level": 1,
      "parent": "root",
      "collapsible": true
    },
    {
      "id": "thoughts",
      "label": "THOUGHTS (Konzepte)",
      "type": "bian",
      "level": 2,
      "parent": "bian",
      "count": 12,
      "collapsible": true
    },
    {
      "id": "yin",
      "label": "Yin (Wissen/Output)",
      "type": "yin",
      "level": 1,
      "parent": "root",
      "collapsible": true
    },
    {
      "id": "wiki",
      "label": "Wiki (Nano/Mikro-Infos)",
      "type": "yin",
      "level": 2,
      "parent": "yin",
      "collapsible": true
    },
    {
      "id": "dots",
      "label": "DOTs (Recherchen)",
      "type": "yin",
      "level": 2,
      "parent": "yin",
      "collapsible": true
    },
    {
      "id": "farbwelten",
      "label": "7 Farbwelten",
      "type": "color",
      "level": 1,
      "parent": "root",
      "collapsible": true
    },
    {
      "id": "grau",
      "label": "GRAU - Datenmanagement",
      "type": "color-grau",
      "level": 2,
      "parent": "farbwelten"
    },
    {
      "id": "rot",
      "label": "ROT - Stefiprojekte",
      "type": "color-rot",
      "level": 2,
      "parent": "farbwelten"
    }
  ],
  "edges": [
    { "source": "root", "target": "yang" },
    { "source": "root", "target": "bian" },
    { "source": "root", "target": "yin" },
    { "source": "root", "target": "farbwelten" },
    { "source": "yang", "target": "boats" },
    { "source": "boats", "target": "boat-dashboard-3d" },
    { "source": "boats", "target": "boats-rest" }
  ]
}
```

### network.json
```json
{
  "nodes": [
    {
      "id": "boat-001",
      "label": "Dashboard 3D Navigation",
      "type": "boat",
      "cluster": "ui",
      "hours": 40
    },
    {
      "id": "boat-002",
      "label": "Origami Effekte",
      "type": "boat",
      "cluster": "visualisierung",
      "hours": 25
    }
  ],
  "edges": [
    {
      "source": "boat-001",
      "target": "boat-002",
      "type": "sister"
    },
    {
      "source": "thought-001",
      "target": "boat-001",
      "type": "inspired"
    }
  ]
}
```

**Cluster-Typen (6 definiert):**
1. 🎨 **visualisierung** - 3D, Origami, Szenen, Stil
2. 🖥️ **ui** - Dashboards, Gameish, Control Center, Navigation
3. ⏰ **zeit** - Kalender, Rhythmen, Zeitschätzung, Muster
4. 🔄 **datenfluss** - APIs, Parser, Aggregation, Browser History
5. 🧠 **metasystem** - YBY, Strukturen, Nummerierung, System-Evolution
6. 🏗️ **architektur** - H2me-Infrastruktur, Pfade, Technische Basis

**Edge-Typen:**
- `sister` - Verwandte BOATs (aus Sister:: Links)
- `inspired` - THOUGHT inspiriert BOAT (Best-Effort aus THOUGHTS-Files extrahieren)
- `uses` - BOAT nutzt anderes BOAT (Best-Effort wenn BOAT verlinkt)
- `related` - Thematisch verwandt (aus Related:: Links)
- `up` - Hierarchische Verbindung (aus Up:: Links)

**⚠️ Wenn inspired/uses nicht eindeutig:** Als "related" markieren

### domains.json
```json
{
  "domains": [
    {
      "id": "grau",
      "color": "#808080",
      "label": "GRAU - Datenmanagement",
      "essence": "Vault, Organisation, Struktur",
      "active_projects": ["010_Vault_PKM", "010_Raumkalender"],
      "active_count": 2,
      "boats": ["boat-zeitschaetzung", "boat-logs-visualisierung"],
      "boats_count": 2,
      "h2me_potential": "Logs visualisieren, Task-Dashboard"
    },
    {
      "id": "rot",
      "color": "#e74c3c",
      "label": "ROT - Stefiprojekte",
      "essence": "H2me, Kreativität, persönlicher Outlet",
      "active_projects": ["153_H2me", "017_Präsentation", "123_SZENE"],
      "active_count": 3,
      "boats": ["boat-dashboard-3d", "boat-origami", "boat-gameish", "boat-spiegel", "boat-control-center"],
      "boats_count": 5,
      "h2me_potential": "Kern von H2me selbst"
    },
    {
      "id": "gruen",
      "color": "#27ae60",
      "label": "GRÜN - Making Money",
      "essence": "Architektur, VectorWorks, Projekte",
      "active_projects": [],
      "active_count": 0,
      "boats": [],
      "boats_count": 0,
      "h2me_potential": "Tool-Skills für komplexe Visualisierungen"
    },
    {
      "id": "orange",
      "color": "#f39c12",
      "label": "ORANGE - Freunde & Familie",
      "essence": "WD40, Soziales, Beziehungen",
      "active_projects": ["WD40_Hausumbau"],
      "active_count": 1,
      "boats": [],
      "boats_count": 0,
      "h2me_potential": "Social Timeline, Beziehungs-Dashboard"
    },
    {
      "id": "blau",
      "color": "#3498db",
      "label": "BLAU - Haushalt",
      "essence": "Finanzen, Ricardo, Alltag",
      "active_projects": [],
      "active_count": 0,
      "boats": [],
      "boats_count": 0,
      "h2me_potential": "Finanz-Dashboard, Alltags-Tracking"
    },
    {
      "id": "violett",
      "color": "#9b59b6",
      "label": "VIOLETT - Körper",
      "essence": "Gesundheit, Training, Ernährung",
      "active_projects": [],
      "active_count": 0,
      "boats": [],
      "boats_count": 0,
      "h2me_potential": "Gesundheits-Tracking, Trainings-Logs"
    },
    {
      "id": "gelb",
      "color": "#f1c40f",
      "label": "GELB - Bier",
      "essence": "Degustationen, BETO, Beer Contest",
      "active_projects": ["611_Degustationen", "617_Beer_Contest"],
      "active_count": 2,
      "boats": [],
      "boats_count": 0,
      "h2me_potential": "Degu-Visualisierung, Bier-Wissen Wiki"
    }
  ]
}
```

---

## HTML-Struktur

**Dateiname:** `page-status-bp-h2me-2025-10-29.html`

**Sections:**
1. **Vision (Hero)** - Intro, YBY-Erklärung, Essence
2. **Mindmap** - Interaktive hierarchische Visualisierung
3. **Ideen-Landschaft** - Timeline (Träume → Konzepte → Entwicklung → Live)
4. **Philosophisches Netz** - Graph mit thematischen Clustern
5. **7 Farbwelten** - Domänen-Cards (aufklappbar)
6. **Meta-Erkenntnisse** - Evolution, Lessons, Elevator Pitch
7. **Content-Flow** - Animated Flow-Diagram

**Navigation:**
- Sticky Header mit Links zu allen Sections
- Progress Bar (zeigt Scroll-Position)
- Smooth-Scroll

**Vollständiges HTML siehe:** `doc_konzept_status_bp_h2me_html_template.md`

---

## CSS-Konzept

**Dateiname:** `page-status-bp-h2me.css`

**Design-Philosophie:**
- Minimalistisch aber lebendig
- YBY-Farbschema integriert
- Mobile-first Responsive
- Smooth Transitions & Interaktivität

**CSS-Variablen:**
```css
:root {
  /* YBY Colors */
  --yang-color: #f39c12;
  --bian-color: #16a085;
  --yin-color: #3498db;
  --meta-color: #9b59b6;

  /* 7 Farbwelten */
  --grau: #808080;
  --rot: #e74c3c;
  --gruen: #27ae60;
  --orange: #f39c12;
  --blau: #3498db;
  --violett: #9b59b6;
  --gelb: #f1c40f;

  /* Neutrals */
  --bg-light: #ecf0f1;
  --bg-dark: #2c3e50;
  --text-light: #ecf0f1;
  --text-dark: #2c3e50;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.4s ease;
  --transition-slow: 0.6s ease;
}
```

**Vollständiges CSS siehe:** `doc_konzept_status_bp_h2me_css_template.md`

---

## JavaScript-Konzept

**Dateiname:** `page-status-bp-h2me.js`

**Hauptfunktionen:**

### Data Loading
```javascript
async function loadData() {
  const [ideas, mindmap, network, domains] = await Promise.all([
    fetch('ideas.json').then(r => r.json()),
    fetch('mindmap.json').then(r => r.json()),
    fetch('network.json').then(r => r.json()),
    fetch('domains.json').then(r => r.json())
  ]);
  
  ideasData = ideas;
  mindmapData = mindmap;
  networkData = network;
  domainsData = domains;
  
  initPage();
}
```

### Mindmap (Cytoscape)
```javascript
function initMindmap() {
  mindmapCy = cytoscape({
    container: document.getElementById('mindmap-container'),
    elements: { nodes: [...], edges: [...] },
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'background-color': function(ele) {
            const type = ele.data('type');
            const colors = {
              'root': '#9b59b6',
              'yang': '#f39c12',
              'bian': '#16a085',
              'yin': '#3498db'
            };
            return colors[type] || '#95a5a6';
          },
          'width': function(ele) {
            const level = ele.data('level');
            return [80, 60, 45, 30][level] || 30;
          }
        }
      }
    ],
    layout: { name: 'cose', animate: true }
  });
  
  // Node click → Details Panel
  mindmapCy.on('tap', 'node', function(evt) {
    showNodeDetails(evt.target.data());
  });
}
```

### Network Graph (Cytoscape)
```javascript
function initNetworkSection() {
  networkCy = cytoscape({
    container: document.getElementById('network-container'),
    elements: { nodes: [...], edges: [...] },
    style: [
      {
        selector: 'node',
        style: {
          'background-color': function(ele) {
            const cluster = ele.data('cluster');
            const colors = {
              'visualisierung': '#e74c3c',
              'ui': '#f39c12',
              'zeit': '#16a085',
              'datenfluss': '#3498db',
              'metasystem': '#9b59b6',
              'architektur': '#95a5a6'
            };
            return colors[cluster] || '#95a5a6';
          }
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': function(ele) {
            const type = ele.data('type');
            const colors = {
              'sister': '#f39c12',
              'inspired': '#16a085',
              'uses': '#3498db',
              'related': '#9b59b6'
            };
            return colors[type] || '#95a5a6';
          }
        }
      }
    ],
    layout: { name: 'cose', animate: true }
  });
}
```

### Domains (Aufklappbar)
```javascript
function initDomainsSection() {
  const grid = document.getElementById('domains-grid');
  
  domainsData.domains.forEach(domain => {
    const card = document.createElement('div');
    card.className = `domain-card domain-${domain.id}`;
    
    card.innerHTML = `
      <div class="domain-header">
        <span>${domain.label}</span>
        <span class="domain-badge">${domain.active_count} Projekte • ${domain.boats_count} BOATs</span>
      </div>
      <div class="domain-essence">${domain.essence}</div>
      <button class="expand-btn">Details anzeigen</button>
      <div class="domain-details">
        <!-- Projects, BOATs, H2me-Potenzial -->
      </div>
    `;
    
    // Expand/Collapse Logic
    const expandBtn = card.querySelector('.expand-btn');
    const details = card.querySelector('.domain-details');
    
    expandBtn.addEventListener('click', () => {
      expandBtn.classList.toggle('expanded');
      details.classList.toggle('expanded');
    });
    
    grid.appendChild(card);
  });
}
```

### Flow Diagram (Animated)
```javascript
function initFlowSection() {
  // SVG Flow mit CSS Animations
  // "Datenpakete" fließen durch
  // Inputs → Verarbeitung → Outputs
}
```

**Vollständiges JS siehe:** `doc_konzept_status_bp_h2me_js_template.md`

---

## Datensammlung (collect-data.js)

**Node.js Script zum Parsen aller Quellen**

### BOAT Parsing
```javascript
function collectBoats() {
  const boatsDir = 'E:\\EntryPoint\\a_yang\\a5_traeumend';
  const boatFiles = fs.readdirSync(boatsDir).filter(f => f.includes('_BOAT_'));
  
  // Cluster-Mapping laden
  const clusterMapping = loadClusterMapping('E:\\Neuanfang\\a_yang\\153_H2me\\doc_boat_cluster_mapping.md');
  
  const boats = boatFiles.map(file => {
    const content = fs.readFileSync(path.join(boatsDir, file), 'utf8');
    const boatId = generateId(file);
    
    return {
      id: boatId,
      filename: file,
      number: extractNumber(file),
      title: extractTitle(file),
      core_idea: extractKernIdee(content) || generateElevatorPitch(content), // Fallback!
      hours: extractFrontmatter(content, 'estimated_hours'),
      up_links: extractLinks(content, 'Up::'),
      sister_links: extractLinks(content, 'Sister::'),
      related_links: extractLinks(content, 'Related::'),
      all_wikilinks: extractAllWikilinks(content), // NEU: Alle Links
      cluster: clusterMapping[boatId] || 'unassigned', // Aus Mapping-File
      status: 'dream'
    };
  });
  
  return boats;
}
```

### BOAT Scoring & Selection
```javascript
function selectTopBoats(boats) {
  const scored = boats.map(boat => {
    const linkScore = (boat.up_links.length * 3) + 
                     (boat.sister_links.length * 2) + 
                     (boat.related_links.length * 1) +
                     (boat.all_wikilinks.length * 0.5); // NEU: Alle Links zählen
    const hoursScore = boat.hours * 0.1;
    const totalScore = linkScore + hoursScore;
    
    return { ...boat, score: totalScore, linkScore, hoursScore };
  });
  
  scored.sort((a, b) => b.score - a.score);
  
  const topBoats = scored.slice(0, 7).map((boat, index) => ({
    ...boat,
    rank: index + 1
  }));
  
  const restBoats = scored.slice(7);
  
  return { top: topBoats, rest: restBoats };
}
```

### Helper Functions
```javascript
function extractNumber(filename) {
  const match = filename.match(/^(\d+)_/);
  return match ? match[1] : null;
}

function extractTitle(filename) {
  return filename
    .replace(/^\d+_BOAT_/, '')
    .replace('.md', '')
    .replace(/_/g, ' ');
}

function extractFrontmatter(content, key) {
  const match = content.match(new RegExp(`${key}:\\s*(.+)`));
  return match ? match[1].trim() : null;
}

function extractKernIdee(content) {
  const match = content.match(/### Kern-Idee\s*!\[\[#zerlegt\]\]\s*\n\n(.+?)(?=\n\n###|\n\n##|$)/s);
  return match ? match[1].trim() : null;
}

function generateElevatorPitch(content) {
  // Fallback: Extrahiere erste paar Sätze aus ba_BOAT Section
  // Oder generiere aus Filename + Context
  // Wird bei fehlender Kern-Idee aufgerufen
  const baBoatMatch = content.match(/## ba_BOAT\s*\n\n(.+?)(?=\n\n##|$)/s);
  if (baBoatMatch) {
    return baBoatMatch[1].trim().substring(0, 200) + '...';
  }
  return 'Kern-Idee nicht verfügbar';
}

function extractAllWikilinks(content) {
  const regex = /\[\[(.+?)\]\]/g;
  const links = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function loadClusterMapping(mappingFilePath) {
  // Liest doc_boat_cluster_mapping.md
  // Parst Format und erstellt { 'boat-id': 'cluster' } Mapping
  const content = fs.readFileSync(mappingFilePath, 'utf8');
  // Parser-Logik hier
  return {}; // Placeholder
}

function extractLinks(content, linkType) {
  const regex = new RegExp(`${linkType}\\s*\\[\\[(.+?)\\]\\]`, 'g');
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function generateId(filename) {
  return filename
    .replace(/^\d+_BOAT_/, 'boat-')
    .replace('.md', '')
    .toLowerCase()
    .replace(/_/g, '-');
}
```

**Vollständiges collect-data.js siehe:** `doc_konzept_status_bp_h2me_collect_data.md`

---

## Arbeitsplan für Claude Code

### Phase 1: Setup
1. ✅ Konzept-File gelesen
2. ⏳ collect-data.js erstellen
3. ⏳ Cluster-Zuordnung einpflegen (aus separatem Mapping-File)
4. ⏳ collect-data.js ausführen → JSON-Files generieren

### Phase 2: HTML/CSS/JS erstellen
1. ⏳ page-status-bp-h2me-2025-10-29.html erstellen
2. ⏳ page-status-bp-h2me.css erstellen
3. ⏳ page-status-bp-h2me.js erstellen
4. ⏳ Cytoscape einbinden (bereits in shared-graph.js vorhanden)

### Phase 3: Testing
1. ⏳ Lokal im Browser öffnen
2. ⏳ Alle Sections testen
3. ⏳ Mindmap interaktiv (Zoom, Pan, Click)
4. ⏳ Network Graph funktional (Filter, Cluster)
5. ⏳ Domains aufklappbar
6. ⏳ Responsive testen (Mobile)

### Phase 4: Deploy
1. ⏳ Nach `/mnt/user-data/outputs/` kopieren
2. ⏳ Nach `E:\Neuanfang\a_yang\153_H2me\` kopieren
3. ⏳ Tracking-File aktualisieren
4. ⏳ LogClaudine-Eintrag erstellen

---

## Offene Aufgaben

### Vor Code-Umsetzung:
- [x] BOAT → Cluster Zuordnung **VORHANDEN** (`doc_boat_cluster_mapping.md`)
- [x] Kern-Idee Fallback **GEKLÄRT** (Elevator Pitch generieren)
- [x] Meta-Files Integration **GEKLÄRT** (wie andere Files behandeln)
- [x] Link-Scoring **GEKLÄRT** (alle Wikilinks × 0.5)
- [x] Inspired/Uses Edges **GEKLÄRT** (Best-Effort, sonst related)
- [x] Aktive Projekte **GEKLÄRT** (H2me HTML-Files, auch "fertige")

### Während Code-Umsetzung:
- [ ] collect-data.js debuggen falls Parser-Fehler
- [ ] JSON-Struktur validieren
- [ ] Cytoscape Layouts testen (cose vs. breadthfirst)

### Nach Code-Umsetzung:
- [ ] Content prüfen (alle BOATs erfasst?)
- [ ] Links testen (alle klickbar?)
- [ ] Performance (laden die Graphs schnell?)

---

## Technische Details

### Dependencies
- **Cytoscape.js** (bereits in H2me vorhanden)
  - CDN: `https://unpkg.com/cytoscape/dist/cytoscape.min.js`
  - Für Mindmap & Network Graph

- **Node.js** (für collect-data.js)
  - `fs`, `path` (built-in)
  
### Browser Support
- Chrome/Edge (Hauptziel)
- Firefox (sollte funktionieren)
- Safari (sollte funktionieren)
- Mobile Browsers (responsive design)

### File Sizes (geschätzt)
- HTML: ~15 KB
- CSS: ~20 KB
- JS: ~25 KB
- JSON (alle): ~50-100 KB (abhängig von BOAT-Anzahl)
- Cytoscape: ~500 KB (CDN)

---

## Design-Entscheidungen (dokumentiert)

### 1. Mindmap-Tiefe: Hybrid ✅
- Top 7 BOATs nach Score (Links + Hours)
- Rest zusammengefasst als "Weitere BOATs (+X)"

### 2. Network-Filter: 6 Cluster ✅
- visualisierung, ui, zeit, datenfluss, metasystem, architektur
- Manuell zugeordnet (siehe Mapping-File)

### 3. Meta-Section: 3-teilig ✅
- Elevator Pitch (oben, prominent)
- Lessons Learned (Mitte, Grid)
- Evolution Timeline (unten, aufklappbar)

### 4. Flow-Diagram: Animated ✅
- SVG + CSS Animations
- "Datenpakete" fließen durch

### 5. Domains: Aufklappbar + Badge ✅
- Badge zeigt "X Projekte • Y BOATs"
- Details aufklappbar per Button

---

## Nächste Schritte

**Für Claude Desktop:**
1. BOAT → Cluster Mapping erstellen (`doc_boat_cluster_mapping.md`)
2. Meta-Erkenntnisse extrahieren
3. Elevator Pitch formulieren

**Für Claude Code:**
1. Dieses Konzept-File lesen
2. collect-data.js implementieren
3. HTML/CSS/JS erstellen
4. Testen & Deployen

---

---

## Changelog

**(LogClaudine:: (LogCreated:: 25-10-29 09:53) **KONZEPT-UPDATE_** Alle offenen Fragen geklärt: Cluster-Mapping vorhanden, Kern-Idee Fallback, Meta-Integration, Link-Scoring erweitert, Inspired/Uses Best-Effort, Aktive Projekte = H2me HTMLs)**

---

**Status:** Konzept FINALISIERT ✅  
**Erstellt:** 2025-10-29  
**Updated:** 2025-10-29 (Alle offenen Fragen geklärt)
**Für:** Claude Code Umsetzung
