import { Users, UserCheck, CalendarOff, ClipboardList } from 'lucide-react';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { WorkforceStatus } from '@/components/admin/dashboard/WorkforceStatus';
import { PendingApprovals } from '@/components/admin/dashboard/PendingApprovals';
import { dashboardStats } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AdminDashboard() {
  return (
    <AppLayout title="Admin Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back. Here's your organization at a glance.
          </p>
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
