// === THEME SWITCHER ===
// Verwaltet Dark/Light Mode mit localStorage-Persistenz

function initTheme() {
    // Gespeichertes Theme laden (oder System-Präferenz)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Theme anwenden
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
    
    // Toggle Button erstellen
    createThemeToggle();
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

function createThemeToggle() {
    // Check ob Button schon existiert
    if (document.querySelector('.theme-toggle')) return;
    
    // Toggle Button HTML
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Theme wechseln');
    toggle.innerHTML = `
        <span class="sun-icon icon">☀️</span>
        <span class="moon-icon icon">🌙</span>
    `;
    
    // Click Handler
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // Button in Body einfügen
    document.body.appendChild(toggle);
}

// Theme beim Laden initialisieren
document.addEventListener('DOMContentLoaded', initTheme);
