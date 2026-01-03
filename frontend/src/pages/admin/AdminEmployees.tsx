import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, Loader2, UserPlus } from 'lucide-react';
import { employeeService } from '@/services/employee.service';
import { toastService } from '@/services/toast.service';
import type { Employee } from '@/types/api.types';
import { EmployeeTable } from '@/components/admin/employees/EmployeeTable';
import { EmployeeDetailPanel } from '@/components/admin/employees/EmployeeDetailPanel';
import { AddEmployeeDialog } from '@/components/admin/AddEmployeeDialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

export default function AdminEmployees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error: any) {
      toastService.error(error.message || 'Failed to load employees');
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique departments
  const departments = useMemo(() => {
    const depts = new Set(employees.map(e => e.department).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employee_code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 'All' || employee.department === selectedDepartment;

      // Since we don't have status in API, we'll skip that filter for now
      // const matchesStatus =
      //   selectedStatus === 'all' || employee.status === selectedStatus;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchQuery, selectedDepartment]);

  if (isLoading) {
    return (
      <AppLayout title="Employee Management">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Employee Management">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and view all employee information
            </p>
          </div>
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
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
                <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Full Time
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {employees.filter(e => e.employment_type === 'Full Time').length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <Filter className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Recent Hires
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {employees.filter(e => {
                    if (!e.date_of_joining) return false;
                    const joinDate = new Date(e.date_of_joining);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return joinDate > thirtyDaysAgo;
                  }).length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <UserPlus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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
                  {departments.length - 1}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Filter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onSelectEmployee={setSelectedEmployee}
          selectedId={selectedEmployee?.id}
        />

        {/* Employee Detail Panel */}
        {selectedEmployee && (
          <EmployeeDetailPanel
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}

        {/* Add Employee Dialog */}
        <AddEmployeeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSuccess={fetchEmployees}
        />
      </div>
    </AppLayout>
  );
}
