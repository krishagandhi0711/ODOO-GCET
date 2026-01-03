import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import type { UserRole as ApiUserRole } from '@/types/api.types';

export type UserRole = 'employee' | 'admin';

interface User {
  userId: number;
  email: string;
  role: ApiUserRole;
  companyId: number;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  isEmployee: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Derive role from user data (map backend roles to frontend roles)
  const role: UserRole = user?.role === 'ADMIN' || user?.role === 'HR' ? 'admin' : 'employee';

  // Initialize auth state from token on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);

      // Also store role in localStorage for compatibility
      const frontendRole = response.user.role === 'ADMIN' || response.user.role === 'HR' ? 'admin' : 'employee';
      localStorage.setItem('dayflow-user-role', frontendRole);
    } catch (error) {
      throw error; // Re-throw to be handled by Login component
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const setRole = (newRole: UserRole) => {
    // This is kept for backward compatibility but role is now derived from user
    localStorage.setItem('dayflow-user-role', newRole);
  };

  const value = {
    user,
    role,
    setRole,
    isAdmin: role === 'admin',
    isEmployee: role === 'employee',
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
