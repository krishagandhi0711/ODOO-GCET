import React, { createContext, useContext, useState, ReactNode } from 'react';
import { todayAttendance } from '@/data/mockData';

interface AttendanceContextType {
    isCheckedIn: boolean;
    checkInTime: string | null;
    checkOutTime: string | null;
    toggleCheckIn: () => Promise<void>;
    isLoading: boolean;
    totalHours: string;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
    const [isCheckedIn, setIsCheckedIn] = useState(todayAttendance.isCheckedIn);
    const [checkInTime, setCheckInTime] = useState<string | null>(todayAttendance.checkIn);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(todayAttendance.checkOut);
    const [isLoading, setIsLoading] = useState(false);

    // Mock total hours calculation
    const totalHours = todayAttendance.totalHours;

    const toggleCheckIn = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        if (isCheckedIn) {
            // Checking out
            const now = new Date();
            setCheckOutTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
            setIsCheckedIn(false);
        } else {
            // Checking in
            const now = new Date();
            setCheckInTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
            setCheckOutTime(null);
            setIsCheckedIn(true);
        }
        setIsLoading(false);
    };

    return (
        <AttendanceContext.Provider value={{
            isCheckedIn,
            checkInTime,
            checkOutTime,
            toggleCheckIn,
            isLoading,
            totalHours
        }}>
            {children}
        </AttendanceContext.Provider>
    );
}

export function useAttendance() {
    const context = useContext(AttendanceContext);
    if (context === undefined) {
        throw new Error('useAttendance must be used within an AttendanceProvider');
    }
    return context;
}
