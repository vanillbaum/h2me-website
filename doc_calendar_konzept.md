# Calendar Konzept - H2me

**Projekt:** H2me Calendar/Task-Management  
**Status:** In Entwicklung  
**Erstellt:** 2025-10-29  
**Letzte Aktualisierung:** 2025-10-29 (Vision erweitert)  
**Planung:** Siehe `doc_calendar_planung.md`  
**Roadmap:** Siehe `doc_calendar_roadmap.md`

---

## 📋 Übersicht

Dieses File dokumentiert das **konzeptuelle Fundament** für das Kalender- und Zeitmanagement-System in H2me, basierend auf:

- Bisherigen Chat-Diskussionen (Oktober 2025)
- BOAT-Files (Raumkalender, Rhythmus-Kalender)
- POCs (Mobile Zeitblock-Editor, Kalender-Aggregation)
- Planungs-Dokumenten (Häppchen-Struktur)

**WICHTIG:** Was bisher implementiert ist (Phase 1+2) ist nur die **Eisspitze der Eisspitze**. Das Kalender-System wird zum zentralen Lebens-Steuerungs-Tool.

---

## 🎯 Vision: Lebens-Steuerungs-System (ERWEITERT)

### Die wahre Größe des Projekts

**Das Kalender-System ist NICHT nur ein Kalender.**

Es ist das zentrale Tool für:

---

### 1. Alltags-Management & Übergänge

**Problem:**
- Übergänge zwischen Kontexten sind schwierig (Arbeit → Privat → Projekt)
- Nervige Tasks werden aufgeschoben
- Energie wird verschwendet zur falschen Zeit

**Lösung via Kalender:**
- **Übergänge sichtbar machen** - Explizite Transitions-Blöcke ("Abschalten", "Umschalten")
- **Nervige Tasks priorisieren** - Nicht verstecken, sondern bewusst platzieren
- **Energie-Management** - Aufgaben zur optimalen Zeit (High-Energy für Kreatives, Low-Energy für Routine)

**Visualisierung:**
- Farbcodierung nach Energie-Level
- Transitions als eigene Block-Kategorie
- "Nervige Tasks"-Filter (zeigt nur die ungeliebten)

---

### 2. Projekt-Verfolgung & Deep Work

**Problem:**
- Projekte brauchen große, ununterbrochene Zeitblöcke
- Lange Pausen fühlen sich wie "verschwendete Zeit" an
- Schwierig zu tracken: Wo steht Projekt X?

**Lösung via Kalender:**
- **Blockmässiges Arbeiten** - 2-4h Blöcke für ein Projekt, sichtbar geplant
- **Lange Pausen** - Als bewusste "Refuel"-Blöcke, nicht Verschwendung
- **Projekt-Rhythmen** - Sprints sichtbar, Reviews eingeplant, Reflexion geblockt

**Visualisierung:**
- Block-View (große Flächen für Projekte)
- Projekt-Farben durchgehend
- Pausen-Blöcke gleichwertig mit Arbeit

---

### 3. Visuelles Denk-Werkzeug (KERN-KONZEPT)

**KRITISCH: Das System ist NICHT ein Design, sondern viele.**

**Kern-Idee:**
- **Daten-Layer** - Events, Tasks, Blöcke (unveränderlich)
- **Visualisierungs-Layer** - Austauschbar, style-bar, anpassbar
- **Interaktions-Layer** - Kontextabhängig

**Wie bei H2me gesamt:**
- Yang/Bian/Yin Styles (3 verschiedene Ästhetiken für gleiche Daten)
- Pfad-basierte Anpassungen (Visualisierung ändert sich basierend auf User-Context)
- User kann zwischen Visualisierungen wechseln (wie Theme-Switcher, aber radikaler)

**Beispiel-Visualisierungen (Liste wächst):**
1. **Timeline** - Standard chronologische Ansicht
2. **Block-View** - Tetris-artige Blöcke (Raum-Orientiert)
3. **Wellen/Rhythmus** - Energie-Level als Wellen
4. **Heatmap** - Intensität über Zeit
5. **Graph** - Verbindungen zwischen Events/Projekten
6. **Spatial** - 3D-Raum (wie physisches RK)
7. **Minimalist** - Nur Text, kein Visuelles
8. **...** (Weitere folgen)

**Rhythmus-Kalender = Nur EINE mögliche Visualisierung, nicht DAS System**

---

## 🧩 Architektur: Data-Viz-Interaction Separation

### Layer 1: Daten-Layer (Unveränderlich)

**Was ist hier:**
- Events (aus Nextcloud, Outlook, etc.)
- Tasks (aus Obsidian, Nextcloud Tasks)
- Blöcke (User-definiert, gespeichert)
- Transitions (spezielle Block-Kategorie)
- Pausen (bewusst eingeplant)

**Eigenschaften:**
```json
{
  "id": "unique-id",
  "type": "event|task|block|transition|pause",
  "title": "Meeting",
  "date": "2025-10-29",
  "time": "14:00",
  "duration": "2h",
  "energy": "high|medium|low",
  "project": "153",
  "category": "arbeit|privat|kreativ|nervige",
  "source": "nextcloud|obsidian|user",
  "editable": true|false
}
```

**Daten sind immer gleich, egal wie visualisiert.**

---

### Layer 2: Visualisierungs-Layer (Austauschbar)

**Was ist hier:**
- Rendering-Logik für verschiedene Views
- CSS-Styles für verschiedene Visualisierungen
- Farb-Mappings, Formen, Layouts

**Struktur:**
```
visualizations/
├── timeline.js         # Standard Timeline
├── blockview.js        # Tetris-Blöcke
├── waves.js            # Rhythmus-Wellen
├── heatmap.js          # Intensitäts-Heatmap
├── graph.js            # Graph-View
├── spatial.js          # 3D-Raum
└── minimalist.js       # Text-Only

styles/
├── yang.css            # Yang-Stil (für alle Viz)
├── bian.css            # Bian-Stil
└── yin.css             # Yin-Stil
```

**User kann zwischen Visualisierungen wechseln:**
- Dropdown: "Timeline | Block | Wellen | Heatmap | ..."
- Keyboard-Shortcuts: `1` = Timeline, `2` = Block, etc.
- Context-Based: Yang-Path → Timeline, Bian-Path → Wellen

---

### Layer 3: Interaktions-Layer (Kontextabhängig)

**Was ist hier:**
- Touch-Gesten (Swipe, Tap, Drag & Drop)
- Keyboard-Shortcuts
- Context-Menüs
- Filters & Search

**Kontextabhängig:**
- Timeline → Swipe für View-Wechsel
- Block-View → Drag & Drop für Verschieben
- Wellen → Tap für Details (keine Drag)
- Heatmap → Hover für Tooltips (read-only)

---

## 📐 Von "Basis-Leinwand" zu "Multi-Viz-System"

### Phase 1: Basis-Leinwand (ABGESCHLOSSEN) ✅

**Was implementiert ist:**
- Daten-Layer (Nextcloud, Obsidian, Outlook)
- EINE Visualisierung (Timeline)
- Basic Interaktionen (Swipe, Filter)

**Status:** 30-40h investiert, funktioniert

---

### Phase 2: Zeitblock-Editor (VORBEREITET)

**Was vorbereitet ist:**
- POC für Block-Editing
- User kann eigene Blöcke hinzufügen

**Neu zu integrieren:**
- Transitions-Blöcke (Übergänge)
- Pausen-Blöcke (bewusste Refuel-Zeit)
- Nervige-Tasks-Kategorie

**Zeitschätzung:** +15-20h

---

### Phase 3: Multi-Visualisierung (NEU, KERN-FEATURE)

**Was zu implementieren ist:**

**A) Visualisierungs-Framework** (~10-15h)
- Abstraktes `Visualization` Interface
- Renderer-Registry (registriert alle Viz-Typen)
- View-Switcher UI
- Style-Loader (lädt Yang/Bian/Yin CSS je nach Pfad)

**B) Erste Visualisierungen** (~30-50h)
1. **Timeline** (schon da) - 0h
2. **Block-View** (~10-15h) - Tetris-artige Blöcke
3. **Wellen/Rhythmus** (~20-30h) - Energie als Wellen
4. **Heatmap** (~10-15h) - Intensität über Woche/Monat

**C) Style-System** (~5-10h)
- Yang.css (action-orientiert, rot/orange, dicht)
- Bian.css (balance-orientiert, gelb/grün, rhythmisch)
- Yin.css (reflexion-orientiert, blau/violett, ruhig)

**Gesamt Phase 3:** ~45-75h

---

### Phase 4: Spatial & Advanced (SPÄTER)

**Weitere Visualisierungen:**
- Graph-View (Cytoscape.js)
- 3D-Spatial (Three.js)
- Minimalist (Text-Only, Terminal-Style)

**Integration:**
- Physisches Raumkalender Sync
- Boox Handschrift-Integration
- Dashboard-Kalender-Steuerung

**Zeitschätzung:** ~100-150h (sehr experimentell)

---

## 🗂️ Datenquellen (erweitert)

### Aktuelle Quellen (Phase 1) ✅

1. **Nextcloud Calendar** - Events
2. **Obsidian Tasks** - Tasks mit Datum
3. **Outlook Calendar** - Berufliche Events

---

### Neue Kategorien (Phase 2+)

**Transitions (Übergänge):**
- **Quelle:** User-definiert oder Auto-Detect
- **Beispiel:** "Arbeit → Privat" (30min Buffer)
- **Zweck:** Explizit Zeit für Kontext-Wechsel

**Pausen (Bewusst):**
- **Quelle:** User-geplant
- **Beispiel:** "Refuel-Pause" (1h Spaziergang)
- **Zweck:** Nicht verschwendet, sondern produktiv

**Nervige Tasks:**
- **Quelle:** Obsidian Tasks mit Tag `#nervige`
- **Beispiel:** "Steuern machen", "Emails sortieren"
- **Zweck:** Sichtbar machen, priorisieren, abhaken

**Energie-Level:**
- **Quelle:** User-Input oder historische Daten
- **Beispiel:** Morgens = High, Mittags = Low, Nachmittags = Medium
- **Zweck:** Tasks zur richtigen Zeit platzieren

---

## 🎨 Visualisierungs-Konzepte (Detailliert)

### 1. Timeline (Standard) - IMPLEMENTIERT ✅

**Layout:**
```
08:00 ──────────────
     │ Meeting     │
10:00 ──────────────
     │ [Transition]│ ← Neu: Explizite Übergänge
10:30 ──────────────
     │ H2me Block  │
     │ (Deep Work) │
12:30 ──────────────
     │ [Pause]     │ ← Neu: Bewusste Pausen
13:30 ──────────────
```

**Farben (Yang-Style):**
- Events: Rot
- Tasks: Orange
- Transitions: Grau
- Pausen: Grün

---

### 2. Block-View (Tetris) - KONZEPT

**Layout:**
```
┌─────────────────────┐
│ Mo  Di  Mi  Do  Fr  │
├─────┬─────┬─────────┤
│ Arb │ Mtg │ H2me    │ ← Blöcke füllen Raum
│eit │     │ [Deep]  │
├─────┼─────┤         │
│[Trn]│[Pau]│         │
└─────┴─────┴─────────┘
```

**Eigenschaften:**
- **Größe = Dauer** (größere Blöcke = mehr Zeit)
- **Position = Wochentag + Uhrzeit**
- **Farbe = Kategorie/Projekt**
- **Drag & Drop** - Blöcke verschieben

**Use-Case:**
- Wochenplanung auf einen Blick
- Große Projekt-Blöcke visuell dominant

---

### 3. Wellen/Rhythmus - KONZEPT

**Layout:**
```
Energie
  ↑
3 │     ╱╲              ╱╲
  │    ╱  ╲    ╱╲      ╱  ╲
2 │   ╱    ╲╱  ╲ ╱╲  ╱    ╲
  │  ╱          ╲╱  ╲╱      ╲
1 │ ╱                        ╲
  │╱                          ╲
0 ├─────────────────────────────→ Zeit
  Mo    Di    Mi    Do    Fr
  
  Events als Marker auf Wellen
```

**Eigenschaften:**
- **Wellen = Energie-Rhythmen** (Tagesrhythmus, Wochenrhythmus)
- **Events = Punkte auf Wellen** (platziert nach Zeit)
- **Resonanz** - Mehrere Wellen Peak zusammen = Optimal
- **Täler** - Low-Energy = Pausen oder nervige Tasks

**Use-Case:**
- Optimale Zeitfenster finden
- Energie-Management visualisieren
- Pattern erkennen ("Donnerstag immer produktiv")

---

### 4. Heatmap - KONZEPT

**Layout:**
```
      Mo  Di  Mi  Do  Fr  Sa  So
08:00 ██  ░░  ██  ░░  ██  ░░  ░░
10:00 ██  ██  ██  ██  ░░  ░░  ░░
12:00 ░░  ░░  ░░  ░░  ░░  ██  ░░
14:00 ██  ██  ░░  ██  ██  ░░  ░░
16:00 ░░  ██  ██  ██  ░░  ░░  ░░
18:00 ░░  ░░  ░░  ░░  ░░  ██  ██

██ = Hoch besetzt   ░░ = Frei
```

**Eigenschaften:**
- **Intensität = Wie voll** (dunkel = viele Events, hell = frei)
- **Zeitraum = Woche/Monat** (scrollbar)
- **Farbe = Kategorie** (optional: Split-Cells)

**Use-Case:**
- Freie Zeitfenster finden
- Überlastungs-Erkennung ("Zu viel diese Woche")
- Langfristige Patterns ("Montags immer voll")

---

### 5. Graph-View - IDEE

**Layout:**
```
    [Projekt A]
       /    \
   [Task1] [Task2]
      |      |
   [Meeting]─[Review]
      |
   [Projekt B]
```

**Eigenschaften:**
- **Knoten = Events/Tasks/Projekte**
- **Kanten = Abhängigkeiten/Verbindungen**
- **Cluster = Themen/Projekte**

**Use-Case:**
- Projekt-Übersicht
- Abhängigkeiten erkennen
- Wo hängt was zusammen?

---

### 6. Spatial/3D - EXPERIMENTELL

**Layout:**
```
    Arbeit (Raum oben links)
    Privat (Raum oben rechts)
    Projekte (Raum unten)
    
    Blöcke schweben in Räumen
    Camera bewegt sich durch
```

**Eigenschaften:**
- **Three.js** für 3D
- **Räume = Kontexte** (Arbeit, Privat, Projekt)
- **Blöcke = Events** (3D-Boxen)
- **Navigation = FPS-Style** (WASD)

**Use-Case:**
- Physisches Raumkalender digital
- Experimentell, spielerisch
- Möglicherweise Gimmick

---

### 7. Minimalist - TEXT-ONLY

**Layout:**
```
2025-10-29 (Dienstag)

08:00-10:00  Meeting [Arbeit]
10:00-10:30  Transition [Arbeit→Privat]
10:30-12:30  H2me Deep Work [153_H2me]
12:30-13:30  Pause [Refuel]
13:30-14:00  Nervige Task: Steuern [#nervige]
14:00-16:00  ...
```

**Eigenschaften:**
- **Kein Visuelles** - Nur Text
- **Terminal-Style** - Monospace Font
- **Keyboard-Navigation** - j/k für hoch/runter

**Use-Case:**
- Schnellster Load
- Accessibility
- Fokus auf Inhalt, nicht Form

---

## 🔄 Workflow & User-Journey (Erweitert)

### Morgens: Tages-Vorbereitung

**06:00 - KWGT Widget auf Homescreen:**
1. Schnell-Überblick: 3 nächste Events
2. Tap → WebApp öffnet

**06:05 - WebApp Timeline-View:**
3. View "Heute" → Alle Events/Tasks chronologisch
4. **NEU:** Transition-Blöcke sichtbar → Weiß ich wann umschalten
5. **NEU:** Nervige Tasks highlighted → Kann nicht ignorieren

**06:10 - Visualisierung wechseln:**
6. Swipe up → Wellen-View
7. Sieht: Energie hoch am Morgen → H2me Block gut platziert
8. Sieht: Mittag-Tief → Pause eingeplant, gut!

---

### Mittags: Quick-Check

**12:00 - Unterwegs, Smartphone:**
1. KWGT Widget: "Pause in 30min"
2. Tap → Timeline
3. Nach Pause: "Nervige Task: Steuern" → Okay, Low-Energy passt

---

### Nachmittags: Deep Work

**14:00 - Laptop, Dashboard:**
1. Dashboard öffnet → Kalender-Context "H2me Development"
2. Dashboard zeigt: H2me Tasks, Git Status, Deployment
3. Parallel: Kalender im Sidebar (Timeline oder Block-View)
4. Arbeitet 2h ununterbrochen → Block gut geplant

---

### Abends: Wochenplanung

**18:00 - Laptop, Zeitblock-Editor:**
1. View "Woche" → 7 Tage als Block-View
2. Sieht: Donnerstag noch komplett frei
3. Drag & Drop: "Projekt B Deep Work" Block → Donnerstag 10-14h
4. **NEU:** Transition-Block hinzufügen: Mittwoch 18:00 (Arbeit→Projekt)
5. **NEU:** Pause-Block: Donnerstag 14-15h (bewusst!)

**18:30 - Visualisierung-Experiment:**
6. Wechselt zu Heatmap → "Aha, Montag zu voll, Donnerstag gut"
7. Wechselt zu Wellen-View → "Donnerstag Peak-Energie, perfekt für Projekt B"
8. Zurück zu Timeline → Finaler Check

---

### Sonntag: Reflexion

**20:00 - Review vergangene Woche:**
1. View "Vergangene Woche" (Timeline oder Heatmap)
2. Filtert: "Nervige Tasks" → Alle erledigt? Nein, 2 übrig
3. Filtert: "Transitions" → Haben sie funktioniert? Meist ja
4. Filtert: "Pausen" → Eingehalten? 80% ja
5. Wechselt zu Wellen-View → "Montag war chaotisch, kein Peak-Timing"

**Erkenntnisse für nächste Woche:**
- Montag: Weniger Events planen
- Transitions: Mehr Zeit einplanen (30→45min)
- Nervige Tasks: Früher am Tag (vor Energie-Tief)

---

## 🤔 Offene konzeptuelle Fragen (Aktualisiert)

### 1. Visualisierungs-Prioritäten

**Frage:** Welche Visualisierungen sind am wichtigsten für MVP?

**Optionen:**
- **Minimal:** Timeline + Block-View (2 Typen)
- **Standard:** Timeline + Block + Wellen (3 Typen)
- **Umfassend:** Timeline + Block + Wellen + Heatmap (4 Typen)

**Trade-off:** Mehr Typen = Mehr Entwicklungszeit, aber mehr Flexibilität

**Empfehlung:** Standard (3 Typen) - Timeline für Alltag, Block für Planung, Wellen für Optimierung

---

### 2. Zeitblock-Typen

**Frage:** Welche Block-Kategorien sind essentiell?

**Kandidaten:**
- Events (fixiert, von Nextcloud/Outlook)
- Tasks (aus Obsidian)
- **Transitions (NEU)** - Übergänge
- **Pausen (NEU)** - Bewusste Refuel-Zeit
- **Deep Work** - Große Projekt-Blöcke
- **Nervige Tasks** - Spezielle Kategorie
- **Custom** - User-definiert

**Empfehlung:** Alle außer Custom für Start, Custom später

---

### 3. Energie-Level Tracking

**Frage:** Wie wird Energie-Level erfasst?

**Optionen:**
- **A) Manuell** - User markiert jeden Block mit High/Medium/Low
- **B) Historisch** - System lernt aus Vergangenheit
- **C) Hybrid** - Start manuell, später automatisch

**Empfehlung:** A (Manuell) für Start, C (Hybrid) später

---

### 4. Style-System

**Frage:** Wie radikal sollen Yang/Bian/Yin Unterschiede sein?

**Optionen:**
- **Subtil:** Nur Farben ändern
- **Mittel:** Farben + Layout-Dichte
- **Radikal:** Komplett anderes UI (Yang = Dicht, Yin = Minimalistisch)

**Empfehlung:** Mittel für Start, Radikal später experimentieren

---

### 5. PoC-Fokus

**Frage:** Was soll der nächste PoC zeigen?

**Option A:** Visualisierungs-System (gleiche Daten, 3 Views)
**Option B:** Neue Block-Typen (Transitions, Pausen)
**Option C:** Energie-Management (Wellen + Platzierung)

**Empfehlung:** A (Visualisierungs-System) - Beweist Flexibilität des Konzepts

---

## 📊 Zeitschätzungen (Neu)

### Abgeschlossen ✅

| Phase | Feature | Aufwand | Status |
|-------|---------|---------|--------|
| 1 | Mobile Timeline + APIs | 30-40h | ✅ |

---

### Geplant - Kern-Features 🔜

| Phase | Feature | Aufwand | Priorität |
|-------|---------|---------|-----------|
| 2a | Zeitblock-Editor (erweitert) | 15-20h | Hoch |
| 2b | Neue Block-Typen (Transitions, Pausen) | 5-10h | Hoch |
| 3a | Visualisierungs-Framework | 10-15h | KRITISCH |
| 3b | Block-View Implementation | 10-15h | Hoch |
| 3c | Wellen-View Implementation | 20-30h | Mittel |
| 3d | Heatmap-View Implementation | 10-15h | Niedrig |
| 3e | Style-System (Yang/Bian/Yin) | 5-10h | Mittel |

**Gesamt Kern:** ~75-125h

---

### Geplant - Erweiterte Features 🌟

| Phase | Feature | Aufwand | Priorität |
|-------|---------|---------|-----------|
| 4a | Graph-View | 15-20h | Niedrig |
| 4b | Spatial/3D-View | 30-50h | Experimentell |
| 4c | Minimalist-View | 5-10h | Niedrig |
| 4d | Energie-Tracking (automatisch) | 20-30h | Mittel |
| 4e | Dashboard-Kalender-Steuerung | 20-30h | Mittel |
| 4f | Physisches RK Sync | 50-100h | Experimentell |

**Gesamt Erweitert:** ~140-240h

---

**Gesamt-Projekt:** ~245-405h (realistisch über 6-12 Monate bei 10-20h/Woche)

---

## 🚀 Nächster Schritt: PoC Visualisierungs-System

### Was der PoC zeigen soll

**Ziel:** Beweisen dass das Multi-Viz-Konzept funktioniert

**Daten:** 1 Woche mit ~15 Events/Tasks/Blöcken (statisch)

**Visualisierungen:**
1. Timeline (schon da, anpassen)
2. Block-View (neu)
3. Wellen (neu)

**Interaktionen:**
- View-Switcher (Dropdown oder Buttons)
- Jede View funktioniert unabhängig
- Gleiche Daten, verschiedene Darstellung

**Zeitschätzung:** 15-25h

**Files:**
- `doc_calendar_poc_multiviz.md` - Planung
- `poc_multiviz.html` - Implementation
- `visualizations/*.js` - Renderer

---

## 📝 Changelog

(LogClaudine:: (LogCreated:: 25-10-29 16:30) **KONZEPT-CREATED** Umfassendes Kalender-Konzept-File erstellt: 3 Perspektiven vereint (RK/Rhythmus/Dashboard), 5 Datenquellen dokumentiert, 9 offene Fragen identifiziert, 160-230h Planung, MVP-Definition)

(LogClaudine:: (LogUpdated:: 25-10-29 17:15) **VISION-ERWEITERT** Konzept radikal erweitert: Nicht nur Kalender, sondern Lebens-Steuerungs-System für Alltag/Übergänge/Projekte, Multi-Viz-System (7 Visualisierungen geplant), Data-Viz-Interaction Separation, Neue Block-Typen (Transitions, Pausen, Nervige Tasks), Energie-Management, Zeitschätzung 245-405h, PoC Visualisierungs-System als nächster Schritt)

---

_Konzept-File für strategische Übersicht - Operative Planung siehe `doc_calendar_planung.md`_  
_Letzte Aktualisierung: 2025-10-29 17:15_
