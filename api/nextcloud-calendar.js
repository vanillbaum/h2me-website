// Nextcloud Calendar - CalDAV Integration
// Netlify Function

const { successResponse, errorResponse, handleOptions, cacheHeaders, withCache, log } = require('./calendar-base');
const { getNextcloudAuth, getNextcloudHeaders } = require('./auth-handler');
const { parseICalEvents } = require('../lib/caldav-parser');

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

        log('info', 'Fetching Nextcloud calendar events', { startDate, endDate });

        // Fetch events mit Caching
        const cacheKey = 'nextcloud-' + startDate + '-' + endDate;
        const events = await withCache(cacheKey, async () => {
            return await fetchNextcloudEvents(startDate, endDate);
        }, 900); // 15min cache

        return successResponse({
            source: 'nextcloud',
            events: events,
            count: events.length,
            dateRange: { start: startDate, end: endDate }
        }, 200, cacheHeaders(900));

    } catch (error) {
        log('error', 'Nextcloud calendar fetch failed', error);
        return errorResponse(error, 500);
    }
};

// Fetch Events from Nextcloud
async function fetchNextcloudEvents(startDate, endDate) {
    const auth = getNextcloudAuth();
    const headers = getNextcloudHeaders();

    // CalDAV calendar-query XML
    const calendarQuery = buildCalendarQuery(startDate, endDate);

    const events = [];

    // Für jeden konfigurierten Kalender
    for (const calendarName of auth.calendars) {
        try {
            const calendarUrl = auth.url + '/remote.php/dav/calendars/' + auth.user + '/' + calendarName + '/';

            log('info', 'Querying calendar: ' + calendarName);

            const response = await fetch(calendarUrl, {
                method: 'REPORT',
                headers: headers,
                body: calendarQuery
            });

            if (!response.ok) {
                log('warn', 'Calendar query failed for ' + calendarName + ': ' + response.status);
                continue;
            }

            const xmlText = await response.text();

            // Parse iCal events from XML
            const calendarEvents = parseICalEvents(xmlText, 'nextcloud', calendarName);
            events.push(...calendarEvents);

            log('info', 'Found ' + calendarEvents.length + ' events in ' + calendarName);

        } catch (error) {
            log('error', 'Error fetching calendar ' + calendarName, error);
            // Continue with next calendar
        }
    }

    return events;
}

// Build CalDAV calendar-query XML
function buildCalendarQuery(startDate, endDate) {
    const start = new Date(startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const end = new Date(endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return '<?xml version="1.0" encoding="utf-8" ?>' +
        '<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">' +
        '<d:prop>' +
        '<d:getetag />' +
        '<c:calendar-data />' +
        '</d:prop>' +
        '<c:filter>' +
        '<c:comp-filter name="VCALENDAR">' +
        '<c:comp-filter name="VEVENT">' +
        '<c:time-range start="' + start + '" end="' + end + '"/>' +
        '</c:comp-filter>' +
        '</c:comp-filter>' +
        '</c:filter>' +
        '</c:calendar-query>';
}

// Helper: Get date N days from now
function getDateDaysFromNow(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}
