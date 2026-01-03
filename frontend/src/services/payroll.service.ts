/**
 * Payroll Service
 * Handles all payroll-related API calls
 */

import apiClient, { handleApiError } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import type { Payslip } from '@/types/api.types';

class PayrollService {
    /**
     * Get current month payslip for logged-in employee
     */
    async getMyCurrentPayslip(): Promise<Payslip> {
        try {
            const response = await apiClient.get<Payslip>(
                API_ENDPOINTS.PAYROLL.ME_CURRENT
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get payslip for specific month/year
     */
    async getMyPayslip(month: number, year: number): Promise<Payslip> {
        try {
            const response = await apiClient.get<Payslip>(
                API_ENDPOINTS.PAYROLL.ME,
                { params: { month, year } }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get payslip history
     */
    async getMyPayslipHistory(limit: number = 6): Promise<Payslip[]> {
        try {
            const response = await apiClient.get<Payslip[]>(
                API_ENDPOINTS.PAYROLL.ME_HISTORY,
                { params: { limit } }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get employee's current payslip (Admin/HR only)
     */
    async getEmployeeCurrentPayslip(employeeId: number): Promise<Payslip> {
        try {
            const response = await apiClient.get<Payslip>(
                API_ENDPOINTS.PAYROLL.EMPLOYEE_CURRENT(employeeId)
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get employee's payslip for specific month/year (Admin/HR only)
     */
    async getEmployeePayslip(
        employeeId: number,
        month: number,
        year: number
    ): Promise<Payslip> {
        try {
            const response = await apiClient.get<Payslip>(
                API_ENDPOINTS.PAYROLL.EMPLOYEE(employeeId),
                { params: { month, year } }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get employee's payslip history (Admin/HR only)
     */
    async getEmployeePayslipHistory(
        employeeId: number,
        limit: number = 6
    ): Promise<Payslip[]> {
        try {
            const response = await apiClient.get<Payslip[]>(
                API_ENDPOINTS.PAYROLL.EMPLOYEE_HISTORY(employeeId),
                { params: { limit } }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
}

// Export singleton instance
export const payrollService = new PayrollService();
export default payrollService;
