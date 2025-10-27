// Outlook Calendar - Microsoft Graph API Integration
// Netlify Function

const { successResponse, errorResponse, handleOptions, cacheHeaders, withCache, log } = require('./calendar-base');
const { getOutlookHeaders } = require('./auth-handler');

exports.handler = async (event, context) => {
    // Handle OPTIONS (CORS Preflight)
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions();
    }

    try {
        // Parse parameters
        const params = event.queryStringParameters || {};
        const startDate = params.start || new Date().toISOString().split('T')[0];
        const endDate = params.end || getDateDaysFromNow(30);

        log('info', 'Fetching Outlook calendar events', { startDate, endDate });

        // Fetch events mit Caching
        const cacheKey = 'outlook-' + startDate + '-' + endDate;
        const events = await withCache(cacheKey, async () => {
            return await fetchOutlookEvents(startDate, endDate);
        }, 900); // 15min cache

        return successResponse({
            source: 'outlook',
            events: events,
            count: events.length,
            dateRange: { start: startDate, end: endDate }
        }, 200, cacheHeaders(900));

    } catch (error) {
        log('error', 'Outlook calendar fetch failed', error);
        return errorResponse(error, 500);
    }
};

// Fetch Events from Outlook (Microsoft Graph API)
async function fetchOutlookEvents(startDate, endDate) {
    const headers = await getOutlookHeaders();

    // Graph API endpoint
    const startDateTime = new Date(startDate).toISOString();
    const endDateTime = new Date(endDate + 'T23:59:59').toISOString();

    const url = 'https://graph.microsoft.com/v1.0/me/calendar/events?' +
        '$select=subject,start,end,location,categories,isAllDay' +
        '&$top=100' +
        '&$filter=start/dateTime ge \'' + startDateTime + '\' and start/dateTime le \'' + endDateTime + '\'' +
        '&$orderby=start/dateTime';

    log('info', 'Querying Outlook Graph API');

    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Outlook Graph API error (' + response.status + '): ' + errorText);
    }

    const data = await response.json();

    // Convert to unified format
    const events = data.value.map(event => convertOutlookEvent(event));

    log('info', 'Found ' + events.length + ' events from Outlook');

    return events;
}

// Convert Outlook event to unified format
function convertOutlookEvent(outlookEvent) {
    const event = {
        id: outlookEvent.id,
        source: 'outlook',
        type: 'event',
        title: outlookEvent.subject || 'Untitled Event'
    };

    // Date & Time
    if (outlookEvent.start) {
        const startDateTime = outlookEvent.start.dateTime;
        event.start = startDateTime;
        event.date = startDateTime.split('T')[0];

        // Extract time
        if (!outlookEvent.isAllDay) {
            const time = new Date(startDateTime);
            event.time = String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0');
        } else {
            event.time = 'ganztägig';
        }
    }

    // End time
    if (outlookEvent.end) {
        event.end = outlookEvent.end.dateTime;
    }

    // Duration
    if (event.start && event.end) {
        event.duration = calculateDuration(event.start, event.end);
    }

    // Location
    if (outlookEvent.location && outlookEvent.location.displayName) {
        event.location = outlookEvent.location.displayName;
    }

    // Categories
    if (outlookEvent.categories && outlookEvent.categories.length > 0) {
        event.categories = outlookEvent.categories;

        // Extract project from categories (look for XXX_ pattern)
        for (const cat of outlookEvent.categories) {
            const match = cat.match(/^(\d{3})_/);
            if (match) {
                event.project = match[1];
                break;
            }
        }
    }

    return event;
}

// Calculate duration between two ISO datetime strings
function calculateDuration(start, end) {
    try {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffMs = endDate - startDate;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0 && minutes > 0) {
            return hours + 'h ' + minutes + 'min';
        } else if (hours > 0) {
            return hours + 'h';
        } else if (minutes > 0) {
            return minutes + 'min';
        }

        return '';
    } catch (error) {
        return '';
    }
}

// Helper: Get date N days from now
function getDateDaysFromNow(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}
