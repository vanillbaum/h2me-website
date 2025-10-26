console.log("Navigation script loaded!");

class NavigationComponent {
    constructor(containerId, type = 'horizontal') {
        this.containerId = containerId;
        this.type = type; // 'horizontal', 'sidebar', 'mobile'
        this.navItems = [
            { 
                text: 'hoi...', 
                href: 'index.html', 
                icon: 'fa-regular fa-sun',
                colorVar: '--color-secondary'  // CSS Variable
            },
            { 
                text: '...yang', 
                href: 'page-yang.html', 
                icon: 'fa-regular fa-square', 
                colorClass: 'yang-color',
                colorVar: '--accent-yang',
                colorVarHover: '--accent-yang-secondary'
            },
            { 
                text: '...bian', 
                href: 'page-bian.html', 
                icon: 'fa-regular fa-snowflake', 
                colorClass: 'bian-color',
                colorVar: '--accent-bian',
                colorVarHover: '--accent-bian-secondary'
            },
            { 
                text: '...yin', 
                href: 'page-yin.html', 
                icon: 'fa-solid fa-circle', 
                colorClass: 'yin-color',
                colorVar: '--accent-yin',
                colorVarHover: '--accent-yin-secondary'
            },
            { 
                text: '...graph', 
                href: 'page-graph.html', 
                icon: 'fa-solid fa-network-wired',
                colorVar: '--color-secondary'
            }
        ];
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const navClass = this.getNavClass();
        const navHTML = this.generateNavHTML(navClass);
        container.innerHTML = navHTML;
        
        this.setActiveLink();
        this.applyInlineStyles();  // Neue Methode!
    }

    getNavClass() {
        const classes = {
            horizontal: 'nav-horizontal',
            sidebar: 'nav-sidebar',
            mobile: 'nav-mobile'
        };
        return classes[this.type] || 'nav-horizontal';
    }

    generateNavHTML(navClass) {
        const itemsHTML = this.navItems.map(item => 
            `<li class="nav-item">
                <a href="${item.href}" 
                   class="nav-link btn-base ${item.colorClass || ''}"
                   data-color-var="${item.colorVar}"
                   data-color-var-hover="${item.colorVarHover || item.colorVar}">
                    <i class="${item.icon} nav-icon"></i>
                    <span class="nav-text">${item.text}</span>
                </a>
            </li>`
        ).join('');

        return `
            <nav class="${navClass}">
                <ul class="nav-list">
                    ${itemsHTML}
                </ul>
            </nav>
        `;
    }

    applyInlineStyles() {
        // Setze Farben direkt via inline styles mit CSS Variables
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const colorVar = link.getAttribute('data-color-var');
            const colorVarHover = link.getAttribute('data-color-var-hover');
            
            if (colorVar) {
                // Setze normale Farbe
                link.style.color = `var(${colorVar})`;
                
                // Icon-Farbe auch setzen
                const icon = link.querySelector('.nav-icon');
                const text = link.querySelector('.nav-text');
                
                if (icon) {
                    icon.style.color = `var(${colorVar})`;
                }
                
                // Hover-Effekt mit Glow
                link.addEventListener('mouseenter', () => {
                    link.style.color = `var(${colorVarHover})`;
                    link.style.backgroundColor = `var(${colorVarHover})`; // Hintergrund in Hover-Farbe
                    if (icon) {
                        icon.style.color = `var(${colorVarHover})`;
                        icon.style.textShadow = `0 0 10px var(${colorVarHover})`; // Glow um Icon
                    }
                    if (text) {
                        text.style.textShadow = `0 0 8px var(${colorVarHover})`; // Glow um Text
                    }
                });
                
                // Hover-Effekt zurücksetzen
                link.addEventListener('mouseleave', () => {
                    link.style.color = `var(${colorVar})`;
                    link.style.backgroundColor = ''; // Hintergrund zurücksetzen
                    if (icon) {
                        icon.style.color = `var(${colorVar})`;
                        icon.style.textShadow = ''; // Glow entfernen
                    }
                    if (text) {
                        text.style.textShadow = ''; // Glow entfernen
                    }
                });
            }
        });
    }

    setActiveLink() {
        const currentPage = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            // Check if current page matches or if we're at root and link is index
            if (href === currentPage || 
                (currentPage === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Global function to initialize navigation
function initNavigation(containerId, type) {
    console.log("initNavigation called with:", containerId, type);
    const container = document.getElementById(containerId);
    console.log("Container found:", container);
    
    const nav = new NavigationComponent(containerId, type);
    nav.render();
}
