/**
 * Retry Utility
 * Provides retry mechanisms for failed API requests
 */

import { AxiosError } from 'axios';

interface RetryOptions {
    maxRetries?: number;
    retryDelay?: number;
    retryCondition?: (error: AxiosError) => boolean;
    onRetry?: (retryCount: number, error: AxiosError) => void;
}

/**
 * Default retry condition - retry on network errors and 5xx errors
 */
const defaultRetryCondition = (error: AxiosError): boolean => {
    return (
        !error.response || // Network error
        (error.response.status >= 500 && error.response.status < 600) // Server error
    );
};

/**
 * Retry a promise-based function with exponential backoff
 */
export async function retryRequest<T>(
    requestFn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxRetries = 3,
        retryDelay = 1000,
        retryCondition = defaultRetryCondition,
        onRetry,
    } = options;

    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error: any) {
            lastError = error;

            // Don't retry if it's the last attempt
            if (attempt === maxRetries) {
                break;
            }

            // Check if we should retry this error
            if (error.isAxiosError && !retryCondition(error as AxiosError)) {
                break;
            }

            // Call onRetry callback
            if (onRetry) {
                onRetry(attempt + 1, error);
            }

            // Wait before retrying with exponential backoff
            const delay = retryDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

/**
 * Create a retry-enabled version of a function
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: RetryOptions = {}
): T {
    return ((...args: any[]) => {
        return retryRequest(() => fn(...args), options);
    }) as T;
}

export default retryRequest;
