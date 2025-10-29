/**
 * Calendar PoC - JavaScript Logic
 * Mobile-First Zeitblock-Kalender
 */

// ===== GLOBAL STATE =====
let blocks = [];
let currentDate = new Date();
let currentWeekStart = null;
let isModalOpen = false;
let editingBlockId = null;

// Drag state (Häppchen 8)
let isDragging = false;
let dragBlockId = null;
let dragStartY = 0;
let dragStartSlot = 0;
let dragBlockElement = null;

// Resize state (Häppchen 9)
let isResizing = false;
let resizeBlockId = null;
let resizeStartY = 0;
let resizeStartDuration = 0;
let resizeBlockElement = null;

// Swipe state (Häppchen 11)
let swipeStartX = 0;
let swipeStartY = 0;
let swipeBlockElement = null;
let swipeBlockId = null;

// Day swipe state (Häppchen 13)
let daySwipeStartX = 0;
let daySwipeStartY = 0;
let isDaySwiping = false;

// ===== CONSTANTS =====
const SLOT_HEIGHT = 40; // px per 15min
const SLOTS_PER_HOUR = 4;
const TOTAL_SLOTS = 96; // 24h * 4

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

// ===== INITIALIZATION =====
function init() {
    console.log('🚀 Calendar PoC initializing...');

    // Load data from localStorage or use mock
    loadBlocks();

    // Set initial week
    currentWeekStart = getWeekStart(currentDate);

    // Render UI
    renderMiniWeek();
    renderTimeline();
    renderBlocks();
    updateHeader();

    // Attach event listeners
    attachEventListeners();

    // Häppchen 14: Auto-scroll to current time
    scrollToCurrentTime();

    console.log('✅ Calendar PoC initialized');
}

// Häppchen 14: Auto-scroll helper
function scrollToCurrentTime() {
    const now = new Date();
    const todayStr = formatDateISO(now);
    const currentDateStr = formatDateISO(currentDate);

    // Only scroll if viewing today
    if (todayStr === currentDateStr) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSlot = currentHour * SLOTS_PER_HOUR + Math.floor(currentMinute / 15);

        // Scroll to 1 hour before current time (for context)
        const targetSlot = Math.max(0, currentSlot - SLOTS_PER_HOUR);
        const targetY = targetSlot * SLOT_HEIGHT;

        const container = document.getElementById('timelineContainer');
        if (container) {
            setTimeout(() => {
                container.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// ===== MOCK DATA =====
function createMockData() {
    const today = new Date();
    const todayStr = formatDateISO(today);

    // Create some blocks for today and tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatDateISO(tomorrow);

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
            duration: 90,
            category: "hh",
            type: "event",
            editable: true
        },
        {
            id: generateUUID(),
            title: "Lunch Break",
            date: todayStr,
            startTime: "12:30",
            duration: 60,
            category: "koerper",
            type: "task",
            editable: true
        },
        {
            id: generateUUID(),
            title: "H2me Development",
            date: todayStr,
            startTime: "14:00",
            duration: 120,
            category: "stefi",
            type: "event",
            editable: true
        },
        {
            id: generateUUID(),
            title: "Beer Tasting Notes",
            date: todayStr,
            startTime: "18:00",
            duration: 45,
            category: "bier",
            type: "task",
            editable: true
        },
        {
            id: generateUUID(),
            title: "Client Meeting",
            date: tomorrowStr,
            startTime: "09:00",
            duration: 60,
            category: "ff",
            type: "event",
            editable: true
        },
        {
            id: generateUUID(),
            title: "Gym Session",
            date: tomorrowStr,
            startTime: "17:00",
            duration: 90,
            category: "koerper",
            type: "task",
            editable: true
        }
    ];
}

// ===== RENDERING =====
function renderMiniWeek() {
    const container = document.getElementById('miniWeek');
    if (!container) return;

    container.innerHTML = '';

    const weekStart = currentWeekStart;
    const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        const dateStr = formatDateISO(date);
        const isToday = dateStr === formatDateISO(new Date());
        const isCurrent = dateStr === formatDateISO(currentDate);

        const dayEl = document.createElement('div');
        dayEl.className = 'mini-week__day';
        if (isToday) dayEl.classList.add('today');
        if (isCurrent) dayEl.classList.add('active');
        dayEl.dataset.date = dateStr;

        // Get blocks for this day
        const dayBlocks = blocks.filter(b => b.date === dateStr);

        dayEl.innerHTML = `
            <span class="mini-week__label">${days[i]}</span>
            <span class="mini-week__date">${date.getDate()}</span>
            <div class="mini-week__colors"></div>
        `;

        // Render color bar for this day
        const colorsEl = dayEl.querySelector('.mini-week__colors');
        if (colorsEl) {
            renderMiniWeekColors(colorsEl, dayBlocks);
        }

        container.appendChild(dayEl);
    }

    // Re-attach listeners after rendering (Häppchen 7)
    attachMiniWeekListeners();
}

function renderMiniWeekColors(container, dayBlocks) {
    if (dayBlocks.length === 0) {
        container.style.background = 'transparent';
        return;
    }

    // Sort blocks by start time
    const sortedBlocks = [...dayBlocks].sort((a, b) => {
        return timeToSlot(a.startTime) - timeToSlot(b.startTime);
    });

    // Get category colors
    const colors = sortedBlocks.map(block => {
        const category = CATEGORIES[block.category];
        return category ? category.color : 'var(--cat-undefined)';
    });

    // Create linear gradient
    if (colors.length === 1) {
        container.style.background = colors[0];
    } else {
        const step = 100 / colors.length;
        const stops = colors.map((color, index) => {
            const start = index * step;
            const end = (index + 1) * step;
            return `${color} ${start}% ${end}%`;
        }).join(', ');
        container.style.background = `linear-gradient(to right, ${stops})`;
    }
}

function renderTimeline() {
    const container = document.getElementById('timeline');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const slotEl = document.createElement('div');
        slotEl.className = 'timeline__slot';
        slotEl.style.top = `${i * SLOT_HEIGHT}px`;

        // Add time label every hour
        if (i % SLOTS_PER_HOUR === 0) {
            const hour = Math.floor(i / SLOTS_PER_HOUR);
            const label = document.createElement('span');
            label.className = 'timeline__label';
            label.textContent = `${String(hour).padStart(2, '0')}:00`;
            slotEl.appendChild(label);
        }

        container.appendChild(slotEl);
    }
}

function renderBlocks() {
    const container = document.getElementById('blocksContainer');
    if (!container) return;

    container.innerHTML = '';

    const dateStr = formatDateISO(currentDate);
    const todayBlocks = blocks.filter(b => b.date === dateStr);

    todayBlocks.forEach(block => {
        const blockEl = createBlockElement(block);
        container.appendChild(blockEl);
    });

    console.log(`📦 Rendered ${todayBlocks.length} blocks for ${dateStr}`);
}

function createBlockElement(block) {
    const blockEl = document.createElement('div');
    blockEl.className = 'block';
    blockEl.dataset.blockId = block.id;
    blockEl.dataset.category = block.category;

    // Calculate position
    const startSlot = timeToSlot(block.startTime);
    const durationSlots = block.duration / 15;

    blockEl.style.top = `${startSlot * SLOT_HEIGHT}px`;
    blockEl.style.height = `${durationSlots * SLOT_HEIGHT}px`;

    // Icon based on type
    const icon = block.type === 'event' ? '🕐' : '☐';

    // Calculate end time
    const endTime = calculateEndTime(block.startTime, block.duration);

    blockEl.innerHTML = `
        <div class="block__header">
            <span class="block__icon">${icon}</span>
            <span class="block__title">${block.title}</span>
        </div>
        <div class="block__time">${block.startTime} - ${endTime}</div>
        <div class="block__resize-handle"></div>
    `;

    // Attach drag handlers (Häppchen 8)
    attachDragHandlers(blockEl, block);

    // Attach resize handlers (Häppchen 9)
    attachResizeHandlers(blockEl, block);

    return blockEl;
}

// ===== DRAG & DROP (Häppchen 8) =====
function attachDragHandlers(blockEl, block) {
    let touchMoved = false;
    let touchStartX = 0;
    let touchStartY = 0;

    blockEl.addEventListener('touchstart', (e) => {
        touchMoved = false;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

        // Initialize swipe state (Häppchen 11)
        swipeStartX = touch.clientX;
        swipeStartY = touch.clientY;
        swipeBlockElement = blockEl;
        swipeBlockId = block.id;

        handleDragStart(e, block);
    }, { passive: false });

    blockEl.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);

        // Häppchen 11: Check if horizontal swipe
        if (deltaX > deltaY && deltaX > 10) {
            // Horizontal swipe detected
            touchMoved = true;
            handleSwipeMove(e);
        } else if (deltaY > deltaX) {
            // Vertical movement - normal drag
            touchMoved = true;
            handleDragMove(e);
        }
    }, { passive: false });

    blockEl.addEventListener('touchend', (e) => {
        // Häppchen 11: Check if swipe should delete
        const swipeHandled = handleSwipeEnd(e);

        if (swipeHandled) {
            // Swipe completed, do nothing else
        } else if (!touchMoved && !isDragging && !isResizing) {
            // Häppchen 10: If no movement, treat as tap
            openModal('edit', block.id);
        } else {
            handleDragEnd(e);
        }

        // Reset swipe state
        swipeBlockElement = null;
        swipeBlockId = null;
    }, { passive: false });
}

function handleDragStart(e, block) {
    if (!block.editable) return;

    // Don't start drag if touching resize handle (Häppchen 9)
    if (e.target.closest('.block__resize-handle')) return;

    isDragging = true;
    dragBlockId = block.id;
    dragBlockElement = e.currentTarget;

    const touch = e.touches[0];
    dragStartY = touch.clientY;
    dragStartSlot = timeToSlot(block.startTime);

    // Visual feedback
    dragBlockElement.style.opacity = '0.7';
    dragBlockElement.style.zIndex = '1000';

    e.preventDefault();
    console.log('🖐️ Drag started:', block.title);
}

function handleDragMove(e) {
    if (!isDragging || !dragBlockElement) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStartY;
    const deltaSlots = Math.round(deltaY / SLOT_HEIGHT);
    const newSlot = dragStartSlot + deltaSlots;

    // Boundary check
    if (newSlot < 0 || newSlot >= TOTAL_SLOTS) return;

    // Update visual position
    dragBlockElement.style.top = `${newSlot * SLOT_HEIGHT}px`;

    e.preventDefault();
}

function handleDragEnd(e) {
    if (!isDragging || !dragBlockId || !dragBlockElement) return;

    // Calculate new time from position
    const currentTop = parseInt(dragBlockElement.style.top);
    const newSlot = Math.round(currentTop / SLOT_HEIGHT);
    const newTime = slotToTime(newSlot);

    // Update block data
    const block = blocks.find(b => b.id === dragBlockId);
    if (block) {
        block.startTime = newTime;
        saveBlocks();
        console.log('✅ Block moved to:', newTime);
    }

    // Reset visual feedback
    dragBlockElement.style.opacity = '1';
    dragBlockElement.style.zIndex = '';

    // Reset drag state
    isDragging = false;
    dragBlockId = null;
    dragBlockElement = null;
    dragStartY = 0;
    dragStartSlot = 0;

    // Re-render to update time display
    renderBlocks();
    renderMiniWeek();

    e.preventDefault();
}

// ===== RESIZE (Häppchen 9) =====
function attachResizeHandlers(blockEl, block) {
    const handle = blockEl.querySelector('.block__resize-handle');
    if (!handle) return;

    handle.addEventListener('touchstart', (e) => handleResizeStart(e, block, blockEl), { passive: false });
    handle.addEventListener('touchmove', (e) => handleResizeMove(e), { passive: false });
    handle.addEventListener('touchend', (e) => handleResizeEnd(e), { passive: false });
}

function handleResizeStart(e, block, blockEl) {
    if (!block.editable) return;

    isResizing = true;
    resizeBlockId = block.id;
    resizeBlockElement = blockEl;

    const touch = e.touches[0];
    resizeStartY = touch.clientY;
    resizeStartDuration = block.duration;

    // Visual feedback
    resizeBlockElement.style.opacity = '0.7';
    resizeBlockElement.style.zIndex = '1000';

    e.stopPropagation();
    e.preventDefault();
    console.log('↕️ Resize started:', block.title);
}

function handleResizeMove(e) {
    if (!isResizing || !resizeBlockElement) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - resizeStartY;
    const deltaMinutes = Math.round(deltaY / SLOT_HEIGHT) * 15;
    const newDuration = Math.max(15, resizeStartDuration + deltaMinutes); // Min 15min

    // Calculate new height
    const durationSlots = newDuration / 15;
    resizeBlockElement.style.height = `${durationSlots * SLOT_HEIGHT}px`;

    e.stopPropagation();
    e.preventDefault();
}

function handleResizeEnd(e) {
    if (!isResizing || !resizeBlockId || !resizeBlockElement) return;

    // Calculate new duration from height
    const currentHeight = parseInt(resizeBlockElement.style.height);
    const newDuration = Math.max(15, Math.round(currentHeight / SLOT_HEIGHT) * 15);

    // Update block data
    const block = blocks.find(b => b.id === resizeBlockId);
    if (block) {
        block.duration = newDuration;
        saveBlocks();
        console.log('✅ Block resized to:', newDuration, 'min');
    }

    // Reset visual feedback
    resizeBlockElement.style.opacity = '1';
    resizeBlockElement.style.zIndex = '';

    // Reset resize state
    isResizing = false;
    resizeBlockId = null;
    resizeBlockElement = null;
    resizeStartY = 0;
    resizeStartDuration = 0;

    // Re-render to update time display
    renderBlocks();
    renderMiniWeek();

    e.stopPropagation();
    e.preventDefault();
}

// ===== SWIPE TO DELETE (Häppchen 11) =====
const SWIPE_THRESHOLD = 100; // px to trigger delete

function handleSwipeMove(e) {
    if (!swipeBlockElement) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeStartX;

    // Visual feedback: move block horizontally
    swipeBlockElement.style.transform = `translateX(${deltaX}px)`;
    swipeBlockElement.style.opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 200);

    e.preventDefault();
}

function handleSwipeEnd(e) {
    if (!swipeBlockElement || !swipeBlockId) return false;

    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - swipeStartX);
    const deltaY = Math.abs(touch.clientY - swipeStartY);

    // Check if horizontal swipe was dominant and exceeded threshold
    if (deltaX > deltaY && deltaX > SWIPE_THRESHOLD) {
        // Delete block with animation
        swipeBlockElement.style.transition = 'all 0.2s ease-out';
        swipeBlockElement.style.transform = deltaX > 0 ? 'translateX(200%)' : 'translateX(-200%)';
        swipeBlockElement.style.opacity = '0';

        setTimeout(() => {
            const block = blocks.find(b => b.id === swipeBlockId);
            if (block) {
                console.log('🗑️ Swipe deleted:', block.title);
                deleteBlock(swipeBlockId, true); // Skip confirm for swipe
            }
        }, 200);

        return true; // Swipe handled
    }

    // Reset transform if threshold not met
    if (swipeBlockElement) {
        swipeBlockElement.style.transition = 'all 0.2s ease-out';
        swipeBlockElement.style.transform = 'translateX(0)';
        swipeBlockElement.style.opacity = '1';
    }

    return false; // Swipe not handled
}

// ===== DAY SWIPE NAVIGATION (Häppchen 13) =====
const DAY_SWIPE_THRESHOLD = 80; // px to trigger day change

function attachDaySwipeListeners() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    timelineContainer.addEventListener('touchstart', handleDaySwipeStart, { passive: true });
    timelineContainer.addEventListener('touchmove', handleDaySwipeMove, { passive: false });
    timelineContainer.addEventListener('touchend', handleDaySwipeEnd, { passive: true });
}

function handleDaySwipeStart(e) {
    // Don't start day swipe if touching a block
    if (e.target.closest('.block')) return;

    const touch = e.touches[0];
    daySwipeStartX = touch.clientX;
    daySwipeStartY = touch.clientY;
    isDaySwiping = false;
}

function handleDaySwipeMove(e) {
    // Don't interfere with block interactions
    if (e.target.closest('.block')) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - daySwipeStartX);
    const deltaY = Math.abs(touch.clientY - daySwipeStartY);

    // Check if horizontal swipe is dominant
    if (deltaX > deltaY && deltaX > 20) {
        isDaySwiping = true;
        e.preventDefault(); // Prevent scrolling during day swipe
    }
}

function handleDaySwipeEnd(e) {
    if (!isDaySwiping) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - daySwipeStartX;
    const absDeltaX = Math.abs(deltaX);

    // Check if swipe exceeded threshold
    if (absDeltaX > DAY_SWIPE_THRESHOLD) {
        if (deltaX > 0) {
            // Swipe right = previous day
            loadPreviousDay();
            console.log('👈 Swiped to previous day');
        } else {
            // Swipe left = next day
            loadNextDay();
            console.log('👉 Swiped to next day');
        }
    }

    // Reset state
    isDaySwiping = false;
    daySwipeStartX = 0;
    daySwipeStartY = 0;
}

function updateHeader() {
    // Update week number
    const weekNumber = getWeekNumber(currentDate);
    const weekEl = document.getElementById('weekNumber');
    if (weekEl) {
        weekEl.textContent = `Woche ${weekNumber}`;
    }

    // Update current date
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = formatDateLong(currentDate);
    }
}

// ===== UTILITY FUNCTIONS =====
function timeToSlot(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * SLOTS_PER_HOUR + Math.floor(minutes / 15);
}

function slotToTime(slotIndex) {
    const hours = Math.floor(slotIndex / SLOTS_PER_HOUR);
    const minutes = (slotIndex % SLOTS_PER_HOUR) * 15;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateLong(date) {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]}`;
}

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
}

// ===== localStorage =====
const STORAGE_KEY = 'calendar-poc-blocks';

function loadBlocks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Häppchen 14: Validate data structure
            if (Array.isArray(parsed)) {
                blocks = parsed;
                console.log(`📦 Loaded ${blocks.length} blocks from localStorage`);
            } else {
                throw new Error('Invalid data structure');
            }
        } else {
            // First time: use mock data
            blocks = createMockData();
            saveBlocks();
            console.log('📦 Initialized with mock data');
        }
    } catch (error) {
        console.error('❌ Error loading blocks:', error);
        blocks = createMockData();
        saveBlocks();
    }
}

function saveBlocks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
        console.log('💾 Blocks saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving blocks:', error);
        if (error.name === 'QuotaExceededError') {
            alert('Speicher voll! Bitte alte Blöcke löschen.');
        }
    }
}

// ===== MODAL FUNCTIONS =====
function openModal(mode = 'add', blockId = null) {
    editingBlockId = blockId;
    const modal = document.getElementById('modal');
    const form = document.getElementById('blockForm');
    const title = document.getElementById('modalTitle');
    const btnDelete = document.getElementById('btnDelete');

    if (mode === 'edit' && blockId) {
        const block = blocks.find(b => b.id === blockId);
        if (block) {
            prefillForm(block);
            title.textContent = 'Block bearbeiten';
            // Show delete button (Häppchen 10)
            if (btnDelete) btnDelete.classList.remove('hidden');
        }
    } else {
        resetForm();
        title.textContent = 'Block hinzufügen';
        // Set default date to current date
        document.getElementById('inputStartTime').value = '09:00';
        document.getElementById('inputDuration').value = '60';
        // Hide delete button
        if (btnDelete) btnDelete.classList.add('hidden');
    }

    modal.classList.add('open');
    document.body.classList.add('no-scroll');
    isModalOpen = true;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    document.body.classList.remove('no-scroll');
    isModalOpen = false;
    editingBlockId = null;
}

function resetForm() {
    const form = document.getElementById('blockForm');
    form.reset();
}

function prefillForm(block) {
    document.getElementById('inputTitle').value = block.title;
    document.getElementById('inputStartTime').value = block.startTime;
    document.getElementById('inputDuration').value = block.duration;
    document.getElementById('inputCategory').value = block.category;
    document.getElementById('inputType').value = block.type;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('inputTitle').value,
        startTime: document.getElementById('inputStartTime').value,
        duration: parseInt(document.getElementById('inputDuration').value),
        category: document.getElementById('inputCategory').value,
        type: document.getElementById('inputType').value
    };

    if (editingBlockId) {
        updateBlock(editingBlockId, formData);
    } else {
        addBlock(formData);
    }

    closeModal();
}

// ===== BLOCK CRUD =====
function addBlock(blockData) {
    const newBlock = {
        id: generateUUID(),
        date: formatDateISO(currentDate),
        editable: true,
        ...blockData
    };

    blocks.push(newBlock);
    saveBlocks();
    renderBlocks();
    renderMiniWeek(); // Update mini week colors

    console.log('✅ Block added:', newBlock.title);
}

function updateBlock(id, updates) {
    const index = blocks.findIndex(b => b.id === id);
    if (index !== -1) {
        blocks[index] = { ...blocks[index], ...updates };
        saveBlocks();
        renderBlocks();
        renderMiniWeek();
        console.log('✅ Block updated:', blocks[index].title);
    }
}

function deleteBlock(id, skipConfirm = false) {
    const block = blocks.find(b => b.id === id);
    if (block && (skipConfirm || confirm(`Block "${block.title}" wirklich löschen?`))) {
        blocks = blocks.filter(b => b.id !== id);
        saveBlocks();
        renderBlocks();
        renderMiniWeek();
        console.log('✅ Block deleted:', block.title);
    }
}

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    // Add button
    const btnAdd = document.getElementById('btnAdd');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => openModal('add'));
    }

    // Modal close button
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Modal overlay click to close
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Form submit
    const form = document.getElementById('blockForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Delete button (Häppchen 10)
    const btnDelete = document.getElementById('btnDelete');
    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            if (editingBlockId) {
                deleteBlock(editingBlockId);
                closeModal();
            }
        });
    }

    // Navigation buttons
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if (btnPrev) {
        btnPrev.addEventListener('click', loadPreviousDay);
    }
    if (btnNext) {
        btnNext.addEventListener('click', loadNextDay);
    }

    // Mini-week day clicks (Häppchen 7)
    attachMiniWeekListeners();

    // Day swipe navigation (Häppchen 13)
    attachDaySwipeListeners();
}

function attachMiniWeekListeners() {
    const days = document.querySelectorAll('.mini-week__day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            const dateStr = day.dataset.date;
            if (dateStr) {
                const [year, month, dayNum] = dateStr.split('-').map(Number);
                const date = new Date(year, month - 1, dayNum);
                loadDay(date);
                console.log(`📅 Loaded day: ${dateStr}`);
            }
        });
    });
}

// ===== NAVIGATION =====
function loadDay(date) {
    currentDate = new Date(date);

    // Check if we need to update the week view (Häppchen 7)
    const newWeekStart = getWeekStart(currentDate);
    if (newWeekStart.getTime() !== currentWeekStart.getTime()) {
        currentWeekStart = newWeekStart;
        renderMiniWeek();
    } else {
        updateMiniWeekSelection();
    }

    renderBlocks();
    updateHeader();
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

function updateMiniWeekSelection() {
    const days = document.querySelectorAll('.mini-week__day');
    const currentDateStr = formatDateISO(currentDate);

    days.forEach(day => {
        if (day.dataset.date === currentDateStr) {
            day.classList.add('active');
        } else {
            day.classList.remove('active');
        }
    });
}

// ===== INIT ON LOAD =====
document.addEventListener('DOMContentLoaded', init);
