# Backend Setup - H2me Calendar

Setup-Anleitung f�r Netlify Functions und API-Integration.

## 1. Environment Variables

Kopiere `.env.example` zu `.env` und f�lle die Werte aus:

```bash
cp .env.example .env
```

Siehe `.env.example` f�r alle ben�tigten Variablen.

### Ben�tigte Credentials:

**Nextcloud:**
- App-Password erstellen (Nextcloud � Einstellungen � Sicherheit)
- Kalender-Namen notieren

**Microsoft Outlook:**
- Azure App registrieren
- Client Secret erstellen
- API-Berechtigungen: Calendars.Read, offline_access
- Refresh Token holen

**GitHub (f�r Obsidian):**
- Personal Access Token (Scope: repo)

## 2. Local Testing

```bash
npm install -g netlify-cli
netlify dev
```

Server l�uft auf: `http://localhost:8888`

Functions testen:
```bash
curl http://localhost:8888/.netlify/functions/kwgt-feed
```

## 3. Deployment zu Netlify

1. Netlify Account erstellen
2. Repository verbinden
3. Environment Variables im Dashboard setzen
4. Git push � Auto-Deploy

## 4. Verf�gbare Functions

- `/api/kwgt-feed` - KWGT Widget Feed
- `/api/nextcloud-calendar` - Nextcloud CalDAV (H�ppchen 6)
- `/api/obsidian-tasks` - Obsidian Tasks (H�ppchen 7)
- `/api/outlook-calendar` - Outlook Events (H�ppchen 8)
- `/api/calendar-aggregate` - Unified Feed (H�ppchen 9)

## 5. Troubleshooting

**"Missing required environment variable"**
� Check .env file oder Netlify Environment Variables

**Nextcloud: "401 Unauthorized"**
� App-Password falsch oder abgelaufen

**Outlook: "Token refresh failed"**
� Refresh Token abgelaufen, neu holen

**GitHub: "403 Forbidden"**
� Token fehlt repo Scope

---

_Backend Setup Guide - H2me Calendar_
