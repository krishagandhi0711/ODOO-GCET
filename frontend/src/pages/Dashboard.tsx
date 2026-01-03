import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  TrendingUp,
  LogIn,
  LogOut,
  CheckCircle2
} from "lucide-react";
import { currentEmployee, todayAttendance, weeklyHours, leaveBalance } from "@/data/mockData";
import { cn } from "@/lib/utils";

import { useAttendance } from "@/contexts/AttendanceContext";

export default function Dashboard() {
  const { isCheckedIn, checkInTime, checkOutTime, toggleCheckIn, isLoading } = useAttendance();

  const handleClockAction = async () => {
    await toggleCheckIn();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const totalWeeklyHours = weeklyHours.reduce((sum, day) => sum + day.hours, 0);
  const maxHours = Math.max(...weeklyHours.map(d => d.hours));

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Welcome Section / Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1 tracking-tight">
              {getGreeting()}, {currentEmployee.firstName}
            </h2>
            <p className="text-muted-foreground font-medium">Here's your work summary for today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Current Status</p>
            </div>
            <StatusBadge status={isCheckedIn ? "present" : "absent"} className="scale-110" />
          </div>
        </div>

        {/* Main Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Attendance Card */}
          <DashboardCard title="Today's Attendance" icon={Clock} className="lg:col-span-1">
            <div className="space-y-4">
              {/* Clock In/Out Button */}
              <Button
                onClick={handleClockAction}
                disabled={isLoading}
                size="lg"
                className={cn(
                  "w-full h-14 text-base font-medium transition-all duration-300",
                  isCheckedIn
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : isCheckedIn ? (
                  <span className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    Check Out
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Check In
                  </span>
                )}
              </Button>

              {/* Time Display */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Check In</p>
                  <p className="text-lg font-semibold text-foreground">{checkInTime || "—"}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Check Out</p>
                  <p className="text-lg font-semibold text-foreground">{checkOutTime || "—"}</p>
                </div>
              </div>

              {/* Today's Hours */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-sm text-muted-foreground">Today's Hours</span>
                <span className="text-lg font-semibold text-primary">{todayAttendance.totalHours}</span>
              </div>
            </div>
          </DashboardCard>

          {/* Work Hours Summary Card */}
          <DashboardCard title="This Week's Hours" icon={TrendingUp} className="lg:col-span-1">
            <div className="space-y-4">
              {/* Weekly Chart */}
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyHours.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center">
                      <span className="text-xs font-medium text-foreground mb-1">
                        {day.hours}h
                      </span>
                      <div
                        className={cn(
                          "w-full rounded-t-md transition-all duration-500",
                          index === weeklyHours.length - 1
                            ? "bg-primary"
                            : "bg-primary/30"
                        )}
                        style={{
                          height: `${(day.hours / maxHours) * 80}px`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>

              {/* Total Hours */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Total This Week</span>
                <span className="text-lg font-semibold text-foreground">{totalWeeklyHours.toFixed(1)}h</span>
              </div>
            </div>
          </DashboardCard>

          {/* Leave Balance Card */}
          <DashboardCard title="Leave Balance" icon={Calendar} className="lg:col-span-1">
            <div className="space-y-4">
              {/* Paid Leave */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Paid Leave</span>
                  <span className="text-sm font-medium text-foreground">
                    {leaveBalance.paidLeave.total - leaveBalance.paidLeave.used} / {leaveBalance.paidLeave.total} days
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${((leaveBalance.paidLeave.total - leaveBalance.paidLeave.used) / leaveBalance.paidLeave.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Sick Leave */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Sick Leave</span>
                  <span className="text-sm font-medium text-foreground">
                    {leaveBalance.sickLeave.total - leaveBalance.sickLeave.used} / {leaveBalance.sickLeave.total} days
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${((leaveBalance.sickLeave.total - leaveBalance.sickLeave.used) / leaveBalance.sickLeave.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Personal Leave */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Personal Leave</span>
                  <span className="text-sm font-medium text-foreground">
                    {leaveBalance.personalLeave.total - leaveBalance.personalLeave.used} / {leaveBalance.personalLeave.total} days
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${((leaveBalance.personalLeave.total - leaveBalance.personalLeave.used) / leaveBalance.personalLeave.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-emerald-700 dark:text-emerald-400">
                  {leaveBalance.paidLeave.total - leaveBalance.paidLeave.used + leaveBalance.sickLeave.total - leaveBalance.sickLeave.used + leaveBalance.personalLeave.total - leaveBalance.personalLeave.used} days remaining
                </span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </AppLayout>
  );
}
