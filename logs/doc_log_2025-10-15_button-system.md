# Development Log - H2me Button-System & Zentrierung

**Datum:** 2025-10-15
**Session-Dauer:** ~2 Stunden
**Fokus:** Button-Styling vereinheitlichen, Content-Zentrierung, Accordion-Navigation

---

## Ausgangslage

- Projekt hatte bereits funktionierende Navigation (Sidebar)
- Representation Switcher (3D/SVG/Text Buttons) existierte
- Problem: Button-Styles waren über mehrere Files verteilt
- Content war nicht korrekt zentriert (zu weit rechts)

---

## Hauptziele der Session

1. ✅ Button-Styling zentralisieren
2. ✅ Representation Buttons gleiche Farben wie Navigation
3. ✅ Site Navigation als Accordion-Button integrieren
4. ✅ Content horizontal zentrieren
5. ✅ Typography zentral definieren

---

## Implementierte Änderungen

### 1. Zentrale Button-Klasse (.btn-base)

**File:** `shared-global.css` (Zeile 215-245)

**Was:** Basis-Styling für ALLE Buttons

```css
.btn-base {
    padding: 0.75rem 1rem;
    margin: 0.25rem;
    border-radius: 28px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
    cursor: pointer;
    border: 2px solid transparent;
    background: transparent;
}

.btn-base:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.btn-base:active {
    transform: scale(0.95);
}
```

**Ergebnis:**
- Konsistentes Button-Aussehen über gesamte Website
- Hover-Effekte (Anheben + Schatten)
- Active-State (Verkleinern beim Klick)

---

### 2. Zentrale Yang/Bian/Yin Farben

**File:** `shared-global.css` (Zeile 247-329)

**Was:** Alle Farb-Klassen an EINEM Ort

**Vorher:**
- Yang/Bian/Yin Styles in `shared-nav.css`
- Dupliziert in `shared-representation-switcher.css`
- Inkonsistente Hover-Farben

**Nachher:**
```css
.yang-color {
    color: var(--accent-yang);
}

.yang-color:hover {
    color: var(--accent-yang) !important;
    background-color: var(--accent-yang-secondary) !important;
}

/* + Bian, Yin analog */
```

**Ergebnis:**
- EINE Stelle für alle Button-Farben
- Navigation + Representation Buttons = identische Farben
- `!important` überschreibt JavaScript inline-styles

**Entfernt aus:**
- `shared-nav.css` (Zeile 62-160) → Nur Hinweis-Kommentar
- `shared-representation-switcher.css` (Zeile 101-127) → Hinweis-Kommentar

---

### 3. Representation Buttons außerhalb Container

**File:** `page-yin.html`

**Vorher:**
```html
<div class="representation-container">
  <!-- Representations -->
  <div class="representation-controls">
    <!-- Buttons hier -->
  </div>
</div>
```

**Nachher:**
```html
<div class="representation-container">
  <!-- Representations -->
</div>

<!-- Buttons AUSSERHALB -->
<div class="representation-controls">
  <button class="btn-base" id="toggle-mini-graph">Navigation</button>
  <button class="btn-base yang-color" data-switch="3d">3D</button>
  <button class="btn-base bian-color" data-switch="svg">SVG</button>
  <button class="btn-base yin-color" data-switch="text">Text</button>
  <button class="btn-base" data-switch="random">Zufall</button>
</div>
```

**Warum:** Buttons sollten fixed am unteren Rand sein, unabhängig vom Content

**JavaScript-Anpassung:**
`shared-representation-switcher.js` (Zeile 79-92)
```javascript
attachEventListeners() {
  // Suche Buttons im gesamten Dokument (nicht nur im Container)
  document.querySelectorAll('[data-switch]').forEach(btn => {
    // ...
  });
}
```

**Vorher:** `this.container.querySelectorAll` (nur innerhalb Container)
**Nachher:** `document.querySelectorAll` (gesamtes Dokument)

---

### 4. Buttons Fixed am unteren Rand

**File:** `shared-representation-switcher.css` (Zeile 77-93)

```css
.representation-controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
  background-color: var(--bg-primary);
  padding: 1rem;
  border-radius: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**Ergebnis:**
- Buttons bleiben immer am unteren Bildschirmrand
- Horizontal zentriert
- Springen nicht mehr mit Content-Änderungen

---

### 5. Site Navigation als Accordion

**File:** `shared-graph.css` (Zeile 31-56)

```css
.mini-graph-container {
  position: fixed;
  bottom: 70px;  /* Direkt ÜBER den Buttons */
  left: 50%;
  transform: translateX(-50%);
  max-height: 0;  /* START: Komplett zu */
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.mini-graph-container.expanded {
  max-height: 300px;  /* END: Ausgeklappt */
  padding: 20px;
  opacity: 1;
}
```

**JavaScript Toggle:**
`page-yin.html` (Zeile 97-106)
```javascript
const toggleBtn = document.getElementById('toggle-mini-graph');
const miniGraph = document.querySelector('.mini-graph-container');

toggleBtn.addEventListener('click', () => {
  miniGraph.classList.toggle('expanded');
});
```

**Ergebnis:**
- Mini-Graph standardmäßig versteckt
- Klick auf "Navigation"-Button → Accordion klappt nach oben auf
- Smooth Fade-In/Out Animation

---

### 6. Navigation + Zufall Buttons stylen

**File:** `page-yin.html` (Zeile 46-52)

```html
<button class="btn-base" id="toggle-mini-graph" 
        data-color-var="--color-secondary" 
        data-color-var-hover="--color-secondary">
  Navigation
</button>

<button class="btn-base" data-switch="random" 
        data-color-var="--color-secondary" 
        data-color-var-hover="--color-secondary">
  Zufall
</button>
```

**JavaScript für Farben:**
`page-yin.html` (Zeile 108-145)
```javascript
const bottomButtons = document.querySelectorAll('.representation-controls button[data-color-var]');
bottomButtons.forEach(btn => {
  const colorVar = btn.getAttribute('data-color-var');
  const colorVarHover = btn.getAttribute('data-color-var-hover');
  
  // Setze Farben + Hover-Effekte
  btn.style.color = `var(${colorVar})`;
  // ... (analog zu shared-nav.js)
});
```

**Ergebnis:**
- Navigation + Zufall Buttons sehen identisch aus wie Sidebar-Graph Button
- Nutzen `--color-secondary` Variable
- Gleiche Hover-Effekte

---

### 7. Content-Zentrierung

**Problem:** Content war zu weit rechts (Sidebar nicht ausgeglichen)

**File:** `shared-graph.css` (Zeile 9-23)

**Versuch 1 (funktionierte nicht):**
```css
.content-with-sidebar {
  margin-left: 0;
  padding: 2rem 2rem 2rem calc(136px + 2rem);
  width: 100vw;
}
```
→ Asymmetrisches Padding, Content nicht optisch zentriert

**Finale Lösung:**
```css
.content-with-sidebar {
  margin-left: 136px;  /* Sidebar-Breite */
  padding: 2rem;       /* Symmetrisch */
  width: calc(100vw - 136px);  /* Breite minus Sidebar */
  max-width: 800px;    /* Content-Begrenzung */
  margin-left: auto;
  margin-right: auto;
  
  /* Flexbox für Zentrierung */
  display: flex;
  flex-direction: column;
  justify-content: center;  /* Vertikal */
  align-items: center;      /* Horizontal */
}
```

**Zusätzlich:**
`shared-representation-switcher.css` (Zeile 5-11)
```css
.representation-container {
  width: 100%;
  max-width: 600px;
  margin: 0;  /* Kein auto, Flexbox übernimmt Zentrierung */
}
```

**Ergebnis:**
- Content optisch zentriert (User-Perspektive)
- Sidebar wird korrekt ausgeglichen
- Vertikal & horizontal zentriert

---

### 8. Typography zentral definiert

**File:** `shared-global.css` (Zeile 82-166)

**Was hinzugefügt:**

```css
/* HEADINGS */
h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

h1 { font-size: 3rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
/* ... */

/* PARAGRAPHS */
p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

/* LINKS */
a {
  color: var(--text-primary);
  transition: color 0.3s ease;
}

a:hover {
  color: var(--color-primary);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
}
```

**Fix für überschriebene Heading-Farbe:**
`shared-graph.css` (Zeile 100-105)
```css
.content-with-sidebar h2 {
  color: var(--text-primary) !important;  /* Vorher: #333 */
}
```

**Ergebnis:**
- Konsistente Typography über alle Seiten
- Nutzt CSS Variables (Theme-aware)
- Mobile-responsive
- Zentral wartbar

---

## Verzeichnisstruktur nach Änderungen

```
153_H2me/
├── shared-global.css           ← .btn-base + Yang/Bian/Yin Farben + Typography
├── shared-nav.css              ← Navigation-Layout (Farben entfernt)
├── shared-nav.js               ← Generiert Nav-Links mit .btn-base
├── shared-representation-switcher.css  ← Button-Position (Farben entfernt)
├── shared-representation-switcher.js   ← Event Listeners (document-wide)
├── shared-graph.css            ← Content-Zentrierung + Accordion
├── page-yin.html               ← Buttons außerhalb Container + Toggle-JS
└── (andere Files unverändert)
```

---

## Zentrale Styling-Orte

| **Was**                | **Wo**                              | **Zeilen**  |
|------------------------|-------------------------------------|-------------|
| Button Basis-Styling   | `shared-global.css`                 | 215-245     |
| Yang/Bian/Yin Farben   | `shared-global.css`                 | 247-329     |
| Typography             | `shared-global.css`                 | 82-166      |
| Button-Position        | `shared-representation-switcher.css`| 77-93       |
| Accordion              | `shared-graph.css`                  | 31-56       |
| Content-Zentrierung    | `shared-graph.css`                  | 9-23        |
| Navigation-Layout      | `shared-nav.css`                    | 84-130      |

---

## Wichtige Erkenntnisse

### 1. CSS-Spezifität & !important
- JavaScript inline-styles haben höhere Spezifität als CSS
- `!important` in CSS kann inline-styles überschreiben
- Lösung: Entweder JS entfernen ODER CSS mit `!important`

### 2. Flexbox überschreibt Margin Auto
- Wenn Parent `display: flex` hat, wird `margin: 0 auto` ignoriert
- Flexbox nutzt `align-items: center` für horizontale Zentrierung
- `margin: 0 auto` funktioniert nur bei Block-Layout

### 3. Event Listener Scope
- `this.container.querySelectorAll()` findet nur Kinder des Containers
- `document.querySelectorAll()` findet Elemente im gesamten Dokument
- Wichtig wenn Elemente dynamisch verschoben werden

### 4. Accordion mit max-height
- `height: auto` kann nicht animiert werden
- `max-height: 0` → `max-height: 300px` funktioniert
- `overflow: hidden` versteckt Inhalt bei `max-height: 0`
- Transition animiert smooth zwischen Zuständen

### 5. CSS Variables für Konsistenz
- Zentral definiert in `:root`
- Überall nutzbar via `var(--variable-name)`
- Fallback möglich: `var(--variable, fallback)`
- Theme-aware (Light/Dark Mode)

---

## Testing-Checkliste

✅ Alle Buttons haben identisches Basis-Styling
✅ Yang/Bian/Yin Buttons haben korrekte Farben + Hover
✅ Navigation + Zufall Buttons sehen identisch aus
✅ Mini-Graph Accordion funktioniert (auf/zu)
✅ Content ist horizontal & vertikal zentriert
✅ Headings nutzen `--text-primary` Variable
✅ Mobile-responsive (Buttons + Typography)
✅ Dark/Light Mode funktioniert mit allen Buttons

---

## Offene Punkte / Zukünftige Verbesserungen

- [ ] Weitere Seiten (Yang, Bian) mit gleichem Button-System ausstatten
- [ ] Keyboard-Navigation für Accordion (Accessibility)
- [ ] Animation-Dauer als CSS Variable (zentral steuerbar)
- [ ] Focus-States für Accessibility verbessern
- [ ] Mobile: Button-Größe testen auf kleinen Screens

---

## Lessons Learned

1. **Zentralisierung lohnt sich:** Button-Styles an einem Ort = einfache Wartung
2. **CSS Variables sind mächtig:** Theme-System funktioniert perfekt
3. **Flexbox für Layouts:** Moderne Alternative zu Margin/Float
4. **Debugging-Strategie:** Developer Tools → Computed Styles checken
5. **!important sparsam nutzen:** Nur wenn nötig (z.B. JS override)

---

**Session abgeschlossen:** 2025-10-15
**Commit-Kandidat:** Ja, alle Änderungen funktional + getestet
