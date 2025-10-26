/**
 * Representation Switcher Component
 * Ermöglicht verschiedene Darstellungen (SVG/3D/Text) mit Umschaltung
 */

class RepresentationSwitcher {
  constructor(containerId, config = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
      return;
    }
    
    this.page = config.page || 'default';
    this.representations = ['svg', '3d', 'text'];
    this.current = null;
    
    // 3D-spezifische Variablen
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.animationId = null;
    
    // Config für 3D (wird pro Seite übergeben)
    this.threeConfig = config.threeConfig || {
      geometry: 'sphere',
      color: 0x808080,
      animation: 'rotate'
    };
    
    this.init();
  }
  
  init() {
    // Gespeicherte Auswahl oder zufällig
    const saved = localStorage.getItem(`rep_${this.page}`);
    this.current = saved || this.getRandomRep();
    
    this.showRepresentation(this.current);
    this.attachEventListeners();
    
    // Falls 3D gewählt: initialisiere
    if (this.current === '3d') {
      this.init3D();
    }
  }
  
  getRandomRep() {
    return this.representations[Math.floor(Math.random() * this.representations.length)];
  }
  
  showRepresentation(type) {
    // Verstecke alle
    this.container.querySelectorAll('.representation').forEach(rep => {
      rep.classList.remove('active');
    });
    
    // Zeige gewählte
    const selected = this.container.querySelector(`.representation[data-type="${type}"]`);
    if (selected) {
      selected.classList.add('active');
    }
    
    // Cleanup altes 3D wenn wir wegwechseln
    if (this.current === '3d' && type !== '3d') {
      this.cleanup3D();
    }
    
    this.current = type;
    localStorage.setItem(`rep_${this.page}`, type);
    
    // Initialisiere 3D wenn gewechselt zu 3D
    if (type === '3d') {
      // Kleiner Delay damit DOM ready ist
      setTimeout(() => this.init3D(), 100);
    }
  }
  
  attachEventListeners() {
    // Suche Buttons im gesamten Dokument (nicht nur im Container)
    document.querySelectorAll('[data-switch]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.closest('button').dataset.switch;
        
        if (type === 'random') {
          this.showRepresentation(this.getRandomRep());
        } else if (type) {
          this.showRepresentation(type);
        }
      });
    });
  }
  
  /**
   * 3D Initialisierung mit Three.js
   */
  init3D() {
    const container3D = this.container.querySelector('.threed-container');
    if (!container3D) {
      console.error('3D container not found');
      return;
    }
    
    // Cleanup falls bereits existiert
    if (this.renderer) {
      this.cleanup3D();
    }
    
    // Scene Setup
    this.scene = new THREE.Scene();
    
    // Camera
    const width = container3D.clientWidth;
    const height = container3D.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 3;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    container3D.appendChild(this.renderer.domElement);
    
    // Geometrie basierend auf Config
    let geometry;
    switch(this.threeConfig.geometry) {
      case 'cube':
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      case 'sphere':
      default:
        geometry = new THREE.SphereGeometry(1, 32, 32);
    }
    
    // Material
    const material = new THREE.MeshPhongMaterial({ 
      color: this.threeConfig.color,
      shininess: 100
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
    
    // Licht
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
    
    // Animation starten
    this.animate3D();
    
    // Responsive resize
    this.handleResize = () => {
      const width = container3D.clientWidth;
      const height = container3D.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };
    window.addEventListener('resize', this.handleResize);
  }
  
  animate3D() {
    this.animationId = requestAnimationFrame(() => this.animate3D());
    
    if (this.mesh) {
      // Animation basierend auf Config
      switch(this.threeConfig.animation) {
        case 'pulse':
          const scale = 1 + Math.sin(Date.now() * 0.001) * 0.2;
          this.mesh.scale.set(scale, scale, scale);
          break;
        case 'rotate':
        default:
          this.mesh.rotation.x += 0.005;
          this.mesh.rotation.y += 0.01;
      }
    }
    
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  cleanup3D() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    
    if (this.renderer) {
      const container3D = this.container.querySelector('.threed-container');
      if (container3D && this.renderer.domElement) {
        container3D.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
      this.renderer = null;
    }
    
    if (this.scene) {
      this.scene.clear();
      this.scene = null;
    }
    
    this.mesh = null;
    this.camera = null;
  }
}
