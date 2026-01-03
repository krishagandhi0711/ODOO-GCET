/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
} as const;

/**
 * API Endpoints
 * Centralized endpoint definitions for all API routes
 */
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        PROFILE: '/auth/profile',
        ADMIN_TEST: '/auth/admin-test',
    },

    // Employees
    EMPLOYEES: {
        BASE: '/employees',
        ME: '/employees/me',
        STATISTICS: '/employees/statistics',
        BY_ID: (id: number) => `/employees/${id}`,
    },

    // Attendance
    ATTENDANCE: {
        CHECK_IN: '/attendance/check-in',
        CHECK_OUT: '/attendance/check-out',
        STATUS: '/attendance/status',
        HISTORY: '/attendance/history',
        STATISTICS: '/attendance/statistics',
        EMPLOYEE: (id: number) => `/attendance/employee/${id}`,
    },

    // Leaves
    LEAVES: {
        BASE: '/leaves',
        STATISTICS: '/leaves/statistics',
        BY_ID: (id: number) => `/leaves/${id}`,
        UPDATE_STATUS: (id: number) => `/leaves/${id}/status`,
    },

    // Payroll
    PAYROLL: {
        ME_CURRENT: '/payroll/me/current',
        ME: '/payroll/me',
        ME_HISTORY: '/payroll/me/history',
        EMPLOYEE_CURRENT: (id: number) => `/payroll/${id}/current`,
        EMPLOYEE: (id: number) => `/payroll/${id}`,
        EMPLOYEE_HISTORY: (id: number) => `/payroll/${id}/history`,
    },
} as const;
