# Dark/Light Mode Implementation Log

**Datum:** 2025-10-15  
**Zeit:** 07:17  
**Projekt:** H2me Website (h2m.art)

---

## Übersicht

Dark/Light Mode erfolgreich implementiert mit CSS Variables System, Floating Toggle Button und localStorage-Persistenz.

---

## Was wurde gemacht

### 1. CSS Variables System (`shared-global.css`)

**Light Mode (Standard):**
- Background: `#FFFAED` (beige)
- Text Primary: `#aa7878` (rosa)
- Text Secondary: `#8b6666` (dunkler rosa)
- Accent-Farben: Yang/Bian/Yin mit 0.4 Opacity

**Dark Mode:**
- Background: `#1a1a1a` (dunkel)
- Text Primary: `#d4a5a5` (heller rosa)
- Text Secondary: `#b89090` (rosa-grau)
- Accent-Farben: Yang/Bian/Yin mit 0.6 Opacity (intensiver)

**Transitions:**
- Smooth fade: `0.3s ease` für Background und Text
- Kein abrupter Wechsel

### 2. Floating Toggle Button

**Position & Style:**
- Fixed rechts unten (`bottom: 20px, right: 20px`)
- Runder Button (50px × 50px)
- Background: `var(--text-primary)` (passt sich Theme an)
- Border: `2px solid var(--bg-primary)`
- Z-Index: 1000 (immer sichtbar)

**Icons:**
- Light Mode: 🌙 (zum Dark wechseln)
- Dark Mode: ☀️ (zum Light wechseln)
- Icon-Wechsel mit opacity transitions

**Hover-Effekte:**
- Scale: 1.1
- Rotate: 15deg
- Shadow intensiviert sich

**Active-State:**
- Scale: 0.95 (Button-Feedback)

### 3. JavaScript (`shared-theme.js`)

**Funktionen:**
- `initTheme()` - Lädt gespeichertes Theme oder System-Präferenz
- `applyTheme(theme)` - Setzt Theme (data-attribute + localStorage)
- `createThemeToggle()` - Erstellt Button dynamisch

**localStorage:**
- Key: `'theme'`
- Values: `'light'` oder `'dark'`
- Persistiert über Page-Reloads

**System-Präferenz:**
- `window.matchMedia('(prefers-color-scheme: dark)')`
- Wird nur genutzt wenn noch kein Theme gespeichert

### 4. Integration in alle Seiten

**HTML-Seiten aktualisiert:**
1. `index.html` - Landing Page
2. `page-yang.html` - Yang Bereich
3. `page-bian.html` - Bian Bereich
4. `page-yin.html` - Yin Bereich (mit Representation Switcher)
5. `page-cytoscape.html` - Graph Visualisierung
6. `page-flsdgrm.html` - Mermaid Diagram
7. `page-graph.html` - Main Graph
8. `page-3dmodel.html` - 3D Model Viewer

**Änderung pro Seite:**
```html
<script src="shared-theme.js"></script>
```
Eingefügt vor allen anderen `<script>`-Tags (aber nach externen Libraries).

---

## Technische Details

### CSS Variables Pattern

```css
:root {
    --bg-primary: #FFFAED;
    --text-primary: #aa7878;
}

[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --text-primary: #d4a5a5;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Toggle Button HTML Structure

```html
<button class="theme-toggle" aria-label="Theme wechseln">
    <span class="sun-icon icon">☀️</span>
    <span class="moon-icon icon">🌙</span>
</button>
```

**Icon Visibility Logic:**
- Light Mode: `.sun-icon { opacity: 0 }` + `.moon-icon { opacity: 1 }`
- Dark Mode: `.sun-icon { opacity: 1 }` + `.moon-icon { opacity: 0 }`

### JavaScript Event Flow

1. **Page Load:**
   - `DOMContentLoaded` Event feuert
   - `initTheme()` läuft
   - Theme wird aus localStorage geladen (oder System-Präferenz)
   - Theme wird angewendet via `applyTheme()`
   - Toggle Button wird erstellt via `createThemeToggle()`

2. **User Click:**
   - Click Event auf `.theme-toggle`
   - Aktuelles Theme auslesen (`data-theme` Attribut)
   - Theme togglen (light ↔ dark)
   - Neues Theme anwenden via `applyTheme()`
   - localStorage wird aktualisiert

---

## Testing

### Lokal getestet:
- ✅ `index.html` - Theme-Wechsel funktioniert
- ✅ Toggle Button erscheint rechts unten
- ✅ Icons wechseln korrekt (🌙 ↔ ☀️)
- ✅ Smooth fade transition
- ✅ localStorage-Persistenz (Theme bleibt nach Reload)
- ✅ Andere Seiten (`page-yang.html`, etc.) - Toggle überall sichtbar

### Noch zu testen (nach Deploy):
- [ ] Funktioniert auf h2m.art online?
- [ ] Mobile-Ansicht (Nothing Phone 3)?
- [ ] Cross-Browser (Chrome, Firefox, Safari)?

---

## Nächste Schritte

### Vor Deploy:
1. **Alle Seiten lokal durchklicken** - Toggle auf jeder Seite testen
2. **Navigation testen** - Theme bleibt beim Seitenwechsel erhalten?
3. **Console checken** - Keine JavaScript-Errors?

### Nach Deploy:
1. **Online-Test** auf h2m.art
2. **Mobile-Test** (Nothing Phone 3)
3. **Cross-Browser-Test**

### Zukünftige Verbesserungen (optional):
- [ ] Mehr Theme-Varianten (nicht nur Dark/Light)?
- [ ] Theme-Picker (mehrere Farbschemata)?
- [ ] Animation beim Toggle (rotate icon during transition)?
- [ ] Keyboard-Support (Taste für Theme-Wechsel)?

---

## Files geändert

### Neu erstellt:
- `shared-theme.js` - Theme-Switcher JavaScript

### Modifiziert:
- `shared-global.css` - CSS Variables + Toggle Button Styling
- `index.html` - Script-Tag hinzugefügt
- `page-yang.html` - Script-Tag hinzugefügt
- `page-bian.html` - Script-Tag hinzugefügt
- `page-yin.html` - Script-Tag hinzugefügt
- `page-cytoscape.html` - Script-Tag hinzugefügt
- `page-flsdgrm.html` - Script-Tag hinzugefügt
- `page-graph.html` - Script-Tag hinzugefügt
- `page-3dmodel.html` - Script-Tag hinzugefügt

---

## Notizen

- **User-Präferenz:** Floating Button rechts unten
- **Farben:** Neutral gewählt (können später angepasst werden)
- **Fade-Transition:** 0.3s (nicht zu schnell, nicht zu langsam)
- **localStorage:** Funktioniert nur bei HTTPS oder localhost (nicht bei file://)

---

**Status:** ✅ Implementierung abgeschlossen, lokal getestet  
**Nächster Schritt:** Styling-Anpassungen (Farben, Schriften) zusammen mit User
