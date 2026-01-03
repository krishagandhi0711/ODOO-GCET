import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  LogIn,
  LogOut,
  Calendar,
  ChevronLeft,
  ChevronRight,
  History,
  TrendingUp,
  Activity,
  UserCheck,
  Timer
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
    <AppLayout title="Attendance Management">
      <div className="max-w-[1200px] mx-auto space-y-8 pb-16 px-4">

        {/* Section 1: Dashboard Integration Style */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Action Module */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-secondary rounded-[2.5rem] border border-foreground/10 p-8 shadow-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-foreground uppercase">Shift Timer</h2>
                    <p className="text-xs font-bold text-muted-foreground uppercase">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleClockAction}
                    disabled={isLoading}
                    className={cn(
                      "w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest transition-all shadow-xl",
                      isCheckedIn
                        ? "bg-foreground text-background"
                        : "bg-primary text-white"
                    )}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Synchronizing
                      </span>
                    ) : isCheckedIn ? (
                      <span className="flex items-center gap-2">
                        <LogOut className="h-5 w-5" /> End Shift
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-5 w-5" /> Start Shift
                      </span>
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    <TimeBox label="Check In" value={checkInTime || "--:--"} />
                    <TimeBox label="Check Out" value={checkOutTime || "--:--"} />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-foreground/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", isCheckedIn ? "bg-primary animate-pulse" : "bg-muted-foreground/30")} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Status</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Live Tracking</span>
              </div>
            </div>

            {/* Today's Hours */}
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">Today's Total Hours</p>
              <p className="text-3xl font-bold text-primary">{totalHours}</p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <AttendanceStatCard
              label="Current Month Present"
              value="18"
              sub="Of 22 Scheduled Days"
              icon={UserCheck}
              trend="+2.4%"
            />
            <AttendanceStatCard
              label="Total Working Hours"
              value="156.5"
              sub="Calculated System Hours"
              icon={Timer}
              isBlue
            />
            <AttendanceStatCard
              label="Leaves Taken"
              value="02"
              sub="Approved Documentation"
              icon={Calendar}
            />
            <AttendanceStatCard
              label="Productivity Score"
              value="94%"
              sub="Efficiency Metric"
              icon={TrendingUp}
              trend="+5%"
            />
          </div>
        </div>

        {/* Section 2: History & Visuals */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Visualizer Module */}
          <div className="lg:col-span-5">
            <div className="bg-secondary rounded-[2.5rem] border border-foreground/10 p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-black uppercase tracking-widest text-foreground">Attendance View</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/5">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 text-foreground">JANUARY 2026</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/5">
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
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    const isToday = day === 3;
                    const isWeekend = [4, 5, 11, 12, 18, 19, 25, 26].includes(day);
                    const isLeave = day === 15 || day === 22; // Marking specific off-days/leave

                    return (
                      <div key={day} className={cn(
                        "aspect-square flex flex-col items-center justify-center text-xs font-bold rounded-xl border transition-all relative overflow-hidden",
                        isToday
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105 z-10"
                          : isLeave
                            ? "bg-foreground text-background border-foreground"
                            : isWeekend
                              ? "bg-foreground/5 text-muted-foreground border-transparent opacity-40"
                              : "border-foreground/5 text-foreground hover:border-primary/30 hover:bg-primary/5"
                      )}>
                        {day}
                        {isToday && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-white animate-pulse" />}
                      </div>
                    )
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="mt-8 pt-6 border-t border-foreground/5 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-md bg-primary shadow-sm" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-md bg-foreground shadow-sm" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Approved Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-md bg-foreground/5 border border-foreground/10" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Off Day / Weekend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Module */}
          <div className="lg:col-span-7 bg-secondary rounded-[2.5rem] border border-foreground/10 p-4 shadow-xl overflow-hidden">
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
      </div>
    </AppLayout>
  );
}

{/* REFINED ATOMS */ }

function TimeBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-5 rounded-2xl bg-background/50 border border-foreground/10 text-center space-y-1">
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{label}</span>
      <p className="text-lg font-black text-foreground tracking-tighter">{value}</p>
    </div>
  )
}

function AttendanceStatCard({ label, value, sub, icon: Icon, color, trend, isBlue }: { label: string, value: string, sub: string, icon: any, color?: string, trend?: string, isBlue?: boolean }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-secondary/40 border border-foreground/10 hover:border-primary/20 transition-all group shadow-lg flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-3 shadow-xl",
          isBlue ? "bg-primary text-white" : "bg-foreground text-background"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-6 space-y-1">
        <p className="text-4xl font-black text-foreground tracking-tighter">{value}</p>
        <div>
          <p className="text-xs font-black text-foreground uppercase tracking-tight flex items-center gap-2">{label}</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{sub}</p>
        </div>
      </div>
    </div>
  )
}

function Th({ label, className }: { label: string, className?: string }) {
  return (
    <th className={cn("px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]", className)}>
      {label}
    </th>
  )
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  const colorMap: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  const colorStyle = colorMap[color] || colorMap.primary;

  return (
    <div className={cn("p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-1 transition-all", colorStyle)}>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</span>
      <p className="text-xl font-black tracking-tighter">{value}</p>
    </div>
  );
}
