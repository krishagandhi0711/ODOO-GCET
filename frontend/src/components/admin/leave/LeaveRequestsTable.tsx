import { useState } from 'react';
import { LeaveRequest } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  onUpdate: (id: string, status: 'approved' | 'rejected') => void;
}

const leaveTypeStyles = {
  paid: { label: 'Paid Leave', className: 'bg-primary/10 text-primary' },
  sick: { label: 'Sick Leave', className: 'bg-destructive/10 text-destructive' },
  unpaid: { label: 'Unpaid Leave', className: 'bg-muted text-muted-foreground' },
  casual: { label: 'Casual Leave', className: 'bg-accent text-accent-foreground' },
};

const statusStyles = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive' },
};

export function LeaveRequestsTable({ requests, onUpdate }: LeaveRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');

  const handleAction = (request: LeaveRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
  };

  const confirmAction = () => {
    if (selectedRequest && actionType) {
      onUpdate(selectedRequest.id, actionType === 'approve' ? 'approved' : 'rejected');
      toast({
        title: actionType === 'approve' ? 'Leave Approved' : 'Leave Rejected',
        description: `${selectedRequest.employeeName}'s leave request has been ${actionType === 'approve' ? 'approved' : 'rejected'}.`,
      });
      setSelectedRequest(null);
      setActionType(null);
      setComment('');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysDiff = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((request) => {
                const leaveType = leaveTypeStyles[request.leaveType];
                const status = statusStyles[request.status];
                const days = getDaysDiff(request.startDate, request.endDate);
                
                return (
                  <tr key={request.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 bg-secondary">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                            {request.employeeAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{request.employeeName}</p>
                          <p className="text-xs text-muted-foreground">Applied {formatDate(request.appliedOn)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', leaveType.className)}>
                        {leaveType.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm text-card-foreground">
                          {formatDate(request.startDate)} - {formatDate(request.endDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">{days} day{days > 1 ? 's' : ''}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {request.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-success hover:bg-success/10 hover:text-success"
                            onClick={() => handleAction(request, 'approve')}
                          >
                            <Check size={16} className="mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleAction(request, 'reject')}
                          >
                            <X size={16} className="mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {requests.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No leave requests found</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => { setSelectedRequest(null); setComment(''); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <span>
                  {actionType === 'approve' ? 'Approve' : 'Reject'} {selectedRequest.employeeName}'s {selectedRequest.leaveType} leave request?
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-2">
              <MessageSquare size={16} className="mt-1 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">Add a comment (optional)</p>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Reason for decision..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Cancel
            </Button>
            <Button 
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={confirmAction}
            >
              {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
