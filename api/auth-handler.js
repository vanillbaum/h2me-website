// Authentication Handler - Token Management

const { log } = require('./calendar-base');

// Get Environment Variable (mit Fallback)
function getEnv(key, defaultValue = null) {
    const value = process.env[key];

    if (!value && defaultValue === null) {
        throw new Error('Missing required environment variable: ' + key);
    }

    return value || defaultValue;
}

// Nextcloud Credentials
function getNextcloudAuth() {
    return {
        url: getEnv('NEXTCLOUD_URL'),
        user: getEnv('NEXTCLOUD_USER'),
        password: getEnv('NEXTCLOUD_PASSWORD'),
        calendars: getEnv('NEXTCLOUD_CALENDARS', '').split(',').filter(Boolean)
    };
}

// Outlook Credentials
function getOutlookAuth() {
    return {
        clientId: getEnv('OUTLOOK_CLIENT_ID'),
        clientSecret: getEnv('OUTLOOK_CLIENT_SECRET'),
        tenantId: getEnv('OUTLOOK_TENANT_ID', 'common'),
        refreshToken: getEnv('OUTLOOK_REFRESH_TOKEN', null)
    };
}

// GitHub Credentials (für Obsidian Files)
function getGitHubAuth() {
    return {
        token: getEnv('GITHUB_TOKEN'),
        repo: getEnv('GITHUB_REPO'),
        branch: getEnv('GITHUB_BRANCH', 'main'),
        path: getEnv('GITHUB_PATH', 'a_yang')
    };
}

// Basic Auth Header erstellen
function createBasicAuth(username, password) {
    const credentials = username + ':' + password;
    const base64 = Buffer.from(credentials).toString('base64');
    return 'Basic ' + base64;
}

// Bearer Token Header erstellen
function createBearerAuth(token) {
    return 'Bearer ' + token;
}

// Nextcloud Request Headers
function getNextcloudHeaders() {
    const auth = getNextcloudAuth();
    return {
        'Authorization': createBasicAuth(auth.user, auth.password),
        'Content-Type': 'application/xml; charset=utf-8'
    };
}

// GitHub Request Headers
function getGitHubHeaders() {
    const auth = getGitHubAuth();
    return {
        'Authorization': createBearerAuth(auth.token),
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'H2me-Calendar-App'
    };
}

// Outlook: Access Token holen (mit Refresh Token)
async function getOutlookAccessToken() {
    const auth = getOutlookAuth();

    // Wenn kein Refresh Token ’ Error
    if (!auth.refreshToken) {
        throw new Error('No Outlook refresh token configured');
    }

    try {
        const tokenUrl = 'https://login.microsoftonline.com/' + auth.tenantId + '/oauth2/v2.0/token';

        const params = new URLSearchParams({
            client_id: auth.clientId,
            client_secret: auth.clientSecret,
            refresh_token: auth.refreshToken,
            grant_type: 'refresh_token',
            scope: 'https://graph.microsoft.com/.default'
        });

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Outlook token refresh failed: ' + errorText);
        }

        const data = await response.json();

        log('info', 'Outlook access token refreshed');

        return data.access_token;

    } catch (error) {
        log('error', 'Outlook authentication failed', error);
        throw error;
    }
}

// Outlook Request Headers (mit automatischem Token Refresh)
async function getOutlookHeaders() {
    const accessToken = await getOutlookAccessToken();
    return {
        'Authorization': createBearerAuth(accessToken),
        'Content-Type': 'application/json'
    };
}

// Validate Credentials (Check ob alle nötigen Env-Vars gesetzt sind)
function validateCredentials(service) {
    try {
        switch(service) {
            case 'nextcloud':
                getNextcloudAuth();
                return { valid: true, service: 'nextcloud' };

            case 'outlook':
                getOutlookAuth();
                return { valid: true, service: 'outlook' };

            case 'github':
                getGitHubAuth();
                return { valid: true, service: 'github' };

            default:
                return { valid: false, error: 'Unknown service: ' + service };
        }
    } catch (error) {
        return {
            valid: false,
            service: service,
            error: error.message
        };
    }
}

// Check welche Services konfiguriert sind
function getAvailableServices() {
    const services = {
        nextcloud: validateCredentials('nextcloud').valid,
        outlook: validateCredentials('outlook').valid,
        github: validateCredentials('github').valid
    };

    const available = Object.keys(services).filter(key => services[key]);

    log('info', 'Available services: ' + available.join(', '));

    return {
        services,
        available,
        count: available.length
    };
}

// Export
module.exports = {
    // Environment
    getEnv,

    // Auth Helpers
    createBasicAuth,
    createBearerAuth,

    // Service Auth
    getNextcloudAuth,
    getOutlookAuth,
    getGitHubAuth,

    // Request Headers
    getNextcloudHeaders,
    getOutlookHeaders,
    getGitHubHeaders,

    // Validation
    validateCredentials,
    getAvailableServices
};
