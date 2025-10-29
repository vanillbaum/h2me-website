# Calendar PoC - Implementation Planung (Häppchen-basiert)

**Projekt:** H2me Calendar PoC  
**Status:** Planung - Häppchen definiert ✅  
**Erstellt:** 2025-10-29  
**Basiert auf:** doc_calendar_poc.md (14 Entscheidungen)

---

## 📋 Übersicht

**Dieses File ist für:**
- Häppchen-Struktur (wie Dashboard-Planung)
- Implementation-Reihenfolge
- Zeitschätzungen pro Häppchen
- Live-Updates während Umsetzung

**NICHT für:**
- Konzept-Diskussion (→ `doc_calendar_poc.md`)
- Code selbst (→ `page-calendar-poc.*`)

---

## 🎯 Ziel des PoC

**One-Line:** Einfache Zeitblock-Erstellung mit Kategoriefarben, Drag & Drop, Hybrid-View (Mobile-First)

**Kern-Features:**
1. ✅ Click-to-Add Modal für neue Blöcke
2. ✅ 7 Kategoriefarben (FF/Stefi/Körper/HH/MM/Bier/Undefiniert)
3. ✅ Hybrid-View (Mini-Wochenübersicht + Tages-Detail)
4. ✅ Drag & Drop (Move, Resize, Delete)
5. ✅ localStorage Persistierung
6. ✅ Mobile-First (Nothing Phone 3)

---

## 🧩 Häppchen-Struktur

### Häppchen 1: HTML-Grundgerüst (Hybrid-View)
**Ziel:** Statisches HTML mit beiden Views (Mini-Week + Detail-Day)  
**Dauer:** ~45-60 Min  

**Was wird gemacht:**
- Top-Bar mit Wochen-Nummer + [+] Button
- Mini-Wochenübersicht (7 Spalten Mo-So)
- Detail-View mit Zeitachse (00:00-23:45)
- Scroll-Container für Detail-View
- Semantic HTML (`<nav>`, `<main>`, `<section>`)

**Was NICHT gemacht wird:**
- Noch keine Interaktivität
- Keine Blöcke
- Kein Styling (nur Struktur)

**Output:**
- `page-calendar-poc.html` (HTML-Gerüst)

**Akzeptanzkriterium:**
- [ ] HTML validiert (semantisch korrekt)
- [ ] Beide Views vorhanden (Mini-Week + Detail)
- [ ] Zeitachse 00:00-23:45 sichtbar

---

### Häppchen 2: CSS Basis-Styling (Mobile-First)
**Ziel:** Layout funktioniert auf Mobile (Portrait)  
**Dauer:** ~60-75 Min

**Was wird gemacht:**
- CSS Variables für 7 Kategoriefarben
- Mobile-First Layout (Flexbox/Grid)
- Top-Bar Styling
- Mini-Wochenübersicht Grid (7 Spalten)
- Detail-View Zeitachse (15min Raster via CSS Grid)
- Scroll-Behavior für Detail-View

**Was NICHT gemacht wird:**
- Noch keine Blöcke
- Keine Transitions
- Keine Hover-States
- Keine Desktop-Styles

**Output:**
- `page-calendar-poc.css` (Mobile-First Basis)

**Akzeptanzkriterium:**
- [ ] Layout funktioniert auf 390x844px (Nothing Phone 3)
- [ ] Mini-Week zeigt 7 gleichgroße Spalten
- [ ] Detail-View scrollbar
- [ ] 15min Raster sichtbar (4 Rows pro Stunde)

---

### Häppchen 3: JavaScript Basis + Mock-Daten
**Ziel:** Mock-Blöcke werden angezeigt  
**Dauer:** ~45-60 Min

**Was wird gemacht:**
- Daten-Struktur definieren (siehe `doc_calendar_poc.md`)
- Mock-Daten erstellen (5-7 Beispiel-Blöcke)
- Render-Funktion für Blöcke
- Kategoriefarben dynamisch via CSS Variables
- Icon-Logik (🕐 Event / ☐ Task)

**Was NICHT gemacht wird:**
- Noch kein localStorage
- Keine User-Interaktion
- Kein Drag & Drop
- Keine Mini-Week Visualisierung

**Output:**
- `page-calendar-poc.js` (Render-Logik)
- Mock-Daten sichtbar im Detail-View

**Akzeptanzkriterium:**
- [ ] 5-7 Mock-Blöcke werden angezeigt
- [ ] Farben korrekt (7 Kategorien)
- [ ] Icons korrekt (🕐/☐)
- [ ] Zeitslots korrekt positioniert

---

### Häppchen 4: Click-to-Add Modal
**Ziel:** User kann neue Blöcke erstellen  
**Dauer:** ~75-90 Min

**Was wird gemacht:**
- Modal HTML + CSS
- Form-Felder: Titel, Startzeit, Dauer, Kategorie, Typ
- Event-Listener auf [+] Button
- Block erstellen + zu Array hinzufügen
- Re-Render nach Erstellung
- UUID-Generator für Block-IDs

**Was NICHT gemacht wird:**
- Noch kein localStorage
- Keine Validierung
- Kein Abbrechen-Button
- Keine Edit-Funktion

**Output:**
- Modal funktioniert
- Neue Blöcke erscheinen sofort

**Akzeptanzkriterium:**
- [ ] Modal öffnet via [+] Button
- [ ] Alle Felder funktionieren (Titel, Zeit, Dauer, Kategorie, Typ)
- [ ] Block wird erstellt + angezeigt
- [ ] Kategorie-Dropdown mit 7 Optionen

---

### Häppchen 5: localStorage Persistierung
**Ziel:** Blöcke bleiben nach Reload erhalten  
**Dauer:** ~30-45 Min

**Was wird gemacht:**
- `loadBlocks()` beim Init
- `saveBlocks()` nach jeder Änderung
- JSON.stringify / JSON.parse
- Error-Handling (falls localStorage voll/disabled)

**Was NICHT gemacht wird:**
- Kein Import/Export
- Keine Versionierung
- Keine Migration

**Output:**
- Blöcke persistent über Reload

**Akzeptanzkriterium:**
- [ ] Blöcke laden beim Seitenaufruf
- [ ] Neue Blöcke werden gespeichert
- [ ] Nach Reload: Alle Blöcke noch da

---

### Häppchen 6: Mini-Week Visualisierung (Kategoriefarben)
**Ziel:** Mini-Wochenübersicht zeigt Farben der Blöcke  
**Dauer:** ~60-75 Min

**Was wird gemacht:**
- Pro Tag: Alle Blöcke durchgehen
- Farben sammeln (chronologisch)
- CSS `linear-gradient` generieren
- Leere Tage: Grau/Weiß
- Aktueller Tag: Hervorhebung

**Was NICHT gemacht wird:**
- Noch keine Tap-Interaktion
- Keine Wochen-Navigation
- Keine Tooltips

**Output:**
- Mini-Week zeigt Kategoriefarben

**Akzeptanzkriterium:**
- [ ] Jeder Tag zeigt Farben seiner Blöcke
- [ ] Mehrere Blöcke: Mehrere Farbstreifen
- [ ] Leere Tage: Neutral-Farbe
- [ ] Aktueller Tag hervorgehoben

---

### Häppchen 7: Tap-Navigation (Mini-Week → Detail-View)
**Ziel:** Tap auf Tag lädt Detail-View  
**Dauer:** ~30-45 Min

**Was wird gemacht:**
- Click-Handler auf Mini-Week Tage
- `loadDay(date)` Funktion
- Detail-View updaten
- Aktive Tag markieren
- Datum in Top-Bar updaten

**Was NICHT gemacht wird:**
- Noch kein Swipe (kommt später)
- Keine Wochen-Navigation
- Keine Animationen

**Output:**
- Tap auf Tag zeigt dessen Blöcke

**Akzeptanzkriterium:**
- [ ] Tap auf Tag → Detail-View zeigt nur dessen Blöcke
- [ ] Aktiver Tag visuell markiert
- [ ] Datum in Header aktualisiert

---

### Häppchen 8: Drag-to-Move (Zeitslot ändern)
**Ziel:** Blöcke können verschoben werden  
**Dauer:** ~90-120 Min (komplex!)

**Was wird gemacht:**
- Touch-Events: `touchstart`, `touchmove`, `touchend`
- Drag-State Management
- Visuelles Feedback während Drag
- Snap-to-Grid (15min)
- Block-Position updaten
- localStorage speichern

**Was NICHT gemacht wird:**
- Noch kein Resize
- Keine Collision-Detection (erlaubt ja)
- Keine Cross-Day Drag

**Output:**
- Blöcke verschiebbar innerhalb des Tages

**Akzeptanzkriterium:**
- [ ] Block kann auf anderen Zeitslot gezogen werden
- [ ] Snapping auf 15min funktioniert
- [ ] Position wird gespeichert
- [ ] Touch-friendly (44x44px Target)

---

### Häppchen 9: Resize-Handle (Dauer ändern)
**Ziel:** Block-Dauer kann geändert werden  
**Dauer:** ~60-75 Min

**Was wird gemacht:**
- Resize-Handle am unteren Block-Ende
- Separater Touch-Handler für Handle
- Nur vertikales Drag
- Snap-to-Grid (15min)
- Min-Dauer: 15min
- localStorage speichern

**Was NICHT gemacht wird:**
- Keine Drag-am-oberen-Ende
- Keine Multi-Day Resize

**Output:**
- Block-Dauer änderbar via Handle

**Akzeptanzkriterium:**
- [ ] Handle sichtbar am Block-Ende
- [ ] Ziehen ändert Dauer
- [ ] Snapping auf 15min
- [ ] Min-Dauer 15min eingehalten

---

### Häppchen 10: Tap-to-Edit Modal
**Ziel:** Blöcke können bearbeitet werden  
**Dauer:** ~45-60 Min

**Was wird gemacht:**
- Click-Handler auf Block
- Gleiches Modal wie Click-to-Add
- Form pre-fill mit Block-Daten
- Update-Logik statt Create
- Re-Render nach Update
- localStorage speichern

**Was NICHT gemacht wird:**
- Kein Delete-Button im Modal (kommt separat)
- Keine Validierung

**Output:**
- Tap auf Block öffnet Edit-Modal

**Akzeptanzkriterium:**
- [ ] Tap auf Block → Modal öffnet
- [ ] Form zeigt Block-Daten
- [ ] Änderungen werden gespeichert
- [ ] Re-Render funktioniert

---

### Häppchen 11: Swipe-to-Delete
**Ziel:** Blöcke können gelöscht werden  
**Dauer:** ~45-60 Min

**Was wird gemacht:**
- Swipe-Detection (Links-Swipe)
- Delete-Button erscheint
- Confirm-Dialog
- Block aus Array entfernen
- Re-Render
- localStorage speichern

**Was NICHT gemacht wird:**
- Kein Undo
- Keine Animationen
- Keine Batch-Delete

**Output:**
- Swipe-Left → Löschen möglich

**Akzeptanzkriterium:**
- [ ] Swipe-Left zeigt Delete-Button
- [ ] Confirm-Dialog erscheint
- [ ] Block wird gelöscht
- [ ] localStorage aktualisiert

---

### Häppchen 12: Transition-Blur (FF/MM/Bier)
**Ziel:** 3 Kategorien haben Blur-Effekt  
**Dauer:** ~30-45 Min

**Was wird gemacht:**
- CSS `::after` Pseudo-Element
- Blur-Filter + Opacity-Gradient
- Nur für FF, MM, Bier
- Kategorie-Config erweitern

**Was NICHT gemacht wird:**
- Keine User-Konfiguration
- Keine Animation

**Output:**
- FF/MM/Bier Blöcke haben Blur am Ende

**Akzeptanzkriterium:**
- [ ] FF (Orange) hat Blur
- [ ] MM (Grün) hat Blur
- [ ] Bier (Gelb) hat Blur
- [ ] Andere Kategorien: Kein Blur

---

### Häppchen 13: Swipe-Navigation (Tages-Wechsel)
**Ziel:** Swipe Left/Right wechselt Tag  
**Dauer:** ~45-60 Min

**Was wird gemacht:**
- Swipe-Detection (Left/Right)
- `loadPreviousDay()` / `loadNextDay()`
- Detail-View updaten
- Mini-Week Markierung updaten
- Datum in Top-Bar updaten

**Was NICHT gemacht wird:**
- Keine Swipe-Animationen
- Keine Wochen-Grenze Checks

**Output:**
- Swipe wechselt Tage

**Akzeptanzkriterium:**
- [ ] Swipe-Right → Vorheriger Tag
- [ ] Swipe-Left → Nächster Tag
- [ ] Mini-Week aktualisiert
- [ ] Header zeigt neues Datum

---

### Häppchen 14: Polish & Mobile-Optimierung
**Ziel:** PoC fühlt sich fertig an  
**Dauer:** ~60-90 Min

**Was wird gemacht:**
- Touch-Targets prüfen (min 44x44px)
- Loading-States
- Empty-States (keine Blöcke)
- Error-Handling
- Scroll-Performance
- CSS Transitions (subtil)
- Cross-Browser Test (Chrome Mobile, Safari iOS)

**Was NICHT gemacht wird:**
- Keine Desktop-Styles
- Keine Accessibility-Features (ARIA)
- Keine Performance-Optimierung

**Output:**
- Polished PoC, ready to use

**Akzeptanzkriterium:**
- [ ] Alle Touch-Targets groß genug
- [ ] Kein Leeres UI (Empty-States)
- [ ] Smooth Scrolling
- [ ] Funktioniert auf Nothing Phone 3

---

## ⏱️ Zeitschätzungen

### Summe pro Häppchen:
1. HTML-Grundgerüst: ~45-60 Min
2. CSS Basis-Styling: ~60-75 Min
3. JS Basis + Mock: ~45-60 Min
4. Click-to-Add Modal: ~75-90 Min
5. localStorage: ~30-45 Min
6. Mini-Week Farben: ~60-75 Min
7. Tap-Navigation: ~30-45 Min
8. Drag-to-Move: ~90-120 Min ⚠️
9. Resize-Handle: ~60-75 Min
10. Tap-to-Edit: ~45-60 Min
11. Swipe-to-Delete: ~45-60 Min
12. Transition-Blur: ~30-45 Min
13. Swipe-Navigation: ~45-60 Min
14. Polish: ~60-90 Min

**Gesamt (Mittelwerte):** ~825 Min = **~13.75 Stunden**

**Mit Pufferzeit (+30%):** ~**18 Stunden**

**Realistische Einschätzung:** 3-4 Sessions à 4-5h

---

## 📝 Reihenfolge-Rationale

**Warum diese Reihenfolge?**

1. **Foundation first** (Häppchen 1-3)
   - HTML → CSS → JS Basis
   - Klassische Schichtung

2. **Core-Feature next** (Häppchen 4-5)
   - Click-to-Add = Hauptfunktion
   - localStorage = Persistierung

3. **Views komplett** (Häppchen 6-7)
   - Mini-Week Farben
   - Navigation zwischen Views

4. **Interaktivität** (Häppchen 8-11)
   - Drag & Drop komplex (2 Häppchen)
   - Edit + Delete

5. **Visual Polish** (Häppchen 12)
   - Transition-Blur = Nice-to-Have

6. **Navigation Polish** (Häppchen 13)
   - Swipe-Navigation = UX-Verbesserung

7. **Final Polish** (Häppchen 14)
   - Letzte Glättung

---

## 🚀 Implementation-Start

**Status:** Bereit zu starten!  
**Nächstes Häppchen:** #1 (HTML-Grundgerüst)

**Vor dem Start:**
- [ ] Screenshot als Referenz bereithalten
- [ ] Nothing Phone 3 für Testing bereit
- [ ] Browser DevTools Mobile-Modus (390x844px)

**Während Implementation:**
- [ ] Häppchen-Status live updaten (✅/🚧/❌)
- [ ] Erkenntnisse dokumentieren
- [ ] Bei Abweichungen: Hier dokumentieren

---

## 📋 Live-Status Tracker

### Häppchen 1: HTML-Grundgerüst
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 2: CSS Basis-Styling
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 3: JavaScript Basis + Mock-Daten
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 4: Click-to-Add Modal
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 5: localStorage Persistierung
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 6: Mini-Week Visualisierung
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 7: Tap-Navigation
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 8: Drag-to-Move
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 9: Resize-Handle
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 10: Tap-to-Edit Modal
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 11: Swipe-to-Delete
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 12: Transition-Blur
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 13: Swipe-Navigation
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

### Häppchen 14: Polish & Mobile-Optimierung
**Status:** ⬜ Noch nicht gestartet  
**Started:** -  
**Completed:** -  
**Notizen:** -

---

## 📝 Changelog

(LogClaudine:: (LogCreated:: 25-10-29 19:15) **PLANUNG-CREATED** 14 Häppchen definiert (HTML→CSS→JS→Add→Persist→MiniWeek→Nav→Drag→Resize→Edit→Delete→Blur→Swipe→Polish), Zeitschätzung ~18h (mit Puffer), 3-4 Sessions, Reihenfolge begründet, Live-Status-Tracker vorbereitet)

(LogClaudine:: (LogCreated:: 25-10-29 14:48) **TECH-SPEC-ADDED** Zusätzliches File erstellt für Claude Code: doc_calendar_poc_tech_spec.md mit kompletter Code-Architektur, Design-System, Daten-Strukturen, Touch-Optimierung, Mock-Daten)

---

_Letzte Aktualisierung: 2025-10-29 14:48 - Bereit für Claude Code Implementation_
