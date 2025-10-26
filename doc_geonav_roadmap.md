# Geometrische Navigation - Roadmap

## Projekt-Übersicht

**Vision:** Geometrische 3D-Navigation als alternative/ergänzende Navigation für H2me.

**Status:** Konzept-Phase  
**Timeline:** ~3-4 Wochen bis funktionale Integration

---

## Phase 1: Proof of Concept (PoC) 🎯

**Dauer:** 2-3 Wochen  
**Ziel:** Funktionierender Würfel mit 6 Views

### Woche 1: Basis-Funktionalität
- ✅ **Häppchen 1:** Basic Canvas + Würfel (1-2h)
- ✅ **Häppchen 2:** Drag-Interaktion (2-3h)
- ✅ **Häppchen 3:** Flächen-Beschriftung (1-2h)

**Milestone 1:** Würfel mit Drag-Rotation & Beschriftung

### Woche 2: Interaktivität
- ✅ **Häppchen 4:** Klick-Erkennung (2-3h)
- ✅ **Häppchen 5:** Snap-Mechanik (3-4h)
- ✅ **Häppchen 6:** Navigation integrieren (1-2h)

**Milestone 2:** Funktionale Navigation via Würfel

### Woche 3: Mobile & Polish
- ✅ **Häppchen 7:** Touch-Support (2h)
- ✅ **Häppchen 8:** Styling & Polish (1-2h)

**Milestone 3:** PoC komplett, demo-ready

**Total:** ~15-20h reine Entwicklung

---

## Phase 2: Integration & Erweiterung 🚀

**Dauer:** 1-2 Wochen  
**Ziel:** PoC in H2me Landing-Page integrieren

### Tasks
- [ ] Entscheidung: Ersetzt oder ergänzt 9-Button-Grid?
- [ ] Landing-Page Redesign
- [ ] Shared Component erstellen (`shared-geonav.js/css`)
- [ ] Performance-Optimierung
- [ ] A/B Testing Setup (wenn Toggle-Option)

**Milestone 4:** Geometrische Navigation live auf h2m.art

---

## Phase 3: Flexibilisierung 🔧

**Dauer:** 2-3 Wochen  
**Ziel:** Variable View-Anzahl unterstützen

### Geometrie-Generator
- [ ] Algorithmus für 4 Views (Tetraeder)
- [ ] Algorithmus für 8 Views (Oktaeder)
- [ ] Algorithmus für 12 Views (Dodekaeder)
- [ ] Fallback für ungewöhnliche Anzahlen
- [ ] Auto-Wahl basierend auf View-Count

### Flächen-Mapping System
- [ ] Dynamisches Face-to-View Mapping
- [ ] Farbzuordnung (Yang/Bian/Yin)
- [ ] Beschriftungs-System für variable Flächen

**Milestone 5:** System wächst mit H2me (beliebig viele Views)

---

## Phase 4: Advanced Features 💎

**Dauer:** Optional, nach Bedarf  
**Ziel:** Enhanced User Experience

### Features
- [ ] Hover-Effekte auf Flächen
- [ ] Zoom-in/out Funktion
- [ ] Keyboard-Navigation (Accessibility)
- [ ] View-Preview beim Hover
- [ ] Transition-Animation beim Navigieren
- [ ] 3D-Geräusche (optional, experimentell)

### Performance
- [ ] Level-of-Detail System (LOD)
- [ ] Lazy-Loading von Texturen
- [ ] WebGL Fallback (für alte Browser)
- [ ] Progressive Enhancement

**Milestone 6:** Production-ready mit allen Features

---

## Meilensteine Übersicht

| Milestone | Beschreibung | Dauer | Status |
|-----------|--------------|-------|--------|
| M1 | Würfel mit Drag | ~5-7h | ✅ Completed |
| M2 | Funktionale Navigation | ~6-9h | ✅ Completed |
| M3 | PoC komplett | ~4-5h | ✅ Completed |
| M4 | Integration Live | ~1-2 Wochen | ⏳ Planned |
| M5 | Variable Views | ~2-3 Wochen | ⏳ Planned |
| M6 | Production-ready | Optional | 💡 Future |

---

## Technische Abhängigkeiten

### Bereits vorhanden in H2me
✅ Three.js (für 3D-Model-Viewer)  
✅ Netlify Hosting  
✅ Mobile-first Design Philosophie  
✅ Shared Component System

### Neu zu implementieren
⚠️ Raycasting (neu, aber Teil von Three.js)  
⚠️ Touch-Events (neu für dieses Projekt)  
⚠️ Quaternion-Rotation (komplex)  
⚠️ Face-Mapping System (custom Logik)

### Nice-to-have (später)
💡 Animation Library (für Transitions)  
💡 Sound Library (für Audio-Feedback)  
💡 Analytics (User-Interaktions-Tracking)

---

## Risiken & Mitigation

### Risk: Performance auf Mobile
**Impact:** Hoch  
**Wahrscheinlichkeit:** Mittel  
**Mitigation:**
- Früh auf Mobile testen (Häppchen 7)
- LOD-System implementieren
- Fallback auf 2D-Grid bei Performance-Problemen

### Risk: User findet 3D verwirrend
**Impact:** Hoch  
**Wahrscheinlichkeit:** Niedrig-Mittel  
**Mitigation:**
- Toggle zwischen 3D und Grid anbieten
- Tutorial/Onboarding
- User-Testing vor finaler Integration

### Risk: Komplexität steigt mit View-Anzahl
**Impact:** Mittel  
**Wahrscheinlichkeit:** Hoch  
**Mitigation:**
- Frühzeitig flexible Architektur planen
- Phase 3 gezielt für Skalierung
- Fallback-Geometrien definieren

### Risk: Barrierefreiheit
**Impact:** Hoch  
**Wahrscheinlichkeit:** Sicher (3D ist nicht screenreader-friendly)  
**Mitigation:**
- Alternative Navigation MUSS verfügbar sein
- Keyboard-Shortcuts implementieren
- ARIA-Labels für 3D-Elemente

---

## Success Metrics

**PoC erfolgreich wenn:**
- ✅ Würfel dreht smooth auf Desktop & Mobile
- ✅ Klick navigiert korrekt zu View
- ✅ Snap-Mechanik funktioniert intuitiv

**Integration erfolgreich wenn:**
- ✅ User finden Feature intuitiv (User-Testing)
- ✅ Keine Performance-Probleme auf Mobile
- ✅ Barrierefreiheit gewährleistet (Fallback)

**Langzeit-Erfolg wenn:**
- ✅ System skaliert mit wachsenden Views
- ✅ Feature wird aktiv genutzt (Analytics)
- ✅ Wartung ist simpel (Code-Qualität)

---

## Next Steps (Konkret)

**Sofort:**
1. PoC starten mit Häppchen 1
2. Entscheidung: Wann Development-Session?

**Nach PoC:**
1. User-Feedback einholen
2. Entscheidung: Integration Ja/Nein?
3. Roadmap für Phase 2+ anpassen

**Langfristig:**
1. In MAKRO dokumentieren
2. TASKS-File updaten
3. Evtl. Feature-Branch für GeoNav

---

**Verwandt mit:**
- [[doc_geonav_explain]] - Konzepte erklärt
- [[doc_geonav_haeppchen_poc]] - PoC Häppchen-Planung
- [[153_BOAT_Geometrische Navigation Views als Koerper]] (EntryPoint)

**Erstellt:** 2025-10-24  
**Projekt:** H2me (153_H2me)  
**Nächstes Review:** Nach M3 (PoC komplett)

---

## ba_Log

(LogClaudine:: (LogCreated:: 25-10-24 17:40) **MILESTONE-M1-M3_** Alle drei Meilensteine erreicht: Würfel mit Drag (M1), Funktionale Navigation (M2), PoC komplett (M3) - Bereit für Phase 2 Entscheidung)
