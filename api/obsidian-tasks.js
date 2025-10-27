// Obsidian Tasks - GitHub Integration
// Netlify Function

const { successResponse, errorResponse, handleOptions, cacheHeaders, withCache, log } = require('./calendar-base');
const { getGitHubAuth, getGitHubHeaders } = require('./auth-handler');
const { fetchGitHubFiles } = require('../lib/github-file-fetcher');
const { parseMarkdownTasks } = require('../lib/markdown-task-parser');

exports.handler = async (event, context) => {
    // Handle OPTIONS (CORS Preflight)
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions();
    }

    try {
        log('info', 'Fetching Obsidian tasks from GitHub');

        // Fetch tasks mit Caching
        const cacheKey = 'obsidian-tasks';
        const tasks = await withCache(cacheKey, async () => {
            return await fetchObsidianTasks();
        }, 900); // 15min cache

        return successResponse({
            source: 'obsidian',
            tasks: tasks,
            count: tasks.length
        }, 200, cacheHeaders(900));

    } catch (error) {
        log('error', 'Obsidian tasks fetch failed', error);
        return errorResponse(error, 500);
    }
};

// Fetch Tasks from GitHub (Obsidian Files)
async function fetchObsidianTasks() {
    const auth = getGitHubAuth();

    log('info', 'Fetching files from GitHub repo: ' + auth.repo);

    // Fetch all .md files from repo
    const files = await fetchGitHubFiles(auth.repo, auth.path, auth.branch);

    const allTasks = [];

    // Parse tasks from each file
    for (const file of files) {
        try {
            // Nur .md Dateien
            if (!file.name.endsWith('.md')) continue;

            log('info', 'Parsing file: ' + file.name);

            // Extract project from filename (e.g. 153_TASKS_h2me.md ’ 153)
            const projectMatch = file.name.match(/^(\d{3})_/);
            const project = projectMatch ? projectMatch[1] : null;

            // Parse tasks
            const tasks = parseMarkdownTasks(file.content, 'obsidian', project, file.name);

            allTasks.push(...tasks);

            log('info', 'Found ' + tasks.length + ' tasks in ' + file.name);

        } catch (error) {
            log('error', 'Error parsing file ' + file.name, error);
            // Continue with next file
        }
    }

    return allTasks;
}
