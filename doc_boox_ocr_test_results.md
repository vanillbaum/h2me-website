# OCR-Test Ergebnisse - Tesseract auf Kalender-PNG

**Datum:** 2025-10-26 13:10  
**File:** 20251024_1.png  
**Engine:** Tesseract 5.3.4 (ohne deutsche Sprachdaten)

---

## Visueller Inhalt (manuell gelesen)

**Oben:**
- "FERIE" (Ferien)
- "2008" / "2310" (rechts)

**Links:**
- "SUORCHE" (Suche)
- "Atbe" (Arbeit)
- "git installiere Bot WEB mode"

**Rechts (Bullet-Liste):**
- "H8 Rückdabel"
- "Losenachtauen."
- "Maef?"
- "HAUBERLIN WEG adi aeudsre"
- "Begu cheelt"

---

## Tesseract OCR-Ergebnisse

### PSM 3 (Fully automatic) - BESTE Qualität
```
FERRE
SOOeRCHR
Aebo

Gr WEB

Qacd
931ho

HS Qe cholo

o Lescrcackt arr.

Hol

LAOS ETI FS
adi warner

Bean chuck
```

**Confidence:** 33.8% (sehr niedrig!)

### PSM 6 (Uniform block of text)
```
FERC rotee
SOORchr + NS Petal
© Larenacktare.
o Harl %
Ae » LAOS EIR FSS
iv Wa eS ge ads
Or 6S EG © Bony el} gob
```

### PSM 11 (Sparse text, find as much text as possible)
```
FERC
Qacd
Q231o
SOOPchr
© U8 Pckeliod
Lesercackt anu
eo Haorl ¢
Axebv
- LADSERUIL ES
adi Wk
La LL Qye_
Sr WEG
© Boge check,
```

---

## Qualitäts-Bewertung

### Erfolgreich erkannt:
✅ "FERIE" → "FERRE" (erkennbar)
✅ "WEB" → "WEB" (korrekt!)
✅ "git" → "Gr" (teilweise)
✅ Zahlen "2008" → "Qacd" (schlecht)

### Nicht erkannt / falsch:
❌ "SUORCHE" → "SOOeRCHR" / "SOORCHER" (ähnlich aber falsch)
❌ "Atbe" → "Aebo" / "Axebv" (falsch)
❌ "HAUBERLIN" → "LAOS ETI" (komplett falsch)
❌ "installiere" → nicht erkannt
❌ "Begu cheelt" → "Bean chuck" (zufällig ähnlich)

### Confidence-Problem:
- **Durchschnitt: 33.8%** (Mock-Schätzung war 78.5%)
- **Delta: -44.7%** (viel schlechter als erwartet!)

---

## Ursachen für schlechte Qualität

1. **Handschrift:** Individuelle Schreibweise, nicht standardisiert
2. **Schweizerdeutsch:** Tesseract trainiert auf Hochdeutsch/Englisch
3. **Kein DE-Sprachpaket:** Tesseract lief mit Englisch (deu.traineddata fehlt)
4. **Mixed Content:** Normale Schrift + Tech-Begriffe (git, WEB)
5. **Layout:** Zwei Spalten (Links/Rechts), Bullet-Points verwirren OCR

---

## Schlussfolgerungen

### ❌ Tesseract NICHT ausreichend für Kalender-PNGs
- Confidence zu niedrig (33.8% vs. gewünschte >70%)
- Zu viele Fehler für verlässliche Keyword-Extraktion
- Schweizerdeutsch ist große Hürde

### ✅ Cloud-OCR NOTWENDIG
**Optionen:**
1. **Google Vision API** - Gut für Handschrift, Multilingual
2. **Azure Document Intelligence** - Spezialisiert auf Handschrift
3. **AWS Textract** - Alternative

**Kosten-Schätzung (für alle ~300 Kalender-PNGs):**
- Google Vision: ~300 Seiten × $0.0015 = **$0.45**
- Azure: ~300 Seiten × $0.0015 = **$0.45**

### 🤔 Hybrid-Ansatz?
**Möglichkeit:** Tesseract + Post-Correction mit AI
- Tesseract für erste Pass (kostenlos)
- GPT-4 für Fehlerkorrektur (Schweizerdeutsch → Hochdeutsch)
- Günstiger als direkt Cloud-OCR?

---

## Empfehlung für Phase 1

**Kurz:** 
- **Tesseract für Kalender-PNGs NICHT verwenden**
- **Cloud-OCR (Google Vision) einplanen**
- **Budget erhöhen: $0.20 → $0.50** (für alle PNGs + einige PDFs)

**Lang:**
Starte Phase 1 mit Import-Script (ohne OCR), dann:
1. Google Vision API Key einrichten
2. 5 Test-PNGs mit Cloud-OCR (Budget: $0.01)
3. Qualität bewerten
4. Wenn >70% Confidence: Alle ~300 PNGs verarbeiten ($0.45)

---

## Nächste Schritte

- [ ] User über Ergebnis informieren
- [ ] Budget-Erhöhung besprechen ($0.20 → $0.50)
- [ ] Entscheidung: Direkt Cloud-OCR oder Hybrid-Ansatz?
- [ ] Phase 1 Import-Script starten (ohne OCR zuerst)
