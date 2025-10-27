// Calendar Aggregate - Unified Data from All Sources
// Netlify Function - Main API Endpoint

const { successResponse, errorResponse, handleOptions, parseQueryParams, cacheHeaders, log } = require('./calendar-base');
const { getAvailableServices } = require('./auth-handler');
const { aggregateData, applyFilters } = require('../lib/data-aggregator');

// Import source-specific functions
const nextcloudHandler = require('./nextcloud-calendar');
const obsidianHandler = require('./obsidian-tasks');
const outlookHandler = require('./outlook-calendar');

exports.handler = async (event, context) => {
    // Handle OPTIONS (CORS Preflight)
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions();
    }

    try {
        // Parse parameters
        const params = parseQueryParams(event, {
            view: 'upcoming',
            source: 'all',
            project: 'all',
            limit: 50
        });

        log('info', 'Aggregating calendar data', params);

        // Check welche Services verfügbar sind
        const available = getAvailableServices();

        // Fetch data from all available sources (parallel)
        const results = await fetchAllSources(available.services);

        // Merge data
        const merged = aggregateData(
            results.nextcloud || [],
            results.obsidian || [],
            results.outlook || []
        );

        // Apply filters
        const filtered = applyFilters(merged, {
            view: params.view,
            source: params.source,
            project: params.project,
            limit: parseInt(params.limit)
        });

        // Calculate summary
        const summary = calculateSummary(merged);

        // Response
        return successResponse({
            generated: new Date().toISOString(),
            items: filtered,
            summary: summary,
            meta: {
                view: params.view,
                source: params.source,
                project: params.project,
                limit: params.limit,
                count: filtered.length,
                totalCount: merged.length,
                availableServices: available.available
            }
        }, 200, cacheHeaders(900));

    } catch (error) {
        log('error', 'Calendar aggregation failed', error);
        return errorResponse(error, 500);
    }
};

// Fetch data from all sources
async function fetchAllSources(services) {
    const results = {
        nextcloud: null,
        obsidian: null,
        outlook: null
    };

    const promises = [];

    // Nextcloud
    if (services.nextcloud) {
        promises.push(
            fetchNextcloudData()
                .then(data => { results.nextcloud = data; })
                .catch(error => {
                    log('warn', 'Nextcloud fetch failed', error);
                    results.nextcloud = [];
                })
        );
    }

    // Obsidian
    if (services.github) {
        promises.push(
            fetchObsidianData()
                .then(data => { results.obsidian = data; })
                .catch(error => {
                    log('warn', 'Obsidian fetch failed', error);
                    results.obsidian = [];
                })
        );
    }

    // Outlook
    if (services.outlook) {
        promises.push(
            fetchOutlookData()
                .then(data => { results.outlook = data; })
                .catch(error => {
                    log('warn', 'Outlook fetch failed', error);
                    results.outlook = [];
                })
        );
    }

    // Wait for all (mit Timeout)
    await Promise.all(promises);

    return results;
}

// Fetch Nextcloud data (internal call)
async function fetchNextcloudData() {
    try {
        const mockEvent = {
            httpMethod: 'GET',
            queryStringParameters: {}
        };
        const response = await nextcloudHandler.handler(mockEvent, {});
        const data = JSON.parse(response.body);
        return data.events || [];
    } catch (error) {
        log('error', 'Nextcloud internal fetch failed', error);
        return [];
    }
}

// Fetch Obsidian data (internal call)
async function fetchObsidianData() {
    try {
        const mockEvent = {
            httpMethod: 'GET',
            queryStringParameters: {}
        };
        const response = await obsidianHandler.handler(mockEvent, {});
        const data = JSON.parse(response.body);
        return data.tasks || [];
    } catch (error) {
        log('error', 'Obsidian internal fetch failed', error);
        return [];
    }
}

// Fetch Outlook data (internal call)
async function fetchOutlookData() {
    try {
        const mockEvent = {
            httpMethod: 'GET',
            queryStringParameters: {}
        };
        const response = await outlookHandler.handler(mockEvent, {});
        const data = JSON.parse(response.body);
        return data.events || [];
    } catch (error) {
        log('error', 'Outlook internal fetch failed', error);
        return [];
    }
}

// Calculate summary statistics
function calculateSummary(items) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 86400000);
    const nextWeek = new Date(today.getTime() + 604800000);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    return {
        today: items.filter(item => item.date === todayStr).length,
        tomorrow: items.filter(item => item.date === tomorrowStr).length,
        upcoming: items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate > today && itemDate <= nextWeek;
        }).length,
        total: items.length,
        bySource: {
            nextcloud: items.filter(item => item.source === 'nextcloud').length,
            obsidian: items.filter(item => item.source === 'obsidian').length,
            outlook: items.filter(item => item.source === 'outlook').length
        }
    };
}
