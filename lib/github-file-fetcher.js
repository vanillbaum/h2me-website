// GitHub File Fetcher

const { getGitHubHeaders } = require('../api/auth-handler');

// Fetch files from GitHub repository
async function fetchGitHubFiles(repo, path = '', branch = 'main') {
    const headers = getGitHubHeaders();

    // GitHub API endpoint
    const url = 'https://api.github.com/repos/' + repo + '/contents/' + path + '?ref=' + branch;

    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error('GitHub API error (' + response.status + '): ' + errorText);
    }

    const items = await response.json();

    const files = [];

    // Process each item
    for (const item of items) {
        if (item.type === 'file') {
            // Fetch file content
            const fileContent = await fetchFileContent(item.download_url, headers);
            files.push({
                name: item.name,
                path: item.path,
                content: fileContent,
                sha: item.sha
            });
        }
        // Note: Recursion für Directories ist möglich, aber hier nicht implementiert
    }

    return files;
}

// Fetch single file content
async function fetchFileContent(downloadUrl, headers) {
    const response = await fetch(downloadUrl, { headers });

    if (!response.ok) {
        throw new Error('Failed to fetch file content: ' + response.status);
    }

    return await response.text();
}

module.exports = {
    fetchGitHubFiles,
    fetchFileContent
};
