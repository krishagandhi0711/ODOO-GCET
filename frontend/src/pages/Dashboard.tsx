import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import {
  Clock,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  CalendarCheck,
  UserX,
  Activity,
  ChevronRight,
  LogIn,
  LogOut,
  ArrowRight,
  FileCheck,
  Sparkles,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine
} from "recharts";
import {
  currentEmployee,
  dashboardStats,
  weeklyHours,
  leaveBalance
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useAttendance } from "@/contexts/AttendanceContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isCheckedIn, checkInTime, toggleCheckIn, isLoading } = useAttendance();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getStatusColor = (dayHours: number) => {
    if (dayHours >= 8) return "bg-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]";
    if (dayHours > 0) return "bg-primary/40";
    return "bg-muted/40";
  };

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-10 pb-10 animate-in fade-in duration-700">

        {/* 1. Hero Welcome Section - Enhanced Visual Hierarchy */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 lg:p-12 border border-primary/10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20">
                <Sparkles className="h-3 w-3" />
                DASHBOARD OVERVIEW
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                {getGreeting()}, <br />
                <span className="text-primary italic">{currentEmployee.firstName}</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-md">
                You've completed <span className="text-foreground font-bold">85%</span> of your weekly targets. Keep it up!
              </p>
            </div>

            {/* Real-time Clock Action Widget */}
            <div className="glass-strong rounded-3xl p-6 border border-white/5 shadow-2xl min-w-[300px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    isCheckedIn ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                  )} />
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Shift Status: {isCheckedIn ? "Active" : "Away"}
                  </span>
                </div>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-center space-y-4">
                <div className="text-3xl font-black tabular-nums tracking-tighter">
                  {isCheckedIn ? (checkInTime || "Just Started") : "00:00:00"}
                </div>
                <Button
                  onClick={toggleCheckIn}
                  disabled={isLoading}
                  className={cn(
                    "w-full h-12 rounded-2xl font-black text-sm transition-all duration-300 shadow-xl",
                    isCheckedIn
                      ? "bg-foreground text-background hover:bg-foreground/90 shadow-foreground/10"
                      : "bg-primary hover:bg-primary/90 shadow-primary/20"
                  )}
                >
                  {isLoading ? "Syncing..." : isCheckedIn ? "FINISH SHIFT" : "START WORKDAY"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Personalized Performance Stats - Employee Centric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Work Streak', value: '12', icon: Activity, color: 'primary', desc: 'Consecutive days present' },
            { label: 'My Attendance', value: '98%', icon: CalendarCheck, color: 'primary', desc: 'Current month average' },
            { label: 'Remaining Leave', value: (leaveBalance.paidLeave.total - leaveBalance.paidLeave.used + leaveBalance.sickLeave.total - leaveBalance.sickLeave.used).toString(), icon: UserX, color: 'muted-foreground', desc: 'Available time off' },
            { label: 'Team Activity', value: '14/15', icon: Users, color: 'primary', desc: 'Engineering Dept present' },
          ].map((stat, i) => (
            <div key={i} className="group glass rounded-[2rem] p-6 border border-border/50 hover:border-primary/40 transition-all duration-500">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg bg-primary/5 text-primary"
                )}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground opacity-80 uppercase tracking-wide">{stat.label}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Operational Hub - Grouped by Function */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Quick Actions - List style for readability */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Quick Navigation</h3>
            <div className="grid gap-3">
              {[
                { title: 'Leave Management', desc: 'Secure digital requests', icon: FileCheck, color: 'primary', path: '/time-off' },
                { title: 'Attendance Log', desc: 'Detailed shift history', icon: FileText, color: 'primary', path: '/attendance' },
                { title: 'Team Directory', desc: 'Contact your colleagues', icon: Users, color: 'primary', path: '/profile' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner bg-primary/5 text-primary"
                  )}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-black text-foreground">{action.title}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{action.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Zone */}
          <div className="lg:col-span-2">
            <DashboardCard title="Performance Analytics" icon={TrendingUp} className="h-full">
              <div className="h-64 mt-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={weeklyHours}
                    margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="4 4"
                      stroke="currentColor"
                      className="text-border/30"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700 }}
                      className="text-muted-foreground uppercase opacity-50"
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700 }}
                      className="text-muted-foreground opacity-50"
                      domain={[0, 12]}
                    />
                    <Tooltip
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="glass-strong border border-white/10 px-4 py-3 rounded-2xl shadow-2xl">
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
                                {payload[0].payload.day} Metrics
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <p className="text-sm font-black text-foreground">
                                  {payload[0].value} Work Hours
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="none"
                      fillOpacity={1}
                      fill="url(#colorHours)"
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                      animationDuration={1500}
                    />
                    <ReferenceLine y={8} stroke="currentColor" className="text-foreground/10" strokeDasharray="3 3 label" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="pt-6 border-t border-border/40 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-4 rounded-full bg-primary" />
                    <span>Utilization Trend</span>
                  </div>
                  <span className="text-foreground/40 font-bold uppercase">Archive: Q1 2026</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* 4. Support & Resource Footer */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-6 border border-border/50 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-black text-foreground uppercase tracking-wide">Upcoming Holiday</h4>
              <p className="text-xs text-muted-foreground font-medium">Republic Day — January 26, 2026</p>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 border border-border/50 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-black text-foreground uppercase tracking-wide">Work Anniversary</h4>
              <p className="text-xs text-muted-foreground font-medium">3 years with Dayflow on March 15!</p>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
