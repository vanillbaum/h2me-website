// ============================================
// H2me Dashboard JavaScript
// Lädt Tasks, exportiert KWGT JSON, Theme-Anpassung
// ============================================

// Theme Color Picker
document.getElementById('themeColorPicker').addEventListener('input', (e) => {
  const hex = e.target.value;
  const hsl = hexToHSL(hex);
  
  document.documentElement.style.setProperty('--base-h', hsl.h);
  document.documentElement.style.setProperty('--base-s', hsl.s + '%');
  document.documentElement.style.setProperty('--base-l', hsl.l + '%');
  
  // Save to localStorage
  localStorage.setItem('dashboardThemeColor', hex);
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('dashboardThemeColor');
  if (savedColor) {
    document.getElementById('themeColorPicker').value = savedColor;
    const hsl = hexToHSL(savedColor);
    document.documentElement.style.setProperty('--base-h', hsl.h);
    document.documentElement.style.setProperty('--base-s', hsl.s + '%');
    document.documentElement.style.setProperty('--base-l', hsl.l + '%');
  }
  
  // Load Tasks
  loadTasks();
});

// Hex to HSL Converter
function hexToHSL(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Load Tasks from 153_TASKS_h2me.md
async function loadTasks() {
  try {
    // Path zum TASKS File
    const tasksPath = 'E:/EntryPoint/a_yang/a1_jetzt/153_TASKS_h2me.md';
    
    // TODO: File System API nutzen oder Backend erstellen
    // Für jetzt: Placeholder
    const tasks = {
      akut: [
        '🔥 Dashboard fertigstellen',
        '🔥 Kakano Theme testen'
      ],
      heute: [
        '📅 Obsidian aufräumen',
        '📅 Wiki-Einträge erstellen'
      ],
      woche: [
        '📆 Blender Tutorial',
        '📆 H2me Dokumentation'
      ]
    };
    
    // Tasks in Widgets anzeigen
    displayTasks('tasks-akut', tasks.akut);
    displayTasks('tasks-heute', tasks.heute);
    displayTasks('tasks-woche', tasks.woche);
    
  } catch (error) {
    console.error('Fehler beim Laden der Tasks:', error);
  }
}

// Display Tasks in Widget
function displayTasks(widgetId, tasks) {
  const widget = document.getElementById(widgetId);
  if (!widget) return;
  
  widget.innerHTML = tasks.map(task => 
    `<div class="task-item">${task}</div>`
  ).join('');
}

// Export für KWGT (Kustom Widget)
document.getElementById('exportKWGT')?.addEventListener('click', () => {
  const kwgtData = {
    dashboard: {
      areas: ['Yang', 'Bian', 'Yin', 'FLUUR'],
      theme: {
        baseColor: getComputedStyle(document.documentElement)
          .getPropertyValue('--base-h'),
        gradientStart: getComputedStyle(document.documentElement)
          .getPropertyValue('--gradient-start'),
      },
      widgets: extractWidgetData()
    },
    exportDate: new Date().toISOString()
  };
  
  // JSON Download
  const blob = new Blob([JSON.stringify(kwgtData, null, 2)], 
    { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'h2me-dashboard-kwgt-export.json';
  a.click();
  
  console.log('KWGT Export erstellt:', kwgtData);
});

// Extract Widget Data für Export
function extractWidgetData() {
  const widgets = {};
  document.querySelectorAll('.widget').forEach(widget => {
    const id = widget.getAttribute('data-widget');
    const content = widget.querySelector('.widget-content')?.innerText || '';
    widgets[id] = content;
  });
  return widgets;
}

// Refresh Data Button
document.getElementById('refreshData')?.addEventListener('click', () => {
  console.log('Refreshing data...');
  loadTasks();
  // TODO: Refresh other data sources (Nextcloud, etc.)
});

// Usage Tracking (für zukünftige Analytics)
function trackUsage(action, data = {}) {
  const event = {
    timestamp: new Date().toISOString(),
    action: action,
    data: data
  };
  
  // TODO: An Backend senden oder in localStorage speichern
  console.log('Usage tracked:', event);
}

// Track page view
trackUsage('dashboard_view');
