import { Employee } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { X, Mail, Phone, Calendar, Building, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployeeDetailPanelProps {
  employee: Employee | null;
  onClose: () => void;
}

const statusConfig = {
  present: { label: 'Present', className: 'bg-success/10 text-success' },
  'on-leave': { label: 'On Leave', className: 'bg-warning/10 text-warning' },
  absent: { label: 'Absent', className: 'bg-destructive/10 text-destructive' },
};

export function EmployeeDetailPanel({ employee, onClose }: EmployeeDetailPanelProps) {
  if (!employee) return null;

  const status = statusConfig[employee.status];
  const joinDate = new Date(employee.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const grossSalary = employee.salary.basic + employee.salary.hra + employee.salary.allowances;
  const totalDeductions = employee.salary.pfDeduction + employee.salary.taxDeduction;
  const netSalary = grossSalary - totalDeductions;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border shadow-elevated z-50 animate-slide-in overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">Employee Details</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
              {employee.avatar}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-semibold text-card-foreground">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
          <span className={cn('inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium', status.className)}>
            {status.label}
          </span>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">{employee.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">{employee.phone}</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">Professional</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Building size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">{employee.department}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">{employee.role}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">Joined {joinDate}</span>
            </div>
          </div>
        </div>

        {/* Salary Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">Salary Summary</h4>
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gross Salary</span>
              <span className="text-card-foreground font-medium">${grossSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Deductions</span>
              <span className="text-destructive font-medium">-${totalDeductions.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-card-foreground">Net Salary</span>
                <span className="font-semibold text-primary">${netSalary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
