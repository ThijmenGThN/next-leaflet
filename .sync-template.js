#!/usr/bin/env node

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const TEMPLATE_REPO = 'https://github.com/ThijmenGThN/next-leaflet.git';
const TEMPLATE_REMOTE = 'next-leaflet'; // Name matches the actual repo name

function log(message, type = 'info') {
    const colors = {
        info: '\x1b[36m',
        success: '\x1b[32m',
        warning: '\x1b[33m',
        error: '\x1b[31m',
        reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
}

function execCommand(command, silent = false) {
    try {
        return execSync(command, {
            encoding: 'utf8',
            stdio: silent ? 'pipe' : 'inherit'
        });
    } catch (error) {
        throw new Error(`Command failed: ${command}\n${error.message}`);
    }
}

function main() {
    log('🔄 Syncing with template repository...', 'info');

    try {
        // Check for uncommitted changes
        const status = execCommand('git status --porcelain', true);
        if (status && status.trim()) {
            log('⚠️  You have uncommitted changes. Please commit them first.', 'warning');
            process.exit(1);
        }

        // Add/update template remote
        const remotes = execCommand('git remote', true);
        if (remotes.includes(TEMPLATE_REMOTE)) {
            execCommand(`git remote set-url ${TEMPLATE_REMOTE} ${TEMPLATE_REPO}`, true);
        } else {
            execCommand(`git remote add ${TEMPLATE_REMOTE} ${TEMPLATE_REPO}`, true);
        }

        // Fetch template changes
        log('📥 Fetching template changes...', 'info');
        execCommand(`git fetch ${TEMPLATE_REMOTE}`, true);

        // Check if there are new commits
        let templateBranch = 'main';
        try {
            execCommand(`git log --oneline HEAD..${TEMPLATE_REMOTE}/main`, true);
        } catch {
            templateBranch = 'master';
        }

        const newCommits = execCommand(`git log --oneline HEAD..${TEMPLATE_REMOTE}/${templateBranch}`, true);

        if (!newCommits || !newCommits.trim()) {
            log('✅ Already up to date!', 'success');
            return;
        }

        log('📋 New commits found:', 'info');
        console.log(newCommits);

        // Merge template changes
        log('🔀 Merging template changes...', 'info');
        execCommand(`git merge ${TEMPLATE_REMOTE}/${templateBranch} --no-ff -m "chore: sync with template repository"`);

        log('✅ Template sync completed successfully!', 'success');
        log('💡 Run your tests and push changes if everything looks good.', 'info');

    } catch (error) {
        if (error.message.includes('CONFLICT')) {
            log('⚠️  Merge conflicts detected. Resolve them manually:', 'warning');
            log('   1. Edit the conflicting files', 'info');
            log('   2. Run: git add <resolved-files>', 'info');
            log('   3. Run: git commit', 'info');
        } else {
            log(`❌ Error: ${error.message}`, 'error');
        }
        process.exit(1);
    }
}

// Check if this file is being run directly (ES module equivalent of require.main === module)
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
    main();
}