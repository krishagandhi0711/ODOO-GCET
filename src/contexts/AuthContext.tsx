import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'employee' | 'admin';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  isEmployee: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage or default to 'employee'
  const [role, setRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('dayflow-user-role');
    return (savedRole as UserRole) || 'employee';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('dayflow-user-role', newRole);
  };

  const value = {
    role,
    setRole,
    isAdmin: role === 'admin',
    isEmployee: role === 'employee',
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
