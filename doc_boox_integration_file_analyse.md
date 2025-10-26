# File-Analyse - Boox Integration

**Datum:** 2025-10-26

---

## 📄 PDF: ya_H2_me.pdf

### Technische Daten
- **Seiten:** 6
- **Größe:** 2.55 MB
- **Format:** 1860 x 2480 pts (Portrait, 3:4 Ratio)
- **Erstellt:** 1. Okt 2025, 11:38
- **Autor:** BOOX
- **Producer:** NeoPdf (Boox-eigenes PDF-System)

### Struktur
- **Text-Layer:** ❌ NICHT vorhanden
- **Inhalt:** Rein visuell (handgezeichnete Skizzen)
- **Hintergrund:** Dot Grid (punktiertes Raster)
- **Handschrift:** Schweizerdeutsch, verschiedene Farben (blau, rot)

### Inhalt (visuell analysiert)
**Seite 1:** Leer (nur Dot Grid)

**Seite 2:** 
- Datum: "050925" (5. Sept 2025)
- Skizze: Tablet/Screen mit Grid
- Notizen über "Häkualuuue zu aktudustroff"
- Kreis mit Pfeil "dortadeleb"
- Text: "coalla go baumcothy noh k ueh werdt geg"

**Seite 3:**
- Titel: "H² me mobile"
- Ähnliche Tablet-Skizze wie Seite 2
- Mehrere Kreise mit rotem Outline
- Notizen über Verbindungen
- Text: "Vorbindung ?!"

**Seite 4:**
- Frage: "wie Potbedi di?"
- Liste:
  - länge
  - verstrit
  - hung
  - wou sa me
  - woach wma
  - vid terveien mensche pulle zyklus

**Seite 5:**
- Titel: "S V" / "SMART VISU"
- Frage: "was för sinn?"
- Notiz: "die suu seg woo uas git"
- Datum: "240825"
- Großer Text: "BEDÜRFNIS"
- Kategorien:
  - chaos + QRSIG
  - detail + ÜBERSICHT
  - mensche + HE
  - ins + UJOE

**Seite 6:**
- Titel: "PRIORISIERE"
- Text: "de coaui hu achaft bi"
- Große Begriffe:
  - genau lesen
  - HER
  - hilff
- Notiz: "wett s hifl s unungstübell noh"

### Keywords erkannt
- H2_me, mobile
- Dashboard-Konzepte
- Priorisierung
- Bedürfnisse
- Visualisierung (VISU)
- Tablet/Screen-Skizzen

### Projekt-Zuordnung
- **Klar:** 153_H2me (mehrfach erwähnt: "H² me", "H2_me")
- **Möglich:** Dashboard-Entwicklung, UX-Konzepte

---

## 🖼️ PNG: 20251024_1.png

### Technische Daten
- **Größe:** 1728 x 1359 px (Landscape, 1.27 Ratio)
- **Format:** WEBP (trotz .png Extension)
- **Dateigröße:** 59.5 KB (sehr kompakt!)
- **Modus:** RGB
- **Datum (aus Filename):** 24. Okt 2025

### Struktur
- **Hintergrund:** Weiß/Hell
- **Handschrift:** Schwarz, klar lesbar
- **Layout:** Todo-Liste / Notizen

### Inhalt (visuell analysiert)
**Oben rechts:** 
- "FERIE" (Ferien)
- Zahlen: "2008", "2310"

**Links:**
- "SUORCHE" (Suche/Search)
- "Atbe" (Arbeit)
- "git installiere" 
- "Pot web mode"

**Rechts (Bullet-Liste):**
- "H8 REdoleled"
- "Lasenachlauen."
- "Maef?"
- "HAUBERLINES adi auedte"
- "Degychelt"

### Keywords erkannt
- Git installieren (Tech-Task)
- Web mode
- H8, HAUBERLINES (Projekt-Referenzen?)
- Ferien-Planung

### Projekt-Zuordnung
- **Gemischt:** Persönliche Tasks + Tech-Tasks
- **Möglich:** 153_H2me (wenn "H8" = "H2" Tippfehler)

---

## Vergleich & Erkenntnisse

### Format-Unterschiede
| Eigenschaft | PDF (Notizen) | PNG (Kalender) |
|-------------|---------------|----------------|
| Dateigröße | 2.55 MB | 60 KB |
| Seiten | 6 | 1 |
| Ratio | Portrait (0.75) | Landscape (1.27) |
| Hintergrund | Dot Grid | Weiß |
| Struktur | Skizzen + Text | Text-Liste |

### OCR-Herausforderungen

**PDF (Schwieriger):**
- Mehrfarbig (blau/rot)
- Dot Grid Hintergrund (Störung)
- Skizzen + Text gemischt
- Schweizerdeutsch
- Verschiedene Handschriften
- Teilweise unleserlich

**PNG (Einfacher):**
- Einfarbig (schwarz auf weiß)
- Klarer Hintergrund
- Nur Text
- Besser lesbar
- Kleiner = schneller OCR

### Pipeline-Implikationen

**PDF-Pipeline:**
```
PDF (2.5 MB)
  ↓
[PDF zu Bilder] 6 Seiten × ~400KB = 2.4 MB Bilder
  ↓
[OCR pro Seite] 6× OCR-Call
  ↓
[Post-Processing] Dot Grid entfernen, Farben separieren
  ↓
[Text aggregieren]
```
**Zeit-Schätzung:** ~2-3 Min pro PDF

**PNG-Pipeline:**
```
PNG (60 KB)
  ↓
[Direkt OCR] 1× OCR-Call
  ↓
[Text extrahieren]
```
**Zeit-Schätzung:** ~10-20 Sek pro PNG

---

## OCR-Engine Empfehlung

### Für PDFs (komplex):
**Option 1: Google Vision API** (Cloud)
- ✅ Sehr gut mit Handschrift
- ✅ Mehrsprachen (DE/Schweizerdeutsch)
- ✅ Farb-Separation
- ❌ Kosten (~$1.50 per 1000 Seiten)
- ❌ Internet nötig

**Option 2: Azure Document Intelligence** (Cloud)
- ✅ Spezialisiert auf Handschrift
- ✅ Layout-Erkennung
- ❌ Kosten (~$1.50 per 1000 Seiten)
- ❌ Internet nötig

**Option 3: Tesseract + Vorverarbeitung** (Lokal)
- ✅ Kostenlos
- ✅ Offline
- ❌ Schlechtere Qualität bei Handschrift
- ❌ Viel Vorverarbeitung nötig

### Für PNGs (einfacher):
**Tesseract reicht!**
- ✅ Kostenlos
- ✅ Offline
- ✅ Schnell
- ✅ Gut genug für klaren Text

---

## Metadaten-Extraktion

### Aus Filename
**PDF:** `ya_H2_me.pdf`
```yaml
category: ya (Yang)
theme: H2_me
project: 153_H2me
type: notizen
```

**PNG:** `20251024_1.png`
```yaml
date: 2025-10-24
page: 1
type: kalender
```

### Aus PDF-Metadaten
```yaml
author: BOOX
created: 2025-10-01 11:38
producer: NeoPdf
title: ya_H2_me
```

### Aus OCR (nach Verarbeitung)
```yaml
keywords: [H2, mobile, dashboard, priorisierung, bedürfnis, visu]
projects: [153_H2me]
languages: [de-CH, schweizerdeutsch]
handwriting_types: [standard, schnell]  # TBD: Wie erkennen?
```

---

## Companion-File Format (Vorschlag)

### `ya_H2_me.meta.yaml`
```yaml
# File-Info
filename: ya_H2_me.pdf
original_path: E:\Neuanfang\b_bian\ya_Toughs\ya_H2_me\ya_H2_me.pdf
imported: 2025-10-26T12:00:00

# Metadaten
category: ya
theme: H2_me
type: notizen
pages: 6
size_mb: 2.55

# OCR-Ergebnis
ocr_engine: google_vision
ocr_date: 2025-10-26T12:05:00
ocr_confidence: 0.75
text_length: 456

# Extrahierte Infos
keywords:
  - H2_me
  - mobile
  - dashboard
  - priorisierung
  - bedürfnis
  - visualisierung

projects:
  - 153_H2me

dates_found:
  - 2025-09-05
  - 2025-08-24

# Verlinkung
linked_to:
  - type: project
    id: 153_H2me
    confidence: high
  
# Dashboard
thumbnail: ya_H2_me_thumb.png
preview_page: 2  # Beste Seite für Preview

# Status
status: processed
reviewed: false
```

---

## Nächste Schritte

1. **OCR-Engine wählen**
   - Hybrid-Ansatz? (Tesseract für PNGs, Cloud für PDFs)
   - Kosten-Nutzen abwägen

2. **Prototyp bauen**
   - Erst mit einem PDF + einem PNG testen
   - Pipeline durchlaufen lassen
   - Qualität bewerten

3. **Metadaten-Format finalisieren**
   - YAML vs. JSON?
   - Welche Felder wirklich nötig?

4. **Dashboard-Integration planen**
   - Wie Cards aussehen sollen
   - Thumbnail-Generierung
   - Suche implementieren

---

## Erkenntnisse

### ✅ Positiv
1. **Konsistente Formate:** PDFs und PNGs haben klare Struktur
2. **Gute Metadaten:** Filename + PDF-Metadata geben viel Info
3. **OCR machbar:** Beide Formate OCR-bar (PNGs einfacher)
4. **Keywords erkennbar:** Projekt-Zuordnung automatisierbar
5. **Kompakte Kalender:** PNGs sehr klein, schnell verarbeitbar

### ⚠️ Herausforderungen
1. **Schweizerdeutsch:** OCR könnte Probleme haben
2. **Handschrift variabel:** Verschiedene Stile schwierig
3. **Dot Grid:** Stört OCR, muss gefiltert werden
4. **Mehrfarbig:** Farb-Separation nötig für beste Qualität
5. **Große PDFs:** 2.5 MB × 20 = 50 MB Gesamt-Daten

### 💡 Empfehlungen
1. **Hybrid-OCR:** Cloud für PDFs, Lokal für PNGs
2. **Batch-Verarbeitung:** Nicht alle auf einmal (zu langsam)
3. **Review-Workflow:** OCR-Ergebnisse reviewen lassen
4. **Thumbnail-First:** Generiere Thumbnails zuerst für schnellen Dashboard-Load
5. **Progressive Enhancement:** Starte simpel, füge Features hinzu

