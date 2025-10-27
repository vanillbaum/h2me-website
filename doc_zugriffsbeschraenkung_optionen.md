# Zugriffsbeschränkungen für h2m.art - Optionen Übersicht

## Überblick

Dieses Dokument beschreibt verschiedene Möglichkeiten, deine Website h2m.art nur für dich zugänglich zu machen. Die Optionen sind nach Komplexität und Aufwand sortiert.

---

## Option 1: Netlify Password Protection ⭐ EMPFOHLEN

### Beschreibung
Netlify bietet eine integrierte Passwort-Schutzfunktion, die mit wenigen Klicks aktiviert werden kann.

### Funktionsweise
- Ein einziges Passwort für die gesamte Website
- Besucher sehen Login-Seite vor Zugriff
- Passwort wird in Netlify Dashboard gesetzt

### Eigenschaften
- **Kosten:** Kostenlos (im Basic Plan enthalten)
- **Aufwand:** 2 Minuten Setup
- **Technische Komplexität:** Sehr niedrig
- **Geräte-Kompatibilität:** Alle Geräte (Desktop, Mobile)

### Vorteile
✅ Extrem einfach zu aktivieren  
✅ Kein Code nötig  
✅ Passwort jederzeit änderbar  
✅ Funktioniert überall  

### Nachteile
❌ Alle Besucher sehen Passwort-Prompt (auch wenn versehentlich falsche URL geteilt)  
❌ Nur ein Passwort für alle Seiten  

### Wann geeignet
- Du willst schnelle Lösung
- Seite soll komplett privat sein
- Du bist einziger Nutzer oder teilst Passwort mit wenigen Personen

---

## Option 2: HTTP Basic Auth via Netlify Headers ⭐ EMPFOHLEN

### Beschreibung
Browser-natives Login-Popup über HTTP Authentication Standard.

### Funktionsweise
- `_headers` File im Projekt-Ordner
- Browser zeigt Standard-Login-Dialog
- Username + Passwort wird geprüft

### Eigenschaften
- **Kosten:** Kostenlos
- **Aufwand:** 5 Minuten (File erstellen + deployen)
- **Technische Komplexität:** Niedrig
- **Geräte-Kompatibilität:** Alle modernen Browser

### Vorteile
✅ Einfach zu implementieren  
✅ Standard-Browser-Funktion  
✅ Keine externe Abhängigkeit  
✅ Username + Passwort möglich  

### Nachteile
❌ Login-Dialog nicht besonders elegant  
❌ Passwort im `_headers` File gespeichert (hash erforderlich)  

### Wann geeignet
- Du möchtest mehr Kontrolle als Option 1
- Browser-Standard ist ausreichend
- Du kannst minimale Code-Änderung vornehmen

---

## Option 3: IP-Whitelist

### Beschreibung
Nur bestimmte IP-Adressen dürfen auf die Website zugreifen.

### Funktionsweise
- Netlify Edge Functions prüfen Besucher-IP
- Nur deine IP(s) werden durchgelassen
- Alle anderen sehen Fehlermeldung

### Eigenschaften
- **Kosten:** Kostenlos bis 125k Requests/Monat
- **Aufwand:** 15 Minuten Setup
- **Technische Komplexität:** Mittel
- **Geräte-Kompatibilität:** Abhängig von IP-Setup

### Vorteile
✅ Kein Passwort nötig  
✅ Sehr sicher (unsichtbar für Außenstehende)  
✅ Automatisch für alle zugelassenen IPs  

### Nachteile
❌ Probleme bei dynamischen IPs (mobiles Internet)  
❌ Jedes neue Gerät/Netzwerk muss hinzugefügt werden  
❌ Umständlich bei häufigem Ortswechsel  
❌ Edge Functions Code erforderlich  

### Wann geeignet
- Du hast statische IP-Adresse (Home/Office)
- Du greifst immer von gleichen Orten zu
- Du willst "unsichtbare" Sicherheit

---

## Option 4: Private GitHub Repo + Netlify Identity/OAuth

### Beschreibung
Professionelle Authentifizierung über externe Login-Provider.

### Funktionsweise
- Netlify Identity System oder OAuth (Google, GitHub)
- User-Management in Netlify Dashboard
- Login-Seite mit externem Provider

### Eigenschaften
- **Kosten:** Netlify Identity = 5 User kostenlos, dann $19/Monat für 100 User
- **Aufwand:** 30-60 Minuten Setup
- **Technische Komplexität:** Mittel bis hoch
- **Geräte-Kompatibilität:** Alle Geräte

### Vorteile
✅ Professionelle Lösung  
✅ Multi-User möglich  
✅ Elegante Login-Seite gestaltbar  
✅ Erweiterbar (Rollen, Rechte, etc.)  

### Nachteile
❌ Komplexeres Setup  
❌ Code-Änderungen an Website nötig  
❌ Evtl. Kosten bei mehr als 5 Usern  
❌ Abhängigkeit von externem Provider  

### Wann geeignet
- Du planst mehrere User
- Du willst professionelle Lösung
- Du möchtest Zugriff granular steuern
- Zukünftige Erweiterung geplant

---

## Option 5: Subdomain mit DNS-Regeln (Security by Obscurity)

### Beschreibung
Website auf geheimer Subdomain hosten, die nicht öffentlich bekannt ist.

### Funktionsweise
- Subdomain wie `geheim-xyz123.h2m.art` erstellen
- Subdomain nicht teilen oder verlinken
- Hoffnung: Niemand findet die URL

### Eigenschaften
- **Kosten:** Kostenlos
- **Aufwand:** 5 Minuten DNS-Eintrag
- **Technische Komplexität:** Niedrig
- **Geräte-Kompatibilität:** Alle Geräte

### Vorteile
✅ Sehr schnell eingerichtet  
✅ Kein Login erforderlich  
✅ Funktioniert auf allen Geräten  

### Nachteile
❌ NICHT wirklich sicher (Security by Obscurity)  
❌ URL kann versehentlich geleakt werden  
❌ Suchmaschinen könnten indexieren  
❌ Jeder mit URL hat Zugriff  

### Wann geeignet
- Nur als temporäre Lösung
- Kombination mit echter Authentifizierung
- **NICHT empfohlen als einzige Sicherheit**

---

## Option 6: VPN-Zugang

### Beschreibung
Website nur über VPN-Verbindung erreichbar.

### Funktionsweise
- Eigener VPN-Server aufsetzen
- Website hinter VPN hosten
- Zugriff nur mit VPN-Verbindung möglich

### Eigenschaften
- **Kosten:** VPN-Server ab ~5€/Monat
- **Aufwand:** Mehrere Stunden Setup + Wartung
- **Technische Komplexität:** Hoch
- **Geräte-Kompatibilität:** Alle Geräte (mit VPN-Client)

### Vorteile
✅ Maximale Sicherheit  
✅ Komplette Kontrolle  
✅ Kann auch für andere Dienste genutzt werden  

### Nachteile
❌ Sehr komplex  
❌ Laufende Kosten  
❌ Wartungsaufwand  
❌ VPN-Setup auf allen Geräten nötig  
❌ Overkill für persönliche Website  

### Wann geeignet
- Du hast bereits VPN-Infrastruktur
- Höchste Sicherheitsanforderungen
- **Für deine Zwecke wahrscheinlich zu komplex**

---

## Vergleichstabelle

| Option | Aufwand | Kosten | Sicherheit | Mobile-freundlich | Empfehlung |
|--------|---------|--------|------------|-------------------|------------|
| Netlify Password | Sehr niedrig | Kostenlos | Mittel | ✅ Ja | ⭐⭐⭐ |
| HTTP Basic Auth | Niedrig | Kostenlos | Mittel | ✅ Ja | ⭐⭐⭐ |
| IP-Whitelist | Mittel | Kostenlos* | Hoch | ⚠️ Eingeschränkt | ⭐⭐ |
| Netlify Identity | Mittel-Hoch | Kostenlos* | Hoch | ✅ Ja | ⭐⭐ |
| Subdomain | Niedrig | Kostenlos | Niedrig | ✅ Ja | ⭐ |
| VPN | Sehr hoch | ~5€/Monat | Sehr hoch | ⚠️ Komplex | - |

*bei Basis-Nutzung

---

## Empfehlung für h2m.art

### Primär-Empfehlung: Option 1 oder 2

**Netlify Password Protection (Option 1)** ODER **HTTP Basic Auth (Option 2)**

### Begründung:
1. **Schnell & Einfach** - Beide in <5 Minuten umsetzbar
2. **Kostenlos** - Keine zusätzlichen Kosten
3. **Keine Code-Änderungen** - Deine HTML/CSS/JS bleiben unberührt
4. **Geräte-unabhängig** - Funktioniert auf Nothing Phone 3 genauso wie auf Desktop
5. **Passwort änderbar** - Jederzeit anpassbar
6. **Keine Abhängigkeiten** - Keine externe Services nötig

### Zusätzliche Überlegungen:
- Falls du später mehrere User willst → Option 4 (Netlify Identity)
- Falls du von festen Orten zugreifst → Option 3 (IP-Whitelist) zusätzlich
- Falls du "unsichtbar" sein willst → Option 5 (Subdomain) zusätzlich zu 1/2

---

## Nächste Schritte

1. **Entscheidung treffen:** Welche Option passt am besten?
2. **Setup durchführen:** Schritt-für-Schritt Anleitung folgen
3. **Testen:** Von verschiedenen Geräten/Netzwerken testen
4. **Passwort sicher speichern:** Z.B. in Passwort-Manager

---

## Offene Fragen

- Greifst du hauptsächlich von zu Hause zu oder auch unterwegs?
- Soll die Seite irgendwann für ausgewählte Personen zugänglich sein?
- Wie wichtig ist dir elegante vs. funktionale Lösung?
- Hast du bereits Netlify-Account-Zugang?

---

_Erstellt: 2025-10-26_  
_Projekt: H2me (h2m.art)_  
_Zweck: Entscheidungshilfe für Zugriffsbeschränkung_
