/**
 * page-status-bp.js
 * Frontend Logic für Status BP H2me Page
 */

// Global State
let ideasData = null;
let mindmapData = null;
let networkData = null;
let domainsData = null;
let mindmapCy = null;
let networkCy = null;

// Cluster Colors (matching CSS variables)
const CLUSTER_COLORS = {
    'visualisierung': '#e74c3c',
    'ui': '#f39c12',
    'zeit': '#16a085',
    'datenfluss': '#3498db',
    'metasystem': '#9b59b6',
    'architektur': '#95a5a6',
    'unassigned': '#666666'
};

// Domain Colors
const DOMAIN_COLORS = {
    'GRAU': '#808080',
    'ROT': '#e74c3c',
    'GRÜN': '#27ae60',
    'ORANGE': '#f39c12',
    'BLAU': '#3498db',
    'VIOLETT': '#9b59b6',
    'GELB': '#f1c40f'
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadAllData();
        initPage();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Fehler beim Laden der Daten. Bitte Seite neu laden.');
    }
});

async function loadAllData() {
    try {
        const [ideas, mindmap, network, domains] = await Promise.all([
            fetch('data/ideas.json').then(r => r.json()).catch(() => ({ dreams: [], concepts: [], in_development: [], live: [] })),
            fetch('data/mindmap.json').then(r => r.json()).catch(() => ({ nodes: [], edges: [] })),
            fetch('data/network.json').then(r => r.json()).catch(() => ({ nodes: [], edges: [] })),
            fetch('data/domains.json').then(r => r.json()).catch(() => ({ domains: [] }))
        ]);

        ideasData = ideas;
        mindmapData = mindmap;
        networkData = network;
        domainsData = domains;

        console.log('Data loaded successfully:', { ideas, mindmap, network, domains });
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

function initPage() {
    updateQuickStats();
    renderTopIdeas();
    initMindmap();
    initNetwork();
    renderDomains();
    renderMetaInsights();
    setupEventListeners();
}

// ============================================================
// QUICK STATS
// ============================================================

function updateQuickStats() {
    if (!ideasData) return;

    const totalBoats = ideasData.dreams?.length || 0;
    const totalHours = ideasData.dreams?.reduce((sum, boat) => sum + (boat.hours || 0), 0) || 0;
    const clusters = new Set(ideasData.dreams?.map(boat => boat.cluster).filter(Boolean));
    const totalProjects = (ideasData.in_development?.length || 0) + (ideasData.live?.length || 0);

    document.getElementById('total-boats').textContent = totalBoats;
    document.getElementById('total-hours').textContent = `${totalHours}h`;
    document.getElementById('total-clusters').textContent = clusters.size;
    document.getElementById('total-projects').textContent = totalProjects;

    // Elevator Pitch (falls vorhanden)
    const pitch = ideasData.elevator_pitch || 'H2me als zentraler Knotenpunkt des EntryPoint-Ökosystems – wo Ideen, Konzepte und Projekte sichtbar werden.';
    document.getElementById('elevator-pitch').textContent = pitch;
}

// ============================================================
// TOP IDEAS
// ============================================================

function renderTopIdeas() {
    const grid = document.getElementById('top-ideas-grid');
    if (!grid || !ideasData?.dreams) return;

    grid.innerHTML = '';

    // Top 7 nach Score sortiert
    const topDreams = [...ideasData.dreams]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 7);

    topDreams.forEach((boat, index) => {
        const card = createIdeaCard(boat, index + 1);
        grid.appendChild(card);
    });
}

function createIdeaCard(boat, rank) {
    const card = document.createElement('div');
    card.className = 'idea-card';
    card.dataset.boatId = boat.id;

    const clusterColor = CLUSTER_COLORS[boat.cluster] || CLUSTER_COLORS.unassigned;

    const totalLinks = (boat.up_links?.length || 0) + (boat.sister_links?.length || 0) + (boat.related_links?.length || 0);

    card.innerHTML = `
        <div class="idea-header">
            <span class="idea-rank">#${rank}</span>
            <span class="idea-cluster" style="background-color: ${clusterColor};">${boat.cluster || 'unassigned'}</span>
        </div>
        <h3 class="idea-title">${boat.title || 'Untitled'}</h3>
        <p class="idea-pitch">${boat.core_idea || 'Keine Beschreibung verfügbar'}</p>
        <div class="idea-meta">
            <span class="meta-item">
                <span class="meta-label">Links</span>
                <span class="meta-value">${totalLinks}</span>
            </span>
            <span class="meta-item">
                <span class="meta-label">Zeit</span>
                <span class="meta-value">${boat.hours || 0}h</span>
            </span>
            <span class="meta-item">
                <span class="meta-label">Score</span>
                <span class="meta-value">${Math.round(boat.score || 0)}</span>
            </span>
        </div>
        <button class="btn-details" onclick="showBoatDetails('${boat.id}')">Details</button>
    `;

    return card;
}

// ============================================================
// MINDMAP (CYTOSCAPE)
// ============================================================

function initMindmap() {
    if (!mindmapData || !window.cytoscape) {
        console.warn('Mindmap data or Cytoscape not available');
        return;
    }

    const container = document.getElementById('mindmap-container');
    if (!container) return;

    try {
        mindmapCy = cytoscape({
            container: container,
            elements: {
                nodes: mindmapData.nodes.map(node => ({
                    data: { ...node }
                })),
                edges: mindmapData.edges.map(edge => ({
                    data: { ...edge }
                }))
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(label)',
                        'background-color': function(ele) {
                            const cluster = ele.data('cluster');
                            return CLUSTER_COLORS[cluster] || '#95a5a6';
                        },
                        'width': 60,
                        'height': 60,
                        'color': '#fff',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': 10,
                        'text-wrap': 'wrap',
                        'text-max-width': 80
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#666',
                        'target-arrow-color': '#666',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'breadthfirst',
                directed: true,
                spacingFactor: 1.5,
                animate: true,
                animationDuration: 500
            },
            userZoomingEnabled: true,
            userPanningEnabled: true
        });

        // Node click handler
        mindmapCy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const boatId = node.data('id');
            if (boatId && ideasData?.dreams) {
                const boat = ideasData.dreams.find(b => b.id === boatId);
                if (boat) {
                    showBoatDetails(boatId);
                }
            }
        });

        console.log('Mindmap initialized');
    } catch (error) {
        console.error('Error initializing mindmap:', error);
    }
}

// ============================================================
// NETWORK GRAPH (CYTOSCAPE)
// ============================================================

function initNetwork() {
    if (!networkData || !window.cytoscape) {
        console.warn('Network data or Cytoscape not available');
        return;
    }

    const container = document.getElementById('network-container');
    if (!container) return;

    try {
        networkCy = cytoscape({
            container: container,
            elements: {
                nodes: networkData.nodes.map(node => ({
                    data: { ...node }
                })),
                edges: networkData.edges.map(edge => ({
                    data: { ...edge }
                }))
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(label)',
                        'background-color': function(ele) {
                            const cluster = ele.data('cluster');
                            return CLUSTER_COLORS[cluster] || '#95a5a6';
                        },
                        'width': function(ele) {
                            const type = ele.data('type');
                            return type === 'boat' ? 50 : 30;
                        },
                        'height': function(ele) {
                            const type = ele.data('type');
                            return type === 'boat' ? 50 : 30;
                        },
                        'color': '#fff',
                        'text-valign': 'bottom',
                        'text-halign': 'center',
                        'font-size': 9
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': function(ele) {
                            const type = ele.data('type');
                            const widths = { up: 3, sister: 2, related: 1, inspired: 1.5, uses: 1.5 };
                            return widths[type] || 1;
                        },
                        'line-color': function(ele) {
                            const type = ele.data('type');
                            const colors = {
                                up: '#666',
                                sister: '#4CAF50',
                                related: '#2196F3',
                                inspired: '#FF9800',
                                uses: '#9C27B0'
                            };
                            return colors[type] || '#666';
                        },
                        'target-arrow-color': function(ele) {
                            const type = ele.data('type');
                            const colors = {
                                up: '#666',
                                sister: '#4CAF50',
                                related: '#2196F3',
                                inspired: '#FF9800',
                                uses: '#9C27B0'
                            };
                            return colors[type] || '#666';
                        },
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'cose',
                animate: true,
                animationDuration: 1000,
                nodeRepulsion: 8000,
                idealEdgeLength: 100
            },
            userZoomingEnabled: true,
            userPanningEnabled: true
        });

        // Node click handler
        networkCy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const boatId = node.data('id');
            if (boatId && ideasData?.dreams) {
                const boat = ideasData.dreams.find(b => b.id === boatId);
                if (boat) {
                    showBoatDetails(boatId);
                }
            }
        });

        console.log('Network graph initialized');
    } catch (error) {
        console.error('Error initializing network:', error);
    }
}

// ============================================================
// DOMAINS
// ============================================================

function renderDomains() {
    const grid = document.getElementById('domains-grid');
    if (!grid || !domainsData?.domains) return;

    grid.innerHTML = '';

    domainsData.domains.forEach(domain => {
        const card = createDomainCard(domain);
        grid.appendChild(card);
    });
}

function createDomainCard(domain) {
    const card = document.createElement('div');
    card.className = 'domain-card';
    card.dataset.domain = domain.id;

    const color = DOMAIN_COLORS[domain.id.toUpperCase()] || '#666';

    card.innerHTML = `
        <div class="domain-header" style="background-color: ${color};">
            <h3>${domain.label}</h3>
            <span class="domain-subtitle">${domain.essence}</span>
        </div>
        <div class="domain-stats">
            <span>${domain.active_count || 0} Projekte</span>
            <span>${domain.boats_count || 0} BOATs</span>
        </div>
        <ul class="domain-projects">
            ${(domain.active_projects || []).slice(0, 5).map(project => `
                <li>
                    <span class="project-link">${project}</span>
                    <span class="project-status active">aktiv</span>
                </li>
            `).join('')}
        </ul>
    `;

    return card;
}

// ============================================================
// META INSIGHTS
// ============================================================

function renderMetaInsights() {
    const container = document.getElementById('meta-insights');
    if (!container) return;

    // Placeholder - würde aus META_thoughts.md extrahiert werden
    const insights = [
        {
            title: 'System-Evolution',
            content: 'Die Entwicklung von isolierten BOATs zu vernetzten Clustern zeigt die natürliche Emergenz von Struktur.',
            date: '2025-10-29',
            source: 'META-Thoughts'
        }
    ];

    container.innerHTML = insights.map(insight => `
        <div class="insight-card">
            <h4 class="insight-title">${insight.title}</h4>
            <p class="insight-content">${insight.content}</p>
            <div class="insight-meta">
                <span class="insight-date">${insight.date}</span>
                <span class="insight-source">${insight.source}</span>
            </div>
        </div>
    `).join('');
}

// ============================================================
// MODAL
// ============================================================

function showBoatDetails(boatId) {
    if (!ideasData?.dreams) return;

    const boat = ideasData.dreams.find(b => b.id === boatId);
    if (!boat) return;

    const modal = document.getElementById('boat-modal');
    const details = document.getElementById('boat-details');

    if (!modal || !details) return;

    // Populate modal
    details.querySelector('.boat-title').textContent = boat.title || 'Untitled';
    details.querySelector('.boat-cluster').textContent = boat.cluster || 'unassigned';
    details.querySelector('.boat-hours').textContent = `${boat.hours || 0}h`;
    details.querySelector('.boat-score').textContent = `Score: ${Math.round(boat.score || 0)}`;
    details.querySelector('.boat-kernidee').textContent = boat.core_idea || 'Keine Kern-Idee verfügbar';

    // Links
    const linksList = details.querySelector('.boat-links');
    linksList.innerHTML = '';

    ['up_links', 'sister_links', 'related_links'].forEach(linkType => {
        const links = boat[linkType] || [];
        links.forEach(link => {
            const li = document.createElement('li');
            li.textContent = `${linkType.replace('_links', '')}: ${link}`;
            linksList.appendChild(li);
        });
    });

    // Show modal
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('boat-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function setupEventListeners() {
    // Modal close on background click
    const modal = document.getElementById('boat-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // View toggles
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'cluster' && mindmapCy) {
                mindmapCy.layout({ name: 'breadthfirst', animate: true }).run();
            } else if (view === 'network' && networkCy) {
                networkCy.layout({ name: 'cose', animate: true }).run();
            }
        });
    });

    // Network filters
    const filterCheckboxes = document.querySelectorAll('.filter-controls input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            applyNetworkFilters();
        });
    });
}

function applyNetworkFilters() {
    if (!networkCy) return;

    const filters = {
        boats: document.querySelector('[data-filter="boats"]')?.checked ?? true,
        thoughts: document.querySelector('[data-filter="thoughts"]')?.checked ?? true,
        edgesUp: document.querySelector('[data-filter="edges-up"]')?.checked ?? true,
        edgesSister: document.querySelector('[data-filter="edges-sister"]')?.checked ?? true,
        edgesRelated: document.querySelector('[data-filter="edges-related"]')?.checked ?? true
    };

    // Apply filters
    networkCy.elements().removeClass('hidden');

    if (!filters.boats) {
        networkCy.nodes('[type="boat"]').addClass('hidden');
    }
    if (!filters.thoughts) {
        networkCy.nodes('[type="thought"]').addClass('hidden');
    }
    if (!filters.edgesUp) {
        networkCy.edges('[type="up"]').addClass('hidden');
    }
    if (!filters.edgesSister) {
        networkCy.edges('[type="sister"]').addClass('hidden');
    }
    if (!filters.edgesRelated) {
        networkCy.edges('[type="related"]').addClass('hidden');
    }
}

// ============================================================
// UTILITY
// ============================================================

function showError(message) {
    const container = document.querySelector('.status-bp-container');
    if (container) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #e74c3c; color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 9999;';
        container.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}
