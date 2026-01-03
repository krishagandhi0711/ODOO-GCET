import { employees } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const statusConfig = {
  present: { label: 'Present', className: 'bg-success/10 text-success' },
  'on-leave': { label: 'On Leave', className: 'bg-warning/10 text-warning' },
  absent: { label: 'Absent', className: 'bg-destructive/10 text-destructive' },
};

export function WorkforceStatus() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="border-b border-border p-4">
        <h3 className="text-base font-semibold text-card-foreground">Workforce Status</h3>
        <p className="text-sm text-muted-foreground">Today's attendance overview</p>
      </div>
      
      <div className="divide-y divide-border">
        {employees.slice(0, 6).map((employee) => {
          const status = statusConfig[employee.status];
          return (
            <div key={employee.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 bg-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                    {employee.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                </div>
              </div>
              <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-border p-3">
        <button className="w-full text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All Employees →
        </button>
      </div>
    </div>
  );
}
