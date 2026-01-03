/**
 * Integrated Admin Dashboard
 * Connects to real backend APIs for statistics and data
 */

import { useState, useEffect } from 'react';
import { Users, UserCheck, CalendarOff, ClipboardList, UserPlus, Loader2, AlertCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { employeeService } from '@/services/employee.service';
import { attendanceService } from '@/services/attendance.service';
import { leaveService } from '@/services/leave.service';
import { toastService } from '@/services/toast.service';
import type { EmployeeStatistics, AttendanceStatistics, LeaveStatistics } from '@/types/api.types';

interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingRequests: number;
}

export default function AdminDashboardIntegrated() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingRequests: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all statistics in parallel
      const [employeeStats, attendanceStats, leaveStats] = await Promise.all([
        employeeService.getStatistics().catch(() => ({ total: 0 } as EmployeeStatistics)),
        attendanceService.getStatistics().catch(() => ({ presentDays: 0 } as AttendanceStatistics)),
        leaveService.getStatistics().catch(() => ({ pending: 0, approved: 0 } as LeaveStatistics)),
      ]);

      setStats({
        totalEmployees: employeeStats.total || 0,
        presentToday: attendanceStats.presentDays || 0,
        onLeave: leaveStats.approved || 0,
        pendingRequests: leaveStats.pending || 0,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
      toastService.error('Failed to load dashboard statistics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout title="Admin Dashboard">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="Admin Dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Admin Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back. Here's your organization at a glance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/admin/employees')}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Present Today"
            value={stats.presentToday}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="On Leave"
            value={stats.onLeave}
            icon={CalendarOff}
            variant="warning"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={ClipboardList}
            variant="primary"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickActionsCard navigate={navigate} />
          <RecentActivityCard />
        </div>
      </div>
    </AppLayout>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  variant: 'default' | 'success' | 'warning' | 'primary';
}

function StatCard({ title, value, icon: Icon, variant }: StatCardProps) {
  const variantStyles = {
    default: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  };

  return (
    <div className="glass rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function QuickActionsCard({ navigate }: { navigate: any }) {
  return (
    <div className="glass rounded-2xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/admin/employees')}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Employee
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/admin/leave-approvals')}
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Review Leave Requests
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/admin/payroll')}
        >
          <Users className="h-4 w-4 mr-2" />
          Manage Payroll
        </Button>
      </div>
    </div>
  );
}

function RecentActivityCard() {
  return (
    <div className="glass rounded-2xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
          <div>
            <p className="text-sm text-foreground">Dashboard loaded successfully</p>
            <p className="text-xs text-muted-foreground">Just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
