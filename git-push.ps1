$git = "C:\projet\portfolio\portfolio-hero\git-portable\cmd\git.exe"

Write-Output "[*] Initializing repository..."
& $git init

Write-Output "[*] Creating main branch..."
& $git checkout -b main

Write-Output "[*] Configuring user info..."
& $git config user.name "Madan Prasath"
& $git config user.email "madanprasath2007@gmail.com"

Write-Output "[*] Staging all files..."
& $git add .

Write-Output "[*] Committing changes..."
& $git commit -m "Upload full source code including app, components, and public folders"

Write-Output "[*] Updating remote origin..."
& $git remote remove origin 2>$null
& $git remote add origin "https://madanprasath2007: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@github.com/madanprasath2007/portfoilo1.git"

Write-Output "[*] Pushing to GitHub (branch: main)..."
& $git push -u origin main --force

Write-Output "[+] Completed!"
