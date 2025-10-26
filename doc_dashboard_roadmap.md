# Dashboard Roadmap - H2me

**Projekt:** Dashboard für h2m.art  
**Erstellt:** 2025-10-10  
**Status:** Planung

---

## 🎯 Vision

Zentrale, mobile-optimierte Übersicht über alle persönlichen Daten:
- Obsidian Knowledge Base (Reviews, Tasks, Projekte, Logs)
- Nextcloud Produktivität (Kalender, Tasks, Deck, Mail)
- Visuell ansprechend im Yin/Yang/Bian-Stil
- Intuitiv navigierbar (Karten-Metapher: Zoom/Pan)

---

## 📅 Phasen-Übersicht

### **Phase 1: Static Generator + APIs** (Start)
**Ziel:** Funktionales Dashboard mit täglichem Update

**Dauer:** ~4-6 Sessions  
**Fokus:** Obsidian Files + Nextcloud Daten lesen & anzeigen

**Deliverables:**
- Generator-Script (Node.js)
- `page_dashboard.html` (Mobile-First)
- Nextcloud API-Integration (Kalender, Tasks, Deck, Mail)
- Manual Deploy zu Netlify

---

### **Phase 2: Automatisierung** (Später)
**Ziel:** Dashboard aktualisiert sich automatisch

**Dauer:** ~2-3 Sessions  
**Fokus:** Workflow-Automation

**Deliverables:**
- Task Scheduler (Windows/Linux)
- Auto-Deploy zu Netlify (CLI/Git)
- Kein manueller Eingriff mehr nötig

---

### **Phase 3: API-Backend** (Zukunft)
**Ziel:** Echtzeit-Updates, erweiterte Features

**Dauer:** ~8-10 Sessions  
**Fokus:** Server-Backend, Live-Daten

**Deliverables:**
- Node.js Server (REST API)
- WebSocket für Live-Updates
- Optional: Content-Bearbeitung im Dashboard
- VPS-Hosting oder lokaler Server

---

## 🍪 Häppchen-Planung (Phase 1)

### ✅ **Häppchen 1: File-Detection & Struktur**
**Status:** Abgeschlossen (Session 2025-10-10)

**Erledigt:**
- Ordner-Scan-Strategie definiert (EntryPoint, ohne Neuanfang)
- File-Typen identifiziert (Reviews, Tasks, Logs, Projekte)
- Smart Filter Konzept (automatisch)
- Metadaten-Quellen geklärt (mtime statt manuell)
- LogClaudine:: Format etabliert

---

### ⏭️ **Häppchen 2: Nextcloud-Integration**
**Status:** Teilweise geklärt, Details offen

**Geklärt:**
- Nextcloud Account-Details
- Nur Kalender-API nutzen (Tasks/Deck über Kalender)
- Mail: Alle ungelesenen (exkl. Spam)

**Noch zu klären:**
- App-Passwort erstellen
- Kalender-Liste durchgehen
- Mail-Details (Anzahl, Spam-Ordner)

**Geschätzte Dauer:** 1 Session (wenn Account-Infos da sind)

---

### ⏭️ **Häppchen 3: Dashboard-Layout & Navigation**
**Status:** Wartend

**Zu klären:**
- Tab-Struktur konkret
- Zoom/Pan-Mechanik (technische Umsetzung)
- Touch-Gesten (Swipe, Pinch)
- Mobile-Optimierung Details

**Geschätzte Dauer:** 1 Session

---

### ⏭️ **Häppchen 4: Content-Darstellung**
**Status:** Wartend

**Zu klären:**
- Dringlichkeits-Logik für Tasks
- Log-Darstellung (Format, Timeline?)
- Projekt-Sortierung
- Preview-Längen

**Geschätzte Dauer:** 1 Session

---

### ⏭️ **Häppchen 5: Technische Architektur**
**Status:** Wartend

**Zu klären:**
- Generator-Script Struktur
- Parser-Pipeline Details
- Performance-Optimierung
- Error-Handling Strategie
- Deploy-Workflow

**Geschätzte Dauer:** 1 Session

---

### 🛠️ **Häppchen 6: Implementation Start**
**Status:** Nach Planung

**Tasks:**
- Custom Parser schreiben (Tasks, Logs, Inline Fields)
- Nextcloud API-Clients implementieren
- HTML-Generator bauen
- CSS Mobile-First Design
- Testing lokal

**Geschätzte Dauer:** 3-4 Sessions

---

## 📊 Meilensteine

### **M1: Planung abgeschlossen** (Ziel: Session 5-6)
- [ ] Alle Häppchen 1-5 durchgeplant
- [ ] Entscheidungen dokumentiert
- [ ] Offene Fragen geklärt
- [ ] Spec finalisiert

### **M2: Prototype lauffähig** (Ziel: Session 8-10)
- [ ] Generator-Script funktioniert
- [ ] Obsidian Files werden geparst
- [ ] Nextcloud Daten werden abgerufen
- [ ] HTML wird generiert
- [ ] Lokal testbar

### **M3: Deployed & Live** (Ziel: Session 11-12)
- [ ] Dashboard auf Netlify
- [ ] Mobile getestet (Nothing Phone 3)
- [ ] Alle Sections funktional
- [ ] Erster Produktiv-Einsatz

### **M4: Phase 1 Complete** (Ziel: Session 13-14)
- [ ] Alle Features wie geplant
- [ ] Dokumentation vollständig
- [ ] Manual Deploy-Prozess etabliert
- [ ] Feedback-Runde & Adjustments

---

## 🚧 Risiken & Herausforderungen

### **Technisch**
- **Nextcloud API-Komplexität:** CalDAV kann tricky sein
  - *Mitigation:* Bibliotheken nutzen, nicht selbst implementieren
- **Performance bei vielen Files:** >50 Files könnten langsam werden
  - *Mitigation:* Caching, Smart Filtering
- **Mobile-Rendering:** Komplexe Layouts auf kleinem Screen
  - *Mitigation:* Mobile-First, Prototyping

### **Prozess**
- **Scope Creep:** Dashboard könnte zu komplex werden
  - *Mitigation:* Strikte Phasen-Trennung, "Nice-to-have" für später
- **Nextcloud Account Details:** Braucht User-Input
  - *Mitigation:* Frühzeitig klären, Credentials sicher speichern

---

## 🎨 Design-Inspirationen (für später)

**Karten-Navigation:**
- Google Maps (Zoom/Pan-Mechanik)
- Miro Board (Infinite Canvas)
- Figma (Spatial Navigation)

**Mobile-Optimierung:**
- Swipe-Gesten zwischen Tabs
- Bottom-Sheet für Details (Material Design)
- Pull-to-Refresh für Updates

**YBY-Stil Integration:**
- Organische Formen für Karten
- Farbverläufe Yang/Yin/Bian
- Animierte Übergänge (dezent)

---

## 📝 Entscheidungs-Log

**2025-10-10:**
- ✅ Node.js als Techstack gewählt
- ✅ Mobile-First Ansatz bestätigt
- ✅ Phase 1 fokussiert auf Static Generator
- ✅ LogClaudine:: Format vorgeschlagen & in Anweisungen integriert
- ✅ Logs: Letzter Tag statt letzte 3
- ✅ Nextcloud: Nur Kalender-API (Option A)
- ✅ Mail: Alle ungelesenen inkl. Unterordner, exkl. Spam
- ✅ Häppchen 1 abgeschlossen
- ✅ Tools-Frage verschoben zu Häppchen 3
- ✅ Obsidian View-File erstellt: `000_VIEW_logs_vortag.md`

---

## 🔗 Verwandte Dokumente

- [[doc_dashboard_planung.md]] - Detaillierte Planung & Häppchen-Status
- [[claude_projekt.md]] - Projekt-Anweisungen H2me
- [[doc_tasks.md]] - Todo-Liste H2me

---

**Nächstes Update:** Nach Häppchen 2 (Nextcloud-Integration geplant)
