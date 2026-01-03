/**
 * Leave Service
 * Handles all leave management API calls
 */

import apiClient, { handleApiError } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import type {
    Leave,
    CreateLeaveDto,
    UpdateLeaveStatusDto,
    LeaveStatistics
} from '@/types/api.types';

class LeaveService {
    /**
     * Apply for leave
     */
    async applyLeave(data: CreateLeaveDto): Promise<Leave> {
        try {
            const response = await apiClient.post<Leave>(
                API_ENDPOINTS.LEAVES.BASE,
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get all leave requests
     * Employee: Own leaves only
     * Admin/HR: All leaves
     */
    async getAllLeaves(): Promise<Leave[]> {
        try {
            const response = await apiClient.get<Leave[]>(API_ENDPOINTS.LEAVES.BASE);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get specific leave request
     */
    async getLeaveById(id: number): Promise<Leave> {
        try {
            const response = await apiClient.get<Leave>(
                API_ENDPOINTS.LEAVES.BY_ID(id)
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Update leave status (Admin/HR only)
     */
    async updateLeaveStatus(
        id: number,
        status: 'APPROVED' | 'REJECTED'
    ): Promise<Leave> {
        try {
            const response = await apiClient.patch<Leave>(
                API_ENDPOINTS.LEAVES.UPDATE_STATUS(id),
                { status } as UpdateLeaveStatusDto
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Cancel leave request
     */
    async cancelLeave(id: number): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.LEAVES.BY_ID(id));
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get leave statistics
     */
    async getStatistics(): Promise<LeaveStatistics> {
        try {
            const response = await apiClient.get<LeaveStatistics>(
                API_ENDPOINTS.LEAVES.STATISTICS
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
}

// Export singleton instance
export const leaveService = new LeaveService();
export default leaveService;
