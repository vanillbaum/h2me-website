// Markdown Task Parser - Obsidian Format

// Parse tasks from Markdown content
function parseMarkdownTasks(markdownContent, source = 'obsidian', project = null, filename = '') {
    const lines = markdownContent.split(/\r?\n/);
    const tasks = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Task pattern: - [ ] or - [x]
        const taskMatch = line.match(/^-\s+\[([ x])\]\s+(.+)$/i);

        if (!taskMatch) continue;

        const isCompleted = taskMatch[1].toLowerCase() === 'x';
        const taskText = taskMatch[2];

        // Nur incomplete tasks
        if (isCompleted) continue;

        const task = {
            source: source,
            type: 'task',
            title: taskText,
            project: project,
            filename: filename
        };

        // Extract date from task text
        // Formats:
        // - @YYYY-MM-DD
        // - =Å YYYY-MM-DD
        // - [due:: YYYY-MM-DD]

        // Pattern 1: @YYYY-MM-DD
        const atDateMatch = taskText.match(/@(\d{4}-\d{2}-\d{2})/);
        if (atDateMatch) {
            task.date = atDateMatch[1];
        }

        // Pattern 2: =Å YYYY-MM-DD
        const emojiDateMatch = taskText.match(/=Å\s*(\d{4}-\d{2}-\d{2})/);
        if (emojiDateMatch) {
            task.date = emojiDateMatch[1];
        }

        // Pattern 3: [due:: YYYY-MM-DD]
        const dueMatch = taskText.match(/\[due::\s*(\d{4}-\d{2}-\d{2})\]/);
        if (dueMatch) {
            task.date = dueMatch[1];
        }

        // Extract time
        // Pattern: ð HH:MM or @HH:MM
        const timeMatch = taskText.match(/[ð@]\s*(\d{1,2}):(\d{2})/);
        if (timeMatch) {
            const hour = timeMatch[1].padStart(2, '0');
            const minute = timeMatch[2];
            task.time = hour + ':' + minute;
        }

        // Extract project from hashtag (if not from filename)
        if (!task.project) {
            const projectMatch = taskText.match(/#(\d{3})_/);
            if (projectMatch) {
                task.project = projectMatch[1];
            }
        }

        // Extract priority
        const priorityMatch = taskText.match(/priority::(high|medium|low)/i);
        if (priorityMatch) {
            task.priority = priorityMatch[1].toLowerCase();
        }

        // Clean title (remove metadata)
        task.title = task.title
            .replace(/@\d{4}-\d{2}-\d{2}/g, '')
            .replace(/=Å\s*\d{4}-\d{2}-\d{2}/g, '')
            .replace(/\[due::\s*\d{4}-\d{2}-\d{2}\]/g, '')
            .replace(/[ð@]\s*\d{1,2}:\d{2}/g, '')
            .replace(/#\d{3}_\w+/g, '')
            .replace(/priority::(high|medium|low)/gi, '')
            .trim();

        // Only add if has a date
        if (task.date) {
            // Calculate if it's today/tomorrow/upcoming
            const taskDate = new Date(task.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Nur zukünftige oder heutige Tasks
            if (taskDate >= today) {
                tasks.push(task);
            }
        }
    }

    return tasks;
}

module.exports = {
    parseMarkdownTasks
};
