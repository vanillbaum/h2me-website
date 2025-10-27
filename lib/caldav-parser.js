// CalDAV Parser - iCal/VEVENT Parsing

// Parse iCal Events from CalDAV XML Response
function parseICalEvents(xmlText, source = 'nextcloud', calendarName = 'default') {
    const events = [];

    // Extract VCALENDAR blocks from XML
    const vcalendarRegex = /BEGIN:VCALENDAR([\s\S]*?)END:VCALENDAR/g;
    const vcalendarMatches = xmlText.match(vcalendarRegex);

    if (!vcalendarMatches) {
        return events;
    }

    for (const vcalendar of vcalendarMatches) {
        // Extract VEVENT blocks
        const veventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
        const veventMatches = vcalendar.match(veventRegex);

        if (!veventMatches) continue;

        for (const vevent of veventMatches) {
            try {
                const event = parseVEvent(vevent, source, calendarName);
                if (event) {
                    events.push(event);
                }
            } catch (error) {
                console.error('Error parsing VEVENT:', error);
            }
        }
    }

    return events;
}

// Parse single VEVENT
function parseVEvent(veventText, source, calendarName) {
    const lines = veventText.split(/\r?\n/).filter(line => line.trim());

    const event = {
        source: source,
        calendar: calendarName,
        type: 'event'
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Handle line folding (lines starting with space/tab)
        while (i + 1 < lines.length && (lines[i + 1].startsWith(' ') || lines[i + 1].startsWith('\t'))) {
            line += lines[i + 1].substring(1);
            i++;
        }

        // Parse property
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const propertyPart = line.substring(0, colonIndex);
        const value = line.substring(colonIndex + 1);

        // Split property name and parameters
        const semicolonIndex = propertyPart.indexOf(';');
        const propName = semicolonIndex !== -1 ? propertyPart.substring(0, semicolonIndex) : propertyPart;
        const params = semicolonIndex !== -1 ? propertyPart.substring(semicolonIndex + 1) : '';

        // Extract values
        switch(propName) {
            case 'UID':
                event.id = value;
                break;
            case 'SUMMARY':
                event.title = value;
                break;
            case 'DESCRIPTION':
                event.description = value.replace(/\\n/g, '\n').replace(/\\,/g, ',');
                break;
            case 'DTSTART':
                event.start = parseICalDate(value, params);
                event.date = event.start.split('T')[0];
                break;
            case 'DTEND':
                event.end = parseICalDate(value, params);
                break;
            case 'LOCATION':
                event.location = value;
                break;
            case 'STATUS':
                event.status = value;
                break;
            case 'CATEGORIES':
                event.categories = value.split(',').map(c => c.trim());
                break;
        }
    }

    // Calculate duration
    if (event.start && event.end) {
        const duration = calculateDuration(event.start, event.end);
        event.duration = duration;
    }

    // Extract time (HH:MM) from start
    if (event.start && event.start.includes('T')) {
        const timePart = event.start.split('T')[1];
        event.time = timePart.substring(0, 2) + ':' + timePart.substring(2, 4);
    } else {
        event.time = 'ganztägig';
    }

    // Extract project from categories (look for XXX_Name pattern)
    if (event.categories) {
        for (const cat of event.categories) {
            const match = cat.match(/^(\d{3})_/);
            if (match) {
                event.project = match[1];
                break;
            }
        }
    }

    return event;
}

// Parse iCal date (YYYYMMDD or YYYYMMDDTHHMMSSZ)
function parseICalDate(dateStr, params) {
    // Check if it's a date-only (no time)
    if (dateStr.length === 8) {
        // YYYYMMDD
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        return year + '-' + month + '-' + day;
    }

    // Full datetime: YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
    if (dateStr.includes('T')) {
        const datePart = dateStr.split('T')[0];
        const timePart = dateStr.split('T')[1].replace('Z', '');

        const year = datePart.substring(0, 4);
        const month = datePart.substring(4, 6);
        const day = datePart.substring(6, 8);

        const hour = timePart.substring(0, 2);
        const minute = timePart.substring(2, 4);
        const second = timePart.substring(4, 6);

        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
    }

    return dateStr;
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

module.exports = {
    parseICalEvents,
    parseVEvent,
    parseICalDate
};
