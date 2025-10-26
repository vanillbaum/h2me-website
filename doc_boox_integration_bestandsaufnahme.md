# Bestandsaufnahme - Boox Integration

**Datum:** 2025-10-26
**Status:** Analyse läuft

---

## Datenquellen

### 1. Notizen/Thoughts (PDFs)
**Speicherort:** `E:\Neuanfang\b_bian\ya_Toughs\`

**Struktur:**
```
ya_Toughs\
├── [ordner_name]\
│   └── [ordner_name].pdf    ← Ziel-File
```

**Beispiele gefunden:**
- `ya_H2_me\ya_H2_me.pdf` (2.7 MB, 1 Okt 2025)
- `2025-07_w31_bian\2025-07_w31_bian.pdf`
- `bi_raumzeit_VISU\bi_raumzeit_VISU.pdf`

**Patterns erkannt:**
1. **Projekt-basiert:** `[ya/bi/yi]_[Thema]_[optional]`
2. **Wochen-basiert:** `YYYY-MM_wWW_[kategorie]`

**Anzahl:** ~20 Notizbücher à 1-70 Seiten

---

### 2. Kalender (PNGs)
**Speicherort:** `E:\Neuanfang\b_bian\bi_Logs\2025\`

**Struktur:**
```
2025\
├── YYYYMMDD\
│   ├── YYYYMMDD\
│   │   ├── YYYYMMDD_1.png
│   │   ├── YYYYMMDD_2.png (optional)
│   │   └── ...
```

**Beispiele gefunden:**
- `20251024\20251024\20251024_1.png` (110 KB, 24 Okt 2025)
- `20251025\20251025\20251025_1.png`

**Pattern:** `YYYYMMDD_[Nr].png`
- `_1` = Erste Seite
- `_2` = Zweite Seite (falls vorhanden)

**Anzahl:** Täglich, teilweise mehrere PNGs pro Tag

---

## Verschachtelte Ordner-Struktur

**Problem:** Boox erstellt doppelt verschachtelte Ordner
**Lösung:** Später flach machen (Feature-Request)

**Beispiel aktuell:**
```
ya_H2_me\
  ya_H2_me\       ← Doppelte Verschachtelung
    ya_H2_me.pdf
```

**Gewünscht (später):**
```
ya_H2_me.pdf     ← Direkt
```

---

## Weitere Files gefunden (nicht Boox)

**In ya_Toughs\:** Viele andere Files:
- `.afdesign` (Affinity Designer)
- `.blend` (Blender 3D)
- `.png` (Exports)

**Für Import-Tool:** IGNORIEREN
- Nur `.pdf` in Unterordnern
- Nur `.png` in bi_Logs\2025\

---

## Naming-Hierarchie (zusätzlich entdeckt)

**Files nutzen auch:**
- `NANO_` - Sehr kleine Skizzen
- `MIKRO_` - Kleine Notizen
- `MESO_` - Mittlere Dokumente
- `MAKRO_` - Große Übersichten

**Beispiele:**
- `2025-04-16_MIKRO_viel anders ztue.png`
- `2025-04-26_MESO_ph2 uebersicht.png`
- `2025-04-25_MAKRO_.png`

**Für Import:** Diese sind keine Boox-PDFs, sondern Exports!

---

## Import-Filter (Klarstellung)

### Was IMPORTIEREN:
✅ PDFs in `ya_Toughs\*\*.pdf`
✅ PNGs in `bi_Logs\2025\*\*\*.png`

### Was IGNORIEREN:
❌ `.afdesign`, `.blend`, `.mkv` Files
❌ PNGs außerhalb von bi_Logs\2025\
❌ Files direkt in ya_Toughs\ (nur Unterordner)

---

## Metadaten aus Filenames extrahieren

### Notizen-PDFs
**Pattern 1:** `ya_H2_me.pdf`
- Kategorie: `ya` (Yang)
- Thema: `H2_me`
- Projekt: 153_H2me (erkennbar)

**Pattern 2:** `2025-07_w31_bian.pdf`
- Datum: 2025-07 (Juli)
- Woche: 31
- Kategorie: `bian`

### Kalender-PNGs
**Pattern:** `20251024_1.png`
- Datum: 2025-10-24
- Seite: 1

---

## Pipeline-Schritte (Entwurf)

### Phase 1: Import
```
Ordner scannen
  ↓
Neue Files finden (PDF/PNG)
  ↓
Filename parsen
  ↓
Metadaten extrahieren
  ↓
In Verarbeitungs-Queue
```

### Phase 2: OCR
```
PDF → Einzelne Seiten (PNG)
  ↓
OCR pro Seite
  ↓
Text aggregieren
  ↓
Keywords extrahieren
```

### Phase 3: Verlinkung
```
Keywords analysieren
  ↓
Projekt-Nummern finden (153_, 610_, etc.)
  ↓
Zuordnung vorschlagen
  ↓
Companion-File erstellen
```

### Phase 4: Dashboard
```
Thumbnail generieren
  ↓
Card erstellen
  ↓
Feed aktualisieren
  ↓
Multi-Dashboard sync
```

---

## Nächste Schritte

- [ ] PDF analysieren (Seitenzahl, Struktur, Text-Layer?)
- [ ] PNG analysieren (Handschrift-Qualität, OCR-Test)
- [ ] OCR-Engine wählen (Tesseract vs. Cloud)
- [ ] Metadaten-Format definieren
- [ ] Import-Script Prototyp

---

**Erkenntnisse:**
1. Struktur ist sehr konsistent (gut!)
2. Zwei separate Pipelines nötig (Notizen vs. Kalender)
3. Verschachtelte Ordner müssen behandelt werden
4. Viele andere Files → brauchen Filter
5. Naming gibt viel Metadaten her (Kategorie, Datum, Thema)

