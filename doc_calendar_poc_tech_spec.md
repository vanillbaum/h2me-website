# Calendar PoC - Technische Spezifikation für Claude Code

**Projekt:** H2me Calendar PoC  
**Pfad:** `E:\Neuanfang\a_yang\153_H2me\`  
**Target Device:** Nothing Phone 3 (390x844px, Portrait)  
**Erstellt:** 2025-10-29

---

## 📁 Projekt-Struktur

```
153_H2me/
├── page-calendar-poc.html    # Haupt-HTML
├── page-calendar-poc.css     # Mobile-First Styling
├── page-calendar-poc.js      # Alle JavaScript-Logik
└── doc_calendar_poc.md       # Konzept-Dokumentation (Referenz)
```

**Namenskonvention:** `page-*` für Web-Files (mit Hyphen)

---

## 🎯 PoC Ziel

**One-Line:** Mobile-First Zeitblock-Kalender mit Kategoriefarben, Drag & Drop, localStorage

**Kern-Features:**
1. Hybrid-View (Mini-Wochenübersicht + Tages-Detail)
2. Click-to-Add Modal für neue Blöcke
3. 7 Kategoriefarben (FF/Stefi/Körper/HH/MM/Bier/Undefiniert)
4. Drag & Drop (Move, Resize, Delete)
5. localStorage Persistierung
6. Touch-optimiert (Nothing Phone 3)

---

## 🎨 Design-System

### Kategoriefarben (CSS Variables)

```css
:root {
  /* Kategorien */
  --cat-ff: #FF8C00;         /* Orange */
  --cat-stefi: #DC143C;      /* Rot */
  --cat-koerper: #9370DB;    /* Violett */
  --cat-hh: #4169E1;         /* Blau */
  --cat-mm: #32CD32;         /* Grün */
  --cat-bier: #FFD700;       /* Gelb */
  --cat-undefined: #808080;  /* Grau */
  
  /* UI Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border: #DDDDDD;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Touch Targets */
  --touch-min: 44px;
}
```

### Transition-Blur (nur FF/MM/Bier)

```css
.block[data-category="ff"]::after,
.block[data-category="mm"]::after,
.block[data-category="bier"]::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: inherit;
  filter: blur(8px);
  opacity: 0.5;
  pointer-events: none;
}
```

---

## 📊 Daten-Struktur

### Block-Object

```javascript
{
  id: "uuid-v4-string",          // Eindeutige ID
  title: "Block-Titel",          // String
  date: "2025-10-31",            // ISO Date String (YYYY-MM-DD)
  startTime: "14:00",            // 24h Format (HH:mm)
  duration: 60,                  // Minuten (Int, Vielfaches von 15)
  category: "ff",                // ff|stefi|koerper|hh|mm|bier|undefined
  type: "event",                 // event|task
  editable: true                 // Boolean
}
```

### Kategorie-Config

```javascript
const CATEGORIES = {
  ff: { 
    name: "FF", 
    color: "var(--cat-ff)", 
    hasTransition: true 
  },
  stefi: { 
    name: "Stefiprojekte", 
    color: "var(--cat-stefi)", 
    hasTransition: false 
  },
  koerper: { 
    name: "Körperzeug", 
    color: "var(--cat-koerper)", 
    hasTransition: false 
  },
  hh: { 
    name: "HH", 
    color: "var(--cat-hh)", 
    hasTransition: false 
  },
  mm: { 
    name: "MM", 
    color: "var(--cat-mm)", 
    hasTransition: true 
  },
  bier: { 
    name: "Bier", 
    color: "var(--cat-bier)", 
    hasTransition: true 
  },
  undefined: { 
    name: "Undefiniert", 
    color: "var(--cat-undefined)", 
    hasTransition: false 
  }
};
```

---

## 🏗️ HTML-Struktur

### Gesamt-Layout

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Calendar PoC</title>
  <link rel="stylesheet" href="page-calendar-poc.css">
</head>
<body>
  <!-- Top-Bar -->
  <header class="top-bar">
    <h1 class="week-number">Woche 44</h1>
    <button class="btn-add" id="btnAdd">+</button>
  </header>

  <!-- Mini-Wochenübersicht -->
  <section class="mini-week" id="miniWeek">
    <!-- 7 Tage Mo-So, generiert via JS -->
  </section>

  <!-- Detail-View -->
  <main class="detail-view" id="detailView">
    <header class="detail-header">
      <button class="btn-nav" id="btnPrev">◀</button>
      <h2 class="current-date">Donnerstag, 31. Oktober</h2>
      <button class="btn-nav" id="btnNext">▶</button>
    </header>
    
    <div class="timeline-container">
      <div class="timeline" id="timeline">
        <!-- Zeitachse 00:00-23:45, generiert via JS -->
      </div>
      <div class="blocks-container" id="blocksContainer">
        <!-- Blöcke hier, positioniert via JS -->
      </div>
    </div>
  </main>

  <!-- Modal (Click-to-Add / Edit) -->
  <div class="modal" id="modal">
    <div class="modal-content">
      <h2 id="modalTitle">Block hinzufügen</h2>
      <form id="blockForm">
        <input type="text" id="inputTitle" placeholder="Titel" required>
        <input type="time" id="inputStartTime" required>
        <input type="number" id="inputDuration" placeholder="Dauer (Min)" step="15" min="15" required>
        <select id="inputCategory" required>
          <!-- Kategorien via JS -->
        </select>
        <select id="inputType" required>
          <option value="event">Event 🕐</option>
          <option value="task">Task ☐</option>
        </select>
        <button type="submit">Speichern</button>
      </form>
    </div>
  </div>

  <script src="page-calendar-poc.js"></script>
</body>
</html>
```

---

## 🎨 CSS-Layout

### Mobile-First Grid

```css
/* Top-Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.btn-add {
  width: var(--touch-min);
  height: var(--touch-min);
  font-size: 24px;
  border-radius: 50%;
  /* ... */
}

/* Mini-Wochenübersicht */
.mini-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
}

.mini-week__day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  min-height: var(--touch-min);
}

/* Detail-View Timeline */
.timeline-container {
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 200px); /* Adjust based on header heights */
}

.timeline {
  display: grid;
  grid-template-rows: repeat(96, 1fr); /* 24h * 4 (15min slots) */
  height: calc(96 * 40px); /* 40px pro 15min */
}

.timeline__slot {
  border-bottom: 1px solid var(--border);
  position: relative;
}

.timeline__slot:nth-child(4n) {
  border-bottom: 2px solid var(--border); /* Hourly markers */
}

/* Blocks */
.blocks-container {
  position: absolute;
  top: 0;
  left: 60px; /* Space for time labels */
  right: 0;
  height: 100%;
}

.block {
  position: absolute;
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  border-radius: 8px;
  padding: var(--spacing-sm);
  cursor: pointer;
  display: flex;
  gap: var(--spacing-xs);
  align-items: flex-start;
  
  /* Positioned via JS: */
  /* top: calc(startSlot * 40px); */
  /* height: calc(durationSlots * 40px); */
}

.block__icon {
  font-size: 16px;
  flex-shrink: 0;
}

.block__title {
  flex: 1;
  font-weight: 600;
}

.block__time {
  font-size: 12px;
  opacity: 0.8;
}

/* Modal */
.modal {
  display: none; /* Toggle via JS */
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal.open {
  display: flex;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: var(--spacing-lg);
  max-width: 90vw;
  width: 400px;
}
```

---

## 💻 JavaScript-Architektur

### State Management

```javascript
// Global State
let blocks = []; // Array of block objects
let currentDate = new Date(); // Currently displayed date
let currentWeekStart = null; // Monday of current week
let isModalOpen = false;
let editingBlockId = null; // null = add mode, string = edit mode

// Constants
const SLOT_HEIGHT = 40; // px per 15min
const SLOTS_PER_HOUR = 4;
const TOTAL_SLOTS = 96; // 24h * 4
```

### Kern-Funktionen

```javascript
// === Initialization ===
function init() {
  loadBlocks();
  renderMiniWeek();
  renderTimeline();
  renderBlocks();
  attachEventListeners();
}

// === localStorage ===
function loadBlocks() {
  const stored = localStorage.getItem('calendar-poc-blocks');
  if (stored) {
    try {
      blocks = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load blocks:', e);
      blocks = [];
    }
  } else {
    // Initial mock data
    blocks = createMockData();
  }
}

function saveBlocks() {
  try {
    localStorage.setItem('calendar-poc-blocks', JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to save blocks:', e);
  }
}

// === Rendering ===
function renderMiniWeek() {
  // Generate 7 day cells (Mo-So)
  // For each day: calculate color gradient based on blocks
  // Mark current day
}

function renderTimeline() {
  // Generate 96 time slots (00:00-23:45)
  // Every 4th slot (hour) gets time label
}

function renderBlocks() {
  // Filter blocks for currentDate
  // For each block:
  //   - Calculate top position (startTime → slot index → px)
  //   - Calculate height (duration → slot count → px)
  //   - Apply category color
  //   - Add icon (🕐/☐)
  //   - Add transition class if needed
}

// === Block CRUD ===
function addBlock(blockData) {
  blocks.push({
    id: generateUUID(),
    ...blockData,
    editable: true
  });
  saveBlocks();
  renderBlocks();
  renderMiniWeek();
}

function updateBlock(id, updates) {
  const index = blocks.findIndex(b => b.id === id);
  if (index !== -1) {
    blocks[index] = { ...blocks[index], ...updates };
    saveBlocks();
    renderBlocks();
    renderMiniWeek();
  }
}

function deleteBlock(id) {
  blocks = blocks.filter(b => b.id !== id);
  saveBlocks();
  renderBlocks();
  renderMiniWeek();
}

// === Modal ===
function openModal(mode = 'add', blockId = null) {
  editingBlockId = blockId;
  if (mode === 'edit' && blockId) {
    const block = blocks.find(b => b.id === blockId);
    prefillForm(block);
    document.getElementById('modalTitle').textContent = 'Block bearbeiten';
  } else {
    resetForm();
    document.getElementById('modalTitle').textContent = 'Block hinzufügen';
  }
  document.getElementById('modal').classList.add('open');
  isModalOpen = true;
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  isModalOpen = false;
  editingBlockId = null;
}

// === Navigation ===
function loadDay(date) {
  currentDate = new Date(date);
  renderBlocks();
  updateMiniWeekSelection();
  updateDetailHeader();
}

function loadPreviousDay() {
  const prev = new Date(currentDate);
  prev.setDate(prev.getDate() - 1);
  loadDay(prev);
}

function loadNextDay() {
  const next = new Date(currentDate);
  next.setDate(next.getDate() + 1);
  loadDay(next);
}

// === Drag & Drop (Häppchen 8) ===
let dragState = {
  isDragging: false,
  blockId: null,
  startY: 0,
  startSlot: 0,
  currentSlot: 0
};

function handleBlockTouchStart(e, blockId) {
  dragState.isDragging = true;
  dragState.blockId = blockId;
  dragState.startY = e.touches[0].clientY;
  // Get current block position
  const block = blocks.find(b => b.id === blockId);
  dragState.startSlot = timeToSlot(block.startTime);
}

function handleBlockTouchMove(e) {
  if (!dragState.isDragging) return;
  e.preventDefault();
  
  const deltaY = e.touches[0].clientY - dragState.startY;
  const deltaSlots = Math.round(deltaY / SLOT_HEIGHT);
  dragState.currentSlot = dragState.startSlot + deltaSlots;
  
  // Visual feedback (move element)
  const blockEl = document.querySelector(`[data-block-id="${dragState.blockId}"]`);
  blockEl.style.transform = `translateY(${deltaSlots * SLOT_HEIGHT}px)`;
}

function handleBlockTouchEnd() {
  if (!dragState.isDragging) return;
  
  // Snap to grid
  const snappedSlot = Math.max(0, Math.min(95, dragState.currentSlot));
  const newStartTime = slotToTime(snappedSlot);
  
  // Update block
  updateBlock(dragState.blockId, { startTime: newStartTime });
  
  // Reset
  dragState.isDragging = false;
}

// === Utility Functions ===
function timeToSlot(timeString) {
  // "14:00" → 56 (slot index)
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * SLOTS_PER_HOUR + Math.floor(minutes / 15);
}

function slotToTime(slotIndex) {
  // 56 → "14:00"
  const hours = Math.floor(slotIndex / SLOTS_PER_HOUR);
  const minutes = (slotIndex % SLOTS_PER_HOUR) * 15;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function formatDate(date) {
  // Date → "Donnerstag, 31. Oktober"
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]}`;
}

function getWeekNumber(date) {
  // Calculate ISO week number
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

// === Event Listeners ===
function attachEventListeners() {
  // Add button
  document.getElementById('btnAdd').addEventListener('click', () => openModal('add'));
  
  // Modal form
  document.getElementById('blockForm').addEventListener('submit', handleFormSubmit);
  
  // Navigation buttons
  document.getElementById('btnPrev').addEventListener('click', loadPreviousDay);
  document.getElementById('btnNext').addEventListener('click', loadNextDay);
  
  // Touch events for drag & drop (added dynamically to blocks)
  // Swipe detection for day navigation (on detail-view)
}

// === Init on load ===
document.addEventListener('DOMContentLoaded', init);
```

---

## 📱 Touch-Optimierung

### Wichtige Constraints

```css
/* Minimum Touch Target Size */
button, .clickable {
  min-width: 44px;
  min-height: 44px;
}

/* Prevent Double-Tap Zoom */
* {
  touch-action: manipulation;
}

/* Prevent Text Selection during Drag */
.block {
  user-select: none;
  -webkit-user-select: none;
}

/* Smooth Scrolling */
.timeline-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

### Swipe-Detection

```javascript
let swipeState = {
  startX: 0,
  startY: 0,
  threshold: 50 // px
};

function handleSwipeStart(e) {
  swipeState.startX = e.touches[0].clientX;
  swipeState.startY = e.touches[0].clientY;
}

function handleSwipeEnd(e) {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const deltaX = endX - swipeState.startX;
  const deltaY = endY - swipeState.startY;
  
  // Horizontal swipe (day navigation)
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeState.threshold) {
    if (deltaX > 0) {
      loadPreviousDay(); // Swipe right
    } else {
      loadNextDay(); // Swipe left
    }
  }
  
  // Vertical swipe on block (delete)
  // (Häppchen 11)
}
```

---

## 🧪 Mock-Daten

```javascript
function createMockData() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  return [
    {
      id: generateUUID(),
      title: "Morning Coffee",
      date: todayStr,
      startTime: "08:00",
      duration: 30,
      category: "mm",
      type: "task",
      editable: true
    },
    {
      id: generateUUID(),
      title: "Team Meeting",
      date: todayStr,
      startTime: "10:00",
      duration: 60,
      category: "hh",
      type: "event",
      editable: true
    },
    {
      id: generateUUID(),
      title: "Lunch Break",
      date: todayStr,
      startTime: "12:00",
      duration: 45,
      category: "koerper",
      type: "task",
      editable: true
    },
    {
      id: generateUUID(),
      title: "Code Review",
      date: todayStr,
      startTime: "14:00",
      duration: 90,
      category: "ff",
      type: "event",
      editable: true
    },
    {
      id: generateUUID(),
      title: "Beer Tasting Notes",
      date: todayStr,
      startTime: "18:00",
      duration: 60,
      category: "bier",
      type: "task",
      editable: true
    }
  ];
}
```

---

## ✅ Häppchen-Checkliste (Quick Reference)

1. **HTML-Grundgerüst** - Struktur mit beiden Views
2. **CSS Basis** - Mobile-First Layout + Farben
3. **JS Basis + Mock** - Render-Logik + Mock-Daten
4. **Click-to-Add** - Modal + Form + Create
5. **localStorage** - Persistierung
6. **Mini-Week Farben** - linear-gradient per Tag
7. **Tap-Navigation** - Day-Selection
8. **Drag-to-Move** - Touch-Events + Snapping (KOMPLEX!)
9. **Resize-Handle** - Duration-Änderung
10. **Tap-to-Edit** - Modal prefill + Update
11. **Swipe-to-Delete** - Swipe-Detection + Confirm
12. **Transition-Blur** - CSS ::after für FF/MM/Bier
13. **Swipe-Navigation** - Day-Wechsel via Swipe
14. **Polish** - Touch-Targets, Empty-States, Performance

---

## 🚀 Start-Anleitung für Claude Code

1. **Projekt-Ordner:** `E:\Neuanfang\a_yang\153_H2me\`
2. **Erste Files:** `page-calendar-poc.html`, `.css`, `.js`
3. **Start:** Häppchen 1 (HTML-Grundgerüst)
4. **Referenz:** `doc_calendar_poc.md` (14 Entscheidungen)
5. **Testing:** Browser DevTools Mobile (390x844px)

**Pro Häppchen:**
- Implementieren was im Häppchen steht
- NICHT implementieren was unter "Was NICHT gemacht wird" steht
- Status in `doc_calendar_poc_planung.md` updaten
- Bei Fragen: `doc_calendar_poc.md` nachschlagen

---

## 📝 Wichtige Hinweise

**Do's:**
- ✅ Vanilla JS (kein Framework)
- ✅ Mobile-First CSS
- ✅ Relative Pfade (keine absoluten)
- ✅ Forward Slashes in Pfaden
- ✅ Häppchen-weise arbeiten (Scope beachten!)
- ✅ localStorage für Persistierung

**Don'ts:**
- ❌ Keine Frameworks (React, Vue, etc.)
- ❌ Keine Build-Tools (Webpack, Vite)
- ❌ Keine Collision-Detection (Überlappung erlaubt!)
- ❌ Keine Desktop-Styles (erst später)
- ❌ Keine Ganztägig-Events (vorerst)

---

## 📝 Changelog

(LogClaudine:: (LogCreated:: 25-10-29 14:48) **TECH-SPEC-CREATED** Vollständige technische Spezifikation für Claude Code: Projekt-Struktur, Design-System (7 Kategoriefarben), Daten-Struktur (Block-Object), HTML/CSS/JS Architektur, Touch-Optimierung, Mock-Daten, Code-Snippets für alle 14 Häppchen)

---

_Erstellt: 2025-10-29 14:48 - Bereit für Claude Code Implementation_
