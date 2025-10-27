// Data Aggregator - Merge & Filter Logic

// Aggregate data from multiple sources
function aggregateData(nextcloudEvents, obsidianTasks, outlookEvents) {
    // Merge all arrays
    const all = [
        ...(nextcloudEvents || []),
        ...(obsidianTasks || []),
        ...(outlookEvents || [])
    ];

    // Sort by date + time
    all.sort((a, b) => {
        // Primary: date
        if (a.date !== b.date) {
            return a.date.localeCompare(b.date);
        }

        // Secondary: time (handle "ganztägig")
        const timeA = a.time === 'ganztägig' ? '00:00' : a.time || '00:00';
        const timeB = b.time === 'ganztägig' ? '00:00' : b.time || '00:00';

        return timeA.localeCompare(timeB);
    });

    // Remove duplicates (based on id + source)
    const unique = [];
    const seen = new Set();

    for (const item of all) {
        const key = item.source + '-' + (item.id || item.title);
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
        }
    }

    return unique;
}

// Apply filters to aggregated data
function applyFilters(items, filters) {
    let filtered = [...items];

    // Filter by source
    if (filters.source && filters.source !== 'all') {
        filtered = filtered.filter(item => item.source === filters.source);
    }

    // Filter by project
    if (filters.project && filters.project !== 'all') {
        filtered = filtered.filter(item => item.project === filters.project);
    }

    // Filter by view (time range)
    if (filters.view) {
        filtered = filterByView(filtered, filters.view);
    }

    // Limit results
    if (filters.limit) {
        filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
}

// Filter by view (today, tomorrow, upcoming, all)
function filterByView(items, view) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const tomorrow = new Date(today.getTime() + 86400000);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const nextWeek = new Date(today.getTime() + 604800000);

    switch(view) {
        case 'today':
            return items.filter(item => item.date === todayStr);

        case 'tomorrow':
            return items.filter(item => item.date === tomorrowStr);

        case 'upcoming':
            // Today + next 7 days
            return items.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= today && itemDate <= nextWeek;
            });

        case 'week':
            // Next 7 days (excluding today)
            return items.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate > today && itemDate <= nextWeek;
            });

        case 'month':
            // Next 30 days
            const nextMonth = new Date(today.getTime() + 2592000000);
            return items.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= today && itemDate <= nextMonth;
            });

        case 'all':
        default:
            return items;
    }
}

module.exports = {
    aggregateData,
    applyFilters,
    filterByView
};
