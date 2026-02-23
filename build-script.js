const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const clientDir = path.join(rootDir, 'client');
const serverDir = path.join(rootDir, 'server');
const publicDir = path.join(serverDir, 'public');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function build() {
    try {
        console.log('--- Starting Unified Build Process ---');

        // 1. Build Client
        console.log('\n[1/3] Building frontend client...');
        execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

        // 2. Prepare Server Public Directory
        console.log('\n[2/3] Preparing server public directory...');
        if (fs.existsSync(publicDir)) {
            fs.rmSync(publicDir, { recursive: true, force: true });
        }
        fs.mkdirSync(publicDir, { recursive: true });

        // 3. Move Build to Server
        console.log('\n[3/3] Deploying client build to server/public...');
        const distDir = path.join(clientDir, 'dist');
        if (fs.existsSync(distDir)) {
            copyRecursiveSync(distDir, publicDir);
        } else {
            throw new Error('Client dist directory not found. Build might have failed.');
        }

        console.log('\n✔ Build process completed successfully!');
    } catch (error) {
        console.error('\n✖ Build failed:', error.message);
        process.exit(1);
    }
}

build();
