# H2me Page - Template für Unterseiten-Chats

## 📋 Anweisung für neue Unterseiten

Kopiere diesen Text und passe die [PLATZHALTER] an:

```
Ich arbeite an einer Unterseite für das H2me Projekt.

KONTEXT:
- Seitenname: page_[NAME].html
- Projektordner: E:\EntryPoint\H2me\
- Verwende shared.css als Basis (bereits vorhanden)
- Verwende shared.js für gemeinsame Funktionen (bereits vorhanden)

AUFGABE:
- Erstelle die HTML-Datei: page_[NAME].html
- Erstelle spezifische Styles: style_[NAME].css
- Erstelle spezifische Funktionen: script_[NAME].js (falls nötig)
- Erstelle Dokumentation: page_[NAME]_readme.md

FUNKTION DER SEITE:
[Beschreibe hier was die Seite können soll, z.B.:
- Kalender mit Drag&Drop
- 3D-Visualisierung
- Notizen-System
- etc.]

DESIGN-VORGABEN:
[Optional - spezielle Wünsche für das Design, z.B.:
- Minimalistisch
- Verspielt
- Dunkel
- etc.]

BESONDERE FEATURES:
[Optional - was soll die Seite Besonderes können, z.B.:
- Animation beim Laden
- Tastatursteuerung
- Touch-Gesten
- etc.]

WICHTIG:
- Die Seite muss eigenständig funktionieren
- Mobile-First Design
- Nutze die H2me Objekte aus shared.js (ThemeManager, Navigation, Storage)
- Dokumentiere alle Funktionen
```

## 📝 Beispiel für Kalender-Seite:

```
Ich arbeite an einer Unterseite für das H2me Projekt.

KONTEXT:
- Seitenname: page_calendar.html  
- Projektordner: E:\EntryPoint\H2me\
- Verwende shared.css als Basis (bereits vorhanden)
- Verwende shared.js für gemeinsame Funktionen (bereits vorhanden)

AUFGABE:
- Erstelle die HTML-Datei: page_calendar.html
- Erstelle spezifische Styles: style_calendar.css
- Erstelle spezifische Funktionen: script_calendar.js
- Erstelle Dokumentation: page_calendar_readme.md

FUNKTION DER SEITE:
- Monatsansicht Kalender
- Termine können per Drag&Drop verschoben werden
- Klick auf Tag öffnet Detail-Ansicht
- Termine werden in LocalStorage gespeichert
- Farbcodierung für verschiedene Termin-Typen

DESIGN-VORGABEN:
- Clean und übersichtlich
- Pastellfarben für verschiedene Event-Typen
- Smooth animations beim Wechsel zwischen Monaten

BESONDERE FEATURES:
- Swipe-Gesten für Monatswechsel auf Mobile
- Keyboard shortcuts (Pfeiltasten für Navigation)
- Export-Funktion für Termine

WICHTIG:
- Die Seite muss eigenständig funktionieren
- Mobile-First Design
- Nutze die H2me Objekte aus shared.js (ThemeManager, Navigation, Storage)
- Dokumentiere alle Funktionen
```

## 🔄 Nach Erstellung der Unterseite:

1. Teste die Seite lokal
2. Prüfe Mobile-Ansicht
3. Dokumentiere in der README
4. Melde dich im Haupt-Chat um die Navigation zu updaten

## 📌 Verfügbare Ressourcen:

- **shared.css**: Basis-Styles, CSS-Variablen, Utility-Classes
- **shared.js**: ThemeManager, Navigation, Storage Helper
- **media/**: Ordner für Bilder, Videos, etc.
- **index.html**: Beispiel für Struktur

---
*Template Version 1.0 - 06.10.2025*