# Calendar PoC - Konzept & Diskussion

**Projekt:** H2me Calendar PoC  
**Status:** Konzeptphase - Entscheidungen getroffen ✅  
**Erstellt:** 2025-10-29  
**Basiert auf:** Nextcloud Calendar Screenshot (Woche 44)

---

## 📋 Was wir hier tun

**Dieses File ist für:**
- Ausführliche Konzept-Besprechung ✅
- Jede Frage klären ✅
- Alle Entscheidungen dokumentieren ✅
- **Wird live aktualisiert während Diskussion**

**NICHT für:**
- Implementation (kommt später in `doc_calendar_poc_planung.md`)
- Code (erst nach Konzept-Klärung)

---

## 🖼️ Ausgangs-Situation: Screenshot-Analyse

**Quelle:** Nextcloud Calendar (kai.nl.tab.digital)  
**Ansicht:** Wochenansicht, Woche 44 aus 2025  
**Datum sichtbar:** Mo 27.10 - So 2.11.2025

### Was ich sehe:

**Linke Sidebar:**
- **Kalender** (9 verschiedene):
  - 10_me (lila)
  - 16_FF (orange)
  - 63_HH + Büro (türkis)
  - ya_10_Stefi (türkis)
  - Persönlich (gelb)
  - posteo.de (türkis)
  - 610_Bier (gelb)
  - 65_WORK (grün)
  - Geburtstage von Kontakten (grau)

- **Deck** (verschiedene Boards):
  - 65_arschi Programme
  - 40_büecher musig serie
  - 54_website h2m.art
  - 16_FF
  - 00_Daten + Orga
  - 53_maschinell und apparatli
  - 54_Code
  - 61_Bier
  - 65_WORK
  - ya_10_Stefi
  - 63_HH + Büro

**Hauptbereich - Wochenansicht:**
- **Ganztägig-Bereich oben:**
  - "periode" (rosa/rot, Mi-Fr)
  - "Janine Meier (1981)" (grau, Mi ganztägig)

- **Zeitslots:**
  - **Di-Fr 08:00-11:00:** "buga" (türkis, 4x gleiche Events)
  - **Fr 15:00-15:30:** "aku" (gelb/orange)
  - **Do 18:00-19:00:** "degubikater" (orange)

---

## 🎯 PoC-Ziel: "Einfache Zeitblock-Erstellung"

### Deine Aussage:
> "ich kann in einfacher art zeitblöcke in meinen kategoriefarben einfügen"

**Das bedeutet:**
- User kann schnell neue Blöcke hinzufügen
- Blöcke haben Kategoriefarben (7 definiert)
- Einfache Interaktion (Click-to-Add)
- Drag & Drop zum Verschieben/Resizen
- Hybrid-View (Wochenübersicht + Tages-Detail)
- Mobile-First (Nothing Phone 3)

---

## 📋 Entscheidungs-Log (ALLE BEANTWORTET ✅)

### 2025-10-29 18:00 - Entscheidung #1: Block-Erstellung

**Frage:** Wie sollen User Zeitblöcke erstellen?  
**Optionen:** A) Drag-to-Create, B) Click-and-Fill, C) Quick-Add, D) Templates  
**Entscheidung:** **Vorerst Click** (Click-and-Fill)  
**Begründung:** Einfachste Implementation für PoC, klare UX  
**Implikation:** 
- Dialog-Modal nötig
- Form: Titel, Startzeit, Dauer, Kategorie
- Kein komplexes Drag-Detection für Erstellung
- Später erweiterbar mit Drag-to-Create

---

### 2025-10-29 18:00 - Entscheidung #2: Kategorien & Farben

**Frage:** Welche Kategorien brauchst du?  
**Optionen:** Nextcloud-Kalender oder eigenes System?  
**Entscheidung:** **7 feste Kategorien mit definierten Farben**

**Kategorien:**
1. **FF** - Orange
2. **Stefiprojekte** - Rot
3. **Körperzeug** - Violett
4. **HH** - Blau
5. **MM** - Grün
6. **Bier** - Gelb
7. **Undefiniert** - Grau

**Implikation:**
- Farben fix (nicht user-definierbar im PoC)
- Kategorie-Picker mit 7 Optionen
- CSS-Variables für Farben
- Mapping zu Nextcloud-Kalendern später

---

### 2025-10-29 18:00 - Entscheidung #3: Block-Typen

**Frage:** Welche Block-Typen brauchst du?  
**Optionen:** Events, Tasks, Transitions, Pausen, Deep Work, Nervige Tasks?  
**Entscheidung:** **2 Typen + Transition-Feature**

**Block-Typen:**
1. **Events** - Fixierte Zeitblöcke (wie Meetings)
2. **Tasks** - Flexible Zeitblöcke (wie To-Dos mit Zeit-Slot)

**Transition-Feature:**
- Nicht als eigener Block-Typ
- Sondern als **auslaufender Blur** am Ende bestimmter Blöcke
- Nur für bestimmte Farbkategorien nötig
- Visuell: Farbe faded out zum nächsten Block

**Implikation:**
- Kein separater "Transition"-Typ im Data-Model
- CSS-Filter `blur()` + `opacity` Gradient
- Kategorie-Property: `hasTransition: true/false`

---

### 2025-10-29 18:00 - Entscheidung #4: Nextcloud-Integration

**Frage:** Wie soll PoC mit Nextcloud umgehen?  
**Optionen:** A) Standalone, B) Read-Only, C) Schreibend  
**Entscheidung:** **Vorerst am Rest arbeiten, echte Daten später**

**Bedeutet:**
- PoC mit Mock-Daten (statisch)
- Fokus auf UI/UX
- API-Integration in Phase 2

**Implikation:**
- Einfachere Implementation
- Schnellerer PoC
- Daten-Struktur trotzdem kompatibel mit Nextcloud-Events

---

### 2025-10-29 18:00 - Entscheidung #5: Zeitraster

**Frage:** Wie fein soll das Zeitraster sein?  
**Optionen:** 5min, 15min, 30min, frei  
**Entscheidung:** **15min Raster**

**Implikation:**
- Zeitslots alle 15min (08:00, 08:15, 08:30, ...)
- Snapping beim Drag & Drop auf 15min
- Dauer in 15min-Schritten (15, 30, 45, 60, 75, ...)
- CSS-Grid mit 4 Rows pro Stunde

---

### 2025-10-29 18:00 - Entscheidung #6: Ansicht

**Frage:** Wochenansicht, Tagesansicht oder Hybrid?  
**Optionen:** A) Woche, B) Tag, C) Hybrid  
**Entscheidung:** **C) Hybrid - Kompakte Woche + Detail-View**

**Layout:**
```
┌───────────────────────────────────┐
│ Woche 44                    [+]   │ ← Top-Bar
├─────┬─────┬─────┬─────┬─────┬─────┤
│ Mo  │ Di  │ Mi  │ Do  │ Fr  │ Sa  │ ← Mini-Wochenübersicht
│ ▓▓  │ ▓▓▓ │▓▓▓ │▓▓▓▓│ ▓   │ ░░  │   (Heatmap-artig)
├─────┴─────┴─────┴─────┴─────┴─────┤
│                                   │
│ Detail: Donnerstag 31.10     [◀▶] │ ← Detail-View (scrollbar)
│                                   │
│ 08:00 ───────────────────         │
│       │ buga (3h)  │ [Blau]       │
│ 11:00 ───────────────────         │
│                                   │
│ 15:00 ───────                     │
│       │aku(30m)│ [Gelb]           │
│ 15:30 ───────                     │
│                                   │
│ 18:00 ─────────                   │
│       │degu(1h)│ [Orange]         │
│ 19:00 ─────────                   │
│                                   │
│ [+ Tap hier für neuen Block]      │ ← Quick-Add Zone
└───────────────────────────────────┘
```

**Implikation:**
- Zwei Components: `MiniWeekView` + `DayDetailView`
- Tap auf Tag in Mini-View → Lädt Detail-View
- Swipe Left/Right in Detail → Nächster/Vorheriger Tag
- Best of both worlds (Überblick + Detail)

---

### 2025-10-29 18:00 - Entscheidung #7: Ganztägige Events

**Frage:** Wie mit ganztägigen Events umgehen?  
**Optionen:** Separate Zone, Integriert, Gar nicht  
**Entscheidung:** **Vorerst nicht relevant für PoC**

**Implikation:**
- Keine ganztägige Zone (wie "periode" im Screenshot)
- Alle Blöcke haben Startzeit + Dauer
- Später erweiterbar wenn nötig

---

### 2025-10-29 18:00 - Entscheidung #8: Drag & Drop

**Frage:** Sollen Blöcke verschiebbar/resizable/löschbar sein?  
**Optionen:** Nur erstellen, Alle Features  
**Entscheidung:** **Ja alle - Verschieben, Resizen, Löschen**

**Features:**
1. **Drag zum Verschieben** - Block auf neuen Zeitslot ziehen
2. **Resize-Handle** - Am unteren Ende ziehen für Dauer-Änderung
3. **Tap-to-Edit** - Block antippen → Edit-Modal
4. **Swipe-to-Delete** - Nach links wischen → Löschen (mit Confirm)

**Implikation:**
- Touch-Events: `touchstart`, `touchmove`, `touchend`
- Collision-Detection (Überlappungen verhindern oder erlauben?)
- Snap-to-Grid (15min Raster)
- Mehr Aufwand, aber realitätsnäher

---

### 2025-10-29 18:00 - Entscheidung #9: Speicherung

**Frage:** Wo werden PoC-Blöcke gespeichert?  
**Optionen:** localStorage, JSON-Export, Nextcloud, Session  
**Entscheidung:** **Für PoC muss funktionieren, Speicherort noch nicht relevant**

**Interpretation:**
- Blöcke müssen über Reload bestehen bleiben
- **localStorage** ist pragmatischste Lösung für PoC
- Einfach zu implementieren (`JSON.stringify()` / `JSON.parse()`)
- Migration zu Nextcloud später einfach

**Implikation:**
- `localStorage.setItem('calendar-blocks', JSON.stringify(blocks))`
- Load on init, Save on change
- Export/Import später optional

---

### 2025-10-29 18:00 - Entscheidung #10: Device-Fokus

**Frage:** Mobile oder Desktop primär?  
**Optionen:** Mobile, Desktop, Responsive  
**Entscheidung:** **Mobile für PoC, später alles**

**Device:** Nothing Phone 3

**Implikation:**
- **Mobile-First CSS**
- **Touch-Optimierung** (min 44x44px Touch-Targets)
- **Bottom-Navigation** (wenn nötig)
- **Swipe-Gesten** statt Click
- **Portrait-Modus** primär
- Desktop-Styles später via Media Queries

---

## 🎨 Gewähltes Visuelles Konzept

### ✅ Konzept C: Hybrid (Kompakte Woche + Detail-View)

**Warum:**
- **Best of both worlds** - Überblick + Detail
- **Mobile-friendly** - Kompakte Woche passt auf Smartphone
- **Gute UX** - Tap auf Tag für Detail, Swipe für Navigation
- **Erweiterbar** - Später verschiedene Visualisierungen

**Layout-Details:**

**1. Mini-Wochenübersicht (Oben):**
- 7 Spalten (Mo-So)
- Heatmap-artig (Intensität = wie voll)
- Tap auf Tag → Zeigt Detail unten
- Aktueller Tag hervorgehoben

**2. Detail-View (Unten, Scrollbar):**
- Zeitachse 00:00-23:45 (15min Raster)
- Blöcke als Colored Cards
- Drag & Drop innerhalb dieser View
- Resize-Handles sichtbar beim Antippen
- Quick-Add Zone am Ende

**3. Top-Bar:**
- Woche 44 (Wochen-Nummer)
- [+] Button für Quick-Add Modal
- Optional: Filter-Icon (später)

---

## 🛠️ Technische Spezifikation

### Farb-Definitionen (CSS Variables)

```css
:root {
  --cat-ff: #FF8C00;        /* Orange */
  --cat-stefi: #DC143C;     /* Rot */
  --cat-koerper: #9370DB;   /* Violett */
  --cat-hh: #4169E1;        /* Blau */
  --cat-mm: #32CD32;        /* Grün */
  --cat-bier: #FFD700;      /* Gelb */
  --cat-undefined: #808080; /* Grau */
}
```

### Daten-Struktur (Aktualisiert)

```json
{
  "id": "uuid-v4",
  "title": "Mein Block",
  "date": "2025-10-31",
  "startTime": "14:00",
  "duration": 60,           // in Minuten
  "category": "ff",         // ff | stefi | koerper | hh | mm | bier | undefined
  "type": "event",          // event | task
  "hasTransition": false,   // Für Blur-Effekt
  "editable": true
}
```

### Transition-Blur CSS

```css
.block[data-has-transition="true"]::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: inherit;
  filter: blur(8px);
  opacity: 0.5;
}
```

### Drag & Drop Touch-Events

```javascript
let dragState = {
  isDragging: false,
  blockId: null,
  startY: 0,
  startTime: null
};

block.addEventListener('touchstart', (e) => {
  dragState.isDragging = true;
  dragState.blockId = e.target.dataset.blockId;
  dragState.startY = e.touches[0].clientY;
  dragState.startTime = getTimeFromY(dragState.startY);
});

document.addEventListener('touchmove', (e) => {
  if (!dragState.isDragging) return;
  const currentY = e.touches[0].clientY;
  const deltaY = currentY - dragState.startY;
  // Move block visually
  updateBlockPosition(dragState.blockId, deltaY);
});

document.addEventListener('touchend', () => {
  if (!dragState.isDragging) return;
  // Snap to 15min grid
  const newTime = snapToGrid(dragState.startTime + delta, 15);
  // Save new position
  updateBlock(dragState.blockId, { startTime: newTime });
  dragState.isDragging = false;
});
```

---

## ✅ Alle Detailfragen Beantwortet!

### 2025-10-29 19:00 - Entscheidung #11: Transition-Blur Kategorien

**Frage:** Welche Kategorien brauchen den Blur-Effekt am Block-Ende?  
**Entscheidung:** **3 von 7 Kategorien**

**Transition-Kategorien:**
1. **FF (Orange)** - `hasTransition: true`
2. **MM (Grün)** - `hasTransition: true`
3. **Bier (Gelb)** - `hasTransition: true`

**Keine Transitions:**
- Stefiprojekte (Rot)
- Körperzeug (Violett)
- HH (Blau)
- Undefiniert (Grau)

**Implikation:**
- CSS-Klasse `.block--transition` nur für diese 3
- Kategorie-Config erweitern:
  ```javascript
  const categories = {
    ff: { color: '--cat-ff', hasTransition: true },
    mm: { color: '--cat-mm', hasTransition: true },
    bier: { color: '--cat-bier', hasTransition: true },
    stefi: { color: '--cat-stefi', hasTransition: false },
    // ...
  }
  ```

---

### 2025-10-29 19:00 - Entscheidung #12: Collision-Handling

**Frage:** Was passiert bei überlappenden Blöcken?  
**Entscheidung:** **Überlappung erlauben**

**Verhalten:**
- Blöcke können zeitlich überlappen
- Kein Verhindern beim Drag & Drop
- Keine Warnung
- Visuell: Beide Blöcke sichtbar (z-index entscheidet Reihenfolge)
- User muss selbst entscheiden ob Überlappung gewollt

**Implikation:**
- KEINE Collision-Detection nötig (spart Code)
- Gestapelte Blöcke via CSS (späterer z-index bei späterem Erstell-Zeit)
- Beide Blöcke clickbar/drag-bar
- Einfachere Implementation

---

### 2025-10-29 19:00 - Entscheidung #13: Event vs. Task Visuell

**Frage:** Wie unterscheiden sich Event und Task?  
**Entscheidung:** **Icon-Unterscheidung**

**Visuelle Differenzierung:**
- **Event:** 🕐 Uhr-Icon (links im Block)
- **Task:** ☐ Checkbox-Icon (links im Block)
- Sonst identisches Styling (Farbe, Border, Opacity)

**Icon-Positionierung:**
```html
<div class="block" data-type="task">
  <span class="block__icon">☐</span>
  <span class="block__title">Mein Task</span>
  <span class="block__time">14:00 - 15:30</span>
</div>
```

**Implikation:**
- Icons als Unicode-Zeichen (keine SVG nötig für PoC)
- Event: `<span class="block__icon">🕐</span>`
- Task: `<span class="block__icon">☐</span>`
- Später optional: Checkbox bei Task interaktiv (zum Abhaken)

---

### 2025-10-29 19:00 - Entscheidung #14: Mini-Wochenübersicht Visualisierung

**Frage:** Wie wird Tages-Intensität in der Wochenübersicht dargestellt?  
**Entscheidung:** **KEINE klassische Heatmap - Kategoriefarben zeigen**

**Visualisierung:**
- Jeder Tag zeigt die **Farben der platzierten Blöcke**
- Mehrere Blöcke → Mehrere Farbstreifen nebeneinander
- Leerer Tag → Weiß/Grau

**Beispiel:**
```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ Mo  │ Di  │ Mi  │ Do  │ Fr  │ Sa  │ So  │
│🟠🟡 │🟠🟢🟠│🟠🟠 │🟠🟢🟡│🟡  │░░  │░░  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘

🟠 = FF (Orange)
🟡 = Bier (Gelb)
🟢 = MM (Grün)
░ = Leer
```

**Implementation:**
- Pro Tag: Alle Blöcke durchgehen
- Farben als kleine vertikale Streifen (CSS `linear-gradient`)
- Reihenfolge: Chronologisch (frühester Block links)

**Implikation:**
- Komplexer als einfache Heatmap
- Aber informativer (sehe WELCHE Kategorien)
- User erkennt Muster (z.B. "Donnerstag immer viel Orange")
- CSS: `background: linear-gradient(to right, var(--cat-ff) 33%, var(--cat-bier) 33% 66%, var(--cat-mm) 66%);`

---

## 🎯 Nächste Schritte

### ✅ Konzept-Phase VOLLSTÄNDIG abgeschlossen!

**Alle 14 Fragen beantwortet:**
- 10 Hauptfragen (Block-Erstellung bis Device-Fokus)
- 4 Detailfragen (Transition-Kategorien, Collision, Event/Task-Icons, Mini-Week-Farben)

**BEREIT für Implementation!**

**Nächster Schritt:**
1. `doc_calendar_poc_planung.md` erstellen
   - Häppchen-Struktur definieren
   - Implementation-Reihenfolge festlegen
   - Zeitschätzungen pro Häppchen

**Danach:**
- HTML-Struktur (Hybrid-View)
- CSS-Styling (Mobile-First, 7 Kategoriefarben, Transition-Blur)
- JavaScript-Logik (Drag & Drop, localStorage, Touch-Events)

---

## 📝 Changelog

(LogClaudine:: (LogCreated:: 25-10-29 17:30) **POC-KONZEPT-CREATED** Screenshot analysiert (Nextcloud Woche 44), 10 Kern-Fragen formuliert, 3 visuelle Konzepte skizziert, Entscheidungs-Log Struktur)

(LogClaudine:: (LogUpdated:: 25-10-29 18:00) **ALLE-ENTSCHEIDUNGEN-GETROFFEN** 10 Hauptfragen beantwortet: Click-Erstellung, 7 Kategorien (FF/Stefi/Körper/HH/MM/Bier/Undefiniert), 2 Block-Typen (Event/Task) + Transition-Blur, Vorerst Mock-Daten, 15min Raster, Hybrid-View gewählt, Keine Ganztägig, Alle Drag&Drop Features, localStorage, Mobile-First (Nothing Phone 3))

(LogClaudine:: (LogUpdated:: 25-10-29 19:00) **DETAILFRAGEN-COMPLETE** 4 weitere Entscheidungen: Transition-Blur nur für FF/MM/Bier, Überlappung erlauben (keine Collision-Detection), Event/Task via Icon unterscheiden (🕐/☐), Mini-Week zeigt Kategoriefarben statt Heatmap (linear-gradient per Tag), Konzept 100% abgeschlossen - bereit für Planung)

(LogClaudine:: (LogCreated:: 25-10-29 14:48) **READY-FOR-IMPLEMENTATION** Konzept vollständig dokumentiert, Planungs-File erstellt (14 Häppchen), Tech-Spec für Claude Code vorbereitet, alle 3 Dokumentations-Files vollständig)

---

_Letzte Aktualisierung: 2025-10-29 14:48 - Vollständig konzipiert, dokumentiert, bereit für Claude Code_
