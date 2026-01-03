# 🚀 Quick Start Guide - Dayflow HRMS

Get your Dayflow HRMS system up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Git installed

## Step 1: Clone and Setup (5 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd ODOO-GCET

# Optionally create a new branch for your work
git checkout -b feature/your-feature-name
```

## Step 2: Database Setup (3 minutes)

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dayflow_hrms;

# Exit psql
\q
```

## Step 3: Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and update your database credentials:
# DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/dayflow_hrms?schema=public"

# Run database migrations
npx prisma migrate dev
npx prisma generate

# Optional: Seed initial data
npm run seed

# Start backend server
npm run start:dev
```

✅ Backend should now be running at `http://localhost:3000`

## Step 4: Frontend Setup (3 minutes)

```bash
# Open a new terminal
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start frontend development server
npm run dev
```

✅ Frontend should now be running at `http://localhost:5173`

## Step 5: Test the Application (2 minutes)

1. Open your browser and go to `http://localhost:5173`
2. You should see the Dayflow login page
3. Try logging in with test credentials (if you seeded the database)
4. Explore the features!

## Default Test Credentials (if seeded)

**Admin:**
- Email: `admin@dayflow.com`
- Password: `admin123`

**Employee:**
- Email: `employee@dayflow.com`
- Password: `employee123`

## Verify Everything is Working

### Check Backend:
```bash
# In backend directory
curl http://localhost:3000/auth/profile
# Should return: {"statusCode":401,"message":"Unauthorized"}
# This is correct - it means the API is working!
```

### Check Frontend:
- Navigate to `http://localhost:5173`
- You should see a beautiful login page
- No console errors in browser DevTools

## Common Quick Fixes

### Port Already in Use?

**Backend (3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Frontend (5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error?
- Ensure PostgreSQL is running
- Verify credentials in `backend/.env`
- Check database exists: `psql -U postgres -l`

### Module Not Found Error?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that everything is running:

1. 📖 Read the [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed documentation
2. 🧪 Test the features:
   - Login/Logout
   - Employee profile
   - Attendance check-in/out
   - Leave applications
   - View payslips
   - Admin operations (if using admin account)
3. 🔧 Start developing your features!

## Development Workflow

### Starting Work
```bash
# Backend terminal
cd backend
npm run start:dev

# Frontend terminal (new terminal)
cd frontend
npm run dev
```

### Making Changes
1. Edit files in `backend/src/` or `frontend/src/`
2. Changes hot-reload automatically
3. Check console for errors
4. Test in browser

### Before Committing
```bash
# Backend: Run tests
cd backend
npm run test

# Backend: Check linting
npm run lint

# Frontend: Build to check for errors
cd frontend
npm run build

# Frontend: Check linting
npm run lint
```

## Useful Commands

### Backend
```bash
npm run start:dev     # Start development server
npm run build         # Build for production
npm run test          # Run tests
npm run migration:generate  # Generate new migration
npx prisma studio     # Open Prisma Studio (DB GUI)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

## Getting Help

- 📚 Full documentation: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- 🐛 Found a bug? Check the troubleshooting section
- 💡 Feature idea? Document it in issues

## Architecture at a Glance

```
┌──────────────┐     HTTP/REST      ┌──────────────┐     Prisma     ┌──────────────┐
│   React      │ ◄───────────────► │   NestJS     │ ◄────────────► │  PostgreSQL  │
│   Frontend   │   (Port 5173)     │   Backend    │                 │   Database   │
│              │                    │  (Port 3000) │                 │              │
└──────────────┘                    └──────────────┘                 └──────────────┘
     │                                     │
     │                                     │
     ├─ Pages & Components               ├─ Controllers
     ├─ Services (API calls)             ├─ Services (Business Logic)
     ├─ Contexts (State)                 ├─ DTOs (Validation)
     └─ Types (TypeScript)               └─ Prisma (ORM)
```

## Features Overview

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, HR, Employee)
- Protected routes

✅ **Employee Management**
- CRUD operations
- Profile management
- Employee directory

✅ **Attendance Tracking**
- Real-time check-in/check-out
- Attendance history
- Statistics and reports

✅ **Leave Management**
- Leave application
- Approval workflow
- Leave balance tracking

✅ **Payroll System**
- Payslip generation
- Salary calculations
- Payment history

✅ **Admin Dashboard**
- Organization statistics
- Employee overview
- Quick actions

## Success! 🎉

If you've followed all steps and see no errors, congratulations! Your Dayflow HRMS system is now fully integrated and running.

**Time to build something amazing!** 🚀

---

**Last Updated:** January 3, 2026
