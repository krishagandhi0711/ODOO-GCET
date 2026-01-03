# Frontend-Backend Integration Guide
## Dayflow HRMS - Complete Integration Documentation

## 🎯 Overview
This document provides comprehensive information about the full-stack integration between the React frontend and NestJS backend for the Dayflow HRMS system.

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Authentication Flow](#authentication-flow)
5. [Module Integrations](#module-integrations)
6. [API Service Layer](#api-service-layer)
7. [Error Handling](#error-handling)
8. [Testing Guide](#testing-guide)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

### Technology Stack
**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for server state management
- Axios for HTTP requests
- Shadcn/UI component library
- Tailwind CSS for styling

**Backend:**
- NestJS framework
- Prisma ORM
- PostgreSQL database
- JWT authentication
- Passport for auth strategies

### System Architecture
```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐
│   React App     │◄────────┤   NestJS API    │◄────────┤  PostgreSQL  │
│   (Frontend)    │ HTTP    │   (Backend)     │ Prisma  │  (Database)  │
└─────────────────┘         └─────────────────┘         └──────────────┘
```

---

## 📦 Prerequisites

### Required Software
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm or yarn package manager
- Git

### Development Tools (Recommended)
- VS Code or similar IDE
- Postman or similar API testing tool
- PostgreSQL client (pgAdmin, DBeaver, etc.)

---

## ⚙️ Environment Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@localhost:5432/dayflow_hrms?schema=public"
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8080
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Seed initial data (optional):**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_TIMEOUT=30000
   VITE_APP_NAME=Dayflow HRMS
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

---

## 🔐 Authentication Flow

### Login Process
1. User submits credentials via [Login.tsx](frontend/src/pages/Login.tsx)
2. Frontend calls `authService.login()` → `POST /auth/login`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage via `tokenManager`
5. All subsequent requests include token in Authorization header
6. User is redirected based on role (employee/admin)

### Token Management
```typescript
// Located in: frontend/src/services/api.service.ts

export const tokenManager = {
  getToken: () => localStorage.getItem('dayflow_access_token'),
  setToken: (token: string) => localStorage.setItem('dayflow_access_token', token),
  removeToken: () => localStorage.removeItem('dayflow_access_token'),
  hasToken: () => !!localStorage.getItem('dayflow_access_token'),
};
```

### Protected Routes
- Frontend: `ProtectedRoute` component checks authentication status
- Backend: `JwtAuthGuard` validates JWT tokens on protected endpoints

### Authorization
- Role-based access control (RBAC)
- Roles: EMPLOYEE, HR, ADMIN
- Backend: `RolesGuard` and `@Roles()` decorator
- Frontend: `useAuth()` hook provides role information

---

## 🔌 Module Integrations

### 1. Employee Module

#### Frontend Components
- `Profile.tsx` - Employee profile page
- `AdminEmployeesIntegrated.tsx` - Admin employee management

#### API Endpoints
```typescript
GET    /employees        // Get all employees (Admin/HR only)
GET    /employees/me     // Get current employee profile
GET    /employees/:id    // Get employee by ID
POST   /employees        // Create employee (Admin/HR only)
PATCH  /employees/:id    // Update employee (Admin/HR only)
DELETE /employees/:id    // Delete employee (Admin only)
GET    /employees/statistics  // Get employee statistics
```

#### Service Usage
```typescript
import { employeeService } from '@/services/employee.service';

// Get current user's profile
const profile = await employeeService.getMyProfile();

// Get all employees (admin only)
const employees = await employeeService.getAllEmployees();

// Create employee
await employeeService.createEmployee(employeeData);
```

### 2. Attendance Module

#### Frontend Components
- `Attendance.tsx` - Attendance tracking page
- `AttendanceContext.tsx` - Global attendance state

#### API Endpoints
```typescript
POST  /attendance/check-in      // Check in for the day
POST  /attendance/check-out     // Check out for the day
GET   /attendance/status        // Get real-time status
GET   /attendance/history       // Get attendance history
GET   /attendance/statistics    // Get attendance statistics
```

#### Service Usage
```typescript
import { attendanceService } from '@/services/attendance.service';

// Check in
await attendanceService.checkIn();

// Get today's status
const status = await attendanceService.getStatus();

// Get history
const history = await attendanceService.getHistory(30);
```

### 3. Leave Management Module

#### Frontend Components
- `TimeOff.tsx` - Leave application and history
- `AdminLeaveApprovals.tsx` - Admin leave approval interface

#### API Endpoints
```typescript
POST   /leaves              // Apply for leave
GET    /leaves              // Get all leaves
GET    /leaves/:id          // Get specific leave
PATCH  /leaves/:id/status   // Update leave status (Admin/HR)
DELETE /leaves/:id          // Cancel leave
GET    /leaves/statistics   // Get leave statistics
```

#### Service Usage
```typescript
import { leaveService } from '@/services/leave.service';

// Apply for leave
await leaveService.applyLeave({
  leave_type: 'PAID_LEAVE',
  start_date: '2026-01-10',
  end_date: '2026-01-12',
  reason: 'Personal'
});

// Approve leave (admin)
await leaveService.updateLeaveStatus(leaveId, 'APPROVED');
```

### 4. Payroll Module

#### Frontend Components
- `Payroll.tsx` - Employee payslip view
- `AdminPayroll.tsx` - Admin payroll management

#### API Endpoints
```typescript
GET /payroll/me/current              // Get current month payslip
GET /payroll/me?month=1&year=2026    // Get specific month payslip
GET /payroll/me/history              // Get payslip history
GET /payroll/:employeeId/current     // Get employee payslip (Admin)
```

#### Service Usage
```typescript
import { payrollService } from '@/services/payroll.service';

// Get my current payslip
const payslip = await payrollService.getMyCurrentPayslip();

// Get payslip history
const history = await payrollService.getMyPayslipHistory(6);
```

---

## 🛠️ API Service Layer

### Core API Client
Located at `frontend/src/services/api.service.ts`

Features:
- Automatic JWT token attachment
- Request/response interceptors
- Error handling
- Token expiration handling
- Network error handling

```typescript
import apiClient from '@/services/api.service';

// All services use this client
const response = await apiClient.get('/endpoint');
const data = await apiClient.post('/endpoint', payload);
```

### Interceptors

#### Request Interceptor
- Adds Authorization header with JWT token
- Logs requests in development

#### Response Interceptor
- Handles 401 (Unauthorized) - Redirects to login
- Handles 403 (Forbidden) - Shows permission error
- Handles 404 (Not Found) - Shows not found error
- Handles 500 (Server Error) - Shows server error
- Handles network errors

---

## 🚨 Error Handling

### Toast Notifications
Located at `frontend/src/services/toast.service.ts`

```typescript
import { toastService } from '@/services/toast.service';

// Success message
toastService.success('Operation completed successfully');

// Error message
toastService.error('Something went wrong');

// Warning
toastService.warning('Please review your input');

// Info
toastService.info('New features available');
```

### Global Error Handler
```typescript
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message === 'Network Error') {
      return 'Network error. Please check your internet connection.';
    }
  }
  return 'An unexpected error occurred';
};
```

### Retry Mechanism
Located at `frontend/src/utils/retry.util.ts`

```typescript
import { retryRequest } from '@/utils/retry.util';

// Retry failed requests
const data = await retryRequest(
  () => apiClient.get('/endpoint'),
  {
    maxRetries: 3,
    retryDelay: 1000,
    onRetry: (attempt, error) => {
      console.log(`Retry attempt ${attempt}`, error);
    }
  }
);
```

---

## 🧪 Testing Guide

### Backend Testing

#### Unit Tests
```bash
cd backend
npm run test
```

#### E2E Tests
```bash
npm run test:e2e
```

#### Test Specific Module
```bash
npm run test -- employees.service.spec.ts
```

### Frontend Testing

#### Run all tests
```bash
cd frontend
npm run test
```

#### Run with coverage
```bash
npm run test:coverage
```

### API Testing with Test Scripts

**Test Authentication:**
```bash
cd backend
node test-auth.js
```

**Test Employee API:**
```bash
node test-employee-api.js
```

**Test Phase 4 (Leaves/Payroll):**
```bash
node test-phase4.js
```

### Manual Testing Checklist

- [ ] User can register and login
- [ ] JWT token is stored and used correctly
- [ ] Protected routes redirect unauthorized users
- [ ] Employee can view their profile
- [ ] Employee can check in/out
- [ ] Employee can apply for leave
- [ ] Employee can view payslips
- [ ] Admin can create employees
- [ ] Admin can view all employees
- [ ] Admin can approve/reject leaves
- [ ] Admin can view payroll
- [ ] Error messages display correctly
- [ ] Loading states work properly
- [ ] Toasts show for success/error
- [ ] Network errors are handled gracefully

---

## 🚀 Deployment

### Backend Deployment

#### 1. Prepare Environment
```bash
# Create production .env
NODE_ENV=production
DATABASE_URL="your-production-db-url"
JWT_SECRET="strong-production-secret"
ALLOWED_ORIGINS="https://your-frontend-domain.com"
```

#### 2. Build Application
```bash
npm run build
```

#### 3. Run Migrations
```bash
npx prisma migrate deploy
```

#### 4. Start Production Server
```bash
npm run start:prod
```

### Frontend Deployment

#### 1. Update Environment
```bash
# .env.production
VITE_API_BASE_URL=https://your-backend-api.com
```

#### 2. Build for Production
```bash
npm run build
```

#### 3. Deploy to Hosting
- Upload `dist/` folder to your hosting service
- Configure server to serve `index.html` for all routes (SPA mode)

### Deployment Platforms

**Backend:**
- Heroku
- Railway
- Render
- AWS EC2/ECS
- DigitalOcean

**Frontend:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages (with routing config)

**Database:**
- AWS RDS
- Railway PostgreSQL
- Supabase
- Neon

---

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Check backend CORS configuration in `main.ts`
- Ensure frontend URL is in `ALLOWED_ORIGINS`
- Verify credentials are set to `true`

```typescript
// backend/src/main.ts
app.enableCors({
  origin: ['http://localhost:5173'],
  credentials: true,
});
```

#### 2. 401 Unauthorized
**Problem:** API returns 401 even with valid token

**Solution:**
- Check token is stored: `localStorage.getItem('dayflow_access_token')`
- Verify token format: Should be `Bearer <token>`
- Check JWT_SECRET matches between backend .env and token generation
- Ensure token hasn't expired

#### 3. Database Connection Errors
**Problem:** `Can't reach database server`

**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists
- Run migrations: `npx prisma migrate dev`

#### 4. Module Not Found Errors
**Problem:** `Cannot find module '@/...'`

**Solution:**
- Verify `tsconfig.json` paths configuration
- Restart TypeScript server in VS Code
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

#### 5. Build Errors
**Problem:** Build fails with type errors

**Solution:**
- Run `npm run build` to see detailed errors
- Check all imports are correct
- Verify all types are properly defined
- Ensure all dependencies are installed

### Debug Mode

#### Enable Backend Debug Logging
```typescript
// backend/src/main.ts
app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
```

#### Frontend Network Debugging
```typescript
// Add to api.service.ts
apiClient.interceptors.request.use(config => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(response => {
  console.log('Response:', response.status, response.data);
  return response;
});
```

---

## 📚 Additional Resources

### Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)

### Code Structure
```
project/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── employees/     # Employee management
│   │   ├── attendance/    # Attendance tracking
│   │   ├── leaves/        # Leave management
│   │   ├── payroll/       # Payroll system
│   │   └── common/        # Shared guards, decorators
│   └── prisma/           # Database schema
│
└── frontend/
    └── src/
        ├── components/    # Reusable UI components
        ├── contexts/      # React contexts (Auth, Attendance)
        ├── pages/         # Page components
        ├── services/      # API service layer
        ├── types/         # TypeScript type definitions
        └── utils/         # Utility functions
```

### API Endpoint Summary

| Module | Method | Endpoint | Auth Required | Role Required |
|--------|--------|----------|---------------|---------------|
| Auth | POST | `/auth/login` | No | None |
| Auth | GET | `/auth/profile` | Yes | Any |
| Employees | GET | `/employees` | Yes | Admin/HR |
| Employees | GET | `/employees/me` | Yes | Any |
| Employees | POST | `/employees` | Yes | Admin/HR |
| Attendance | POST | `/attendance/check-in` | Yes | Any |
| Attendance | POST | `/attendance/check-out` | Yes | Any |
| Attendance | GET | `/attendance/status` | Yes | Any |
| Leaves | POST | `/leaves` | Yes | Any |
| Leaves | GET | `/leaves` | Yes | Any |
| Leaves | PATCH | `/leaves/:id/status` | Yes | Admin/HR |
| Payroll | GET | `/payroll/me/current` | Yes | Any |
| Payroll | GET | `/payroll/:id` | Yes | Admin/HR |

---

## 🎓 Best Practices

1. **Always use TypeScript types** from `@/types/api.types`
2. **Handle errors gracefully** with try-catch and toast notifications
3. **Show loading states** during async operations
4. **Validate user input** before sending to API
5. **Use environment variables** for configuration
6. **Keep services pure** - no UI logic in service files
7. **Test API endpoints** before integrating frontend
8. **Use semantic commit messages** for version control
9. **Keep components small** and focused
10. **Document complex logic** with comments

---

## 📝 Version History

- **v1.0.0** (January 2026) - Initial integrated release
  - Complete frontend-backend integration
  - All CRUD operations working
  - Authentication and authorization
  - Real-time attendance tracking
  - Leave management system
  - Payroll integration
  - Admin panel functionality
  - Error handling and notifications
  - Comprehensive documentation

---

## 🤝 Support

For issues or questions:
1. Check this documentation first
2. Review the troubleshooting section
3. Check the code comments
4. Inspect network requests in browser DevTools
5. Check backend logs for errors

---

## 📄 License

This project is proprietary software for Dayflow HRMS.

---

**Last Updated:** January 3, 2026
**Maintained by:** Development Team
