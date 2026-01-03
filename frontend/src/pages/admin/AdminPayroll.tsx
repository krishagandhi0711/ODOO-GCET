import { useState } from 'react';
import { employees, Employee } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalaryBreakdown } from '@/components/admin/payroll/SalaryBreakdown';
import { EditableSalaryForm } from '@/components/admin/payroll/EditableSalaryForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AdminPayroll() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[0]);

  const handleEmployeeChange = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
    }
  };

  return (
    <AppLayout title="Payroll Management">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Payroll</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage employee salary information
            </p>
          </div>

          {/* Employee Selector */}
          <div className="flex items-center gap-3">
            <Wallet size={18} className="text-muted-foreground" />
            <Select value={selectedEmployee.id} onValueChange={handleEmployeeChange}>
              <SelectTrigger className="w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    <div className="flex items-center gap-2">
                      <span>{employee.firstName} {employee.lastName}</span>
                      <span className="text-muted-foreground text-xs">• {employee.department}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected Employee Info */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                {selectedEmployee.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedEmployee.role} • {selectedEmployee.department}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for View/Edit */}
        <Tabs defaultValue="view" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="view">View Salary</TabsTrigger>
            <TabsTrigger value="edit">Edit Salary</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-6">
            <SalaryBreakdown employee={selectedEmployee} />
          </TabsContent>

          <TabsContent value="edit" className="mt-6">
            <EditableSalaryForm employee={selectedEmployee} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
