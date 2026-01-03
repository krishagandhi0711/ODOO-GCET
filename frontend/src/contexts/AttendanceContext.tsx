import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { attendanceService } from '@/services/attendance.service';
import type { AttendanceStatusResponse } from '@/types/api.types';

interface AttendanceContextType {
    isCheckedIn: boolean;
    checkInTime: string | null;
    checkOutTime: string | null;
    toggleCheckIn: () => Promise<void>;
    isLoading: boolean;
    totalHours: string;
    refreshStatus: () => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalHours, setTotalHours] = useState('0.0h');

    // Fetch attendance status on mount
    const refreshStatus = async () => {
        try {
            const status = await attendanceService.getStatus();

            // Update state based on status
            if (status.todayRecord) {
                setCheckInTime(formatTime(status.todayRecord.check_in));
                setCheckOutTime(status.todayRecord.check_out ? formatTime(status.todayRecord.check_out) : null);
                setIsCheckedIn(status.canCheckOut && !status.canCheckIn);
                setTotalHours(status.todayRecord.total_hours ? `${status.todayRecord.total_hours.toFixed(1)}h` : '0.0h');
            } else {
                setCheckInTime(null);
                setCheckOutTime(null);
                setIsCheckedIn(false);
                setTotalHours('0.0h');
            }
        } catch (error) {
            console.error('Failed to fetch attendance status:', error);
        }
    };

    useEffect(() => {
        refreshStatus();
    }, []);

    const toggleCheckIn = async () => {
        setIsLoading(true);
        try {
            if (isCheckedIn) {
                // Checking out
                const result = await attendanceService.checkOut();
                setCheckOutTime(formatTime(result.check_out_time || ''));
                setIsCheckedIn(false);
                setTotalHours(result.worked_hours ? `${result.worked_hours.toFixed(1)}h` : '0.0h');
            } else {
                // Checking in
                const result = await attendanceService.checkIn();
                setCheckInTime(formatTime(result.check_in_time));
                setCheckOutTime(null);
                setIsCheckedIn(true);
                setTotalHours('0.0h');
            }
        } catch (error: any) {
            console.error('Check-in/out failed:', error);
            throw error; // Re-throw to be handled by UI
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to format time from ISO string
    const formatTime = (isoString: string): string => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <AttendanceContext.Provider value={{
            isCheckedIn,
            checkInTime,
            checkOutTime,
            toggleCheckIn,
            isLoading,
            totalHours,
            refreshStatus,
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
