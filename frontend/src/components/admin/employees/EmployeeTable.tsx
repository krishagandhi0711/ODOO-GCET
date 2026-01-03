import type { Employee } from '@/types/api.types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  selectedId?: number;
}

export function EmployeeTable({ employees, onSelectEmployee, selectedId }: EmployeeTableProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

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
                Employee Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Designation
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Employment Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((employee) => {
              const isSelected = employee.id === selectedId;
              const initials = getInitials(employee.first_name, employee.last_name);

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
                      <Avatar className="h-9 w-9 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-card-foreground">{employee.employee_code}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{employee.department || 'N/A'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{employee.designation || 'N/A'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {employee.employment_type || 'Full Time'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEmployee(employee);
                      }}
                      className="h-8 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Button>
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
