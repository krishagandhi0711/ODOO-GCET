/**
 * API Service
 * Configured axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiError } from '@/types/api.types';
import { toastService } from './toast.service';

/**
 * Token Management
 */
const TOKEN_KEY = 'dayflow_access_token';

export const tokenManager = {
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },

    hasToken: (): boolean => {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * Automatically adds JWT token to requests
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenManager.getToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles errors globally and token expiration
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            tokenManager.removeToken();
            toastService.error('Session expired. Please login again.');

            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        }

        // Handle 403 Forbidden - Insufficient permissions
        if (error.response?.status === 403) {
            toastService.error('Access denied: Insufficient permissions');
        }

        // Handle 404 Not Found
        if (error.response?.status === 404) {
            toastService.error('Resource not found');
        }

        // Handle 500 Server Error
        if (error.response?.status === 500) {
            toastService.error('Server error. Please try again later.');
        }

        // Handle network errors
        if (!error.response) {
            toastService.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

/**
 * Error Handler Utility
 * Extracts user-friendly error messages from API errors
 */
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;

        // Server responded with error
        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }

        // Network error
        if (axiosError.message === 'Network Error') {
            return 'Network error. Please check your internet connection.';
        }

        // Timeout error
        if (axiosError.code === 'ECONNABORTED') {
            return 'Request timeout. Please try again.';
        }

        // Generic axios error
        return axiosError.message || 'An unexpected error occurred';
    }

    // Non-axios error
    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

export default apiClient;
