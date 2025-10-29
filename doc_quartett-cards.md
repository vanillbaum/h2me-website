# Quartett-Cards für H2me

## Idee

Seitenübersicht in Art von Quartettspielkarten - gamelike Navigation, visuell ansprechend, informativ.

## Stil-Referenz

Orientiert an **Kochbuch-PDF** (661_GEBI_Chochbuech_dani_40gi_2021-10-10.pdf):
- Große, fette Titel
- Kleine graue Kategorien oben
- Mix: Illustration + Icons
- Rot als Akzentfarbe
- Schwarz/Weiß/Grau Basis
- Einfache schwarze Icons
- Klare Sektionen
- Playful aber erwachsen

## Informationen auf Karten

**Quelle:** Obsidian-Namensstruktur & Metadata
- Nummer (z.B. 153, 240, 241)
- Codewort (z.B. BOAT, TYP, VENN)
- Ordner (z.B. ii_Wiki, a5_traeumend)
- Verbindungen (Up::, Sister::, Prev::, Next::)
- Datum (Erstellt, Geändert)
- Tags
- Bereich (Yang/Bian/Yin)
- Status (Live, Beta, Geplant, a1-a5)

**Nicht:** Technische Details (Technologie, Dependencies) - Fokus auf **inhaltliche** Infos.

## Entwicklungs-Iterationen

**v1: Classic** (`style-card-v1-classic.html`)
- Erste Annäherung an Quartett-Format
- Basis-Layout mit Eigenschaften
- Test mit Cytoscape-Page

**v2: Varianten** (`style-card-v2-varianten.html`)
- 4 verschiedene Design-Ansätze
- Kochbuch-Stil am nächsten an Referenz
- Test mit Wiki-File (241_TYP)

**v3: Verbindungen** (`style-card-v3-verbindungen.html`)
- Sister-Badge prominent
- Verbindungs-Sektion unten
- Side-by-Side Visualisierung
- Test mit VENN-File (240)

**v4: Detailliert** (`style-card-v4-detailliert.html`)
- Erwachsenen-Quartett mit mehr Infos
- Verschiedene File-Typen:
  - BOAT (a5_traeumend)
  - HTML-Page (H2me)
  - DOT (ii_Dots)
  - LOG (bi_Logs)
  - TASK (a_yang)
- Statistiken, Tags, Fortschrittsbalken
- 360x540px Format

**v5: Kreativ mit Icons** (`style-card-v5-icons.html`) ⭐
- Individuelle einfarbige SVG-Icons pro Typ:
  - BOAT → Rakete 🚀
  - HTML → Browser-Fenster 🌐
  - DOT → Buch 📖
  - LOG → Kalender 📅
  - TASK → Checkbox ✓
  - WIKI → Gehirn/Neuron 🧠
- Kreative Layouts (gerundet, diagonal, asymmetrisch)
- Floating Badges & Overlays
- Pattern im Hintergrund
- Farbcodiert nach Typ

## File-Typ Templates

**BOAT-Karte:**
- Lila Gradient
- Geschätzte Zeit prominent
- Status (a1-a5)
- Fortschrittsbalken
- Technologie-Tags

**HTML-Page-Karte:**
- Rot
- Code-Statistiken (Zeilen, Dependencies, Größe)
- Features-Liste
- Status-Badge (LIVE/Beta)

**DOT-Karte:**
- Grün
- Quellen mit Qualitäts-Emojis (🟢🟡🟠🔴)
- Wortanzahl & Lesezeit
- Zeitraum (historisch/thematisch)

**LOG-Karte:**
- Orange
- Zeitraum
- Aktivitäts-Statistiken (Sessions, Einträge, Zeit)
- Hauptthemen-Liste

**TASK-Karte:**
- Blau
- Deadline prominent
- Fortschritt (%)
- Priorität-Icon
- Checklist-Vorschau

**WIKI-Karte:**
- Lila
- Nummer + Codewort
- Sammlung + Bereich
- Quelle
- Tags
- Sister-Verbindungen

## Nächste Schritte

- [ ] Integration in H2me?
- [ ] Grid-View bauen?
- [ ] Daten automatisch aus Files lesen?
- [ ] Filter/Sort-Funktionen?
- [ ] Click → zur Seite/zum File?

## Technische Notizen

- Pure HTML/CSS (keine Dependencies)
- SVG-Icons inline
- 360x540px Format (6:9 Ratio)
- Mobile-first optimiert
- Farben: Yang (Rot), Bian (Lila), Yin (Blau)

---

**Erstellt:** 2025-10-27  
**Session:** Quartett-Cards Design Exploration
