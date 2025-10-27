// Calendar Overview - POC mit statischen Test-Daten

// Statische Test-Daten
const testData = [
    // Heute
    {
        id: 1,
        title: "Dashboard Häppchen 3 umsetzen",
        description: "Grid-Layout für Yang/Bian/Yin/FLUUR fertigstellen",
        date: new Date(),
        time: "14:00",
        duration: "2h",
        source: "obsidian",
        project: "153",
        type: "task"
    },
    {
        id: 2,
        title: "Team Meeting",
        description: "Wöchentliches Sync mit Team",
        date: new Date(),
        time: "10:00",
        duration: "1h",
        source: "outlook",
        project: "010",
        type: "event"
    },
    {
        id: 3,
        title: "Bier-Recherche: Hopfensorten",
        description: "Wikipedia + Fachliteratur durchgehen",
        date: new Date(),
        time: "16:00",
        duration: "1.5h",
        source: "obsidian",
        project: "610",
        type: "task"
    },

    // Morgen
    {
        id: 4,
        title: "Nextcloud Backup",
        description: "Monatliches Backup überprüfen",
        date: new Date(Date.now() + 86400000), // +1 Tag
        time: "09:00",
        duration: "30min",
        source: "nextcloud",
        project: "010",
        type: "reminder"
    },
    {
        id: 5,
        title: "Styling für Graph-View",
        description: "YBY-Styles auf Cytoscape anwenden",
        date: new Date(Date.now() + 86400000),
        time: "15:00",
        duration: "3h",
        source: "obsidian",
        project: "153",
        type: "task"
    },

    // Übermorgen
    {
        id: 6,
        title: "Bierdegustation Vorbereitung",
        description: "Notizen für 5 neue Biere erstellen",
        date: new Date(Date.now() + 172800000), // +2 Tage
        time: "19:00",
        duration: "2h",
        source: "obsidian",
        project: "610",
        type: "task"
    },
    {
        id: 7,
        title: "Arzttermin",
        description: "Check-up beim Hausarzt",
        date: new Date(Date.now() + 172800000),
        time: "11:00",
        duration: "45min",
        source: "nextcloud",
        project: "010",
        type: "event"
    },

    // Nächste Woche
    {
        id: 8,
        title: "Wiki-Files aufräumen",
        description: "Dataview-Felder konsistent machen",
        date: new Date(Date.now() + 604800000), // +7 Tage
        time: "13:00",
        duration: "2h",
        source: "obsidian",
        project: "010",
        type: "task"
    },
    {
        id: 9,
        title: "Client Call",
        description: "Projekt-Update Präsentation",
        date: new Date(Date.now() + 604800000),
        time: "15:00",
        duration: "1h",
        source: "outlook",
        project: "010",
        type: "event"
    }
];

// State Management
let currentView = 'all';
let currentFilters = {
    source: 'all',
    project: 'all'
};

// View Order für Swipe-Navigation
const viewOrder = ['day', 'week', 'month', 'all'];

// Swipe-Detector Instance
let swipeDetector = null;
let pullToRefresh = null;

// Initialisierung (wird am Ende erweitert mit Mobile Nav)

// Timeline rendern
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    
    // Daten filtern
    const filteredData = filterData(testData);
    
    // Nach View filtern
    const viewData = filterByView(filteredData, currentView);
    
    if (viewData.length === 0) {
        timeline.innerHTML = `
            <div class="empty-state">
                <h3>Keine Einträge gefunden</h3>
                <p>Versuche andere Filter oder View-Einstellungen</p>
            </div>
        `;
        return;
    }
    
    // Nach Datum gruppieren
    const groupedData = groupByDate(viewData);
    
    // HTML generieren
    timeline.innerHTML = '';
    
    Object.keys(groupedData).sort().forEach(dateKey => {
        const daySection = createDaySection(dateKey, groupedData[dateKey]);
        timeline.appendChild(daySection);
    });
}

// Daten filtern
function filterData(data) {
    return data.filter(item => {
        const sourceMatch = currentFilters.source === 'all' || item.source === currentFilters.source;
        const projectMatch = currentFilters.project === 'all' || item.project === currentFilters.project;
        return sourceMatch && projectMatch;
    });
}

// Nach View filtern
function filterByView(data, view) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 86400000);
    const nextWeek = new Date(today.getTime() + 604800000);
    const nextMonth = new Date(today.getTime() + 2592000000); // ~30 Tage
    
    switch(view) {
        case 'day':
            return data.filter(item => {
                const itemDate = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
                return itemDate.getTime() === today.getTime();
            });
        case 'week':
            return data.filter(item => {
                return item.date >= today && item.date < nextWeek;
            });
        case 'month':
            return data.filter(item => {
                return item.date >= today && item.date < nextMonth;
            });
        case 'all':
        default:
            return data;
    }
}

// Nach Datum gruppieren
function groupByDate(data) {
    const grouped = {};
    
    data.forEach(item => {
        const dateKey = formatDateKey(item.date);
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        grouped[dateKey].push(item);
    });
    
    return grouped;
}

// Datum zu Key formatieren
function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

// Datum formatieren für Display
function formatDateDisplay(date) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    
    // Heute/Morgen erkennen
    if (isSameDay(date, today)) {
        return 'Heute';
    }
    if (isSameDay(date, tomorrow)) {
        return 'Morgen';
    }
    
    // Ansonsten Datum
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

// Gleicher Tag?
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Tag-Sektion erstellen
function createDaySection(dateKey, items) {
    const date = new Date(dateKey);
    const section = document.createElement('div');
    section.className = 'timeline-day';
    
    const header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = `
        ${formatDateDisplay(date)}
        <span class="date-info">${items.length} Einträge</span>
    `;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'timeline-items';
    
    // Items sortieren nach Zeit
    items.sort((a, b) => {
        const timeA = a.time ? a.time.replace(':', '') : '9999';
        const timeB = b.time ? b.time.replace(':', '') : '9999';
        return timeA.localeCompare(timeB);
    });
    
    items.forEach(item => {
        const itemElement = createItemElement(item);
        itemsContainer.appendChild(itemElement);
    });
    
    section.appendChild(header);
    section.appendChild(itemsContainer);
    
    return section;
}

// Item-Element erstellen
function createItemElement(item) {
    const element = document.createElement('div');
    element.className = 'timeline-item';
    element.dataset.source = item.source;
    element.dataset.project = item.project;
    
    const sourceLabels = {
        'obsidian': 'Obsidian',
        'nextcloud': 'Nextcloud',
        'outlook': 'Outlook'
    };
    
    const projectLabels = {
        '153': '153_H2me',
        '610': '610_Bier',
        '010': '010_Personal'
    };
    
    element.innerHTML = `
        <div class="item-header">
            <div class="item-title">${item.title}</div>
            <div class="item-time">${item.time || 'ganztägig'} ${item.duration ? '(' + item.duration + ')' : ''}</div>
        </div>
        <div class="item-meta">
            <span class="meta-badge badge-source">${sourceLabels[item.source]}</span>
            <span class="meta-badge badge-project">${projectLabels[item.project]}</span>
            <span class="meta-badge">${item.type}</span>
        </div>
        ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
    `;
    
    return element;
}

// Event Listeners einrichten
function setupEventListeners() {
    // View Switcher
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderTimeline();
        });
    });
    
    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;
            
            // Andere Buttons in gleicher Gruppe deaktivieren
            document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
                b.classList.remove('active');
            });
            
            btn.classList.add('active');
            currentFilters[filterType] = filterValue;
            renderTimeline();
        });
    });
}

// Mobile Navigation Handler
function setupMobileNavigation() {
    const navButtons = document.querySelectorAll('.mobile-bottom-nav .nav-btn');
    const filterPanel = document.querySelector('.filters');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.querySelector('.filter-close');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;

            // Haptic Feedback (falls verfügbar)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }

            switch(action) {
                case 'today':
                    handleTodayAction();
                    break;
                case 'filter':
                    handleFilterAction();
                    break;
                case 'search':
                    handleSearchAction();
                    break;
                case 'more':
                    handleMoreAction();
                    break;
            }

            // Active State für Button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Filter Overlay Click → Panel schließen
    if (filterOverlay) {
        filterOverlay.addEventListener('click', () => {
            closeFilterPanel();
        });
    }

    // Filter Close Button → Panel schließen
    if (filterCloseBtn) {
        filterCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeFilterPanel();
        });
    }
}

function handleTodayAction() {
    // Zu "Heute" scrollen
    const timeline = document.getElementById('timeline');
    const todaySection = timeline.querySelector('.timeline-day');

    if (todaySection) {
        todaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // View auf "Tag" setzen
    const dayViewBtn = document.querySelector('.view-btn[data-view="day"]');
    if (dayViewBtn && !dayViewBtn.classList.contains('active')) {
        dayViewBtn.click();
    }
}

function handleFilterAction() {
    const filterPanel = document.querySelector('.filters');
    const filterOverlay = document.getElementById('filterOverlay');

    if (filterPanel && filterOverlay) {
        const isOpen = filterPanel.classList.contains('open');

        if (isOpen) {
            closeFilterPanel();
        } else {
            openFilterPanel();
        }
    }
}

function openFilterPanel() {
    const filterPanel = document.querySelector('.filters');
    const filterOverlay = document.getElementById('filterOverlay');

    filterPanel.classList.add('open');
    filterOverlay.classList.add('visible');

    // Body Scroll verhindern wenn Panel offen
    document.body.style.overflow = 'hidden';
}

function closeFilterPanel() {
    const filterPanel = document.querySelector('.filters');
    const filterOverlay = document.getElementById('filterOverlay');

    filterPanel.classList.remove('open');
    filterOverlay.classList.remove('visible');

    // Body Scroll wieder erlauben
    document.body.style.overflow = '';
}

function handleSearchAction() {
    // TODO: Suche implementieren in Phase 2
    console.log('Suche-Feature kommt in Phase 2');
    alert('Suche-Feature kommt bald!');
}

function handleMoreAction() {
    // TODO: Mehr-Menü implementieren
    console.log('Mehr-Menü kommt in Phase 2');
    alert('Mehr-Optionen kommen bald!');
}

// Swipe-Gestures Setup
function setupSwipeGestures() {
    const timeline = document.getElementById('timeline');
    const container = document.querySelector('.calendar-container');

    if (!timeline || typeof SwipeDetector === 'undefined') {
        console.log('SwipeDetector nicht verfügbar oder Timeline nicht gefunden');
        return;
    }

    // Swipe-Indikatoren
    const swipeIndicatorLeft = document.getElementById('swipeIndicatorLeft');
    const swipeIndicatorRight = document.getElementById('swipeIndicatorRight');

    // Swipe-Detector initialisieren
    swipeDetector = new SwipeDetector(timeline, {
        threshold: 50,
        restraint: 100,
        allowedTime: 500,

        onSwipeLeft: () => {
            // Nächster View
            const currentIndex = viewOrder.indexOf(currentView);
            if (currentIndex < viewOrder.length - 1) {
                const nextView = viewOrder[currentIndex + 1];
                switchView(nextView, 'left');
            }
        },

        onSwipeRight: () => {
            // Vorheriger View
            const currentIndex = viewOrder.indexOf(currentView);
            if (currentIndex > 0) {
                const prevView = viewOrder[currentIndex - 1];
                switchView(prevView, 'right');
            }
        },

        onSwipeMove: (deltaX, deltaY) => {
            // Visuelles Feedback während Swipe
            if (Math.abs(deltaX) > 20) {
                if (deltaX > 0) {
                    // Swipe nach rechts
                    const currentIndex = viewOrder.indexOf(currentView);
                    if (currentIndex > 0 && swipeIndicatorLeft) {
                        swipeIndicatorLeft.classList.add('visible');
                    }
                    if (swipeIndicatorRight) {
                        swipeIndicatorRight.classList.remove('visible');
                    }
                } else {
                    // Swipe nach links
                    const currentIndex = viewOrder.indexOf(currentView);
                    if (currentIndex < viewOrder.length - 1 && swipeIndicatorRight) {
                        swipeIndicatorRight.classList.add('visible');
                    }
                    if (swipeIndicatorLeft) {
                        swipeIndicatorLeft.classList.remove('visible');
                    }
                }
            } else {
                // Reset indicators
                if (swipeIndicatorLeft) swipeIndicatorLeft.classList.remove('visible');
                if (swipeIndicatorRight) swipeIndicatorRight.classList.remove('visible');
            }
        }
    });

    console.log('Swipe-Gestures aktiviert');
}

// View wechseln mit Animation
function switchView(newView, direction) {
    if (newView === currentView) return;

    const timeline = document.getElementById('timeline');
    const oldView = currentView;

    // Animation-Klasse hinzufügen
    if (direction === 'left') {
        timeline.classList.add('slide-in-right');
    } else {
        timeline.classList.add('slide-in-left');
    }

    // View wechseln
    currentView = newView;

    // View-Button aktualisieren
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === newView) {
            btn.classList.add('active');
        }
    });

    // Timeline neu rendern
    renderTimeline();

    // Animation-Klasse nach Animation entfernen
    setTimeout(() => {
        timeline.classList.remove('slide-in-right', 'slide-in-left');
    }, 300);

    // Swipe-Indikatoren ausblenden
    const swipeIndicatorLeft = document.getElementById('swipeIndicatorLeft');
    const swipeIndicatorRight = document.getElementById('swipeIndicatorRight');
    if (swipeIndicatorLeft) swipeIndicatorLeft.classList.remove('visible');
    if (swipeIndicatorRight) swipeIndicatorRight.classList.remove('visible');

    console.log(`View gewechselt: ${oldView} → ${newView}`);
}

// Pull-to-Refresh Setup
function setupPullToRefresh() {
    const timeline = document.getElementById('timeline');

    if (!timeline || typeof PullToRefresh === 'undefined') {
        console.log('PullToRefresh nicht verfügbar oder Timeline nicht gefunden');
        return;
    }

    pullToRefresh = new PullToRefresh(timeline, {
        threshold: 80,
        onRefresh: async () => {
            console.log('Pull-to-Refresh ausgelöst');

            // TODO: Hier später echte Daten laden
            // Für jetzt nur simulieren
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Timeline neu rendern
            renderTimeline();

            console.log('Daten aktualisiert');
        }
    });

    console.log('Pull-to-Refresh aktiviert');
}

// Initialisierung erweitern
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    setupEventListeners();
    setupMobileNavigation();
    setupSwipeGestures();
    setupPullToRefresh();
});

// Debug Info
console.log('Calendar POC geladen');
console.log('Test-Daten:', testData.length, 'Einträge');
console.log('Mobile Navigation aktiviert');
