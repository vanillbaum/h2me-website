// FILE: script.js
// Save this content into script.js

// Initialize mermaid (safe to re-initialize when toggling theme)
if(window.mermaid){
  // Use startOnLoad=false and run init explicitly for control
  mermaid.initialize({startOnLoad:false, theme: 'base', gitGraph: {template: 'default'}});
}

function renderAllMermaid(){
  try{
    // mermaid.init will render all elements with class 'mermaid'
    if(window.mermaid && typeof mermaid.init === 'function'){
      mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    } else if(window.mermaid && typeof mermaid.run === 'function'){
      mermaid.run();
    }
  }catch(e){
    console.error('Mermaid render error', e);
  }
}

// Theme toggle: toggles data-theme on <html> so CSS variables change
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(dark){
  if(dark){
    document.documentElement.setAttribute('data-theme','dark');
    themeLabel.textContent = 'Dark';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeLabel.textContent = 'Light';
  }
  // re-render mermaid to pick up any styling differences
  renderAllMermaid();
}

// wire toggle
themeToggle.addEventListener('change', e => applyTheme(e.target.checked));

// initial render on DOM ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', renderAllMermaid);
} else {
  renderAllMermaid();
}