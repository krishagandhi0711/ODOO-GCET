import { useState } from "react";
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
import { attendanceHistory, todayAttendance } from "@/data/mockData";
import { cn } from "@/lib/utils";

type ViewMode = "daily" | "weekly" | "monthly";

export default function Attendance() {
  const [isCheckedIn, setIsCheckedIn] = useState(todayAttendance.isCheckedIn);
  const [checkInTime, setCheckInTime] = useState(todayAttendance.checkIn);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(todayAttendance.checkOut);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("daily");

  const handleClockAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isCheckedIn) {
      const now = new Date();
      setCheckOutTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      setIsCheckedIn(false);
    } else {
      const now = new Date();
      setCheckInTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      setCheckOutTime(null);
      setIsCheckedIn(true);
    }
    setIsLoading(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
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

              <div className="grid grid-cols-7 gap-3">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                  <div key={d} className="text-[10px] font-black text-muted-foreground text-center uppercase tracking-widest">{d}</div>
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

          {/* Logs Module */}
          <div className="lg:col-span-7">
            <div className="bg-secondary rounded-[2.5rem] border border-foreground/10 shadow-xl overflow-hidden h-full flex flex-col">
              <div className="p-8 border-b border-foreground/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-black uppercase tracking-widest text-foreground">Timeline Log</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Download CSV</button>
              </div>

              <div className="flex-1 overflow-x-auto scrollbar-hide">
                <table className="w-full">
                  <thead>
                    <tr className="bg-foreground/5">
                      <Th label="Date Sequence" />
                      <Th label="In / Out" />
                      <Th label="Status" />
                      <Th label="Hours" className="text-right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {attendanceHistory.slice(0, 6).map((record, i) => (
                      <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                        <td className="px-8 py-5">
                          <p className="text-xs font-black text-foreground uppercase tracking-tight italic">{formatDate(record.date)}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{record.checkIn} — {record.checkOut}</p>
                        </td>
                        <td className="px-8 py-5">
                          <StatusBadge status={record.status as any} />
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-sm font-black text-foreground">{record.totalHours}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
