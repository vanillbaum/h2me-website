# ANWEISUNG: Status BP H2me Review

**Zweck:** Regelmäßige Reviews des EntryPoint-Ökosystems mit H2me als Knotenpunkt
**Frequenz:** Nach Bedarf (empfohlen: monatlich oder nach größeren Änderungen)
**Zielgruppe:** Claude Code (zukünftige Sessions)

---

## Überblick

Diese Anweisung beschreibt, wie du eine vollständige Status-BP-Seite für H2me generierst:
1. Daten aus EntryPoint sammeln (BOATs, THOUGHTS, Domains)
2. Scoring & Ranking berechnen
3. HTML-Seite mit eingebetteten Daten erstellen

**Output:** `page-status-bp-h2me-YYYY-MM-DD.html` (vollständig funktionsfähig, ohne externe Dependencies)

---

## Schritt 1: Daten sammeln

### 1.1 Script ausführen

```bash
cd E:\Neuanfang\a_yang\153_h2me
node collect-data.js
```

**Was passiert:**
- Liest alle BOATs aus `E:\EntryPoint\a_yang\a5_traeumend`
- Liest THOUGHTS aus `E:\EntryPoint\b_bian\bb_Thoughts`
- Berechnet Scores (Up×3 + Sister×2 + Related×1 + AllLinks×0.5 + Hours×0.1)
- Generiert 4 JSON-Files im `data/` Ordner:
  - `ideas.json` (alle BOATs + THOUGHTS)
  - `mindmap.json` (hierarchische Struktur)
  - `network.json` (Netzwerk-Graph mit Verbindungen)
  - `domains.json` (7 Farbwelten)

### 1.2 Output validieren

**Prüfen:**
```bash
ls -lh E:\Neuanfang\a_yang\153_h2me\data
```

**Erwartete Dateien:**
- `ideas.json` (~20-30 KB)
- `mindmap.json` (~3-5 KB)
- `network.json` (~5-10 KB)
- `domains.json` (~1-2 KB)

**Falls Fehler:**
- Prüfe ob Quellverzeichnisse existieren
- Prüfe `doc_boat_cluster_mapping.md` (für Cluster-Zuordnung)
- Schaue in Console-Output nach Fehlermeldungen

---

## Schritt 2: JSON-Daten einlesen

### 2.1 Alle 4 JSON-Files lesen

```javascript
Read: E:\Neuanfang\a_yang\153_h2me\data\ideas.json
Read: E:\Neuanfang\a_yang\153_h2me\data\mindmap.json
Read: E:\Neuanfang\a_yang\153_h2me\data\network.json
Read: E:\Neuanfang\a_yang\153_h2me\data\domains.json
```

### 2.2 Statistiken berechnen

Aus den JSON-Daten extrahieren:
- **Anzahl BOATs:** `ideas.dreams.length`
- **Gesamtstunden:** `sum(ideas.dreams[].hours)`
- **Anzahl Cluster:** `unique(ideas.dreams[].cluster).length`
- **Anzahl Projekte:** `ideas.in_development.length + ideas.live.length`

---

## Schritt 3: HTML-Seite generieren

### 3.1 Dateiname mit Datum

**Format:** `page-status-bp-h2me-YYYY-MM-DD.html`
**Beispiel:** `page-status-bp-h2me-2025-10-29.html`

### 3.2 Struktur der HTML-Seite

Die Seite enthält:

#### **Header**
- Titel: "H2me • Big Picture Status"
- Elevator Pitch
- Quick Stats (BOATs, Stunden, Cluster, Projekte)

#### **Top 7 BOATs (nach Score)**
Für jedes BOAT eine Card mit:
- Rank (#1-7)
- Cluster-Badge (Farbe)
- Titel
- Core Idea (oder Elevator Pitch)
- Metadaten: Links-Count, Stunden, Score

**Code-Snippet:**
```html
<div class="idea-card">
    <div class="idea-header">
        <span class="idea-rank">#1</span>
        <span class="idea-cluster" style="background-color: #666;">unassigned</span>
    </div>
    <h3 class="idea-title">BOAT Titel</h3>
    <p class="idea-pitch">Core Idea...</p>
    <div class="idea-meta">
        <span class="meta-item">
            <span class="meta-label">Links:</span>
            <span class="meta-value">X</span>
        </span>
        <span class="meta-item">
            <span class="meta-label">Zeit:</span>
            <span class="meta-value">Xh</span>
        </span>
        <span class="meta-item">
            <span class="meta-label">Score:</span>
            <span class="meta-value">X</span>
        </span>
    </div>
</div>
```

#### **Mindmap-Section**
- Cytoscape-Container für hierarchischen Graph
- Legende mit Edge-Typen (Up, Sister, Related)

#### **Network-Section**
- Cytoscape-Container für vollständiges Netzwerk
- Alle BOATs und ihre Verbindungen

#### **Domains-Section**
- 7 Farbwelten als Cards (GRAU, ROT, GRÜN, ORANGE, BLAU, VIOLETT, GELB)
- Statistiken pro Domain (Projekte, BOATs)

#### **Meta-Section**
- Insights/Erkenntnisse aus den Daten
- Empfehlung: 3-5 Insights generieren basierend auf:
  - Anzahl BOATs
  - Gesamtstunden
  - Vernetzung vs. Stundenanzahl
  - Cluster-Verteilung

### 3.3 Embedded JavaScript

**Am Ende der HTML-Seite einfügen:**

```html
<script>
    // Embedded Data
    const mindmapData = {...};  // aus mindmap.json
    const networkData = {...};  // aus network.json

    // Initialize Mindmap
    const mindmapCy = cytoscape({
        container: document.getElementById('mindmap-container'),
        elements: {
            nodes: mindmapData.nodes.map(n => ({ data: n })),
            edges: mindmapData.edges.map(e => ({ data: e }))
        },
        style: [...],
        layout: { name: 'breadthfirst', ... }
    });

    // Initialize Network
    const networkCy = cytoscape({
        container: document.getElementById('network-container'),
        elements: {
            nodes: networkData.nodes.map(n => ({ data: n })),
            edges: networkData.edges.map(e => ({ data: e }))
        },
        style: [...],
        layout: { name: 'cose', ... }
    });

    console.log('✅ Status BP H2me loaded');
</script>
```

**Wichtig:**
- JSON-Daten direkt als JavaScript-Objekte einbetten
- Keine externen JSON-Files laden
- Seite muss standalone funktionieren

### 3.4 CSS-Referenz

Die Seite referenziert:
```html
<link rel="stylesheet" href="page-status-bp-template.css">
```

**Stelle sicher, dass `page-status-bp-template.css` vorhanden ist!**

### 3.5 Cytoscape CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.26.0/cytoscape.min.js"></script>
```

**Offline-Alternative:** Falls gewünscht, kann Cytoscape lokal eingebunden werden.

---

## Schritt 4: Validierung & Testing

### 4.1 HTML-Seite öffnen

**Manuell:** Doppelklick auf die generierte HTML-Datei

**Oder per Command:**
```bash
start "" "E:\Neuanfang\a_yang\153_h2me\page-status-bp-h2me-YYYY-MM-DD.html"
```

### 4.2 Prüfliste

- [ ] Header zeigt korrekte Statistiken
- [ ] Top 7 BOATs werden angezeigt
- [ ] Mindmap-Graph ist sichtbar und interaktiv (Zoom, Pan funktioniert)
- [ ] Network-Graph zeigt alle BOATs
- [ ] 7 Farbwelten-Cards sind vollständig
- [ ] Meta-Insights sind sinnvoll

### 4.3 Browser Console prüfen

**Öffne Developer Tools (F12) → Console**

Erwartete Ausgabe:
```
✅ Status BP H2me loaded with embedded data
```

**Bei Fehlern:**
- Cytoscape-Fehler? → Prüfe CDN-Link
- JSON-Parsing-Fehler? → Prüfe eingebettete Daten-Syntax

---

## Schritt 5: Archivierung (Optional)

### 5.1 Alte Reviews archivieren

**Verzeichnis:** `E:\Neuanfang\a_yang\153_h2me\archive\`

**Umbenennen:**
```bash
mkdir -p E:\Neuanfang\a_yang\153_h2me\archive
mv page-status-bp-h2me-2025-10-*.html archive/
```

### 5.2 Tracking-File aktualisieren (falls vorhanden)

Wenn es ein `doc_status_bp_history.md` gibt, neuen Eintrag hinzufügen:

```markdown
## 2025-10-29

- BOATs: 22
- Stunden: 1492h
- Top BOAT: Positiv Newsbot (650h, Score 74)
- Insights: Vernetzung wichtiger als Stundenanzahl
```

---

## Wichtige Dateien & Pfade

### Input (Datenquellen)

| Pfad | Beschreibung |
|------|--------------|
| `E:\EntryPoint\a_yang\a5_traeumend\*_BOAT_*.md` | BOAT-Ideen (Träume) |
| `E:\EntryPoint\b_bian\bb_Thoughts\YYYY-MM-DD_THOUGHTS.md` | THOUGHTS (Konzepte) |
| `E:\EntryPoint\b_bian\ba_Orientierung\000_MAKRO_*.md` | MAKRO-Files (Big Picture) |
| `E:\Neuanfang\a_yang\153_h2me\doc_boat_cluster_mapping.md` | Cluster-Zuordnung (optional) |

### Scripts & Config

| Datei | Zweck |
|-------|-------|
| `config-status-bp.js` | Zentrale Konfiguration (Pfade, Scoring-Gewichtung) |
| `collect-data.js` | Node.js Script zum Datensammeln |
| `page-status-bp-template.css` | Styling für die Status-Seite |

### Output

| Datei | Beschreibung |
|-------|--------------|
| `data/ideas.json` | Alle BOATs, THOUGHTS, Projekte |
| `data/mindmap.json` | Hierarchische Struktur für Mindmap |
| `data/network.json` | Netzwerk-Graph mit Verbindungen |
| `data/domains.json` | 7 Farbwelten (YBY-System) |
| `page-status-bp-h2me-YYYY-MM-DD.html` | **Finale Status-Seite** |

---

## Troubleshooting

### Problem: `collect-data.js` findet keine BOATs

**Lösung:**
1. Prüfe ob Pfad in `config-status-bp.js` korrekt ist
2. Teste: `ls E:\EntryPoint\a_yang\a5_traeumend\*BOAT*.md`
3. Falls leer: Pfad anpassen oder BOATs erstellen

### Problem: Alle BOATs sind "unassigned"

**Ursache:** `doc_boat_cluster_mapping.md` fehlt oder ist leer

**Lösung:**
1. Erstelle Cluster-Mapping manuell:
```markdown
## visualisierung
- boat-dashboard-3d
- boat-origami

## ui
- boat-control-center
```

2. Führe `collect-data.js` erneut aus

### Problem: Graphen werden nicht angezeigt

**Mögliche Ursachen:**
1. Cytoscape CDN nicht erreichbar → Offline?
2. Container-IDs falsch → Prüfe `#mindmap-container`, `#network-container`
3. Daten leer → Prüfe Console auf Fehler

### Problem: Seite lädt, aber bleibt leer

**Prüfen:**
1. Browser Console (F12) auf JavaScript-Fehler
2. Sind Daten korrekt eingebettet? (`const mindmapData = {...}` vorhanden?)
3. CSS-File vorhanden? (`page-status-bp-template.css`)

---

## Anpassungen & Erweiterungen

### Scoring-Formel ändern

**In:** `config-status-bp.js` → `processing.linkScoring`

```javascript
linkScoring: {
    upLinks: 3,        // Hierarchisch übergeordnet
    sisterLinks: 2,    // Verwandte BOATs
    relatedLinks: 1,   // Thematisch verwandt
    allWikilinks: 0.5, // Alle anderen Links
    hoursWeight: 0.1   // Stunden-Gewichtung
}
```

**Beispiel-Änderung:** Stunden stärker gewichten
```javascript
hoursWeight: 0.2  // Verdoppelt die Gewichtung der Stunden
```

→ Danach `collect-data.js` erneut ausführen!

### Mehr/weniger Top BOATs anzeigen

**In:** `config-status-bp.js` → `processing.topIdeasCount`

```javascript
topIdeasCount: 10  // Statt 7
```

### Cluster-Farben anpassen

**In:** `page-status-bp-template.css` → `:root`

```css
--cluster-visualisierung: #e74c3c;  /* Rot */
--cluster-ui: #f39c12;              /* Orange */
--cluster-zeit: #16a085;            /* Türkis */
/* etc. */
```

### Meta-Insights verbessern

**Im HTML-Generierungscode:**

Meta-Insights können dynamisch aus den Daten generiert werden:
- Größte/kleinste BOATs
- Durchschnittliche Stundenzahl
- Cluster mit meisten BOATs
- BOATs ohne Vernetzung (Kandidaten für Aufräumen)

---

## Best Practices

### 1. Regelmäßigkeit

**Empfohlen:**
- Nach jedem größeren BOAT-Batch (5+ neue BOATs)
- Monatlich als Routine-Review
- Vor wichtigen Projekt-Entscheidungen

### 2. Vergleichbarkeit

**Dateinamen konsistent halten:**
- Format: `page-status-bp-h2me-YYYY-MM-DD.html`
- Ermöglicht einfachen Vergleich über Zeit

### 3. Dokumentation

**LogClaudine-Eintrag erstellen:**
```markdown
(LogClaudine:: (LogCreated:: YY-MM-DD HH:MM) **STATUS-BP-REVIEW**
22 BOATs, 1492h total, Top: Positiv Newsbot (650h),
Erkenntnis: Vernetzung > Stunden)
```

### 4. Cluster-Pflege

**Wichtig:** `doc_boat_cluster_mapping.md` aktuell halten!
- Neue BOATs sofort zuordnen
- Cluster bei Bedarf anpassen
- Bessere Cluster → bessere Insights

---

## Checkliste für Claude Code

Wenn du diese Anweisung ausführst, gehe so vor:

### Phase 1: Vorbereitung
- [ ] `config-status-bp.js` prüfen (Pfade korrekt?)
- [ ] `collect-data.js` ausführen
- [ ] JSON-Output validieren (4 Files vorhanden?)

### Phase 2: Daten einlesen
- [ ] Alle 4 JSON-Files komplett lesen
- [ ] Statistiken berechnen (BOATs, Stunden, Cluster)
- [ ] Top 7 BOATs identifizieren

### Phase 3: HTML generieren
- [ ] Dateiname mit aktuellem Datum erstellen
- [ ] Header mit Statistiken befüllen
- [ ] Top 7 BOATs als Cards einfügen
- [ ] Mindmap-Daten einbetten
- [ ] Network-Daten einbetten
- [ ] 7 Farbwelten-Cards erstellen
- [ ] Meta-Insights generieren (3-5 sinnvolle Erkenntnisse)

### Phase 4: Finalisierung
- [ ] JavaScript für Cytoscape einbetten
- [ ] HTML-File schreiben
- [ ] User informieren (Pfad zur fertigen Datei angeben)
- [ ] Hinweis: "Jetzt im Browser öffnen"

---

## Nächste Schritte nach Review

### 1. Erkenntnisse dokumentieren

Was fällt auf?
- Welche BOATs steigen im Ranking?
- Gibt es "vergessene" BOATs ohne Links?
- Cluster-Verteilung sinnvoll?

### 2. Aktionen ableiten

Basierend auf Review:
- Unvernetzte BOATs aufräumen oder vernetzen
- Cluster-Mapping aktualisieren
- Große BOATs (>100h) aufteilen?

### 3. System verbessern

- Neue Cluster definieren?
- Scoring-Formel anpassen?
- Zusätzliche Visualisierungen?

---

## Kontakt & Feedback

**Für Fragen oder Verbesserungsvorschläge:**
- Siehe `doc_konzept_status_bp_h2me.md` für vollständiges Konzept
- Changelog im Konzept-File

---

**Version:** 1.0
**Erstellt:** 2025-10-29
**Für:** Claude Code (zukünftige Review-Sessions)
