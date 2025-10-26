# Adaptives Bild-Styling System

## Konzept

Ein System für automatische Bild-Stile basierend auf User-Präferenzen und Kontext.

**Ziel:** Bilder passen sich an Stimmung/Situation an, ohne dass User manuell Filter wählen muss.

---

## 3 Intensitäts-Level

### 1. Ruhig (Subtle)
- **Wann:** Morgens, bei Fokus-Arbeit, beim Lesen
- **Effekte:** 
  - Leichte Entsättigung (-20%)
  - Warme Töne betonen
  - Soft Blur am Rand (vignette)
  
```css
filter: saturate(0.8) contrast(0.9) brightness(1.1);
```

### 2. Mittel (Balanced)
- **Wann:** Normal, Standard-Nutzung
- **Effekte:**
  - Originalbild mit leichten Anpassungen
  - Kontrast +10%
  
```css
filter: saturate(1.0) contrast(1.1);
```

### 3. Wild (Intense)
- **Wann:** Kreativ-Modus, Inspiration suchen, Abends
- **Effekte:**
  - Sättigung +30%
  - Hoher Kontrast
  - Farb-Shifts möglich
  
```css
filter: saturate(1.3) contrast(1.3) hue-rotate(10deg);
```

---

## Kategorien für Stil-Variationen

### Alt vs. Neu
- **Alt:** Sepia, Vintage, vergilbt
- **Neu:** Knackig, scharf, modern

### Warm vs. Kühl
- **Warm:** Orange/Gelb betonen, gemütlich
- **Kühl:** Blau betonen, fokussiert

### Hell vs. Dunkel
- **Hell:** Brightness erhöht, luftig
- **Dunkel:** Gedämpft, dramatisch

---

## Entscheidungs-Baum

```
User-Kontext
├─ Tageszeit
│  ├─ Morgen (06-10h) → Warm + Ruhig
│  ├─ Tag (10-18h) → Balanced
│  └─ Abend (18-22h) → Kühl + Wild
│
├─ Aktivität
│  ├─ Arbeit → Kühl + Ruhig
│  ├─ Kreativ → Warm + Wild
│  └─ Entspannung → Warm + Ruhig
│
└─ Zyklus (bei dir relevant!)
   ├─ Energie-Phase → Hell + Wild
   ├─ Neutral → Balanced
   └─ Ruhe-Phase → Dunkel + Ruhig
```

**Kombinationen:** 3 Intensitäten × 8 Kategorien = **24 mögliche Stil-Variationen**

---

## CSS Filter Beispiele

### Vintage (Alt + Warm)
```css
.img-style-vintage {
  filter: sepia(0.5) saturate(0.7) contrast(1.1);
}
```

### Neon (Neu + Wild)
```css
.img-style-neon {
  filter: saturate(1.5) contrast(1.4) brightness(1.2) hue-rotate(15deg);
}
```

### Monochrom (Kühl + Ruhig)
```css
.img-style-mono {
  filter: grayscale(0.8) contrast(1.1) brightness(1.05);
}
```

### Dramatisch (Dunkel + Wild)
```css
.img-style-dramatic {
  filter: brightness(0.7) contrast(1.5) saturate(1.2);
}
```

---

## Anwendung: Bier-Adventskalender

**Idee:** Jeden Tag anderer Stil für Bier-Foto

### Woche 1: Vintage Journey
- Tag 1: Sepia + leicht vergilbt
- Tag 2: Sepia + stärker vergilbt
- Tag 3: Vintage mit Vignette
- ...

### Woche 2: Modern Minimalist
- Tag 8: Monochrom
- Tag 9: Monochrom + hoher Kontrast
- ...

### Woche 3: Wild & Kreativ
- Tag 15: Neon
- Tag 16: Psychedelisch (hue-rotate)
- ...

### Woche 4: Besinnlich
- Tag 22: Warm + gedämpft
- Tag 23: Weihnachtlich (rot betonen)
- Tag 24: Gold-Effekt

**Automatisierung:** Script generiert alle 24 Bilder mit verschiedenen Filtern

---

## Implementation

### JavaScript Auto-Style
```javascript
function getImageStyle() {
  const hour = new Date().getHours();
  const isCreativeMode = localStorage.getItem('mode') === 'creative';
  
  if (hour < 10) {
    return 'warm-subtle';
  } else if (isCreativeMode) {
    return 'wild-saturated';
  } else {
    return 'balanced';
  }
}

// Apply style
document.querySelectorAll('.adaptive-img').forEach(img => {
  img.classList.add(getImageStyle());
});
```

### CSS Classes
```css
.warm-subtle { filter: saturate(0.9) brightness(1.1) hue-rotate(-10deg); }
.balanced { filter: saturate(1.0) contrast(1.1); }
.wild-saturated { filter: saturate(1.4) contrast(1.3) brightness(1.1); }
```

---

## Erweiterungen

### User-Override
- Slider für Intensität (0-100%)
- Toggle zwischen Auto/Manual
- Favoriten speichern

### KI-basiert (später)
- Bildinhalt erkennen (Landschaft = kühl, Portrait = warm)
- Stimmungs-Erkennung aus Text (fröhlich = hell, ernst = dunkel)
- Learning: Welche Styles nutzt User am meisten?

---

## Offene Fragen

- Wie User-Präferenz dauerhaft speichern? (localStorage vs. Backend)
- Soll System lernen? (Nutzungs-Tracking)
- Extremer Stil-Wechsel verwirrend? (Sanfte Transitions?)

---

**Status:** Konzept fertig, Implementation offen  
**Nächster Schritt:** Prototyp mit 3 Styles testen  
**Use Cases:** Dashboard-Backgrounds, Adventskalender, Mood-Boards

---

_Erstellt: 2025-10-24_  
_Projekt: H2me_  
_Bereich: Bian (Konzept)_
