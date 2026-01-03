import { useState, useEffect } from 'react';
import { employees, Employee } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalaryBreakdown } from '@/components/admin/payroll/SalaryBreakdown';
import { EditableSalaryForm } from '@/components/admin/payroll/EditableSalaryForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSearchParams } from 'react-router-dom';

export default function AdminPayroll() {
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeIdFromUrl = searchParams.get('employee');

  const initialEmployee = employeeIdFromUrl
    ? employees.find(e => e.id === employeeIdFromUrl) || employees[0]
    : employees[0];

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(initialEmployee);

  // Update selected employee when URL parameter changes
  useEffect(() => {
    if (employeeIdFromUrl) {
      const employee = employees.find(e => e.id === employeeIdFromUrl);
      if (employee && employee.id !== selectedEmployee.id) {
        setSelectedEmployee(employee);
      }
    }
  }, [employeeIdFromUrl, selectedEmployee.id]);

  const handleEmployeeChange = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setSearchParams({ employee: employeeId });
    }
  };

  return (
    <AppLayout title="Payroll Management">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="border-b border-border/40 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Payroll</h1>
              <p className="text-sm text-muted-foreground mt-2">
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
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Total Employees
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {employees.length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Total Payroll
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  ${employees.reduce((sum, e) => sum + e.salary.basic + e.salary.hra + e.salary.allowances, 0).toLocaleString()}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Avg. Salary
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  ${Math.round(employees.reduce((sum, e) => sum + e.salary.basic, 0) / employees.length).toLocaleString()}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Departments
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {[...new Set(employees.map(e => e.department))].length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Wallet className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
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
