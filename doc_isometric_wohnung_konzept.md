# Isometrische Wohnungs-Visualisierung

## Vision

Eine 3-Level Darstellung deiner Wohnung in isometrischer Perspektive mit interaktiven Elementen.

**Ziel:** "Räume" in denen verschiedene Lebensbereiche visuell repräsentiert werden.

---

## 3 Detail-Level

### Level 1: Möblierung (Überblick)
**Zoom:** Ganzes Apartment sichtbar  
**Details:** 
- Möbel als simple Blöcke/Formen
- Farbcodierung nach YBY-System
- Räume erkennbar aber nicht detailliert

**Beispiel:**
```
┌─────────────────────┐
│  🛋️  Wohnzimmer     │ ← Yang (Orange)
│                     │
│  🛏️  Schlafzimmer   │ ← Yin (Violett)
│                     │
│  🍳  Küche          │ ← Bian (Blau)
└─────────────────────┘
```

### Level 2: Räume (Detail)
**Zoom:** Einzelner Raum füllt Bildschirm  
**Details:**
- Möbelstücke detaillierter (Tisch, Stühle, Schrank)
- Dekorations-Elemente angedeutet
- Klickbare Hotspots

**Beispiel - Wohnzimmer:**
```
Sofa mit Kissen
Couchtisch mit Büchern
Regal mit Kategorien (Bier, Technik, etc.)
Fenster mit Lichteinfall
```

### Level 3: Deko (Extreme Details)
**Zoom:** Close-up auf Möbel/Deko  
**Details:**
- Einzelne Objekte (Buch, Tasse, Pflanze)
- Tooltips mit Infos
- Animationen (z.B. dampfende Tasse)

**Beispiel - Regal:**
```
📚 Bier-Bücher (clickable → öffnet Leseliste)
🧪 Brau-Equipment (clickable → Projekte)
🎨 Deko-Objekte (nur visuell)
```

---

## Technische Umsetzung

### Option A: Three.js (3D)
**Pro:**
- Echte 3D-Objekte
- Smooth Rotation/Zoom
- Realistisches Licht

**Contra:**
- Performance auf Handy?
- Lernkurve

### Option B: CSS Isometric (2.5D)
**Pro:**
- Leichtgewichtig
- Funktioniert überall
- Einfacher zu stylen

**Contra:**
- Weniger flexibel
- Keine echte 3D-Rotation

### Option C: Blender + Export
**Pro:**
- Volle Kontrolle in Blender
- Export als GLB für Three.js
- Oder als SVG für 2D

**Contra:**
- Statischer Content
- Updates brauchen Re-Export

**Empfehlung:** Start mit CSS Isometric, später Three.js wenn nötig

---

## Interaktive Elemente

### Klickbare Zonen
- **Schreibtisch** → Öffnet Dashboard mit aktuellen Tasks
- **Bücherregal** → Leseliste / Wiki-Einträge
- **Kalender an Wand** → Bian-Bereich (Termine)
- **Bett** → Schlaf/Zyklus-Tracking
- **Küche** → Rezepte / Bier-Brau-Projekte

### Hover Effects
- Lichter gehen an/aus
- Tür öffnet sich
- Fenster zeigt Wetter

### Ambient Animations
- Uhr tickt
- Pflanzen wachsen langsam
- Tageslicht ändert sich (morgens hell, abends dunkel)

---

## YBY-Integration

### Yang-Raum (Arbeitszimmer/Wohnzimmer)
- **Farbe:** Orange/Gelb Töne
- **Möbel:** Schreibtisch, aktive Projekte sichtbar
- **Elemente:** Computer, To-Do Board, aktive Notizen

### Bian-Raum (Flur/Eingang)
- **Farbe:** Blau/Grau Töne  
- **Möbel:** Kalender, Uhr, Garderobe
- **Elemente:** Zeit-gebundene Items, Termine, Erinnerungen

### Yin-Raum (Schlafzimmer/Leseecke)
- **Farbe:** Violett/Dunkel Töne
- **Möbel:** Bett, Bücherregal, gemütliche Ecke
- **Elemente:** Wissens-Sammlung, Referenzen, Archiv

---

## Entwicklungs-Timeline

### Phase 1: Wireframe (1-2h)
- Grundriss skizzieren
- Level 1 Möblierung festlegen
- Farbschema definieren

### Phase 2: CSS Isometric Prototyp (3-4h)
- Einfacher Raum mit 3-4 Möbeln
- Hover Effects
- Responsive Layout

### Phase 3: Interaktivität (4-5h)
- Klickbare Hotspots
- Zoom zwischen Levels
- Dashboard-Integration

### Phase 4: Details & Animations (5-8h)
- Level 3 Details
- Ambient Animations
- Polishing

**Gesamt:** ~15-20h

---

## Code Beispiel - CSS Isometric

```css
.room {
  transform: rotateX(60deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.furniture {
  width: 100px;
  height: 80px;
  background: var(--accent-yang);
  transform: translateZ(20px);
  transition: all 0.3s;
}

.furniture:hover {
  transform: translateZ(40px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
```

---

## Inspiration & Referenzen

- Monument Valley (Spiel) - Isometric Puzzle-Aesthetik
- Habbo Hotel - Isometric Rooms
- Townscaper - Isometric Gebäude
- Notion-Icons - Stilisierte Möbel/Objekte

---

## Integration mit H2me

### Dashboard Widget
- "Wohnung" Widget in Dashboard
- Zeigt Miniatur-Version (Level 1)
- Click → Vollbild mit allen Levels

### Navigation
- Alternative zu klassischer Navigation
- Räume = Seiten-Bereiche
- Durch Wohnung "laufen" um zu navigieren

### Daten-Visualisierung
- Raumgröße = Aktivität in diesem Bereich
- Helligkeit = Aktuelle Nutzung
- Objekte = Offene Tasks/Projekte

---

## Offene Fragen

- Soll Wohnung **deine reale Wohnung** nachbilden? Oder abstrakt?
- Top-Down oder Seitenansicht?
- Animierter Übergang zwischen Levels?
- Mobile: Touch-Gestures für Zoom?

---

## Nächste Schritte

1. Grundriss skizzieren (Papier/Figma/Excalidraw)
2. Entscheiden: CSS oder Three.js
3. Prototyp eines Raums bauen
4. User-Test: Ist Navigation intuitiv?

---

**Status:** Konzept fertig, Prototyp steht aus  
**Komplex ität:** Hoch (15-20h)  
**Priorität:** Mittelfristig (a2_bald)  
**Dependencies:** Dashboard muss funktionieren

---

_Erstellt: 2025-10-24_  
_Projekt: H2me_  
_Bereich: Yang (Kreativ)_
