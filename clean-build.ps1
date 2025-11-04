# clean-build.ps1
Write-Host "Cleaning old builds..." -ForegroundColor Yellow

if (Test-Path .next) { Remove-Item -Recurse -Force .next }
if (Test-Path .open-next) { Remove-Item -Recurse -Force .open-next }
if (Test-Path node_modules\.cache) { Remove-Item -Recurse -Force node_modules\.cache }

Write-Host "Building project..." -ForegroundColor Green
npm run build

Write-Host "Done! Ready to deploy." -ForegroundColor Cyan