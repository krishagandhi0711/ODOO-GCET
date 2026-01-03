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
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Leave Approvals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and manage employee leave requests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-muted">
                <CalendarCheck size={18} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Requests</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-warning/10">
                <Clock size={18} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-success/10">
                <CheckCircle size={18} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-destructive/10">
                <XCircle size={18} className="text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
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
