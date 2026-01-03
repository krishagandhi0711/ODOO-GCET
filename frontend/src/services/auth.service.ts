/**
 * Authentication Service
 * Handles login, logout, and profile management
 */

import apiClient, { tokenManager, handleApiError } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import type { LoginRequest, LoginResponse, UserProfile } from '@/types/api.types';

class AuthService {
    /**
     * Login user with email and password
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.AUTH.LOGIN,
                { email, password } as LoginRequest
            );

            // Store token
            if (response.data.access_token) {
                tokenManager.setToken(response.data.access_token);
            }

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Get current user profile
     */
    async getProfile(): Promise<UserProfile> {
        try {
            const response = await apiClient.get<UserProfile>(API_ENDPOINTS.AUTH.PROFILE);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    /**
     * Logout user
     */
    logout(): void {
        tokenManager.removeToken();
        // Clear any other user data from localStorage if needed
        localStorage.removeItem('dayflow-user-role');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return tokenManager.hasToken();
    }

    /**
     * Get stored token
     */
    getToken(): string | null {
        return tokenManager.getToken();
    }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
