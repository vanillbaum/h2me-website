# Session Log - H2me Website Deployment

**Datum:** 2025-10-08  
**Dauer:** Vollständige Migration und erster Deploy  
**Status:** Phase 1 abgeschlossen, Phase 2 gestartet

---

## Erreichte Ziele

### Phase 1: Website-Migration komplett abgeschlossen ✅

**Dateien migriert:**
- 8 HTML-Seiten von 9button nach H2me übertragen
- 5 CSS-Dateien kopiert (shared-global, shared-nav, shared-graph, page-cytoscape, page-flsdgrm)
- 5 JavaScript-Dateien kopiert (shared-nav, shared-graph, page-cytoscape, page-flsdgrm, shared-nav.html)
- 10 Image-Dateien manuell kopiert (SVGs, PNGs, GLB-Modelle)

**Kritische Korrekturen durchgeführt:**
- Alle Backslashes zu Forward Slashes konvertiert (images\bild.svg → images/bild.svg)
- Absolute Pfade zu relativen Pfaden geändert (/page-yang.html → page-yang.html)
- page-index.html zu index.html umbenannt (Webserver-Standard)
- Graph-IDs aktualisiert (page-index → index, konsistente Node-Namen)
- shortname.jpg Fehler behoben (fehlende Datei durch existierende SVGs ersetzt)

**Alte Dateien gesichert:**
- Archive-Ordner erstellt: archives/old_h2me_2025-10-08/
- Original H2me-Dateien (index.html, shared.css, shared.js) ins Archiv verschoben

### Phase 2: Netlify Deployment erfolgreich ✅

**Netlify-Account erstellt:**
- Anmeldung via GitHub erfolgreich
- Account-E-Mail bestätigt
- Dashboard zugänglich

**Erste Website deployed:**
- Site-URL: harmonious-faloodeh-d0a0fa.netlify.app
- Deploy-Methode: Manual Drag & Drop (ganzer Ordner)
- Deploy-Status: Published (5:10 PM)
- Alle Funktionen getestet und funktionieren

**Netlify-Namen Hintergrund:**
Der automatisch generierte Name "harmonious-faloodeh" folgt Netlifys Tradition, Adjektiv + Food-Name Kombinationen zu nutzen. Faloodeh ist ein persisches Dessert aus gefrorenen Stärkenudeln mit Rosenwasser. "Harmonious" passt zufällig perfekt zum yang-bian-yin Konzept des Projekts.

### Obsidian Publish gekündigt ✅

**Kündigungsstatus:**
- Subscription erfolgreich gekündigt
- Ablaufdatum: 17. Oktober 2025
- Screenshot der Bestätigung vorhanden
- Domain h2m.art wird nach Ablauf frei für Umstellung

---

## Technische Erkenntnisse der Session

### Lokale vs. Online Testing - CORS-Problem gelöst

**Das Problem beim lokalen Test:**
Beim Öffnen der Website über file:// (Doppelklick auf HTML) traten CORS-Fehler auf. Der Browser blockierte das Laden von lokalen SVG-Dateien in den Graph-Visualisierungen mit der Meldung "Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf file:///...".

**Die Lösung durch Deployment:**
Sobald die Website über HTTPS ausgeliefert wird (harmonious-faloodeh-d0a0fa.netlify.app), verschwinden alle CORS-Fehler komplett. Alle Dateien kommen von derselben Quelle, der Browser erlaubt das Laden, und die Graph-Icons erscheinen korrekt.

**Die Lektion:** CORS-Fehler beim lokalen Testen von file:// sind normal und kein Grund zur Sorge. Sie verschwinden automatisch beim Deploy auf einen echten Webserver.

### Netlify Upload-Methode hat sich geändert

**Beobachtung während der Session:**
Die aktuelle Netlify-Version akzeptiert nur noch komplette Ordner beim manuellen Deploy, nicht mehr einzelne Dateien. Der User musste den gesamten H2me-Ordner in die Drop-Zone ziehen, nicht den Ordner-Inhalt.

**Netlifys Verhalten:**
Netlify ist intelligent genug, den hochgeladenen Ordner zu durchsuchen und die index.html im Root zu finden. Die Ordnerstruktur wird korrekt erhalten. Bei Updates wird einfach derselbe Ordner erneut hochgeladen, Netlify überschreibt die alte Version.

**Praktische Bedeutung:**
Für zukünftige Updates einfach den kompletten H2me-Ordner erneut in Netlify ziehen. Der Deploy-Prozess dauert etwa dreißig bis sechzig Sekunden. Netlify zeigt einen Fortschrittsbalken und bestätigt mit "Site is live" wenn fertig.

### Verbleibende harmlose Fehler

**Cytoscape Style-Property Warnungen:**
Cytoscape unterstützt nicht alle Standard-CSS-Properties. Warnungen zu text-shadow, node:hover, font-weight und target-arrow-size sind kosmetisch. Der Graph funktioniert mit Cytoscape-Defaults, die Custom-Styles werden einfach ignoriert.

**Font Awesome Glyph-Warnings:**
Die Font-Awesome-CDN-Dateien haben kleine Ungenauigkeiten in den Glyph-Bounding-Boxes. Die Icons funktionieren perfekt trotzdem. Dies ist ein bekanntes kosmetisches Problem der Font-Awesome-Bibliothek selbst, nicht des Projekts.

**Favicon 404:**
Die Website hat noch kein Favicon definiert. Browser suchen automatisch nach favicon.ico und bekommen einen 404-Fehler. Dies beeinträchtigt die Funktionalität nicht. Ein Favicon kann später optional hinzugefügt werden.

**cy-mini Container nicht gefunden auf index.html:**
Die Startseite hat keinen Mini-Graph, nur die Unterseiten. Der JavaScript-Code versucht trotzdem, ihn zu initialisieren und schlägt fehl. Dies ist harmlos - die Seite funktioniert normal. Könnte später mit einer einfachen if-Abfrage behoben werden, aber ist nicht kritisch.

---

## Konzepte erklärt während der Session

### Forward Slash vs. Backslash - Die Web-Regel

**Die goldene Regel:**
Im Web IMMER Forward Slash verwenden, NIE Backslash. Windows nutzt Backslash für lokale Pfade, aber das Web basiert auf Unix-Konventionen und nutzt ausschließlich Forward Slash.

**Warum das kritisch ist:**
Windows ist tolerant und akzeptiert beide Varianten lokal. Linux-Server (wie Netlify) interpretieren Backslash als Teil des Dateinamens, nicht als Ordner-Trenner. Ein Pfad wie images\bild.svg funktioniert auf Windows, bricht aber auf dem Linux-Server komplett zusammen.

**Die Gedanken-Eselsbrücke:**
Sobald es irgendwie mit Web, Internet oder URLs zu tun hat, immer Forward Slash verwenden. URLs haben immer Forward Slash, also auch alle Pfade in HTML, CSS und JavaScript.

### Absolute vs. Relative Pfade - Wann welche?

**Absolute Pfade** beginnen mit einem Forward Slash und starten vom Server-Root. Beispiel: /images/bild.svg bedeutet "gehe zur obersten Ebene des Servers, dann in images-Ordner". Problem: Funktioniert nicht beim lokalen Testen über file://, weil es keinen Server-Root gibt.

**Relative Pfade** beginnen ohne Slash und starten von der aktuellen Datei-Position. Beispiel: images/bild.svg bedeutet "ausgehend von hier, gehe in den images-Ordner". Vorteil: Funktioniert sowohl lokal als auch online, funktioniert egal wo der Projekt-Ordner liegt, perfekt für flache Strukturen.

**Für H2me nutzen wir relative Pfade** weil alle HTML-Dateien auf Root-Ebene liegen. Das ist die beste Praxis für diesen Projekt-Typ.

### index.html - Die magische Startseite

**Webserver-Konvention:**
Wenn jemand eine URL ohne Dateinamen aufruft (beispielsweise h2m.art statt h2m.art/seite.html), sucht der Webserver automatisch nach einer Datei namens index.html in diesem Ordner und zeigt sie an.

**Die Restaurant-Analogie:**
Die index.html ist wie die Rezeption eines Hotels. Wenn du das Hotel betrittst ohne zu sagen wohin du willst, kommst du automatisch zur Rezeption. Wenn das Hotel keine Rezeption hat, stehst du verwirrt im Eingang. Wenn die Rezeption einen anderen Namen hätte, müsstest du explizit danach fragen.

**Warum page-index.html nicht funktioniert:**
Der Server findet keine index.html, kann also keine Standard-Startseite anzeigen, und gibt einen 404-Fehler zurück. User müssten explizit h2m.art/page-index.html eingeben, was niemand tut.

---

## Nächste Schritte - Phase 3 & 4

### Phase 3: Domain h2m.art mit Netlify verbinden

**In Netlify:**
- Site Settings → Domain Management öffnen
- "Add custom domain" klicken
- h2m.art eingeben und verifizieren
- Optional: www.h2m.art als Alias hinzufügen

**DNS-Methode wählen:**
- Option A (empfohlen): Netlify DNS - Netlify übernimmt komplette DNS-Verwaltung
- Option B: External DNS - Bei Namecheap bleiben, manuell A-Records und CNAME setzen

### Phase 4: DNS bei Namecheap umstellen

**Für Netlify DNS (Option A):**
- Bei Namecheap → Domain Management → h2m.art
- Tab "Nameservers" öffnen
- Screenshot der aktuellen Einstellungen machen
- "Custom DNS" wählen
- Vier Netlify-Nameserver eintragen (werden von Netlify angezeigt)
- Speichern und auf Propagierung warten (ein bis achtundvierzig Stunden)

**DNS-Propagierung überwachen:**
- Status-Check auf dnschecker.org
- In Netlify: Domain Settings zeigt "DNS Verified" wenn bereit
- SSL-Zertifikat wird automatisch ausgestellt nach DNS-Verifizierung

### Phase 5: Finaler Test auf h2m.art

**Vollständiger Funktionstest:**
- Alle Seiten durchklicken
- Navigation testen
- Graph-Visualisierungen prüfen
- 3D-Modelle testen
- Mobile Ansicht prüfen
- Developer Console auf Fehler checken

**SSL-Verifizierung:**
- HTTPS funktioniert (Schloss-Symbol im Browser)
- Automatische Weiterleitung von HTTP zu HTTPS aktiv

---

## Dateien-Status

### H2me-Ordner (E:\Neuanfang\a_yang\153_H2me\)

**Produktive Dateien:**
- index.html (Startseite, war page-index.html)
- page-yang.html, page-bian.html, page-yin.html (Hauptseiten)
- page-3dmodel.html, page-cytoscape.html, page-graph.html, page-flsdgrm.html (Spezialseiten)
- shared-global.css, shared-nav.css, shared-graph.css (Haupt-Styling)
- page-cytoscape.css, page-flsdgrm.css (Seiten-spezifisches Styling)
- shared-nav.js (Navigation-Logik, Pfade korrigiert)
- shared-graph.js (Graph-Komponente, shortname.jpg Fix angewendet)
- page-cytoscape.js, page-flsdgrm.js (Seiten-Logik)
- shared-nav.html (Navigation-Template)

**Media:**
- images/ Ordner mit zehn Dateien (SVGs, PNGs, GLB-Modelle)

**Dokumentation:**
- begriffe_glossar.md (erweitert mit allen Konzepten)
- deployment_overview.md (Hosting-Optionen-Übersicht)
- tasks_todo.md (Deployment-Plan, Phase eins abgeschlossen)
- migration_checklist.md (Detaillierte Migrations-Anleitung)
- MIGRATION_COMPLETE.md (Zusammenfassung der Migration)
- projekt_struktur.md (Projekt-Beschreibung)
- TEMPLATE_unterseiten_chat.md (Template)

**Archive:**
- archives/old_h2me_2025-10-08/ (Backup alter Dateien)

### Netlify-Status

**Live-URL:** harmonious-faloodeh-d0a0fa.netlify.app  
**Deploy-Status:** Published  
**Letztes Update:** Zweiter Deploy (shortname.jpg Fix)  
**Nächstes Update:** Nach Domain-Verbindung

---

## Offene Punkte für nächste Session

### Vorbereitung bis zur nächsten Session

**Optional - kein Stress:**
- Bei Namecheap einloggen und DNS-Einstellungen anschauen (noch nichts ändern!)
- Screenshot der aktuellen DNS-Einstellungen machen
- Falls Obsidian irgendwelche DNS-Informationen angezeigt hat während der Kündigung, diese notieren

**Nicht nötig:**
- Keine Code-Änderungen
- Keine weiteren Uploads auf Netlify
- Nichts bei Namecheap ändern (erst in nächster Session!)

### Was in Session zwei passiert

Die nächste Session wird deutlich kürzer als heute. Der Haupt-Aufwand war die Migration, die jetzt abgeschlossen ist. Domain-Verbindung ist ein sehr strukturierter Prozess mit klaren Schritten.

Wir werden gemeinsam durch die Netlify-Domain-Einstellungen gehen, dann zu Namecheap wechseln und dort die DNS-Einträge anpassen. Das ist alles Klick-und-Eingabe-Arbeit, keine Code-Änderungen nötig.

Die DNS-Propagierung läuft dann automatisch im Hintergrund. Das kann einige Stunden dauern, aber du musst nichts aktiv tun außer ab und zu testen ob h2m.art schon auf deine neue Seite zeigt.

---

## Lessons Learned

**Migration ging sehr glatt:**
Die systematische Vorbereitung mit Checklisten und klarer Planung hat sich ausgezahlt. Alle kritischen Pfad-Probleme wurden während der Migration erkannt und behoben, nicht erst beim Deployment.

**CORS war das Haupt-Mysterium:**
Die CORS-Fehler beim lokalen Test wirkten besorgniserregend, waren aber eine Schein-Problem. Sobald die Seite über HTTPS lief, verschwanden sie komplett. Dies ist eine gute Lektion für zukünftige lokale Tests - CORS-Fehler von file:// ignorieren.

**Netlify ist sehr benutzerfreundlich:**
Der Deploy-Prozess ist intuitiv und schnell. Die automatische Erkennung der index.html, die intelligente Handhabung von Ordner-Uploads, und die sofortige Live-URL machen Netlify zu einem exzellenten Hosting für statische Websites.

**Obsidian Publish Kündigung war unkompliziert:**
Der Prozess verlief reibungslos. Die Kündigungsfrist bis siebzehnter Oktober gibt genügend Zeit für eine saubere Umstellung ohne Stress.

---

*Session beendet: 2025-10-08*  
*Nächste Session: Domain-Verbindung (Phase 3 & 4)*  
*Geschätzter Zeitaufwand nächste Session: Eine bis zwei Stunden aktive Arbeit*
