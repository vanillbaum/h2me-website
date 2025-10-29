/**
 * collect-data.js
 * Node.js Script zum Sammeln und Parsen aller Daten für Status BP H2me
 *
 * Usage: node collect-data.js
 */

const fs = require('fs');
const path = require('path');

// Load Config
const config = require('./config-status-bp.js');

// ============================================================
// MAIN
// ============================================================

async function main() {
    console.log('🚀 Starting data collection...');

    try {
        // Ensure output directory exists
        ensureDirectory(config.output.dataDir);

        // Collect data from all sources
        console.log('\n📊 Collecting BOATs...');
        const boats = collectBoats();
        console.log(`   Found ${boats.length} BOATs`);

        console.log('\n💭 Collecting THOUGHTS...');
        const thoughts = collectThoughts();
        console.log(`   Found ${thoughts.length} THOUGHTS`);

        console.log('\n🌈 Collecting Domains...');
        const domains = collectDomains();
        console.log(`   Found ${domains.length} Domains`);

        // Calculate scores and rankings
        console.log('\n🔢 Calculating scores...');
        const scoredBoats = calculateScores(boats);
        const { top, rest } = selectTopBoats(scoredBoats);

        // Build data structures
        console.log('\n🏗️  Building data structures...');
        const ideasData = buildIdeasData(top, rest, thoughts);
        const mindmapData = buildMindmapData(top, rest);
        const networkData = buildNetworkData(scoredBoats, thoughts);
        const domainsData = buildDomainsData(domains, scoredBoats);

        // Write JSON files
        console.log('\n💾 Writing JSON files...');
        writeJSON(config.output.ideas, ideasData);
        writeJSON(config.output.mindmap, mindmapData);
        writeJSON(config.output.network, networkData);
        writeJSON(config.output.domains, domainsData);

        console.log('\n✅ Data collection complete!');
        console.log(`\n📁 Output files:`);
        console.log(`   - ${config.output.ideas}`);
        console.log(`   - ${config.output.mindmap}`);
        console.log(`   - ${config.output.network}`);
        console.log(`   - ${config.output.domains}`);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

// ============================================================
// BOAT COLLECTION
// ============================================================

function collectBoats() {
    const boatsDir = config.paths.boats;

    if (!fs.existsSync(boatsDir)) {
        console.warn(`⚠️  BOATs directory not found: ${boatsDir}`);
        return [];
    }

    const files = fs.readdirSync(boatsDir)
        .filter(f => f.endsWith('.md') && f.includes('BOAT'));

    // Load cluster mapping
    const clusterMapping = loadClusterMapping();

    const boats = files.map(file => {
        const filePath = path.join(boatsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const boatId = generateBoatId(file);

        const boat = {
            id: boatId,
            filename: file,
            number: extractNumber(file),
            title: extractTitle(file),
            core_idea: extractKernIdee(content) || generateElevatorPitch(content),
            hours: extractFrontmatter(content, 'estimated_hours') || 0,
            up_links: extractLinks(content, 'Up::'),
            sister_links: extractLinks(content, 'Sister::'),
            related_links: extractLinks(content, 'Related::'),
            all_wikilinks: extractAllWikilinks(content),
            cluster: clusterMapping[boatId] || 'unassigned',
            status: 'dream'
        };

        return boat;
    });

    return boats;
}

function loadClusterMapping() {
    const mappingPath = config.paths.clusterMapping;

    if (!fs.existsSync(mappingPath)) {
        console.warn(`⚠️  Cluster mapping file not found: ${mappingPath}`);
        return {};
    }

    try {
        const content = fs.readFileSync(mappingPath, 'utf8');
        const mapping = {};

        // Parse format: ## cluster-name \n - boat-id \n - boat-id
        const clusterSections = content.split(/^## /m).filter(s => s.trim());

        clusterSections.forEach(section => {
            const lines = section.split('\n');
            const clusterName = lines[0].trim();

            lines.slice(1).forEach(line => {
                const match = line.match(/^-\s*(.+?)$/);
                if (match) {
                    const boatId = match[1].trim();
                    mapping[boatId] = clusterName;
                }
            });
        });

        return mapping;
    } catch (error) {
        console.warn(`⚠️  Error parsing cluster mapping: ${error.message}`);
        return {};
    }
}

// ============================================================
// THOUGHTS COLLECTION
// ============================================================

function collectThoughts() {
    const thoughtsDir = config.paths.thoughts;

    if (!fs.existsSync(thoughtsDir)) {
        console.warn(`⚠️  THOUGHTS directory not found: ${thoughtsDir}`);
        return [];
    }

    const files = fs.readdirSync(thoughtsDir)
        .filter(f => f.match(/^\d{4}-\d{2}-\d{2}_THOUGHTS\.md$/));

    const thoughts = files.map(file => {
        const filePath = path.join(thoughtsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const thought = {
            id: generateThoughtId(file),
            date: extractDateFromFilename(file),
            filename: file,
            status: extractFrontmatter(content, 'status') || 'unknown',
            inputs_count: countInputs(content),
            themes: extractThemes(content)
        };

        return thought;
    });

    return thoughts;
}

function countInputs(content) {
    // Count ### [Category] | [Title] sections
    const matches = content.match(/^### \[.+?\] \| .+?$/gm);
    return matches ? matches.length : 0;
}

function extractThemes(content) {
    // Extract themes from ### [Category] sections
    const matches = content.match(/^### \[(.+?)\] \|/gm);
    if (!matches) return [];

    const themes = matches.map(m => {
        const match = m.match(/\[(.+?)\]/);
        return match ? match[1].toLowerCase() : null;
    }).filter(Boolean);

    return [...new Set(themes)]; // unique
}

// ============================================================
// DOMAINS COLLECTION
// ============================================================

function collectDomains() {
    const domains = Object.entries(config.domains).map(([id, domainConfig]) => {
        return {
            id: id.toLowerCase(),
            label: domainConfig.name,
            color: domainConfig.color,
            essence: domainConfig.name.split(' - ')[1] || '',
            active_projects: domainConfig.projects || [],
            active_count: domainConfig.projects?.length || 0,
            boats: [],
            boats_count: 0
        };
    });

    return domains;
}

// ============================================================
// SCORING & SELECTION
// ============================================================

function calculateScores(boats) {
    const weights = config.processing.linkScoring;

    return boats.map(boat => {
        const linkScore =
            (boat.up_links.length * weights.upLinks) +
            (boat.sister_links.length * weights.sisterLinks) +
            (boat.related_links.length * weights.relatedLinks) +
            (boat.all_wikilinks.length * weights.allWikilinks);

        const hoursScore = boat.hours * weights.hoursWeight;
        const totalScore = linkScore + hoursScore;

        return {
            ...boat,
            score: totalScore,
            linkScore,
            hoursScore
        };
    });
}

function selectTopBoats(boats) {
    const sorted = [...boats].sort((a, b) => b.score - a.score);
    const topCount = config.processing.topIdeasCount;

    const top = sorted.slice(0, topCount).map((boat, index) => ({
        ...boat,
        rank: index + 1
    }));

    const rest = sorted.slice(topCount);

    return { top, rest };
}

// ============================================================
// DATA STRUCTURE BUILDERS
// ============================================================

function buildIdeasData(topBoats, restBoats, thoughts) {
    return {
        elevator_pitch: "H2me als zentraler Knotenpunkt des EntryPoint-Ökosystems – wo Ideen, Konzepte und Projekte sichtbar werden.",
        dreams: [...topBoats, ...restBoats],
        concepts: thoughts,
        in_development: [],
        live: []
    };
}

function buildMindmapData(topBoats, restBoats) {
    const nodes = [];
    const edges = [];

    // Root node
    nodes.push({
        id: 'root',
        label: 'EntryPoint',
        type: 'root',
        level: 0
    });

    // Cluster nodes
    const clusters = [...new Set(topBoats.map(b => b.cluster))];
    clusters.forEach(cluster => {
        nodes.push({
            id: `cluster-${cluster}`,
            label: cluster,
            type: 'cluster',
            level: 1,
            cluster: cluster
        });

        edges.push({
            source: 'root',
            target: `cluster-${cluster}`
        });
    });

    // Top BOAT nodes
    topBoats.forEach(boat => {
        nodes.push({
            id: boat.id,
            label: boat.title,
            type: 'boat',
            level: 2,
            cluster: boat.cluster,
            hours: boat.hours,
            score: boat.score
        });

        edges.push({
            source: `cluster-${boat.cluster}`,
            target: boat.id
        });
    });

    // "Rest" group node if applicable
    if (restBoats.length > 0) {
        nodes.push({
            id: 'boats-rest',
            label: `Weitere BOATs (+${restBoats.length})`,
            type: 'group',
            level: 2
        });

        edges.push({
            source: 'root',
            target: 'boats-rest'
        });
    }

    return { nodes, edges };
}

function buildNetworkData(boats, thoughts) {
    const nodes = [];
    const edges = [];

    // Add BOAT nodes
    boats.forEach(boat => {
        nodes.push({
            id: boat.id,
            label: boat.title,
            type: 'boat',
            cluster: boat.cluster,
            hours: boat.hours
        });
    });

    // Add THOUGHT nodes
    thoughts.forEach(thought => {
        nodes.push({
            id: thought.id,
            label: thought.date,
            type: 'thought'
        });
    });

    // Add edges from BOAT links
    boats.forEach(boat => {
        // Up links
        boat.up_links.forEach(targetTitle => {
            const target = findBoatByTitle(boats, targetTitle);
            if (target) {
                edges.push({
                    source: boat.id,
                    target: target.id,
                    type: 'up'
                });
            }
        });

        // Sister links
        boat.sister_links.forEach(targetTitle => {
            const target = findBoatByTitle(boats, targetTitle);
            if (target) {
                edges.push({
                    source: boat.id,
                    target: target.id,
                    type: 'sister'
                });
            }
        });

        // Related links
        boat.related_links.forEach(targetTitle => {
            const target = findBoatByTitle(boats, targetTitle);
            if (target) {
                edges.push({
                    source: boat.id,
                    target: target.id,
                    type: 'related'
                });
            }
        });
    });

    return { nodes, edges };
}

function buildDomainsData(domains, boats) {
    // Map boats to domains (by number prefix if available)
    domains.forEach(domain => {
        domain.boats = boats
            .filter(boat => {
                // Simple heuristic: match by number prefix
                // Could be enhanced with more sophisticated mapping
                return boat.cluster && boat.cluster.toLowerCase().includes(domain.id);
            })
            .map(boat => boat.id);

        domain.boats_count = domain.boats.length;
    });

    return { domains };
}

// ============================================================
// PARSING HELPERS
// ============================================================

function extractNumber(filename) {
    const match = filename.match(/^(\d+)_/);
    return match ? match[1] : null;
}

function extractTitle(filename) {
    return filename
        .replace(/^\d+_BOAT_/, '')
        .replace('.md', '')
        .replace(/_/g, ' ');
}

function extractDateFromFilename(filename) {
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
}

function extractFrontmatter(content, key) {
    const regex = new RegExp(`^${key}:\\s*(.+?)$`, 'm');
    const match = content.match(regex);

    if (!match) return null;

    const value = match[1].trim();

    // Try to parse as number
    const num = parseFloat(value);
    if (!isNaN(num)) return num;

    return value;
}

function extractKernIdee(content) {
    // Look for: ### Kern-Idee \n ![[#zerlegt]] \n\n [text]
    const match = content.match(/### Kern-Idee[\s\S]*?!\[\[#zerlegt\]\][\s\S]*?\n\n(.+?)(?=\n\n###|\n\n##|$)/);
    return match ? match[1].trim() : null;
}

function generateElevatorPitch(content) {
    // Fallback: Extract first paragraph from ba_BOAT section
    const match = content.match(/## ba_BOAT[\s\S]*?\n\n(.+?)(?=\n\n##|$)/);
    if (match) {
        const text = match[1].trim();
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
    }
    return 'Keine Beschreibung verfügbar';
}

function extractLinks(content, linkType) {
    const regex = new RegExp(`${linkType}\\s*\\[\\[(.+?)\\]\\]`, 'g');
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

function extractAllWikilinks(content) {
    const regex = /\[\[(.+?)\]\]/g;
    const links = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        links.push(match[1]);
    }

    return [...new Set(links)]; // unique
}

function generateBoatId(filename) {
    return filename
        .replace(/^\d+_BOAT_/, 'boat-')
        .replace('.md', '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-');
}

function generateThoughtId(filename) {
    return filename
        .replace('_THOUGHTS.md', '')
        .toLowerCase()
        .replace(/\s+/g, '-');
}

function findBoatByTitle(boats, title) {
    return boats.find(b =>
        b.title.toLowerCase() === title.toLowerCase() ||
        b.filename.includes(title)
    );
}

// ============================================================
// FILE UTILITIES
// ============================================================

function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`   ✅ ${path.basename(filePath)}`);
}

// ============================================================
// RUN
// ============================================================

main();
