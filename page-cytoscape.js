initGraph() {
  const container = document.getElementById(this.containerId);
  const width = container.clientWidth;
  const height = container.clientHeight;

  const cy = cytoscape({
    container: container,

    elements: [
      { data: { id: 'night', label: 'night' }, position: { x: 0.0 * width, y: 100 } },
      { data: { id: 'early', label: 'early' }, position: { x: 0.2 * width, y: 100 } },
      { data: { id: 'morning', label: 'morning' }, position: { x: 0.4 * width, y: 100 } },
      { data: { id: 'midday', label: 'midday' }, position: { x: 0.5 * width, y: 100 } },
      { data: { id: 'noon', label: 'noon' }, position: { x: 0.6 * width, y: 100 } },
      { data: { id: 'evening', label: 'evening' }, position: { x: 0.8 * width, y: 100 } },
      { data: { id: 'night2', label: 'night2' }, position: { x: 1.0 * width, y: 100 } },

      // edges
      { data: { source: 'night', target: 'early' } },
      { data: { source: 'early', target: 'morning' } },
      { data: { source: 'morning', target: 'midday' } },
      { data: { source: 'midday', target: 'noon' } },
      { data: { source: 'noon', target: 'evening' } },
      { data: { source: 'evening', target: 'night2' } }
    ],

    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'color': '#fff',
          'background-color': '#2563eb',
          'shape': 'roundrectangle',
          'width': 'label',
          'padding': '10px',
          'font-size': '12px',
          'text-wrap': 'wrap'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#475569',
          'target-arrow-color': '#475569',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ],

    layout: {
      name: 'preset'
    }
  });
}