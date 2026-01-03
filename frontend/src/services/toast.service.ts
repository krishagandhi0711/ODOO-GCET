/**
 * Toast Notification Service
 * Global service for showing success, error, info, and warning messages
 */

import { toast as sonnerToast } from 'sonner';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
    duration?: number;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

class ToastService {
    /**
     * Show success toast
     */
    success(message: string, options?: ToastOptions) {
        sonnerToast.success(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        });
    }

    /**
     * Show error toast
     */
    error(message: string, options?: ToastOptions) {
        sonnerToast.error(message, {
            duration: options?.duration || 5000,
            description: options?.description,
            action: options?.action,
        });
    }

    /**
     * Show info toast
     */
    info(message: string, options?: ToastOptions) {
        sonnerToast.info(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        });
    }

    /**
     * Show warning toast
     */
    warning(message: string, options?: ToastOptions) {
        sonnerToast.warning(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        });
    }

    /**
     * Show loading toast
     */
    loading(message: string) {
        return sonnerToast.loading(message);
    }

    /**
     * Dismiss a specific toast
     */
    dismiss(toastId: string | number) {
        sonnerToast.dismiss(toastId);
    }

    /**
     * Dismiss all toasts
     */
    dismissAll() {
        sonnerToast.dismiss();
    }

    /**
     * Show a promise-based toast
     */
    promise<T>(
        promise: Promise<T>,
        {
            loading,
            success,
            error,
        }: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) {
        return sonnerToast.promise(promise, {
            loading,
            success,
            error,
        });
    }
}

// Export singleton instance
export const toastService = new ToastService();
export default toastService;
