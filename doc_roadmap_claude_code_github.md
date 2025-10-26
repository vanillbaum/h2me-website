# Roadmap: Claude Code Setup + GitHub Integration

**Projekt:** H2me (h2m.art)  
**Ziel:** Längere Entwicklungs-Sessions ohne Chat-Abbrüche  
**Erstellt:** 2025-10-26
**Status:** In Arbeit - Phase 1 gestartet

---

## 📊 Fortschritt

- [x] Phase 1, Häppchen 1.1: Installation (abgeschlossen)
- [x] Phase 1, Häppchen 1.1: Authentifizierung (abgeschlossen - /login im Claude Code Prompt)
- [x] Phase 1, Häppchen 1.2: Projekt-Verbindung (abgeschlossen - 16 HTML-Files gefunden)
- [ ] Phase 1, Häppchen 1.3: Workflow verstehen (in Arbeit)
- [ ] Phase 2: GitHub Setup
- [ ] Phase 3: Integration
- [ ] Phase 4: Praxis

---

## Übersicht

Diese Roadmap führt dich durch:
1. **Claude Code Installation** - Terminal-basiertes Tool für längere Sessions
2. **GitHub Repository Setup** - Versionskontrolle & Backup
3. **Workflow Integration** - Wie beide Tools zusammenarbeiten

**Geschätzte Zeit:** 1-2 Stunden (einmalig)

---

## Phase 1: Claude Code Setup

### Häppchen 1.1: Installation (15 Min)

**Was:**
- Claude Code CLI Tool installieren
- Authentifizierung einrichten
- Basis-Funktionen testen

**Schritte:**

1. **Claude Code installieren:**
   ```bash
   # Installation via npm
   npm install -g @anthropic-ai/claude-code
   ```
   
   **Hinweis:** Falls `claude-code` Befehl nicht gefunden wird (PATH-Problem), nutze `npx`:
   ```bash
   # Version testen
   npx @anthropic-ai/claude-code --version
   
   # Danach immer npx nutzen:
   npx @anthropic-ai/claude-code [befehl]
   ```

2. **Authentifizierung:**
   ```bash
   npx @anthropic-ai/claude-code auth login
   # Öffnet Browser → Mit Claude Account anmelden
   ```

3. **Test:**
   ```bash
   npx @anthropic-ai/claude-code --version
   # Sollte Version anzeigen (z.B. 0.27)
   ```

**Erfolgskriterium:**
- ✅ `npx @anthropic-ai/claude-code --version` zeigt Version
- ✅ Authentifizierung erfolgreich

**Lessons Learned:**
- Bei "OAuth token expired" im Claude Code Prompt: `/login` eingeben
- Claude Code arbeitet auf Deutsch wenn User auf Deutsch schreibt
- Session bleibt aktiv zwischen Befehlen

---

### Häppchen 1.2: Projekt-Verbindung (10 Min)

**Was:**
- H2me-Ordner mit Claude Code verbinden
- Erste Test-Interaktion

**Schritte:**

1. **In Projekt-Ordner wechseln:**
   ```bash
   cd E:\Neuanfang\a_yang\153_H2me
   ```

2. **Claude Code starten:**
   ```bash
   npx @anthropic-ai/claude-code
   # Öffnet interaktive Session
   ```

3. **Test-Befehl:**
   ```
   > Liste alle HTML-Files im Ordner auf
   ```

**Erfolgskriterium:**
- ✅ Claude Code zeigt Liste der HTML-Files
- ✅ Kann mit Projekt interagieren

**Lessons Learned:**
- Claude Code findet und kategorisiert Files automatisch (Hauptseiten, Spezielle Seiten, Test-Dateien)
- Search-Funktion mit Patterns (".html", ".htm")
- Insgesamt 16 HTML-Files im H2me-Projekt erkannt

---

### Häppchen 1.3: Workflow verstehen (15 Min)

**Was:**
- Unterschied Desktop vs. Code verstehen
- Typische Befehle lernen

**Typische Workflows:**

**Neue Seite erstellen:**
```
> Erstelle neue Page page-test.html basierend auf page-yang.html
> Füge CSS hinzu in page-test.css mit Yang-Farben
> Integriere in shared-nav.html
```

**Bug fixen:**
```
> In page-dashboard.html: Button-Click funktioniert nicht
> Analysiere JavaScript Event-Listener
> Fixe das Problem
```

**Refactoring:**
```
> Extrahiere Button-Styles aus allen page-*.css Files
> Erstelle shared-buttons.css
> Update alle Pages um shared-buttons.css zu nutzen
```

**Erfolgskriterium:**
- ✅ Verständnis wie Claude Code arbeitet
- ✅ Kann einfache Befehle geben

---

## Phase 2: GitHub Repository Setup

### Häppchen 2.1: Git installieren (10 Min)

**Was:**
- Git für Windows installieren
- Basis-Konfiguration

**Schritte:**

1. **Git installieren:**
   - Download: https://git-scm.com/download/win
   - Installer durchlaufen (Defaults OK)

2. **Git konfigurieren:**
   ```bash
   git config --global user.name "Dein Name"
   git config --global user.email "deine@email.com"
   ```

3. **Test:**
   ```bash
   git --version
   # Sollte Version anzeigen
   ```

**Erfolgskriterium:**
- ✅ `git --version` funktioniert
- ✅ Name und Email konfiguriert

---

### Häppchen 2.2: .gitignore erstellen (5 Min)

**Was:**
- Definieren was NICHT in Git soll
- Sensible Daten ausschließen

**Schritte:**

1. **`.gitignore` erstellen:**
   ```
   E:\Neuanfang\a_yang\153_H2me\.gitignore
   ```

2. **Inhalt:**
   ```gitignore
   # Lokale Entwicklung
   .DS_Store
   Thumbs.db
   
   # Archives (zu groß für Git)
   archives/
   
   # Logs (ändern sich zu oft)
   logs/doc_log_*.md
   
   # Temporäre Files
   *.tmp
   *.bak
   *~
   
   # Node modules (falls später genutzt)
   node_modules/
   
   # Persönliche Notizen
   PRIVATE_*.md
   ```

**Erfolgskriterium:**
- ✅ `.gitignore` existiert im Projekt-Root
- ✅ Archives und Logs ausgeschlossen

---

### Häppchen 2.3: Lokales Git Repository (10 Min)

**Was:**
- H2me-Ordner als Git Repo initialisieren
- Ersten Commit machen

**Schritte:**

1. **Git initialisieren:**
   ```bash
   cd E:\Neuanfang\a_yang\153_H2me
   git init
   ```

2. **Status checken:**
   ```bash
   git status
   # Zeigt alle untracked Files
   ```

3. **Files hinzufügen:**
   ```bash
   git add .
   ```

4. **Ersten Commit:**
   ```bash
   git commit -m "Initial commit: H2me website v1.0"
   ```

**Erfolgskriterium:**
- ✅ Git Repository erstellt
- ✅ Erster Commit erfolgreich
- ✅ `git log` zeigt Commit

---

### Häppchen 2.4: GitHub Account & Repository (15 Min)

**Was:**
- GitHub Account erstellen (falls nötig)
- Remote Repository anlegen
- Lokales Repo verbinden

**Schritte:**

1. **GitHub Account:**
   - https://github.com/signup
   - Account erstellen (falls nicht vorhanden)

2. **Neues Repository erstellen:**
   - https://github.com/new
   - Name: `h2me-website`
   - Beschreibung: "Personal website project - h2m.art"
   - **Private** (falls sensible Daten)
   - KEIN README, .gitignore, License (haben wir schon lokal)

3. **Lokales Repo verbinden:**
   ```bash
   git remote add origin https://github.com/DEIN-USERNAME/h2me-website.git
   git branch -M main
   git push -u origin main
   ```

**Erfolgskriterium:**
- ✅ GitHub Repository existiert
- ✅ Lokaler Code ist auf GitHub
- ✅ Kann Repository auf GitHub sehen

---

## Phase 3: Workflow Integration

### Häppchen 3.1: Claude Code mit Git (10 Min)

**Was:**
- Claude Code nutzen für Git-Commits
- Automatische Commit-Messages

**Workflow:**

```bash
# Claude Code Session starten
claude-code

# Änderungen machen
> Füge neue Seite page-about.html hinzu

# Claude Code committed automatisch
# ODER manuell:
> Committe alle Änderungen mit Message "Add about page"
```

**Best Practice:**
- Kleine, häufige Commits
- Beschreibende Commit-Messages
- Nach jeder funktionierenden Feature

**Erfolgskriterium:**
- ✅ Kann Claude Code für Commits nutzen
- ✅ Versteht Commit-Workflow

---

### Häppchen 3.2: Netlify + GitHub Integration (20 Min)

**Was:**
- Netlify mit GitHub verbinden
- Auto-Deploy bei Push einrichten

**Schritte:**

1. **Netlify öffnen:**
   - https://app.netlify.com
   - Sites → 153_H2me → Site Configuration

2. **GitHub verbinden:**
   - Build & Deploy → Configure
   - Link Repository → Wähle `h2me-website`
   - Branch: `main`
   - Build Settings: KEINE (statische Website)
   - Publish Directory: `/` (Root)

3. **Test:**
   ```bash
   # Kleine Änderung machen
   echo "<!-- Test -->" >> index.html
   
   # Commit & Push
   git add index.html
   git commit -m "Test: Netlify auto-deploy"
   git push
   
   # Netlify deployed automatisch nach ~30 Sekunden
   ```

**Erfolgskriterium:**
- ✅ GitHub → Netlify Verbindung funktioniert
- ✅ Push auf GitHub triggert Deploy
- ✅ Änderungen erscheinen auf h2m.art

---

### Häppchen 3.3: Workflow-Dokumentation (10 Min)

**Was:**
- Neuen Workflow dokumentieren
- Quick Reference erstellen

**Zu dokumentieren:**

**Täglicher Workflow:**
```
1. Claude Code starten: `npx @anthropic-ai/claude-code` in E:\...\153_H2me\
2. Feature entwickeln: "Erstelle/Ändere [...]"
3. Lokal testen: Browser → file:///E:/...
4. Commit: Git committed automatisch ODER manuell
5. Push zu GitHub: `git push`
6. Netlify deployed automatisch
7. Online testen: https://h2m.art
```

**Für große Features:**
```
1. Branch erstellen: `git checkout -b feature-name`
2. In Branch entwickeln (mit Claude Code)
3. Testen
4. Merge zu main: `git checkout main && git merge feature-name`
5. Push → Auto-Deploy
```

**Erfolgskriterium:**
- ✅ Workflow dokumentiert
- ✅ Quick Reference erstellt
- ✅ Kann Workflow erklären

---

## Phase 4: Erste Praxis-Session

### Häppchen 4.1: Echtes Feature mit neuem Workflow (30 Min)

**Was:**
- Kleines Feature komplett mit neuem Setup durchziehen
- Alle Tools nutzen

**Beispiel-Feature:**
- Neue "Contact"-Seite erstellen
- Mit Claude Code entwickeln
- Via Git committen
- Auf GitHub pushen
- Auf Netlify deployen

**Schritte:**

```bash
# 1. Claude Code starten
cd E:\Neuanfang\a_yang\153_H2me
npx @anthropic-ai/claude-code

# 2. Feature entwickeln
> Erstelle page-contact.html basierend auf page-yang.html
> Füge Kontaktformular hinzu (nur Frontend, kein Backend)
> Erstelle page-contact.css mit Bian-Farben
> Füge zur Navigation hinzu

# 3. Lokal testen
# Browser öffnen: file:///E:/Neuanfang/a_yang/153_H2me/page-contact.html

# 4. Commit & Push
git add .
git commit -m "Add contact page with form"
git push

# 5. Online testen
# https://h2m.art/page-contact.html (nach ~30 Sek)
```

**Erfolgskriterium:**
- ✅ Feature komplett mit neuem Workflow durchgezogen
- ✅ Von Claude Code → GitHub → Netlify funktioniert
- ✅ Verstehe wie alles zusammenspielt

---

## Troubleshooting

### Claude Code Probleme

**"claude-code command not found":**
```bash
# Lösung: npx nutzen statt globalem Befehl
npx @anthropic-ai/claude-code --version

# Falls das auch nicht geht:
# Node.js installieren (falls nicht vorhanden)
# https://nodejs.org/
# Dann: npm install -g @anthropic-ai/claude-code
```

**"Authentication failed":**
```bash
npx @anthropic-ai/claude-code auth logout
npx @anthropic-ai/claude-code auth login
# Browser-Tab folgen
```

---

### Git Probleme

**"Permission denied (publickey)":**
```bash
# SSH Key erstellen und zu GitHub hinzufügen
ssh-keygen -t ed25519 -C "deine@email.com"
# Public Key zu GitHub: Settings → SSH Keys → Add
```

**"Merge conflict":**
```bash
# In Claude Code:
> Löse Merge Conflict in [filename]
# Claude hilft beim Mergen
```

---

### Netlify Probleme

**"Deploy failed":**
- Check Netlify Deploy Log
- Oft: Pfad-Problem (absolut vs. relativ)
- Falls unklar: Drag & Drop als Fallback

**"Site nicht erreichbar":**
- DNS kann 24h dauern (bei Domain-Änderung)
- Cache leeren: Ctrl+Shift+R

---

## Vorteile nach Setup

**Längere Sessions:**
- Claude Code: 10-20 Files ändern statt 2-3
- Keine Chat-Abbrüche mehr

**Bessere Versionskontrolle:**
- Jede Änderung in Git
- Zurückrollen jederzeit möglich
- Historie nachvollziehbar

**Auto-Deploy:**
- Push → Live in 30 Sekunden
- Kein manuelles Drag & Drop mehr
- Rollback auf vorherige Version möglich

**Zusammenarbeit möglich:**
- Code auf GitHub = Portfolio-Vorzeigbar
- Andere können Code sehen (bei Public)
- Issues & Discussions möglich

---

## Nächste Schritte nach Setup

**Optional - Erweiterte Features:**

1. **GitHub Actions** (CI/CD)
   - Automatische Tests vor Deploy
   - Code-Qualität Checks
   - ~2-3h Aufwand

2. **Branches für Features**
   - Main = Stable
   - Feature-Branches für Experimente
   - ~1h Aufwand

3. **README.md**
   - Projekt-Dokumentation
   - Screenshots
   - Setup-Anleitung
   - ~1h Aufwand

---

## Zusammenfassung

**Gesamt-Zeit:** ~3-4 Stunden (einmalig)

**Phasen:**
1. ✅ Claude Code Setup (40 Min)
2. ✅ GitHub Repository Setup (40 Min)
3. ✅ Workflow Integration (40 Min)
4. ✅ Erste Praxis-Session (30 Min)

**Resultat:**
- Längere Entwicklungs-Sessions ohne Abbrüche
- Versionskontrolle & Backup auf GitHub
- Auto-Deploy via Netlify
- Professioneller Workflow

**Empfehlung:**
- Phase 1-2 an einem Tag
- Phase 3-4 an anderem Tag
- Nicht alles auf einmal

---

_Erstellt: 2025-10-26 14:12_
