import { useState, useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { employees, departments, Employee } from '@/data/mockData';
import { EmployeeTable } from '@/components/admin/employees/EmployeeTable';
import { EmployeeDetailPanel } from '@/components/admin/employees/EmployeeDetailPanel';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

export default function AdminEmployees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 'All' || employee.department === selectedDepartment;

      const matchesStatus =
        selectedStatus === 'all' || employee.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchQuery, selectedDepartment, selectedStatus]);

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
          <Button className="w-full sm:w-auto flex items-center gap-2">
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
                  Present Today
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {employees.filter(e => e.status === 'present').length}
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
                  On Leave
                </p>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">
                  {employees.filter(e => e.status === 'on-leave').length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Filter className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
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
      </div>
    </AppLayout >
  );
}
