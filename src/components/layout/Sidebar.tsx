import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Clock,
  Calendar,
  Users,
  DollarSign,
  CalendarCheck,
  Shield,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

// Employee navigation items
const employeeNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My Profile", icon: User },
  { to: "/attendance", label: "Attendance", icon: Clock },
  { to: "/time-off", label: "Time Off", icon: Calendar },
];

// Admin navigation items
const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/employees", label: "Employees", icon: Users },
  { to: "/admin/leave-approvals", label: "Leave Approvals", icon: CalendarCheck },
  { to: "/admin/payroll", label: "Payroll", icon: DollarSign },
];

export function Sidebar() {
  const location = useLocation();
  const { role, setRole, isAdmin } = useAuth();

  const renderNavItem = (item: typeof employeeNavItems[0]) => {
    const isActive = location.pathname === item.to;
    const Icon = item.icon;

    return (
      <li key={item.to}>
        <NavLink
          to={item.to}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
            "border border-transparent",
            "hover:pl-5",
            isActive
              ? "text-primary bg-primary/5 border-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.1)]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          {/* Active indicator strip */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
          )}

          {/* Icon with glow */}
          <Icon
            className={cn(
              "h-5 w-5 flex-shrink-0 transition-colors duration-300",
              isActive ? "text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.3)]" : "group-hover:text-foreground"
            )}
          />

          <span className="relative z-10">{item.label}</span>

          {/* Hover gradient background */}
          {!isActive && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 glass flex flex-col border-r border-white/5">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-lg shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
            D
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Dayflow
          </span>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
        {/* Employee Section */}
        {role === 'employee' && (
          <div className="mb-6">
            <div className="mb-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider opacity-60">
              Menu
            </div>
            <ul className="space-y-1">
              {employeeNavItems.map(renderNavItem)}
            </ul>
          </div>
        )}

        {/* Admin Section */}
        {role === 'admin' && (
          <>
            {/* Admin Main Menu */}
            <div className="mb-6">
              <div className="mb-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider opacity-60">
                Administration
              </div>
              <ul className="space-y-1">
                {adminNavItems.map(renderNavItem)}
              </ul>
            </div>

            {/* Optional: Quick Employee Access for Admins */}
            <div className="pt-4 border-t border-white/5">
              <div className="mb-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider opacity-60">
                Quick Access
              </div>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/profile"
                    className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                  >
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>My Profile</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>

      {/* Role Switcher - Fixed at Bottom */}
      <div className="mt-auto p-4 border-t border-white/5 bg-black/5">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2 justify-center py-5 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary hover:border-primary/20 transition-all duration-300"
          onClick={() => setRole(isAdmin ? 'employee' : 'admin')}
        >
          {isAdmin ? (
            <>
              <UserCircle size={18} />
              <span className="font-medium">Switch to Employee</span>
            </>
          ) : (
            <>
              <Shield size={18} />
              <span className="font-medium">Switch to Admin</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}