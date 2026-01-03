import { Employee } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface EmployeeTableProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  selectedId?: string;
}

const statusConfig = {
  present: { label: 'Present', className: 'bg-success/10 text-success' },
  'on-leave': { label: 'On Leave', className: 'bg-warning/10 text-warning' },
  absent: { label: 'Absent', className: 'bg-destructive/10 text-destructive' },
};

export function EmployeeTable({ employees, onSelectEmployee, selectedId }: EmployeeTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((employee) => {
              const status = statusConfig[employee.status];
              const isSelected = employee.id === selectedId;
              
              return (
                <tr
                  key={employee.id}
                  onClick={() => onSelectEmployee(employee)}
                  className={cn(
                    'cursor-pointer transition-colors',
                    isSelected ? 'bg-accent/50' : 'hover:bg-muted/30'
                  )}
                >
                  <td className="px-4 py-3">
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
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{employee.department}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{employee.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {employees.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No employees found</p>
        </div>
      )}
    </div>
  );
}
