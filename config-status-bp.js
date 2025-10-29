/**
 * Configuration for Status BP H2me Data Collection & Visualization
 */

const config = {
  
  // INPUT PATHS
  paths: {
    entryPointBase: 'E:\\EntryPoint',
    boats: 'E:\\EntryPoint\\a_yang\\a5_traeumend',
    thoughts: 'E:\\EntryPoint\\b_bian\\bb_Thoughts',
    metaThoughts: 'E:\\EntryPoint\\b_bian\\ba_Orientierung\\000_META_thoughts.md',
    h2meProject: 'E:\\Neuanfang\\a_yang\\153_H2me',
    clusterMapping: 'E:\\Neuanfang\\a_yang\\153_H2me\\doc_boat_cluster_mapping.md'
  },
  
  // OUTPUT PATHS
  output: {
    dataDir: 'E:\\Neuanfang\\a_yang\\153_H2me\\data',
    ideas: 'E:\\Neuanfang\\a_yang\\153_H2me\\data\\ideas.json',
    mindmap: 'E:\\Neuanfang\\a_yang\\153_H2me\\data\\mindmap.json',
    network: 'E:\\Neuanfang\\a_yang\\153_H2me\\data\\network.json',
    domains: 'E:\\Neuanfang\\a_yang\\153_H2me\\data\\domains.json'
  },
  
  // PROCESSING PARAMETERS
  processing: {
    topIdeasCount: 7,
    linkScoring: {
      upLinks: 3,
      sisterLinks: 2,
      relatedLinks: 1,
      allWikilinks: 0.5,
      hoursWeight: 0.1
    },
    clusters: [
      'visualisierung',
      'ui',
      'zeit',
      'datenfluss',
      'metasystem',
      'architektur'
    ]
  },
  
  // DOMAIN COLORS (YBY System)
  domains: {
    GRAU: { name: 'GRAU - Datenmanagement', color: '#808080', projects: [] },
    GRÜN: { name: 'GRÜN - Architektur', color: '#4CAF50', projects: [] },
    ROT: { name: 'ROT - Persönliche Projekte', color: '#F44336', projects: [] },
    BLAU: { name: 'BLAU - Haushalt', color: '#2196F3', projects: [] },
    VIOLETT: { name: 'VIOLETT - Gesundheit', color: '#9C27B0', projects: [] },
    GELB: { name: 'GELB - Bier', color: '#FFEB3B', projects: [] },
    ORANGE: { name: 'ORANGE - Sozial/Familie', color: '#FF9800', projects: [] }
  },
  
  // VISUALIZATION SETTINGS
  visualization: {
    mindmapLayout: 'breadthfirst',
    networkLayout: 'cose',
    nodeSizes: {
      cluster: 80,
      boat: 60,
      thought: 40
    },
    edgeStyles: {
      up: { color: '#666', width: 3 },
      sister: { color: '#4CAF50', width: 2 },
      related: { color: '#2196F3', width: 1 },
      inspired: { color: '#FF9800', width: 1.5 },
      uses: { color: '#9C27B0', width: 1.5 }
    }
  },
  
  // FILE PATTERNS
  patterns: {
    boat: {
      include: /\.md$/,
      exclude: /(^_|^\.)/
    },
    thoughts: {
      include: /^\d{4}-\d{2}-\d{2}_THOUGHTS\.md$/,
      exclude: /(^_|^\.)/
    },
    h2meHtml: {
      include: /^(page-|index\.html$)/,
      exclude: /(test-|poc-|template-)/
    }
  },
  
  // PARSING SETTINGS
  parsing: {
    frontmatter: {
      estimatedHours: 'estimated_hours',
      status: 'status'
    },
    sections: {
      kernIdee: '### Kern-Idee',
      zerlegt: '## zerlegt',
      original: '## original',
      verbindungen: '# ia_Verbindungen'
    },
    links: {
      up: /Up::\s*\[\[([^\]]+)\]\]/g,
      sister: /Sister::\s*\[\[([^\]]+)\]\]/g,
      related: /Related::\s*\[\[([^\]]+)\]\]/g,
      wikilink: /\[\[([^\]]+)\]\]/g
    }
  },
  
  // DEBUG & LOGGING
  debug: {
    enabled: true,
    verbose: false,
    logFile: 'E:\\Neuanfang\\a_yang\\153_H2me\\logs\\collect-data.log'
  }
};

module.exports = config;
