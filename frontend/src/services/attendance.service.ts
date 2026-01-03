/**
 * Attendance Service
 * Handles all attendance-related API calls
 */

import apiClient, { handleApiError } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import type {
    Attendance,
    AttendanceStatusResponse,
    CheckInResponse,
    AttendanceStatistics
} from '@/types/api.types';

class AttendanceService {
    /**
     * Check in for the day
     */
    async checkIn(): Promise<CheckInResponse> {
        try {
            const response = await apiClient.post<CheckInResponse>(
                API_ENDPOINTS.ATTENDANCE.CHECK_IN
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Check out for the day
     */
    async checkOut(): Promise<CheckInResponse> {
        try {
            const response = await apiClient.post<CheckInResponse>(
                API_ENDPOINTS.ATTENDANCE.CHECK_OUT
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get real-time attendance status
     */
    async getStatus(): Promise<AttendanceStatusResponse> {
        try {
            const response = await apiClient.get<AttendanceStatusResponse>(
                API_ENDPOINTS.ATTENDANCE.STATUS
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get attendance history
     */
    async getHistory(limit?: number): Promise<Attendance[]> {
        try {
            const params = limit ? { limit } : {};
            const response = await apiClient.get<Attendance[]>(
                API_ENDPOINTS.ATTENDANCE.HISTORY,
                { params }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get attendance statistics
     */
    async getStatistics(): Promise<AttendanceStatistics> {
        try {
            const response = await apiClient.get<AttendanceStatistics>(
                API_ENDPOINTS.ATTENDANCE.STATISTICS
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get specific employee's attendance (Admin/HR only)
     */
    async getEmployeeAttendance(
        employeeId: number,
        startDate?: string,
        endDate?: string
    ): Promise<Attendance[]> {
        try {
            const params: Record<string, string> = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await apiClient.get<Attendance[]>(
                API_ENDPOINTS.ATTENDANCE.EMPLOYEE(employeeId),
                { params }
            );
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
}

// Export singleton instance
export const attendanceService = new AttendanceService();
export default attendanceService;
