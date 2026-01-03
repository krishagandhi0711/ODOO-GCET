<p align="center">
  <img src="https://img.shields.io/badge/DayFlow-HRMS-7C3AED?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDIyYTEwIDEwIDAgMSAxIDAtMjAgMTAgMTAgMCAwIDEgMCAyMFoiLz48cGF0aCBkPSJNMTIgNnY2bDQgMiIvPjwvc3ZnPg==" alt="DayFlow Logo"/>
</p>

<h1 align="center">🚀 DayFlow HRMS</h1>

<p align="center">
  <strong>A Complete Human Resource Management System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-screenshots">Screenshots</a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
- [Troubleshooting](#-troubleshooting)
- [Team](#-team)

---

## 🌟 Overview

**DayFlow** is a modern, full-stack Human Resource Management System (HRMS) designed to streamline workforce management for organizations of all sizes. Built with cutting-edge technologies, DayFlow offers a seamless experience for managing employees, tracking attendance, processing payroll, and handling leave requests—all from a single, intuitive platform.

### 🎯 Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light mode support
- 🔐 **Enterprise-grade Security** - JWT-based authentication with role-based access control
- ⚡ **Real-time Updates** - Live attendance status tracking ("Green Dot" feature)
- 📊 **Analytics Dashboard** - Visual insights into workforce metrics
- 🏢 **Multi-Company Support** - Manage multiple organizations from one platform

---

## ✨ Features

### 👥 Employee Management
| Feature | Description |
|---------|-------------|
| **Employee Directory** | Complete workforce database with search and filter capabilities |
| **Profile Management** | Comprehensive employee profiles with personal, professional, and document details |
| **Skill Tracking** | Track employee skills and certifications |
| **Document Management** | Store and manage employee documents digitally |
| **Organizational Hierarchy** | Manager-employee relationships and reporting structures |
| **Auto-generated Employee Codes** | Unique, company-prefixed employee identifiers |

### ⏰ Attendance Tracking
| Feature | Description |
|---------|-------------|
| **One-Click Check-in/Check-out** | Simple daily attendance marking |
| **Real-time Status** | Live attendance status with visual indicators |
| **Work Hours Calculation** | Automatic tracking of daily and weekly hours |
| **Extra Hours Tracking** | Monitor overtime and additional work hours |
| **Attendance History** | Complete attendance records with date range filtering |
| **Admin Oversight** | View any employee's attendance (Admin/HR only) |

### 📅 Leave Management
| Feature | Description |
|---------|-------------|
| **Leave Application** | Apply for Paid, Sick, or Unpaid leave |
| **Leave Balance Tracking** | Visual display of remaining leave days |
| **Approval Workflow** | Multi-level leave approval system |
| **Conflict Detection** | Prevents leave overlap and duplicate bookings |
| **Leave Statistics** | Comprehensive leave usage analytics |
| **Cancel Requests** | Employees can cancel pending leave requests |

### 💰 Payroll Management
| Feature | Description |
|---------|-------------|
| **Salary Structure** | Configurable salary components (Basic, HRA, Allowances) |
| **Auto Calculations** | Automatic deductions (PF, Professional Tax) and bonuses |
| **Payslip Generation** | Detailed monthly payslips with all components |
| **Payroll History** | Access to past payslips and payment records |
| **Multi-month Support** | Generate payslips for any month/year combination |

### 🏢 Company Management (Admin)
| Feature | Description |
|---------|-------------|
| **Company Profiles** | Manage company details and branding |
| **Employee Statistics** | Department-wise and role-wise analytics |
| **Workforce Dashboard** | Real-time organizational insights |
| **Leave Approvals** | Centralized leave request management |

### 🔐 Authentication & Security
| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure token-based authentication |
| **Role-Based Access Control** | Admin, HR, and Employee roles with granular permissions |
| **Password Hashing** | Bcrypt-encrypted password storage |
| **First-time Login Flow** | Secure password reset for new employees |
| **Protected Routes** | Route guards for authenticated and authorized access |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building component-based interfaces |
| **TypeScript** | 5.8.3 | Static typing for better code quality |
| **Vite** | 5.4.19 | Fast build tool and development server |
| **React Router DOM** | 6.30.1 | Client-side routing and navigation |
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework |
| **Radix UI** | Latest | Accessible, unstyled UI primitives |
| **TanStack React Query** | 5.83.0 | Data fetching and caching |
| **React Hook Form** | 7.61.1 | Form validation and management |
| **Zod** | 3.25.76 | Schema validation |
| **Lucide React** | 0.462.0 | Beautiful icon library |
| **Recharts** | 2.15.4 | Charts and data visualization |
| **date-fns** | 3.6.0 | Date manipulation utilities |
| **sonner** | 1.7.4 | Toast notifications |
| **next-themes** | 0.3.0 | Dark/Light theme management |
| **class-variance-authority** | 0.7.1 | Component variant management |
| **tailwind-merge** | 2.6.0 | Tailwind class merging utility |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.0.1 | Progressive Node.js framework |
| **TypeScript** | 5.7.3 | Static typing |
| **Prisma** | 5.22.0 | ORM for database operations |
| **PostgreSQL** | - | Relational database |
| **Passport.js** | 0.7.0 | Authentication middleware |
| **passport-jwt** | 4.0.1 | JWT authentication strategy |
| **@nestjs/jwt** | 11.0.2 | JWT token management |
| **bcrypt** | 6.0.0 | Password hashing |
| **class-validator** | 0.14.3 | DTO validation |
| **class-transformer** | 0.5.1 | Object transformation |
| **axios** | 1.13.2 | HTTP client |
| **RxJS** | 7.8.1 | Reactive programming |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.18.0 | Code linting |
| **Prettier** | 3.4.2 | Code formatting |
| **Jest** | 30.0.0 | Testing framework |
| **ts-node** | 10.9.2 | TypeScript execution |
| **Supertest** | 7.0.0 | API testing |

---

## 📁 Project Structure

```
ODOO-GCET/
├── 📂 frontend/                    # React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI Components
│   │   │   ├── 📂 admin/           # Admin-specific components
│   │   │   │   ├── company/        # Company management
│   │   │   │   ├── dashboard/      # Admin dashboard widgets
│   │   │   │   ├── employees/      # Employee management
│   │   │   │   ├── leave/          # Leave approval components
│   │   │   │   └── payroll/        # Payroll components
│   │   │   ├── 📂 layout/          # Layout components (Navbar, Sidebar)
│   │   │   ├── 📂 ui/              # Shadcn/UI components (49 components)
│   │   │   ├── DashboardCard.tsx   # Dashboard card component
│   │   │   ├── ProtectedRoute.tsx  # Route protection HOC
│   │   │   ├── StatusBadge.tsx     # Status indicator component
│   │   │   ├── ThemeProvider.tsx   # Theme context provider
│   │   │   └── ThemeToggle.tsx     # Dark/Light mode toggle
│   │   ├── 📂 contexts/            # React Context Providers
│   │   │   ├── AuthContext.tsx     # Authentication state
│   │   │   └── AttendanceContext.tsx # Attendance state
│   │   ├── 📂 hooks/               # Custom React Hooks
│   │   ├── 📂 lib/                 # Utility functions
│   │   ├── 📂 pages/               # Page Components
│   │   │   ├── 📂 admin/           # Admin Pages
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminEmployees.tsx
│   │   │   │   ├── AdminLeaveApprovals.tsx
│   │   │   │   ├── AdminPayroll.tsx
│   │   │   │   └── AdminCompany.tsx
│   │   │   ├── Attendance.tsx      # Attendance page
│   │   │   ├── Dashboard.tsx       # Employee dashboard
│   │   │   ├── FirstTimeLogin.tsx  # First login password reset
│   │   │   ├── ForgotPassword.tsx  # Password recovery
│   │   │   ├── Landing.tsx         # Landing page
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Profile.tsx         # User profile
│   │   │   ├── ResetPassword.tsx   # Password reset
│   │   │   ├── Signup.tsx          # Registration
│   │   │   └── TimeOff.tsx         # Leave management
│   │   ├── App.tsx                 # Main application component
│   │   ├── main.tsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── 📂 backend/                     # NestJS Backend API
│   ├── 📂 src/
│   │   ├── 📂 auth/                # Authentication Module
│   │   │   ├── auth.controller.ts  # Auth endpoints
│   │   │   ├── auth.service.ts     # Auth business logic
│   │   │   ├── auth.module.ts      # Module definition
│   │   │   ├── jwt.strategy.ts     # JWT validation strategy
│   │   │   └── dto/                # Data Transfer Objects
│   │   ├── 📂 employees/           # Employee Management Module
│   │   │   ├── employees.controller.ts
│   │   │   ├── employees.service.ts
│   │   │   ├── employees.module.ts
│   │   │   └── dto/
│   │   ├── 📂 attendance/          # Attendance Module
│   │   │   ├── attendance.controller.ts
│   │   │   ├── attendance.service.ts
│   │   │   ├── attendance.module.ts
│   │   │   └── dto/
│   │   ├── 📂 leaves/              # Leave Management Module
│   │   │   ├── leaves.controller.ts
│   │   │   ├── leaves.service.ts
│   │   │   ├── leaves.module.ts
│   │   │   └── dto/
│   │   ├── 📂 payroll/             # Payroll Module
│   │   │   ├── payroll.controller.ts
│   │   │   ├── payroll.service.ts
│   │   │   └── payroll.module.ts
│   │   ├── 📂 prisma/              # Database Service
│   │   │   └── prisma.service.ts
│   │   ├── 📂 common/              # Shared Utilities
│   │   │   ├── decorators/         # Custom decorators
│   │   │   └── guards/             # Auth & Role guards
│   │   ├── app.module.ts           # Root module
│   │   └── main.ts                 # Application bootstrap
│   ├── 📂 prisma/
│   │   └── schema.prisma           # Database schema
│   ├── 📂 scripts/
│   │   └── create-test-users.ts    # Database seeding
│   ├── 📂 test/                    # E2E tests
│   ├── package.json
│   └── tsconfig.json
│
└── 📂 database/                    # SQL scripts and migrations
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Minimum Version | Download Link |
|-------------|-----------------|---------------|
| **Node.js** | v18.0.0 or higher | [Download](https://nodejs.org/) |
| **npm** | v9.0.0 or higher | Comes with Node.js |
| **PostgreSQL** | v14.0 or higher | [Download](https://www.postgresql.org/download/) |
| **Git** | Any recent version | [Download](https://git-scm.com/) |

---

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ODOO-GCET.git
cd ODOO-GCET
```

### Step 2: Set Up the Database

1. **Create a PostgreSQL database:**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dayflow;

# Exit
\q
```

2. **Run the database schema** (if SQL file is provided in `/database` folder):

```bash
psql -U postgres -d dayflow -f database/schema.sql
```

### Step 3: Configure Backend

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dayflow?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="24h"

# Server Configuration
PORT=3000
```

4. **Generate Prisma Client:**

```bash
npx prisma generate
```

5. **Run database migrations (if applicable):**

```bash
npx prisma db push
```

6. **Seed the database (optional):**

```bash
npm run seed:users
```

### Step 4: Configure Frontend

1. **Navigate to frontend directory:**

```bash
cd ../frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file (if needed):**

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
```

### Step 5: Run the Application

**Terminal 1 - Start Backend:**

```bash
cd backend
npm run start:dev
```

The backend will start at: `http://localhost:3000`

**Terminal 2 - Start Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will start at: `http://localhost:5173`

### Step 6: Access the Application

Open your browser and navigate to:

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dayflow` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secure-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `24h` |
| `PORT` | Server port | `3000` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

---

## 🗄 Database Setup

### Database Schema Overview

The application uses PostgreSQL with the following main tables:

| Table | Description |
|-------|-------------|
| `users` | User accounts with credentials |
| `employees` | Employee profiles and details |
| `companies` | Organization information |
| `roles` | User roles (ADMIN, HR, EMPLOYEE) |
| `attendance_records` | Daily attendance entries |
| `leave_requests` | Leave applications |
| `leave_balances` | Employee leave quotas |
| `salary_structures` | Employee salary setup |
| `salary_components` | Detailed salary breakdown |
| `employee_skills` | Employee skill records |
| `employee_documents` | Document storage records |

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (Database GUI)
npx prisma studio

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/auth/login` | User login | Public |
| `GET` | `/auth/profile` | Get current user profile | Authenticated |
| `GET` | `/auth/admin-test` | Admin access test | Admin only |

### Employee Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/employees` | Create new employee | Admin, HR |
| `GET` | `/employees` | Get all employees | Admin, HR |
| `GET` | `/employees/me` | Get own profile | Authenticated |
| `GET` | `/employees/statistics` | Get employee statistics | Admin |
| `GET` | `/employees/:id` | Get employee by ID | Admin, HR |
| `PATCH` | `/employees/:id` | Update employee | Admin, HR |
| `DELETE` | `/employees/:id` | Delete employee | Admin |

### Attendance Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/attendance/check-in` | Daily check-in | Authenticated |
| `POST` | `/attendance/check-out` | Daily check-out | Authenticated |
| `GET` | `/attendance/status` | Get today's status | Authenticated |
| `GET` | `/attendance/history` | Get attendance history | Authenticated |
| `GET` | `/attendance/statistics` | Get attendance stats | Authenticated |
| `GET` | `/attendance/employee/:id` | Get employee attendance | Admin, HR |

### Leave Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/leaves` | Apply for leave | Authenticated |
| `GET` | `/leaves` | Get leave requests | Authenticated |
| `GET` | `/leaves/statistics` | Get leave statistics | Authenticated |
| `GET` | `/leaves/:id` | Get leave by ID | Authenticated |
| `PATCH` | `/leaves/:id/status` | Approve/Reject leave | Admin, HR |
| `DELETE` | `/leaves/:id` | Cancel leave request | Authenticated |

### Payroll Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/payroll/me/current` | Get current month payslip | Authenticated |
| `GET` | `/payroll/me/history` | Get payslip history | Authenticated |
| `GET` | `/payroll/me` | Get specific month payslip | Authenticated |
| `GET` | `/payroll/:employeeId/current` | Get employee's current payslip | Admin, HR |
| `GET` | `/payroll/:employeeId/history` | Get employee's payslip history | Admin, HR |
| `GET` | `/payroll/:employeeId` | Get employee's specific payslip | Admin, HR |

### Request/Response Examples

#### Login Request
```json
POST /auth/login
{
  "email": "admin@company.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@company.com",
    "role": "ADMIN"
  }
}
```

#### Apply Leave Request
```json
POST /leaves
Authorization: Bearer <token>
{
  "leave_type": "PAID",
  "start_date": "2026-01-10",
  "end_date": "2026-01-12",
  "reason": "Family vacation"
}
```

---

## 🔐 Role-Based Access Control (RBAC)

### User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **ADMIN** | System Administrator | Full access to all features |
| **HR** | Human Resources | Employee management, leave approvals, payroll view |
| **EMPLOYEE** | Regular Employee | View own data, attendance, leave requests |

### Permission Matrix

| Feature | Employee | HR | Admin |
|---------|----------|-----|-------|
| View own profile | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ |
| Check-in/Check-out | ✅ | ✅ | ✅ |
| View own attendance | ✅ | ✅ | ✅ |
| Apply for leave | ✅ | ✅ | ✅ |
| View own payslip | ✅ | ✅ | ✅ |
| View all employees | ❌ | ✅ | ✅ |
| Create/Edit employees | ❌ | ✅ | ✅ |
| Approve/Reject leaves | ❌ | ✅ | ✅ |
| View all payslips | ❌ | ✅ | ✅ |
| Delete employees | ❌ | ❌ | ✅ |
| View statistics | ❌ | ❌ | ✅ |
| Company settings | ❌ | ❌ | ✅ |

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: Can't reach database server at localhost:5432
```

**Solution:**
- Ensure PostgreSQL is running
- Verify connection credentials in `.env`
- Check if the database exists

```bash
# Check PostgreSQL status
pg_isready

# Restart PostgreSQL (Windows)
net stop postgresql-x64-14
net start postgresql-x64-14
```

#### 2. Prisma Client Error

```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
cd backend
npx prisma generate
```

#### 3. Port Already in Use

```
Error: Port 3000 is already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

#### 4. CORS Issues

If frontend can't connect to backend:

**Solution:**
Ensure CORS is enabled in `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

#### 5. Module Not Found

```
Error: Cannot find module 'xyz'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 📜 Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in development mode with hot-reload |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run seed:users` | Seed database with test users |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 👥 Team

<table>
  <tr>
    <td align="center">
      <strong>Team DayFlow</strong><br/>
      <em>ODOO Hackathon - GCET</em><br/><br/>
      👤 Krisha<br/>
      👤 Dhriti<br/>
      👤 Kavya<br/>
      👤 Yash
    </td>
  </tr>
</table>


---

## 📄 License

This project is developed for the **ODOO Hackathon at GCET**.

---

<p align="center">
  <strong>Built with ❤️ by Krisha , Dhriti , Kavya and Yash</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="Made with TypeScript"/>
  <img src="https://img.shields.io/badge/Powered%20by-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Powered by NestJS"/>
</p>
