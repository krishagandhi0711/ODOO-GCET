import { Users, UserCheck, CalendarOff, ClipboardList, Plus, UserPlus } from 'lucide-react';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { WorkforceStatus } from '@/components/admin/dashboard/WorkforceStatus';
import { PendingApprovals } from '@/components/admin/dashboard/PendingApprovals';
import { dashboardStats } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

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
              Create Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={dashboardStats.totalEmployees}
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Present Today"
            value={dashboardStats.presentToday}
            icon={UserCheck}
            variant="success"
            trend={{ value: '2 more than yesterday', positive: true }}
          />
          <StatCard
            title="On Leave"
            value={dashboardStats.onLeave}
            icon={CalendarOff}
            variant="warning"
          />
          <StatCard
            title="Pending Requests"
            value={dashboardStats.pendingRequests}
            icon={ClipboardList}
            variant="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <WorkforceStatus />
          <PendingApprovals />
        </div>
      </div>
    </AppLayout>
  );
}
