# 🚀 Quick Start Script for Dayflow HRMS
# Run this script to set up and start the complete application

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Dayflow HRMS - Complete Setup & Start" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "Checking PostgreSQL service..." -ForegroundColor Yellow
$pgService = Get-Service postgresql* -ErrorAction SilentlyContinue
if ($pgService) {
    if ($pgService.Status -ne "Running") {
        Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow
        Start-Service $pgService.Name
    }
    Write-Host "✓ PostgreSQL is running" -ForegroundColor Green
} else {
    Write-Host "✗ PostgreSQL service not found. Please install PostgreSQL." -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   STEP 1: Backend Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend
Set-Location -Path "backend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠ Please update DATABASE_URL in backend/.env with your PostgreSQL credentials" -ForegroundColor Yellow
    Write-Host "⚠ Press Enter after updating the .env file..." -ForegroundColor Yellow
    Read-Host
}

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Prisma Client generated" -ForegroundColor Green

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "Trying migrate dev instead..." -ForegroundColor Yellow
    npx prisma migrate dev
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to run migrations" -ForegroundColor Red
        Write-Host "Please check your DATABASE_URL in .env" -ForegroundColor Yellow
        exit 1
    }
}
Write-Host "✓ Database migrations completed" -ForegroundColor Green

# Seed database
Write-Host "Seeding database with test users..." -ForegroundColor Yellow
npm run seed:users
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "⚠ Seeding failed - you may need to create test users manually" -ForegroundColor Yellow
}

# Go back to root
Set-Location -Path ".."

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   STEP 2: Frontend Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend
Set-Location -Path "frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    
    # Try bun first, fallback to npm
    $bunExists = Get-Command bun -ErrorAction SilentlyContinue
    if ($bunExists) {
        Write-Host "Using bun for faster installation..." -ForegroundColor Cyan
        bun install
    } else {
        npm install
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Frontend .env created" -ForegroundColor Green
}

# Go back to root
Set-Location -Path ".."

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   STEP 3: Starting Servers" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend Server (Port 3000)..." -ForegroundColor Yellow
Write-Host "Starting Frontend Server (Port 5173)..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new terminal
$bunExists = Get-Command bun -ErrorAction SilentlyContinue
if ($bunExists) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; bun run dev"
} else {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   ✓ Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend running at:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend running at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test Credentials:" -ForegroundColor Yellow
Write-Host "  Admin:    admin@dayflow.com / Admin@123" -ForegroundColor White
Write-Host "  HR:       hr@dayflow.com / Hr@123" -ForegroundColor White
Write-Host "  Employee: employee@dayflow.com / Employee@123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop this script" -ForegroundColor Gray
Write-Host "Close the backend and frontend terminal windows to stop servers" -ForegroundColor Gray
Write-Host ""

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "Script terminated" -ForegroundColor Gray
}
