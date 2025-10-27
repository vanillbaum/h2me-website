# Boox Annotation System - Quick Start

**Projekt:** 023_bildverwaltung → Boox Annotation Tool  
**Status:** PoC funktioniert, bereit für Finalisierung  
**Nächster Meilenstein:** Produktiv nutzbares Browser-Tool (2-3h)

---

## 🎯 Was ist das?

Ein **manuelles Annotations-System** für Boox-PDFs und PNGs:
- PDFs/Bilder als Canvas-Hintergrund laden
- Bereiche markieren (Rechteck, Kreis, Text)
- Notizen, Tags, Datum, Verknüpfungen anhängen
- JSON-Export für Integration mit anderen Tools

**Philosophie:** Manuelle Annotation = 100% Genauigkeit + voller Kontext (vs. Auto-OCR = 60-85% Genauigkeit)

---

## 📁 File-Struktur

```
023_bildverwaltung/
├── poc-boox-annotation.html          # ✅ Funktionierender PoC (70% fertig)
├── doc_boox_readme.md                # 📍 DU BIST HIER - Start hier!
├── doc_boox_context.md               # Hintergrund & Design-Entscheidungen
├── doc_boox_tasks.md                 # Actionable Todo-Liste
├── doc_boox_roadmap_annotation.md    # Detaillierte Roadmap (4 Phasen)
└── board-app/                        # Tauri-App Basis (70-80% wiederverwendbar)
```

---

## 🚀 Quick Start für Claude Code

### 1. Aktueller Status verstehen
```bash
# PoC im Browser öffnen und testen:
# - Datei → poc-boox-annotation.html im Browser öffnen
# - PDF hochladen (Test-PDF bereitstellen)
# - Rechteck zeichnen, Rechtsklick → Notiz hinzufügen
# - Funktioniert bereits!
```

**Was funktioniert bereits:**
- ✅ PDF/PNG Loading
- ✅ Konva.js Layer über Document
- ✅ Tools: Rechteck, Kreis, Text
- ✅ Annotation-Panel (Note, Tags, Date)
- ✅ LocalStorage Speicherung
- ✅ JSON-Export

**Was fehlt noch (2-3h):**
- ❌ Multi-Page Navigation (Vor/Zurück für PDFs)
- ❌ Related-Links Field im Annotation-Panel
- ❌ Keyboard Shortcuts (Esc, Ctrl+S)
- ❌ Loading-States & UX-Polish
- ❌ Testing mit echten Boox-Daten

### 2. Nächste Schritte
→ Siehe `doc_boox_tasks.md` für priorisierte Todo-Liste

### 3. Kontext verstehen
→ Siehe `doc_boox_context.md` für Design-Rationale

### 4. Langfristige Planung
→ Siehe `doc_boox_roadmap_annotation.md` für vollständige Roadmap (Phase 1-4)

---

## 🛠️ Tech Stack

**Aktuell (PoC):**
- Vanilla HTML/CSS/JS
- PDF.js 3.11.174 (PDF-Rendering)
- Konva.js 9.2.0 (Canvas-Layer für Annotations)
- LocalStorage (Persistence)

**Später (Tauri-App):**
- React + TypeScript
- Tauri (Desktop-App)
- Rust Backend (File-System-Zugriff)
- PDF.js (gleich wie PoC)
- Konva.js (gleich wie PoC)

---

## 📊 Entwicklungs-Strategie

**Hybrid-Ansatz (empfohlen):**

1. **PoC fertigstellen** (2-3h) ← **JETZT**
   - Multi-Page Navigation
   - Related-Links
   - UX-Polish
   - Testing mit echten Daten

2. **Real-World Validation** (1 Woche)
   - Mit echten Boox-Daten arbeiten
   - Workflow validieren
   - Feedback sammeln

3. **Tauri-Migration** (4-6h, später)
   - Nur wenn PoC sich bewährt
   - Document-Browser hinzufügen
   - Desktop-App Vorteile nutzen

**Warum dieser Ansatz?**
- PoC ist zu 70% fertig - schnell zum Ziel
- Validiert Konzept vor großem Refactoring
- Falls Workflow nicht passt → wenig Zeit verloren

---

## 🎯 Aufwands-Übersicht

| Phase | Status | Aufwand |
|-------|--------|---------|
| **PoC Finalisierung** | In Arbeit | 2-3h |
| Validation | Wartet | 1 Woche |
| Tauri-Migration | Geplant | 4-6h |
| H2me Integration | Optional | 8-12h |

**Gesamt bis produktiv nutzbar:** 2-3h  
**Gesamt bis vollständige Desktop-App:** 11-16h

---

## 📝 Wichtige Design-Entscheidungen

1. **Manuell statt Auto-OCR**
   - Grund: 100% Genauigkeit vs. 60-85%
   - Trade-off: Zeit vs. Qualität
   - Details: Siehe `doc_boox_context.md`

2. **Browser-PoC zuerst**
   - Grund: Schnelle Validation (2-3h vs. 6-10h)
   - Trade-off: Keine Document-Browser Features
   - Migration zu Tauri später möglich

3. **JSON-basierte Metadaten**
   - Grund: Flexibel, erweiterbar, Tool-agnostisch
   - Format: Siehe `doc_boox_roadmap_annotation.md` → JSON-Schema

---

## 🔗 Navigation zwischen Docs

- **Ich will loslegen:** → `doc_boox_tasks.md`
- **Ich will Kontext:** → `doc_boox_context.md`
- **Ich will Details:** → `doc_boox_roadmap_annotation.md`
- **Ich will Code sehen:** → `poc-boox-annotation.html`

---

## ❓ Offene Fragen (zu klären)

1. **Boox-Daten Speicherort?**
   - Wo liegen PDFs? (E:\Boox\...?)
   - Wo liegen PNGs? (täglich?)
   - Wie organisiert? (nach Monat? nach Typ?)

2. **Metadaten-Speicherung?**
   - Companion-Files (`*.pdf.annotations.json`) oder
   - Zentraler Ordner (`boox_metadata/*.json`)?

3. **H2me Integration?**
   - Sofort oder später?
   - Welche Features priorisiert?

---

## 🚦 Status-Legende

- ✅ **Fertig** - Funktioniert und getestet
- 🔄 **In Arbeit** - Wird gerade entwickelt
- ⏳ **Geplant** - Auf Roadmap, noch nicht gestartet
- ❌ **Fehlt** - Bekannte Lücke, muss noch gemacht werden
- 🔍 **Zu klären** - Offene Frage, Entscheidung nötig

---

**Letzte Aktualisierung:** 2025-10-27  
**Erstellt für:** Claude Code Terminal-Workflow
