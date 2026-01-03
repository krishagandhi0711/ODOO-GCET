import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  LogIn,
  LogOut,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAttendance } from "@/contexts/AttendanceContext";
import { attendanceService } from "@/services/attendance.service";
import type { Attendance, AttendanceStatistics } from "@/types/api.types";

type ViewMode = "daily" | "weekly" | "monthly";

export default function Attendance() {
  const { isCheckedIn, checkInTime, checkOutTime, isLoading, totalHours, toggleCheckIn } = useAttendance();
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [history, setHistory] = useState<Attendance[]>([]);
  const [statistics, setStatistics] = useState<AttendanceStatistics | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, statsData] = await Promise.all([
          attendanceService.getHistory(30),
          attendanceService.getStatistics()
        ]);
        setHistory(historyData);
        setStatistics(statsData);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchData();
  }, []);

  const handleClockAction = async () => {
    try {
      await toggleCheckIn();
      // Refresh history after check-in/out
      const historyData = await attendanceService.getHistory(30);
      setHistory(historyData);
    } catch (error: any) {
      console.error('Clock action failed:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const formatTime = (isoString: string): string => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AppLayout title="Attendance">
      <div className="w-full mx-auto space-y-6">
        {/* Quick Actions Section */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Check In/Out Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Today's Clock</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            <Button
              onClick={handleClockAction}
              disabled={isLoading}
              size="xl"
              className={cn(
                "w-full h-16 text-lg font-medium transition-all duration-300 mb-6",
                isCheckedIn
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : isCheckedIn ? (
                <span className="flex items-center gap-2">
                  <LogOut className="h-6 w-6" />
                  Check Out
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-6 w-6" />
                  Check In
                </span>
              )}
            </Button>

            {/* Time Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Check In</p>
                <p className="text-2xl font-semibold text-foreground">{checkInTime || "—"}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Check Out</p>
                <p className="text-2xl font-semibold text-foreground">{checkOutTime || "—"}</p>
              </div>
            </div>

            {/* Today's Hours */}
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">Today's Total Hours</p>
              <p className="text-3xl font-bold text-primary">{totalHours}</p>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">This Month's Summary</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-foreground px-2">January 2026</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Days Present" value={statistics?.presentDays.toString() || "0"} color="emerald" />
              <StatCard label="Days Absent" value={statistics?.absentDays.toString() || "0"} color="red" />
              <StatCard label="On Leave" value={statistics?.leaveDays.toString() || "0"} color="amber" />
              <StatCard label="Total Hours" value={statistics ? `${statistics.averageHours.toFixed(0)}h` : "0h"} color="primary" />
            </div>

            {/* Mini Calendar View */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Quick View</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isToday = day === 3;
                  const isWeekend = [4, 5, 11, 12, 18, 19, 25, 26].includes(day);
                  const isLeave = day === 27;
                  return (
                    <div
                      key={day}
                      className={cn(
                        "text-center text-xs py-1.5 rounded",
                        isToday && "bg-primary text-primary-foreground font-medium",
                        isWeekend && !isToday && "text-muted-foreground",
                        isLeave && "bg-amber-500/20 text-amber-600 dark:text-amber-400",
                        !isToday && !isWeekend && !isLeave && "text-foreground"
                      )}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">Attendance History</h2>

            {/* View Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              {(["daily", "weekly", "monthly"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                    viewMode === mode
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Check In
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Check Out
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Total Hours
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loadingHistory ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      Loading attendance history...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  history.map((record, index) => (
                    <tr
                      key={record.id}
                      className="hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {formatDate(record.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">{formatTime(record.check_in)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">{record.check_out ? formatTime(record.check_out) : "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {record.total_hours ? `${record.total_hours.toFixed(1)}h` : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status.toLowerCase() as any} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: "emerald" | "red" | "amber" | "primary";
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    red: "bg-red-500/10 text-red-600 dark:text-red-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    primary: "bg-primary/10 text-primary",
  };

  return (
    <div className={cn("p-4 rounded-xl", colorClasses[color])}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-80 mt-1">{label}</p>
    </div>
  );
}
