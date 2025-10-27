# Backend Setup - H2me Calendar

Setup-Anleitung für Netlify Functions und API-Integration.

## 1. Environment Variables

Kopiere `.env.example` zu `.env` und fülle die Werte aus:

```bash
cp .env.example .env
```

Siehe `.env.example` für alle benötigten Variablen.

### Benötigte Credentials:

**Nextcloud:**
- App-Password erstellen (Nextcloud ’ Einstellungen ’ Sicherheit)
- Kalender-Namen notieren

**Microsoft Outlook:**
- Azure App registrieren
- Client Secret erstellen
- API-Berechtigungen: Calendars.Read, offline_access
- Refresh Token holen

**GitHub (für Obsidian):**
- Personal Access Token (Scope: repo)

## 2. Local Testing

```bash
npm install -g netlify-cli
netlify dev
```

Server läuft auf: `http://localhost:8888`

Functions testen:
```bash
curl http://localhost:8888/.netlify/functions/kwgt-feed
```

## 3. Deployment zu Netlify

1. Netlify Account erstellen
2. Repository verbinden
3. Environment Variables im Dashboard setzen
4. Git push ’ Auto-Deploy

## 4. Verfügbare Functions

- `/api/kwgt-feed` - KWGT Widget Feed
- `/api/nextcloud-calendar` - Nextcloud CalDAV (Häppchen 6)
- `/api/obsidian-tasks` - Obsidian Tasks (Häppchen 7)
- `/api/outlook-calendar` - Outlook Events (Häppchen 8)
- `/api/calendar-aggregate` - Unified Feed (Häppchen 9)

## 5. Troubleshooting

**"Missing required environment variable"**
’ Check .env file oder Netlify Environment Variables

**Nextcloud: "401 Unauthorized"**
’ App-Password falsch oder abgelaufen

**Outlook: "Token refresh failed"**
’ Refresh Token abgelaufen, neu holen

**GitHub: "403 Forbidden"**
’ Token fehlt repo Scope

---

_Backend Setup Guide - H2me Calendar_
