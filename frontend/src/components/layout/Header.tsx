import { Bell, User, LogIn, LogOut } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useAttendance } from "@/contexts/AttendanceContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  isCollapsed: boolean;
}

// Helper function to calculate working time
function calculateWorkingTime(checkInTime: string): string {
  try {
    const [time, period] = checkInTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let checkInHour = hours;
    if (period === 'PM' && hours !== 12) checkInHour += 12;
    if (period === 'AM' && hours === 12) checkInHour = 0;

    const checkInDate = new Date();
    checkInDate.setHours(checkInHour, minutes, 0);

    const now = new Date();
    const diffMs = now.getTime() - checkInDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  } catch {
    return '0h 0m';
  }
}

export function Header({ title, isCollapsed }: HeaderProps) {
  const { role } = useAuth();
  const { isCheckedIn, toggleCheckIn, isLoading, checkInTime } = useAttendance();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('dayflow-user-role');
    navigate('/login');
  };

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Format date nicely
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-40 h-16 glass flex items-center justify-between px-6 border-b border-white/5 transition-all duration-300",
        isCollapsed ? "left-20" : "left-64"
      )}
    >
      {/* Left: Dynamic Greeting + Context */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {getGreeting()}, Krisha
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {getCurrentDate()} • {title}
          </p>
        </div>
      </div>

      {/* Center: Attendance Status Widget (Shows when checked in) */}
      {role === 'employee' && isCheckedIn && (
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Present</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Working: {checkInTime ? calculateWorkingTime(checkInTime) : '0h 0m'}
          </span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Attendance Action */}
        {role === 'employee' && (
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={toggleCheckIn}
              disabled={isLoading}
              size="sm"
              className={cn(
                "gap-2 font-medium transition-all duration-300 shadow-md",
                isCheckedIn
                  ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
              )}
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : isCheckedIn ? (
                <>
                  <LogOut className="h-4 w-4" />
                  Check Out
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Check In
                </>
              )}
            </Button>
          </div>
        )}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-all duration-200 text-foreground/80 hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/10">
              <Avatar className="h-8 w-8 ring-2 ring-white/10">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                  KG
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none text-foreground">Krisha Gandhi</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass border-white/10">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}