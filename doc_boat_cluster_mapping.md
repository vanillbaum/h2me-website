# BOAT → Cluster Mapping

**Erstellt:** 2025-10-29  
**Für:** page-status-bp-h2me-2025-10-29.html Network Graph

---

## Übersicht

**Gesamt BOATs:** 26 Files in `a5_traeumend`  
**Im Network Graph:** 17 BOATs  
**Ausgeschlossen:** 5 BOATs (ferne Zukunft)  
**Zu löschen:** 1 Duplikat

---

## Cluster-Zuordnung

### 🧠 metasystem (4 BOATs)

**Definition:** YBY, Strukturen, Nummerierung, System-Evolution, Organisation, Gehirn/Psychologie

| Filename | Cluster | ID |
|----------|---------|-----|
| `010_BOAT_Kategorien_Mermaid_Visualisierung.md` | metasystem | boat-kategorien-mermaid-visualisierung |
| `110_BOAT_Externe Organisation.md` | metasystem | boat-externe-organisation |
| `240_BOAT_Hirn lauft verschiedenspurig.md` | metasystem | boat-hirn-lauft-verschiedenspurig |
| `240_BOAT_verschiedene Spuren müssen unterhalten werden.md` | metasystem | boat-verschiedene-spuren-muessen-unterhalten-werden |

---

### ⏰ zeit (4 BOATs)

**Definition:** Kalender, Rhythmen, Zeitschätzung, Muster, Zeitblöcke

| Filename | Cluster | ID |
|----------|---------|-----|
| `116_BOAT_Arbeitsbloecke_Gameartig.md` | zeit | boat-arbeitsbloecke-gameartig |
| `116_BOAT_Dringlichkeit_stufenlos.md` | zeit | boat-dringlichkeit-stufenlos |
| `116_BOAT_Rhythmen_Muster als Kompass.md` | zeit | boat-rhythmen-muster-als-kompass |
| `116_BOAT_Rhythmus_Kalender_Wellen.md` | zeit | boat-rhythmus-kalender-wellen |

---

### 🖥️ ui (7 BOATs)

**Definition:** Dashboards, Gameish, Control Center, Navigation, Styling, Views

| Filename | Cluster | ID |
|----------|---------|-----|
| `153_BOAT_Flaechenzuordnung System Geometrische Navigation.md` | ui | boat-flaechenzuordnung-system-geometrische-navigation |
| `153_BOAT_Geometrische Navigation Views als Koerper.md` | ui | boat-geometrische-navigation-views-als-koerper |
| `153_BOAT_Koerperzuordnung variable Views.md` | ui | boat-koerperzuordnung-variable-views |
| `153_BOAT_nodes_inputdaten aus statistik.md` | ui | boat-nodes-inputdaten-aus-statistik |
| `153_BOAT_nodes_materialisierung.md` | ui | boat-nodes-materialisierung |
| `153_BOAT_nodes_nw mit sozialen daten aus vault.md` | ui | boat-nodes-nw-mit-sozialen-daten-aus-vault |
| `153_BOAT_Pfadbasiertes_Styling.md` | ui | boat-pfadbasiertes-styling |

---

### 🎨 visualisierung (2 BOATs)

**Definition:** 3D, Origami, Szenen, Stil, Metaphern, Video/Foto

| Filename | Cluster | ID |
|----------|---------|-----|
| `BOAT_Metaphern fuer Darstellung.md` | visualisierung | boat-metaphern-fuer-darstellung |
| `540_BOAT_Smartphone_Videografie_Masterplan.md` | visualisierung | boat-smartphone-videografie-masterplan |

---

### 🔄 datenfluss (0 BOATs)

**Definition:** APIs, Parser, Aggregation, Browser History

*Keine BOATs in diesem Cluster*

---

### 🏗️ architektur (0 BOATs)

**Definition:** H2me-Infrastruktur, Pfade, Technische Basis

*Keine BOATs in diesem Cluster*

---

## Ausgeschlossene BOATs

**Grund:** Ferne Zukunft, nicht relevant für aktuelles Network

| Filename | Grund |
|----------|-------|
| `116_BOAT_mit Vault zu twofold.md` | Ferne Zukunft |
| `530_BOAT_Positiv_Newsbot_Wissenschaftskommunikation.md` | Ferne Zukunft |
| `532_BOAT_AI Diff_eigene Checkpoint krita ai_scheint kompliziert zu sein.md` | Ferne Zukunft |
| `532_BOAT_Obsidian_Dataview_Intressante eventuell wichtige dataviewcodes uber die ich gestolpert bin.md` | Ferne Zukunft |
| `610_BOAT_Positiv_Newsbot_Wissenschaftskommunikation.md` | **DUPLIKAT - LÖSCHEN** |

---

## Cluster-Statistik

| Cluster | Anzahl BOATs | Anteil |
|---------|--------------|--------|
| 🖥️ ui | 7 | 41% |
| 🧠 metasystem | 4 | 24% |
| ⏰ zeit | 4 | 24% |
| 🎨 visualisierung | 2 | 12% |
| 🔄 datenfluss | 0 | 0% |
| 🏗️ architektur | 0 | 0% |
| **GESAMT** | **17** | **100%** |

---

## Verwendung in collect-data.js

```javascript
// Cluster Mapping
const clusterMap = {
  // metasystem
  '010_BOAT_Kategorien_Mermaid_Visualisierung.md': 'metasystem',
  '110_BOAT_Externe Organisation.md': 'metasystem',
  '240_BOAT_Hirn lauft verschiedenspurig.md': 'metasystem',
  '240_BOAT_verschiedene Spuren müssen unterhalten werden.md': 'metasystem',
  
  // zeit
  '116_BOAT_Arbeitsbloecke_Gameartig.md': 'zeit',
  '116_BOAT_Dringlichkeit_stufenlos.md': 'zeit',
  '116_BOAT_Rhythmen_Muster als Kompass.md': 'zeit',
  '116_BOAT_Rhythmus_Kalender_Wellen.md': 'zeit',
  
  // ui
  '153_BOAT_Flaechenzuordnung System Geometrische Navigation.md': 'ui',
  '153_BOAT_Geometrische Navigation Views als Koerper.md': 'ui',
  '153_BOAT_Koerperzuordnung variable Views.md': 'ui',
  '153_BOAT_nodes_inputdaten aus statistik.md': 'ui',
  '153_BOAT_nodes_materialisierung.md': 'ui',
  '153_BOAT_nodes_nw mit sozialen daten aus vault.md': 'ui',
  '153_BOAT_Pfadbasiertes_Styling.md': 'ui',
  
  // visualisierung
  'BOAT_Metaphern fuer Darstellung.md': 'visualisierung',
  '540_BOAT_Smartphone_Videografie_Masterplan.md': 'visualisierung'
};

// Ausgeschlossene BOATs (nicht im Network Graph)
const excludedBoats = [
  '116_BOAT_mit Vault zu twofold.md',
  '530_BOAT_Positiv_Newsbot_Wissenschaftskommunikation.md',
  '532_BOAT_AI Diff_eigene Checkpoint krita ai_scheint kompliziert zu sein.md',
  '532_BOAT_Obsidian_Dataview_Intressante eventuell wichtige dataviewcodes uber die ich gestolpert bin.md',
  '610_BOAT_Positiv_Newsbot_Wissenschaftskommunikation.md' // DUPLIKAT - löschen
];

// Cluster zu Farbe Mapping
const clusterColors = {
  'metasystem': '#9b59b6',
  'zeit': '#16a085',
  'ui': '#f39c12',
  'visualisierung': '#e74c3c',
  'datenfluss': '#3498db',
  'architektur': '#95a5a6'
};

// Verwendung
function getCluster(filename) {
  return clusterMap[filename] || null;
}

function isExcluded(filename) {
  return excludedBoats.includes(filename);
}
```

---

## Hinweise für Claude Code

1. **Duplikat löschen:** `610_BOAT_Positiv_Newsbot_Wissenschaftskommunikation.md` ist identisch mit `530_` Version
2. **Cluster-Filter:** Nur 4 Cluster haben BOATs (metasystem, zeit, ui, visualisierung)
3. **Empty Clusters:** datenfluss & architektur haben 0 BOATs, trotzdem in Legend zeigen (für Vollständigkeit)
4. **ID-Generierung:** IDs sind aus Filename generiert (lowercase, ohne Nummer-Präfix, Unterstriche zu Bindestrichen)

---

**Status:** FINALISIERT ✅  
**Bereit für:** collect-data.js Integration
