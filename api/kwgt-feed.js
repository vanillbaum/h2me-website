// KWGT Feed - Netlify Function
// Liefert Calendar/Task-Daten im JSON-Format für KWGT Widget

exports.handler = async (event, context) => {
    try {
        // Query-Parameter auslesen
        const params = event.queryStringParameters || {};
        const limit = parseInt(params.limit) || 10;
        const view = params.view || 'upcoming'; // 'today', 'tomorrow', 'upcoming', 'all'
        const source = params.source || 'all';  // 'all', 'obsidian', 'nextcloud', 'outlook'

        // Statische Test-Daten (später durch echte API-Calls ersetzen)
        const feedData = generateFeedData(limit, view, source);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Cache-Control': 'public, max-age=900' // 15 min Cache
            },
            body: JSON.stringify(feedData, null, 2)
        };

    } catch (error) {
        console.error('KWGT Feed Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: error.message
            })
        };
    }
};

// Feed-Daten generieren
function generateFeedData(limit, view, source) {
    const now = new Date();

    // Test-Daten
    const allItems = [
        {
            id: 'task-1',
            title: 'Dashboard Häppchen 3 umsetzen',
            time: '14:00',
            duration: '2h',
            date: formatDate(now),
            source: 'obsidian',
            project: '153',
            type: 'task',
            description: 'Grid-Layout für Yang/Bian/Yin/FLUUR fertigstellen'
        },
        {
            id: 'event-1',
            title: 'Team Meeting',
            time: '10:00',
            duration: '1h',
            date: formatDate(now),
            source: 'outlook',
            project: '010',
            type: 'event',
            description: 'Wöchentliches Sync mit Team'
        },
        {
            id: 'task-2',
            title: 'Bier-Recherche: Hopfensorten',
            time: '16:00',
            duration: '1.5h',
            date: formatDate(now),
            source: 'obsidian',
            project: '610',
            type: 'task',
            description: 'Wikipedia + Fachliteratur durchgehen'
        },
        {
            id: 'reminder-1',
            title: 'Nextcloud Backup',
            time: '09:00',
            duration: '30min',
            date: formatDate(addDays(now, 1)),
            source: 'nextcloud',
            project: '010',
            type: 'reminder',
            description: 'Monatliches Backup überprüfen'
        },
        {
            id: 'task-3',
            title: 'Styling für Graph-View',
            time: '15:00',
            duration: '3h',
            date: formatDate(addDays(now, 1)),
            source: 'obsidian',
            project: '153',
            type: 'task',
            description: 'YBY-Styles auf Cytoscape anwenden'
        },
        {
            id: 'task-4',
            title: 'Bierdegustation Vorbereitung',
            time: '19:00',
            duration: '2h',
            date: formatDate(addDays(now, 2)),
            source: 'obsidian',
            project: '610',
            type: 'task',
            description: 'Notizen für 5 neue Biere erstellen'
        },
        {
            id: 'event-2',
            title: 'Arzttermin',
            time: '11:00',
            duration: '45min',
            date: formatDate(addDays(now, 2)),
            source: 'nextcloud',
            project: '010',
            type: 'event',
            description: 'Check-up beim Hausarzt'
        },
        {
            id: 'task-5',
            title: 'Wiki-Files aufräumen',
            time: '13:00',
            duration: '2h',
            date: formatDate(addDays(now, 7)),
            source: 'obsidian',
            project: '010',
            type: 'task',
            description: 'Dataview-Felder konsistent machen'
        }
    ];

    // Nach Source filtern
    let filteredItems = allItems;
    if (source !== 'all') {
        filteredItems = allItems.filter(item => item.source === source);
    }

    // Nach View filtern
    const today = formatDate(now);
    const tomorrow = formatDate(addDays(now, 1));

    switch(view) {
        case 'today':
            filteredItems = filteredItems.filter(item => item.date === today);
            break;
        case 'tomorrow':
            filteredItems = filteredItems.filter(item => item.date === tomorrow);
            break;
        case 'upcoming':
            // Nur zukünftige Items (heute + nächste 7 Tage)
            const nextWeek = formatDate(addDays(now, 7));
            filteredItems = filteredItems.filter(item => item.date <= nextWeek);
            break;
        case 'all':
        default:
            // Alle Items
            break;
    }

    // Limitieren
    const limitedItems = filteredItems.slice(0, limit);

    // Summary berechnen
    const summary = {
        today: allItems.filter(item => item.date === today).length,
        tomorrow: allItems.filter(item => item.date === tomorrow).length,
        upcoming: allItems.filter(item => {
            const nextWeek = formatDate(addDays(now, 7));
            return item.date > today && item.date <= nextWeek;
        }).length,
        total: allItems.length
    };

    return {
        generated: new Date().toISOString(),
        items: limitedItems,
        summary: summary,
        meta: {
            limit: limit,
            view: view,
            source: source,
            count: limitedItems.length
        }
    };
}

// Hilfsfunktionen
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
