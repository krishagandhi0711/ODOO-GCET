import { useState } from 'react';
import { leaveRequests, LeaveRequest } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const leaveTypeStyles = {
  paid: 'bg-primary/10 text-primary',
  sick: 'bg-destructive/10 text-destructive',
  unpaid: 'bg-muted text-muted-foreground',
  casual: 'bg-accent text-accent-foreground',
};

export function PendingApprovals() {
  const [requests, setRequests] = useState<LeaveRequest[]>(
    leaveRequests.filter(r => r.status === 'pending')
  );

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: action === 'approve' ? 'Leave Approved' : 'Leave Rejected',
      description: `The leave request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="border-b border-border p-4">
        <h3 className="text-base font-semibold text-card-foreground">Pending Approvals</h3>
        <p className="text-sm text-muted-foreground">{requests.length} requests awaiting action</p>
      </div>
      
      <div className="divide-y divide-border">
        {requests.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No pending requests</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 bg-secondary">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                      {request.employeeAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-card-foreground">{request.employeeName}</p>
                    <div className="flex items-center gap-2">
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium capitalize', leaveTypeStyles[request.leaveType])}>
                        {request.leaveType}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDateRange(request.startDate, request.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{request.reason}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleAction(request.id, 'reject')}
                  >
                    <X size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-success hover:bg-success/10 hover:text-success"
                    onClick={() => handleAction(request.id, 'approve')}
                  >
                    <Check size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
