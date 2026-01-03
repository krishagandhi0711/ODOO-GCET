import { useState, useMemo } from 'react';
import { leaveRequests as initialRequests, LeaveRequest } from '@/data/mockData';
import { LeaveRequestsTable } from '@/components/admin/leave/LeaveRequestsTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AdminLeaveApprovals() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleUpdateRequest = (id: string, status: 'approved' | 'rejected') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesType = typeFilter === 'all' || request.leaveType === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [requests, statusFilter, typeFilter]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }), [requests]);

  return (
    <AppLayout title="Leave Approvals">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="border-b border-border/40 pb-6">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Leave Approvals</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Review and manage employee leave requests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Total Requests
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {stats.total}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <CalendarCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Pending
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {stats.pending}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Approved
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {stats.approved}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Rejected
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {stats.rejected}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Annual">Annual</SelectItem>
              <SelectItem value="Sick">Sick</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leave Requests Table */}
        <LeaveRequestsTable requests={filteredRequests} onUpdate={handleUpdateRequest} />
      </div>
    </AppLayout>
  );
}
