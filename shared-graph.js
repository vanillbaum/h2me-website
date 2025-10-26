class GraphComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      size: options.size || 'main',
      currentPage: options.currentPage || 'index',
      show3D: options.show3D || false,
      ...options
    };
    this.cy = null;
    this.resizeTimeout = null;
    this.init();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container ${this.containerId} not found`);
      return;
    }

    container.classList.add('graph-container');

    try {
      this.cy = cytoscape({
        container: container,
        elements: this.getElements(),
        style: this.getStyles(),
        layout: this.getLayout()
      });

      this.setupInteractions();
      
      if (this.options.show3D) {
        this.apply3DEffects();
      }

      this.setupResponsiveHandling();

    } catch (error) {
      console.error('Error initializing graph:', error);
    }
  }

  getDynamicSizing() {
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    const aspectRatio = window.innerWidth / window.innerHeight;
    
    if (this.options.size === 'mini') {
      return {
        baseSize: Math.max(20, Math.min(4 * vw, Math.min(3 * vh, 60))),
        fontSize: Math.max(8, Math.min(1.2 * vw, Math.min(1.8 * vh, 12))),
        borderWidth: Math.max(1, Math.min(0.2 * vw, 3)),
        radius: Math.max(25, Math.min(5 * vw, Math.min(8 * vh, 80))),
        edgeWidth: Math.max(1, Math.min(0.15 * vw, 2))
      };
    } else {
      const sizeMultiplier = aspectRatio > 1.5 ? 1.2 : aspectRatio < 0.8 ? 0.8 : 1;
      return {
        baseSize: Math.max(40, Math.min(6 * vw * sizeMultiplier, Math.min(8 * vh, 120))),
        fontSize: Math.max(10, Math.min(1.8 * vw, Math.min(2.5 * vh, 20))),
        borderWidth: Math.max(2, Math.min(0.3 * vw, 5)),
        radius: Math.max(60, Math.min(12 * vw * sizeMultiplier, Math.min(15 * vh, 200))),
        edgeWidth: Math.max(1.5, Math.min(0.25 * vw, 4))
      };
    }
  }

  getAdaptiveLayout() {
    const nodeCount = this.getElements().filter(el => el.data.id).length;
    const sizing = this.getDynamicSizing();
    const container = document.getElementById(this.containerId);
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    const maxRadius = Math.min(containerWidth * 0.35, containerHeight * 0.35);
    const minRadius = Math.max(sizing.baseSize * 1.5, 30);
    const optimalRadius = Math.min(maxRadius, Math.max(minRadius, sizing.radius));
    
    if (nodeCount <= 4) {
      return {
        name: 'circle',
        radius: optimalRadius,
        clockwise: true,
        startAngle: -Math.PI / 2,
        sweep: Math.PI * 1.5
      };
    } else if (nodeCount <= 6) {
      return {
        name: 'circle',
        radius: optimalRadius,
        clockwise: true,
        startAngle: -Math.PI / 2
      };
    } else {
      return {
        name: 'concentric',
        concentric: (node) => {
          return node.data('id') === 'index' ? 2 : 1;
        },
        levelWidth: () => 1,
        minNodeSpacing: sizing.baseSize * 0.5
      };
    }
  }

  getElements() {
    return [
      { data: { id: 'index', label: 'ho...', url: 'index.html', img:'images/WEB_i_yin.svg' } },
      { data: { id: 'a_yang', label: '...yang', url: 'page-yang.html', img:'images/WEB_a_yang.svg' } },
      { data: { id: 'b_bian', label: '...bian', url: 'page-bian.html', img: 'images/WEB_b_bian.svg' } },
      { data: { id: 'i_yin', label: '...yin', url: 'page-yin.html', img: 'images/WEB_i_yin.svg' } },
      { data: { id: 'page-graph', label: '...graph', url: 'page-graph.html', img: 'images/WEB_b_bian.svg' } },
      
      { data: { source: 'index', target: 'a_yang' } },
      { data: { source: 'index', target: 'b_bian' } },
      { data: { source: 'index', target: 'i_yin' } },
      { data: { source: 'index', target: 'page-graph' } },
      { data: { source: 'a_yang', target: 'index' } },
      { data: { source: 'b_bian', target: 'index' } },
      { data: { source: 'i_yin', target: 'index' } },
      { data: { source: 'page-graph', target: 'index' } }
    ];
  }

  getStyles() {
    const sizing = this.getDynamicSizing();

    return [
      {
        selector: 'node',
        style: {
          'background-image': 'data(img)',
          'background-fit': 'cover',
          'background-color': '#ffffff',
          'label': 'data(label)',
          'color': '#333',
          'text-valign': 'bottom',
          'text-halign': 'center',
          'font-size': sizing.fontSize + 'px',
          'font-weight': '600',
          'font-family': 'Arial, sans-serif',
          'width': sizing.baseSize + 'px',
          'height': sizing.baseSize + 'px',
          'border-width': sizing.borderWidth + 'px',
          'border-color': '#e0e0e0',
          'border-style': 'solid',
          'transition-duration': '0.4s',
          'text-shadow': '1px 1px 3px rgba(255,255,255,0.8)',
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'text-margin-y': sizing.baseSize * 0.15
        }
      },
      {
        selector: 'node:hover',
        style: {
          'border-width': (sizing.borderWidth + 1) + 'px',
          'border-color': '#4CAF50'
        }
      },
      {
        selector: 'node.active',
        style: {
          'border-color': '#FFD700',
          'border-width': (sizing.borderWidth + 2) + 'px',
          'width': (sizing.baseSize * 1.3) + 'px',
          'height': (sizing.baseSize * 1.3) + 'px',
          'z-index': 999,
          'font-size': (sizing.fontSize + 4) + 'px',
          'font-weight': '700',
          'color': '#FFD700'
        }
      },
      {
        selector: 'node.connected',
        style: {
          'border-color': '#4CAF50',
          'border-width': (sizing.borderWidth + 1) + 'px',
          'width': (sizing.baseSize * 1.15) + 'px',
          'height': (sizing.baseSize * 1.15) + 'px',
          'z-index': 100,
          'color': '#4CAF50'
        }
      },
      {
        selector: 'node.distant',
        style: {
          'opacity': 0.5,
          'width': (sizing.baseSize * 0.8) + 'px',
          'height': (sizing.baseSize * 0.8) + 'px',
          'border-width': '1px',
          'border-color': '#bbb',
          'color': '#888',
          'font-size': (sizing.fontSize - 2) + 'px'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': sizing.edgeWidth + 'px',
          'line-color': '#ddd',
          'target-arrow-color': '#ddd',
          'target-arrow-shape': 'triangle',
          'target-arrow-size': sizing.edgeWidth * 4 + 'px',
          'curve-style': 'straight',
          'transition-duration': '0.4s',
          'opacity': 0.7
        }
      },
      {
        selector: 'edge.active',
        style: {
          'line-color': '#4CAF50',
          'target-arrow-color': '#4CAF50',
          'width': (sizing.edgeWidth * 1.5) + 'px',
          'opacity': 1,
          'target-arrow-size': (sizing.edgeWidth * 6) + 'px'
        }
      },
      {
        selector: 'edge.inactive',
        style: {
          'opacity': 0.15,
          'width': (sizing.edgeWidth * 0.7) + 'px'
        }
      }
    ];
  }

  getLayout() {
    return this.getAdaptiveLayout();
  }

  setupResponsiveHandling() {
    const handleResize = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      
      this.resizeTimeout = setTimeout(() => {
        this.updateGraphLayout();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    this.handleResize = handleResize;
  }

  updateGraphLayout() {
    if (!this.cy) return;
    
    this.cy.style().fromJson(this.getStyles()).update();
    
    const layout = this.cy.layout(this.getLayout());
    layout.run();
    
    if (this.options.show3D) {
      setTimeout(() => {
        this.apply3DEffects();
      }, 200);
    }
  }

  apply3DEffects() {
    const currentPage = this.options.currentPage;
    
    this.cy.nodes().removeClass('active connected distant');
    this.cy.edges().removeClass('active inactive');
    
    const currentNode = this.cy.$(`#${currentPage}`);
    if (currentNode.length === 0) {
      return;
    }
    
    const connectedNodes = currentNode.neighborhood('node');
    const connectedEdges = currentNode.connectedEdges();
    
    currentNode.addClass('active');
    connectedNodes.addClass('connected');
    connectedEdges.addClass('active');
    
    this.cy.nodes().not(currentNode).not(connectedNodes).addClass('distant');
    this.cy.edges().not(connectedEdges).addClass('inactive');
  }

  setupInteractions() {
    this.cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const url = node.data('url');
      if (url) {
        window.open(url, '_self');
      }
    });

    this.cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      node.style('cursor', 'pointer');
    });
  }

  destroy() {
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    if (this.cy) {
      this.cy.destroy();
    }
  }
}