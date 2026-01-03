/**
 * TypeScript Type Definitions for API
 * Matches backend entity structures and DTOs
 */

// ============================================================================
// Authentication Types
// ============================================================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: {
        userId: number;
        email: string;
        role: UserRole;
        companyId: number;
    };
}

export interface UserProfile {
    userId: number;
    email: string;
    role: UserRole;
    companyId: number;
}

export type UserRole = 'ADMIN' | 'HR' | 'EMPLOYEE';

// ============================================================================
// Employee Types
// ============================================================================

export interface Employee {
    id: number;
    employee_code: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    department: string | null;
    designation: string | null;
    date_of_joining: string;
    employment_type: string | null;
    user_id: number;
    company_id: number;
    created_at: string;
    updated_at: string;
}

export interface CreateEmployeeDto {
    email: string;
    password: string;
    role: UserRole;
    first_name: string;
    last_name: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    department?: string;
    designation?: string;
    date_of_joining: string;
    employment_type?: string;
    company_id: number;
}

export interface UpdateEmployeeDto {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    department?: string;
    designation?: string;
    employment_type?: string;
}

export interface EmployeeStatistics {
    total: number;
    byDepartment: Record<string, number>;
    byRole: Record<string, number>;
    recentHires: number;
}

// ============================================================================
// Attendance Types
// ============================================================================

export interface Attendance {
    id: number;
    employee_id: number;
    date: string;
    check_in: string;
    check_out: string | null;
    total_hours: number | null;
    status: AttendanceStatus;
    created_at: string;
    updated_at: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'ON_LEAVE';

export interface AttendanceStatusResponse {
    status: string;
    icon: string;
    message: string;
    canCheckIn: boolean;
    canCheckOut: boolean;
    todayRecord?: Attendance;
}

export interface CheckInResponse {
    id: number;
    employee_id: number;
    date: string;
    check_in_time: string;
    check_out_time: string | null;
    worked_hours: number | null;
    status: AttendanceStatus;
}

export interface AttendanceStatistics {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    halfDays: number;
    leaveDays: number;
    averageHours: number;
}

// ============================================================================
// Leave Types
// ============================================================================

export interface Leave {
    id: number;
    employee_id: number;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: LeaveStatus;
    approved_by: number | null;
    approved_at: string | null;
    created_at: string;
    updated_at: string;
    employee?: Employee;
}

export type LeaveType = 'PAID' | 'SICK' | 'UNPAID' | 'CASUAL' | 'MATERNITY' | 'PATERNITY';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface CreateLeaveDto {
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason: string;
}

export interface UpdateLeaveStatusDto {
    status: 'APPROVED' | 'REJECTED';
}

export interface LeaveStatistics {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    byType: Record<LeaveType, number>;
}

// ============================================================================
// Payroll Types
// ============================================================================

export interface Payslip {
    employee: {
        id: number;
        name: string;
        code: string;
        department: string | null;
        designation: string | null;
    };
    period: {
        month: number;
        year: number;
        display: string;
    };
    earnings: {
        basic: number;
        hra: number;
        special_allowance: number;
        total: number;
    };
    deductions: {
        pf: number;
        professional_tax: number;
        leave_deduction: number;
        total: number;
    };
    summary: {
        gross_earning: number;
        total_deduction: number;
        net_payable: number;
        currency: string;
    };
    stats: {
        unpaid_leave_days: number;
        total_working_days: number;
        effective_working_days: number;
        daily_wage: number;
    };
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
