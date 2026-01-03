import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Plus,
  X,
  Briefcase,
  Heart,
  User,
  Clock,
  CalendarDays,
  Loader2,
  ChevronDown
} from "lucide-react";
import { leaveBalance, leaveHistory, leaveTypes } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function TimeOff() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <AppLayout title="Time Off">
      <div className="w-full mx-auto space-y-6">
        {/* Leave Balance Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <LeaveBalanceCard
            title="Paid Leave"
            used={leaveBalance.paidLeave.used}
            total={leaveBalance.paidLeave.total}
            icon={Briefcase}
            color="primary"
          />
          <LeaveBalanceCard
            title="Sick Leave"
            used={leaveBalance.sickLeave.used}
            total={leaveBalance.sickLeave.total}
            icon={Heart}
            color="amber"
          />
          <LeaveBalanceCard
            title="Personal Leave"
            used={leaveBalance.personalLeave.used}
            total={leaveBalance.personalLeave.total}
            icon={User}
            color="violet"
          />
        </div>

        {/* Apply Leave Button & History */}
        <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Leave History</h2>
              <p className="text-sm text-muted-foreground mt-1">View and manage your time off requests</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Apply Leave
            </Button>
          </div>

          {/* Leave History Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Duration
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Days
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Reason
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Applied On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaveHistory.map((leave, index) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">{leave.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">
                        {formatDate(leave.startDate)}
                        {leave.startDate !== leave.endDate && ` - ${formatDate(leave.endDate)}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">{leave.days}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
                        {leave.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={leave.status as any} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{formatDate(leave.appliedOn)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <ApplyLeaveModal onClose={() => setIsModalOpen(false)} />
      )}
    </AppLayout>
  );
}

interface LeaveBalanceCardProps {
  title: string;
  used: number;
  total: number;
  icon: typeof Briefcase;
  color: "primary" | "amber" | "violet";
}

function LeaveBalanceCard({ title, used, total, icon: Icon, color }: LeaveBalanceCardProps) {
  const remaining = total - used;
  const percentage = (remaining / total) * 100;

  const colorClasses = {
    primary: {
      bg: "bg-primary/10",
      icon: "text-primary",
      bar: "bg-primary",
    },
    amber: {
      bg: "bg-amber-500/10",
      icon: "text-amber-600 dark:text-amber-400",
      bar: "bg-amber-500",
    },
    violet: {
      bg: "bg-violet-500/10",
      icon: "text-violet-600 dark:text-violet-400",
      bar: "bg-violet-500",
    },
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", colorClasses[color].bg)}>
          <Icon className={cn("h-5 w-5", colorClasses[color].icon)} />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <span className="text-3xl font-bold text-foreground">{remaining}</span>
          <span className="text-muted-foreground ml-1">/ {total}</span>
        </div>
        <span className="text-sm text-muted-foreground">days left</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClasses[color].bar)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface ApplyLeaveModalProps {
  onClose: () => void;
}

function ApplyLeaveModal({ onClose }: ApplyLeaveModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    remarks: "",
  });

  const selectedType = leaveTypes.find(t => t.value === formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-soft-lg w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Apply for Leave</h2>
              <p className="text-sm text-muted-foreground">Submit a new time off request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Leave Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Leave Type
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className={cn(
                  "w-full flex items-center justify-between h-11 px-4 rounded-lg border bg-background text-left transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background",
                  formData.type ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span>{selectedType?.label || "Select leave type"}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isTypeOpen && "rotate-180")} />
              </button>

              {isTypeOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-soft-lg overflow-hidden animate-fade-in">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, type: type.value });
                        setIsTypeOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors",
                        formData.type === type.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Remarks
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Briefly describe the reason for your leave..."
              rows={3}
              className={cn(
                "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-inner-soft transition-all duration-200",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:border-primary/50",
                "resize-none"
              )}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !formData.type || !formData.startDate || !formData.endDate}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
