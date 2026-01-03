
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { role } = useAuth();

    // If there are allowed roles and current role is not in the list
    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on role
        // If I am an employee trying to access admin, go to /dashboard
        // If I am an admin trying to access restricted page (unlikely if strictly separated), go to /admin/dashboard

        // However, if we put this on specific routes, we need to know where to send them.
        if (role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <Outlet />;
};
