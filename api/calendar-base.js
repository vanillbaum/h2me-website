// Calendar Base - Shared Functions für alle API-Endpoints

// Standard CORS Headers
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

// Standard Response Headers
const RESPONSE_HEADERS = {
    'Content-Type': 'application/json',
    ...CORS_HEADERS
};

// Success Response
function successResponse(data, statusCode = 200, additionalHeaders = {}) {
    return {
        statusCode,
        headers: {
            ...RESPONSE_HEADERS,
            ...additionalHeaders
        },
        body: JSON.stringify(data)
    };
}

// Error Response
function errorResponse(error, statusCode = 500, additionalHeaders = {}) {
    const errorData = {
        error: true,
        message: error.message || 'Internal Server Error',
        statusCode: statusCode
    };

    // Log error (aber nicht in Response)
    console.error('[ERROR ' + statusCode + ']', error);

    return {
        statusCode,
        headers: {
            ...RESPONSE_HEADERS,
            ...additionalHeaders
        },
        body: JSON.stringify(errorData)
    };
}

// Cache Headers
function cacheHeaders(ttl = 900) {
    return {
        'Cache-Control': 'public, max-age=' + ttl,
        'Expires': new Date(Date.now() + ttl * 1000).toUTCString()
    };
}

// No-Cache Headers
function noCacheHeaders() {
    return {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    };
}

// OPTIONS Handler (für CORS Preflight)
function handleOptions() {
    return {
        statusCode: 204,
        headers: CORS_HEADERS,
        body: ''
    };
}

// Query Parameter Parser
function parseQueryParams(event, defaults = {}) {
    const params = event.queryStringParameters || {};
    return { ...defaults, ...params };
}

// Validate Required Params
function validateRequiredParams(params, requiredKeys) {
    const missing = requiredKeys.filter(key => !params[key]);

    if (missing.length > 0) {
        throw new Error('Missing required parameters: ' + missing.join(', '));
    }

    return true;
}

// Simple In-Memory Cache
class SimpleCache {
    constructor(defaultTTL = 900) {
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    get(key) {
        const entry = this.cache.get(key);

        if (!entry) return null;

        // Check if expired
        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    set(key, data, ttl = null) {
        const actualTTL = ttl || this.defaultTTL;
        const entry = {
            data,
            expires: Date.now() + actualTTL * 1000
        };

        this.cache.set(key, entry);
        return data;
    }

    has(key) {
        return this.get(key) !== null;
    }

    delete(key) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }
}

// Global Cache Instance
const cache = new SimpleCache(900); // 15min default

// Async Cache-Wrapper
async function withCache(key, fetchFn, ttl = null) {
    // Check cache first
    const cached = cache.get(key);
    if (cached !== null) {
        console.log('[CACHE HIT] ' + key);
        return cached;
    }

    // Fetch fresh data
    console.log('[CACHE MISS] ' + key);
    const data = await fetchFn();

    // Store in cache
    cache.set(key, data, ttl);

    return data;
}

// Rate Limit Helper (Simple)
class RateLimiter {
    constructor(maxRequests = 100, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = new Map();
    }

    check(identifier) {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        // Get existing requests
        let userRequests = this.requests.get(identifier) || [];

        // Filter out old requests
        userRequests = userRequests.filter(timestamp => timestamp > windowStart);

        // Check limit
        if (userRequests.length >= this.maxRequests) {
            return false; // Rate limit exceeded
        }

        // Add new request
        userRequests.push(now);
        this.requests.set(identifier, userRequests);

        return true; // OK
    }

    reset(identifier) {
        this.requests.delete(identifier);
    }
}

// Logger Helper
function log(level, message, data = null) {
    const timestamp = new Date().toISOString();

    // Console-Output
    switch(level) {
        case 'error':
            console.error('[' + timestamp + '] ERROR:', message, data);
            break;
        case 'warn':
            console.warn('[' + timestamp + '] WARN:', message, data);
            break;
        case 'info':
            console.log('[' + timestamp + '] INFO:', message, data);
            break;
        case 'debug':
            console.log('[' + timestamp + '] DEBUG:', message, data);
            break;
        default:
            console.log('[' + timestamp + ']', message, data);
    }
}

// Export
module.exports = {
    // Headers
    CORS_HEADERS,
    RESPONSE_HEADERS,
    cacheHeaders,
    noCacheHeaders,

    // Response Helpers
    successResponse,
    errorResponse,
    handleOptions,

    // Request Helpers
    parseQueryParams,
    validateRequiredParams,

    // Cache
    cache,
    withCache,
    SimpleCache,

    // Rate Limiting
    RateLimiter,

    // Logging
    log
};
