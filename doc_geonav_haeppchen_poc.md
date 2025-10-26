# Geometrische Navigation - Häppchen-Planung PoC

## Proof of Concept Strategie

**Ziel:** Funktionierender PoC in kleinen, testbaren Schritten.

**Ansatz:** Häppchen-basiert, jedes Häppchen = 1-3 Stunden Arbeit.

---

## Häppchen 1: Basic Canvas + Würfel ⏱️ 1-2h ✅

**Ziel:** Statischer Würfel auf Canvas, dreht sich langsam.

**Tasks:**
- [x] HTML-Seite erstellen (`page-geonav-poc.html`)
- [x] Three.js Scene aufsetzen
- [x] Würfel-Geometrie erstellen
- [x] Kamera positionieren
- [x] Rendering Loop (Würfel dreht sich automatisch)
- [x] Test: Würfel sichtbar & dreht sich

**Output:**
- Funktionierender Canvas mit drehendem Würfel
- Basis für weitere Häppchen

**Code-Basis:**
```javascript
// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Würfel
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
```

---

## Häppchen 2: Drag-Interaktion ⏱️ 2-3h ✅

**Ziel:** User kann Würfel mit Maus drehen (Drag).

**Tasks:**
- [x] Maus-Events implementieren (`mousedown`, `mousemove`, `mouseup`)
- [x] Drag-State tracken (isDragging)
- [x] Maus-Delta in Rotation umwandeln
- [x] Auto-Rotation stoppen beim Drag
- [x] Test: Würfel dreht sich mit Maus-Bewegung

**Output:**
- Würfel reagiert auf Maus-Drag
- Smooth Rotation

**Code-Basis:**
```javascript
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  previousMouseX = e.clientX;
  previousMouseY = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - previousMouseX;
  const deltaY = e.clientY - previousMouseY;
  
  cube.rotation.y += deltaX * 0.01;
  cube.rotation.x += deltaY * 0.01;
  
  previousMouseX = e.clientX;
  previousMouseY = e.clientY;
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});
```

---

## Häppchen 3: Flächen-Beschriftung ⏱️ 1-2h ✅

**Ziel:** Jede Würfel-Fläche hat eine Beschriftung (View-Name).

**Tasks:**
- [x] Texture pro Fläche erstellen (Canvas 2D)
- [x] View-Namen auf Textures zeichnen
- [x] Material mit Textures erstellen
- [x] Würfel mit beschrifteten Flächen
- [x] Test: Namen sichtbar beim Drehen

**Output:**
- Würfel-Flächen zeigen View-Namen
- Basis für Klick-Erkennung

**Techniken:**
- Canvas 2D API für Text
- Three.js Texture aus Canvas
- Array von Materials für Würfel-Seiten

---

## Häppchen 4: Klick-Erkennung (Raycasting) ⏱️ 2-3h ✅

**Ziel:** Klick auf Fläche erkennen & View-Namen ausgeben.

**Tasks:**
- [x] Raycaster setup
- [x] Maus-Position in 3D umwandeln (Canvas-relativ)
- [x] Intersect mit Würfel berechnen
- [x] Face-Index ermitteln
- [x] Face-Index → View-Name mapping
- [x] Console-Log beim Klick
- [x] Test: Klick auf Fläche zeigt richtigen View-Namen
- [x] Drag vs. Click Unterscheidung
- [x] Visuelles Feedback (Flash-Effekt)

**Bugfixes:**
- Fixed: Raycaster-Position jetzt Canvas-relativ (nicht window-relativ)
- Fixed: `hasDragged` Variable korrekt implementiert
- Fixed: Variablen-Deklaration an richtiger Stelle
- Fixed: Initialer Render vor Animation-Loop

**Output:**
- Klick-Erkennung funktioniert
- Basis für Navigation

**Code-Basis:**
```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (e) => {
  // Maus-Position normalisieren (-1 bis +1)
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);
  
  if (intersects.length > 0) {
    const faceIndex = Math.floor(intersects[0].faceIndex / 2);
    console.log('Clicked face:', faceIndex);
  }
});
```

---

## Häppchen 5: Snap-Mechanik ⏱️ 3-4h ✅

**Ziel:** Nach Loslassen snappt Würfel zu nächster geraden Ansicht.

**Tasks:**
- [x] Aktuelle Rotation analysieren
- [x] Nächste "gerade" Rotation berechnen (Vielfache von 90°)
- [x] Smooth Animation zur Ziel-Rotation (Lerp)
- [x] Animation bei mouseup starten
- [x] Test: Würfel snappt smooth zu Flächen
- [x] Snap vs. Drag vs. Click Unterscheidung

**Implementation:**
- Euler-basierter Ansatz (einfach, für PoC ausreichend)
- `normalizeAngle()` - Winkel auf -π bis +π normalisieren
- `snapToNearest90()` - Nächstes Vielfaches von π/2 finden
- `lerp()` - Linear Interpolation
- `snapSpeed = 0.12` - Anpassbare Geschwindigkeit

**Output:**
- User-Friendly Snap-Verhalten
- Flächen immer klar sichtbar nach Drag
- Basis für Navigation

---

## Häppchen 6: Navigation integrieren ⏱️ 1-2h ✅

**Ziel:** Klick auf Fläche navigiert zu entsprechender Seite.

**Tasks:**
- [x] Face-Index → URL mapping
- [x] window.location bei Klick setzen
- [x] Test: Klick auf Yang-Fläche → page-yang.html
- [x] Alle 6 Flächen testen
- [x] Bug-Fix: Flash-Effekt entfernt (verhinderte saubere Navigation)

**Implementation:**
- Jede Fläche hat `url` Property im faceMapping
- Sofortige Navigation ohne visuelles Delay
- Console-Log zeigt Ziel-URL

**Output:**
- ✅ Funktionale Navigation via 3D-Würfel
- ✅ PoC KOMPLETT!

---

## 🎉 PoC Status: ABGESCHLOSSEN

**Minimal PoC (Häppchen 1-6): ✅ FERTIG**
- Geschätzte Zeit: ~11-16h
- Tatsächliche Zeit: ~2 Sessions
- Funktionalität: 100% wie geplant

**Der Würfel kann:**
- Automatisch rotieren
- Per Drag gedreht werden  
- Smooth zu geraden Ansichten snappen
- Flächen erkennen bei Klick
- Zu anderen Seiten navigieren

**Nächste Schritte (Optional):**

## Häppchen 7: Touch-Support ⏱️ 2h

**Ziel:** Touch-Drag auf Mobile funktioniert.

**Tasks:**
- [ ] Touch-Events (`touchstart`, `touchmove`, `touchend`)
- [ ] Touch-Position tracking
- [ ] Gleiche Logik wie Maus-Drag
- [ ] Test auf Mobile (Nothing Phone 3)

**Output:**
- Mobile-friendly Interaktion

---

## Häppchen 8: Styling & Polish ⏱️ 1-2h

**Ziel:** PoC sieht gut aus.

**Tasks:**
- [ ] Canvas Styling (fullscreen oder section)
- [ ] Beleuchtung im 3D (besser als wireframe)
- [ ] Farbschema (Yang/Bian/Yin)
- [ ] Loading State
- [ ] Fallback für nicht-3D Browser

**Output:**
- Polished PoC
- Demo-ready

---

## Total Zeit: ~15-20h

**Minimal PoC (Häppchen 1-6):** ~11-16h  
**Mit Touch & Polish (Häppchen 1-8):** ~15-20h

---

## Nach dem PoC

**Nächste Schritte:**
1. Feedback sammeln (User-Testing)
2. Entscheiden: In Landing-Page integrieren?
3. Erweitern: Variable View-Anzahlen
4. Optimieren: Performance auf Mobile

Siehe [[doc_geonav_roadmap]] für Langzeit-Planung.

---

**Verwandt mit:**
- [[doc_geonav_explain]] - Konzepte erklärt
- [[153_BOAT_Geometrische Navigation Views als Koerper]] (EntryPoint)

**Erstellt:** 2025-10-24  
**Projekt:** H2me (153_H2me)

---

## ba_Log

(LogClaudine:: (LogCreated:: 25-10-24 17:40) **POC-KOMPLETT_** Häppchen 1-6 abgeschlossen, funktionale Navigation via 3D-Würfel fertig, Drag/Snap/Click/Navigate alles funktional)
