/**
 * Automatic GitHub Push Tool for Madan Prasath
 * Run this with: node push-to-github.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('\n=========================================');
  console.log('🚀 MADAN\'S GITHUB AUTO-PUSH UTILITY');
  console.log('=========================================\n');

  // 1. Check/Install dependencies
  if (!fs.existsSync('./node_modules/isomorphic-git')) {
    console.log('[*] Installing isomorphic-git library (required for offline environments)...');
    try {
      execSync('npm install isomorphic-git', { stdio: 'inherit' });
      console.log('[+] Installed successfully!\n');
    } catch (e) {
      console.error('[-] Failed to install isomorphic-git. Make sure you are connected to the internet.', e);
      process.exit(1);
    }
  }

  const git = require('isomorphic-git');
  const http = require('isomorphic-git/http/node');

  // 2. Ask for GitHub Username and Token
  const username = await question('👤 Enter your GitHub username: ');
  if (!username) {
    console.log('[-] Username cannot be empty.');
    process.exit(1);
  }

  console.log('\n🔑 To get a GitHub Personal Access Token (PAT):');
  console.log('  1. Go to https://github.com/settings/tokens');
  console.log('  2. Click "Generate new token" -> "Generate new token (classic)"');
  console.log('  3. Select the "repo" scope, click generate, and copy the token.');
  
  const token = await question('\n🔐 Paste your GitHub Personal Access Token (PAT): ');
  if (!token) {
    console.log('[-] Personal Access Token cannot be empty.');
    process.exit(1);
  }

  try {
    const dir = process.cwd();
    
    // 3. Initialize Git repo if not present
    if (!fs.existsSync('.git')) {
      console.log('[*] Initializing local git repository...');
      await git.init({ fs, dir });
    }

    // 4. Add files
    console.log('[*] Staging all files...');
    const files = [
      'package.json',
      'package-lock.json',
      'next.config.mjs',
      'jsconfig.json',
      'eslint.config.mjs',
      'README.md',
      '.gitignore'
    ];

    // Find files in app, components, public
    function addDirFiles(subDir) {
      if (!fs.existsSync(subDir)) return;
      const list = fs.readdirSync(subDir, { recursive: true });
      for (const item of list) {
        const fullPath = `${subDir}/${item}`.replace(/\\/g, '/');
        if (fs.statSync(fullPath).isFile()) {
          files.push(fullPath);
        }
      }
    }
    
    addDirFiles('app');
    addDirFiles('components');
    addDirFiles('public');

    for (const file of files) {
      if (fs.existsSync(file)) {
        await git.add({ fs, dir, filepath: file });
      }
    }

    // 5. Commit changes
    console.log('[*] Committing staged files...');
    let commitSha;
    try {
      commitSha = await git.commit({
        fs,
        dir,
        author: { name: 'Madan Prasath', email: 'madanprasath2007@gmail.com' },
        message: 'Deploy full portfolio including app, components, and public folders'
      });
      console.log('[+] Commit created successfully.');
    } catch (e) {
      console.log('[*] No new changes to commit, proceeding to push...');
      commitSha = await git.resolveRef({ fs, dir, ref: 'refs/heads/master' });
    }

    // Create 'main' branch pointing to the commit
    await git.writeRef({ fs, dir, ref: 'refs/heads/main', value: commitSha });

    // 6. Set remote origin
    const repoUrl = 'https://github.com/madanprasath2007/portfoilo1.git';
    console.log(`[*] Configuring remote origin to ${repoUrl}...`);
    try {
      await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });
    } catch (e) {
      // remote already exists, update it
      await git.deleteRemote({ fs, dir, remote: 'origin' });
      await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });
    }

    // 7. Push to GitHub
    console.log('[*] Pushing source code to GitHub repository (branch: main)...');
    const result = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true, // force overwrite to ensure full source is deployed
      onAuth: () => ({ username, password: token }),
    });

    if (result.ok) {
      console.log('\n=========================================');
      console.log('🎉 SUCCESS! YOUR PORTFOLIO IS NOW PUSHED TO GITHUB!');
      console.log('=========================================');
      console.log('Vercel will automatically start building and deploy your 3D website.');
      console.log('Check your Vercel dashboard: https://vercel.com');
    } else {
      console.error('[-] Push failed. Please check your token permissions.');
    }

  } catch (e) {
    console.error('\n[-] An error occurred during Git operations:', e);
  } finally {
    rl.close();
  }
}

main();
