# Roadmap: Claude Code Setup + GitHub Integration

**Projekt:** H2me (h2m.art)  
**Ziel:** Längere Entwicklungs-Sessions ohne Chat-Abbrüche  
**Erstellt:** 2025-10-26
**Status:** Phase 3 Häppchen 3.2 abgeschlossen ✅ - Test steht noch aus

---

## 📊 Fortschritt

### Phase 1: Claude Code Setup ✅
- [x] Häppchen 1.1: Installation
- [x] Häppchen 1.2: Projekt-Verbindung
- [ ] Häppchen 1.3: Workflow verstehen (später)

### Phase 2: GitHub Setup ✅
- [x] Häppchen 2.1: Git installieren
- [x] Häppchen 2.2: .gitignore erstellen
- [x] Häppchen 2.3: Lokales Git Repository
- [x] Häppchen 2.4: GitHub Repository erstellen

### Phase 3: Workflow Integration ⏳
- [ ] Häppchen 3.1: Claude Code mit Git
- [x] Häppchen 3.2: Netlify + GitHub Integration ✅
- [ ] Häppchen 3.3: Workflow-Dokumentation + Test ← **JETZT HIER**

### Phase 4: Praxis ⏸️
- [ ] Häppchen 4.1: Echtes Feature mit neuem Workflow

---

## Übersicht

Diese Roadmap führt dich durch:
1. **Claude Code Installation** ✅ - Terminal-basiertes Tool für längere Sessions
2. **GitHub Repository Setup** ✅ - Versionskontrolle & Backup
3. **Workflow Integration** ⏳ - Wie beide Tools zusammenarbeiten
4. **Erste Praxis** ⏸️ - Workflow testen

**Geschätzte Zeit:** 1-2 Stunden (einmalig)

---

## Phase 1: Claude Code Setup ✅

### Häppchen 1.1: Installation ✅

**Lessons Learned:**
- Bei "OAuth token expired" im Claude Code Prompt: `/login` eingeben
- Claude Code arbeitet auf Deutsch wenn User auf Deutsch schreibt
- Session bleibt aktiv zwischen Befehlen
- `npx @anthropic-ai/claude-code` nutzen (nicht global installiert)

---

### Häppchen 1.2: Projekt-Verbindung ✅

**Lessons Learned:**
- Claude Code findet und kategorisiert Files automatisch
- Search-Funktion mit Patterns funktioniert gut
- 16 HTML-Files im H2me-Projekt erkannt

---

### Häppchen 1.3: Workflow verstehen ⏸️

**Status:** Verschoben nach Phase 3  
**Grund:** Erst Netlify Integration, dann praktisch testen

---

## Phase 2: GitHub Repository Setup ✅

### Häppchen 2.1: Git installieren ✅

**Status:** War bereits installiert
- Git Version: 2.51.0.windows.1
- Konfiguriert mit Name und Email

---

### Häppchen 2.2: .gitignore erstellen ✅

**Erstellt:** `E:\Neuanfang\a_yang\153_H2me\.gitignore`

**Ausgeschlossen von Git:**
- `archives/` und `old_*/` (Backups)
- `logs/doc_log_*.md` (Session-Logs)
- Temporäre Files (`*.tmp`, `*.bak`, etc.)
- Editor-spezifisch (`.vscode/`, `.idea/`)

---

### Häppchen 2.3: Lokales Git Repository ✅

**Durchgeführt:**
```bash
git init
git add .
git commit -m "Initial commit: H2me website v1.0"
```

**Resultat:**
- 88 Files committed
- 11477 Zeilen Code
- Erster Commit erfolgreich

---

### Häppchen 2.4: GitHub Repository ✅

**Erstellt:** https://github.com/vanillbaum/h2me-website

**Durchgeführt:**
```bash
git remote add origin https://github.com/vanillbaum/h2me-website.git
git branch -M main
git push -u origin main
```

**Resultat:**
- Repository ist Private
- 92 Objects zu GitHub gepusht
- Verbindung erfolgreich

---

## Phase 3: Workflow Integration ⏳

### Häppchen 3.1: Claude Code mit Git ⏸️

**Was:**
- Claude Code nutzen für Git-Commits
- Automatische Commit-Messages

**Status:** Verschoben zu Phase 4 (praktisch testen)

---

### Häppchen 3.2: Netlify + GitHub Integration ✅

**Was:**
- Netlify mit GitHub verbinden
- Auto-Deploy bei Push einrichten

**Durchgeführte Schritte:**

1. **Netlify Site Configuration geöffnet**
   - https://app.netlify.com → h2me.art Project

2. **Build & Deploy Settings**
   - Continuous deployment → Link repository

3. **GitHub Verbindung**
   - Netlify App auf GitHub installiert
   - Zugriff nur auf "h2me-website" Repository (Private)
   - Branch: `main`

4. **Build Settings**
   - Base directory: LEER (Root)
   - Build command: LEER (keine Build nötig)
   - Publish directory: LEER (Root)
   - ✅ Korrekt für statische HTML-Website

5. **Deploy**
   - Erster Auto-Deploy erfolgreich
   - Status: "Published"
   - Site deployt von GitHub

**Erfolgskriterien erreicht:**
- ✅ GitHub → Netlify Verbindung funktioniert
- ✅ "Deploys from GitHub" aktiv
- ✅ Erster Deploy erfolgreich

**Lessons Learned:**
- Statische Websites brauchen KEINE Build-Settings
- "Only select repositories" ist sicherer als "All repositories"
- Netlify erkennt automatisch den richtigen Branch (main)
- Initial Deploy dauert ~30 Sekunden

---

### Häppchen 3.3: Workflow-Dokumentation + Test ⏳

**Status:** Session abgebrochen - zu müde

**Problem identifiziert:**
- Repository auf GitHub auf "Public" gesetzt (vorher Private)
- Grund: Vercel blockiert Private Repos auf Free-Plan
- Push funktioniert, aber Page nicht updated
- **Debugging nötig:** Vercel Deploys checken

**Nächste Schritte (für nächste Session):**
1. Vercel Deploys prüfen (ist neuer Deploy gelaufen?)
2. Domain-Routing checken (h2m.art vs. vercel.app)
3. Evtl. zurück zu Netlify wechseln (wie ursprünglich geplant)

**Test-Plan (für später):**
```bash
cd E:\Neuanfang\a_yang\153_H2me

# Kleine Test-Änderung
echo "<!-- GitHub Auto-Deploy Test -->" >> index.html

# Commit & Push
git add index.html
git commit -m "Test: GitHub auto-deploy"
git push

# Warten ~30 Sekunden
# Prüfen: Vercel Dashboard → Deploys
# Prüfen: Änderung auf h2m.art sichtbar?
```

**Täglicher Workflow (nach erfolgreichem Test):**
```
1. Lokal entwickeln (Editor oder Claude Code)
2. Lokal testen: file:///E:/Neuanfang/a_yang/153_H2me/
3. Git commit: git add . && git commit -m "..."
4. Git push: git push
5. Warten ~30 Sek
6. Online testen: https://h2m.art
```

**Erfolgskriterien:**
- ✅ Repository auf Public gesetzt
- ⏳ Push-Test (funktioniert Push ohne Error?)
- ⏳ Deploy-Test (deployed Vercel automatisch?)
- ⏳ Live-Test (ist Änderung auf h2m.art sichtbar?)

---

## Phase 4: Erste Praxis-Session ⏸️

### Häppchen 4.1: Echtes Feature mit neuem Workflow (30 Min)

**Beispiel-Feature:**
- Neue Seite erstellen
- Mit Claude Code entwickeln
- Via Git committen
- Auf GitHub pushen
- Auf Netlify deployen

**Wird durchgeführt nach erfolgreichem Test in 3.3**

---

## Troubleshooting

### Claude Code Probleme

**"claude-code command not found":**
```bash
npx @anthropic-ai/claude-code --version
```

**"OAuth token expired":**
```bash
# Im Claude Code Prompt: /login
```

---

### Git Probleme

**"Permission denied (publickey)":**
```bash
ssh-keygen -t ed25519 -C "deine@email.com"
# Public Key zu GitHub: Settings → SSH Keys → Add
```

**"Merge conflict":**
```bash
# In Claude Code:
> Löse Merge Conflict in [filename]
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

## Lessons Learned (Gesamt)

### Phase 1: Claude Code
- `npx @anthropic-ai/claude-code` nutzen (kein globaler Install)
- `/login` bei OAuth-Problemen
- Session bleibt aktiv zwischen Befehlen

### Phase 2: GitHub
- Git war bereits installiert (2.51.0)
- Line Ending Warnings sind normal (CRLF → LF)
- 88 Files = 11477 Zeilen im Initial Commit
- Private Repository gewählt

### Phase 3: Netlify Integration
- "Only select repositories" ist sicherer
- Statische Websites brauchen KEINE Build-Settings
- Netlify erkennt Branch automatisch
- Initial Deploy dauert ~30 Sekunden
- "Deploys from GitHub" zeigt aktive Integration

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

---

## Zusammenfassung

**Gesamt-Zeit:** ~3-4 Stunden (einmalig)

**Phasen:**
1. ✅ Claude Code Setup (40 Min) - Abgeschlossen
2. ✅ GitHub Repository Setup (40 Min) - Abgeschlossen
3. ⏳ Workflow Integration (40 Min) - Häppchen 3.2 ✅, Test 3.3 ausstehend
4. ⏸️ Erste Praxis-Session (30 Min) - Wartet

**Nächster Schritt:** Auto-Deploy Test durchführen (Häppchen 3.3)

**Aktueller Stand:**
- GitHub Integration: ✅ Funktioniert
- Auto-Deploy: ✅ Eingerichtet, ⏳ Test ausstehend
- Workflow: ⏳ Noch zu dokumentieren

---

_Erstellt: 2025-10-26 14:12_  
_Zuletzt aktualisiert: 2025-10-26 15:44 (Session abgebrochen - Problem mit Vercel Deploy)_

---

## Session-Notes

### 2025-10-26 15:44 - Vercel Deploy Problem

**Situation:**
- Vercel blockiert Deploys: "Unrecognized Git contributor"
- Free-Plan erlaubt nur verifizierte Members bei Private Repos
- Lösung: Repository auf "Public" gesetzt auf GitHub
- Push funktioniert, aber Page nicht updated

**Status:**
- Repository: Public ✅
- Push: Erfolgreich (vermutlich) ⏳
- Deploy: Unklar ⏳
- Live-Update: Nicht sichtbar ❌

**Nächste Session:**
- Vercel Dashboard → Deploys checken
- Evtl. Netlify statt Vercel nutzen
- Workflow komplett durchgehen
