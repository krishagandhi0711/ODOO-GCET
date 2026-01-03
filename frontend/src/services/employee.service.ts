/**
 * Employee Service
 * Handles all employee-related API calls
 */

import apiClient, { handleApiError } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import type {
    Employee,
    CreateEmployeeDto,
    UpdateEmployeeDto,
    EmployeeStatistics
} from '@/types/api.types';

class EmployeeService {
    /**
     * Get current user's employee profile
     */
    async getMyProfile(): Promise<Employee> {
        try {
            const response = await apiClient.get<Employee>(API_ENDPOINTS.EMPLOYEES.ME);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get all employees (Admin/HR only)
     */
    async getAllEmployees(): Promise<Employee[]> {
        try {
            const response = await apiClient.get<Employee[]>(API_ENDPOINTS.EMPLOYEES.BASE);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get employee by ID (Admin/HR only)
     */
    async getEmployeeById(id: number): Promise<Employee> {
        try {
            const response = await apiClient.get<Employee>(
                API_ENDPOINTS.EMPLOYEES.BY_ID(id)
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Create new employee (Admin/HR only)
     */
    async createEmployee(data: CreateEmployeeDto): Promise<Employee> {
        try {
            const response = await apiClient.post<Employee>(
                API_ENDPOINTS.EMPLOYEES.BASE,
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Update employee (Admin/HR only)
     */
    async updateEmployee(id: number, data: UpdateEmployeeDto): Promise<Employee> {
        try {
            const response = await apiClient.patch<Employee>(
                API_ENDPOINTS.EMPLOYEES.BY_ID(id),
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Delete employee (Admin only)
     */
    async deleteEmployee(id: number): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get employee statistics (Admin only)
     */
    async getStatistics(): Promise<EmployeeStatistics> {
        try {
            const response = await apiClient.get<EmployeeStatistics>(
                API_ENDPOINTS.EMPLOYEES.STATISTICS
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
}

// Export singleton instance
export const employeeService = new EmployeeService();
export default employeeService;
