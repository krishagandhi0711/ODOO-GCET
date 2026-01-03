import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  sidebarCollapsed: boolean;
}

export function Header({ title, sidebarCollapsed }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Page title */}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg py-1.5 px-2 transition-colors duration-200 hover:bg-secondary"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-sm font-medium shadow-soft">
                JD
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                profileOpen && "rotate-180"
              )} />
            </button>

            {/* Dropdown menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-popover border border-border shadow-soft-lg animate-fade-in overflow-hidden">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleProfile}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
