/**
 * Integrated Admin Employees Page
 * Full CRUD operations with real backend integration
 */

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserPlus, Search, Edit, Trash2, Loader2, AlertCircle, Mail, Phone, Building } from 'lucide-react';
import { employeeService } from '@/services/employee.service';
import { toastService } from '@/services/toast.service';
import { useAuth } from '@/contexts/AuthContext';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '@/types/api.types';

export default function AdminEmployeesIntegrated() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<CreateEmployeeDto>>({
    email: '',
    password: '',
    role: 'EMPLOYEE',
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    address: '',
    department: '',
    designation: '',
    date_of_joining: new Date().toISOString().split('T')[0],
    employment_type: 'FULL_TIME',
    company_id: user?.companyId || 1,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees based on search query
    if (searchQuery.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = employees.filter(
        (emp) =>
          `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.employee_code.toLowerCase().includes(query) ||
          (emp.department && emp.department.toLowerCase().includes(query))
      );
      setFilteredEmployees(filtered);
    }
  }, [searchQuery, employees]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error: any) {
      toastService.error(error.message || 'Failed to load employees');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEmployee = async () => {
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      toastService.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await employeeService.createEmployee(formData as CreateEmployeeDto);
      toastService.success('Employee created successfully');
      setIsModalOpen(false);
      resetForm();
      fetchEmployees();
    } catch (error: any) {
      toastService.error(error.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateEmployee = async () => {
    if (!selectedEmployee || !formData.first_name || !formData.last_name) {
      toastService.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const updateData: UpdateEmployeeDto = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        address: formData.address,
        department: formData.department,
        designation: formData.designation,
        employment_type: formData.employment_type,
      };
      await employeeService.updateEmployee(selectedEmployee.id, updateData);
      toastService.success('Employee updated successfully');
      setIsModalOpen(false);
      resetForm();
      fetchEmployees();
    } catch (error: any) {
      toastService.error(error.message || 'Failed to update employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
      await employeeService.deleteEmployee(id);
      toastService.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error: any) {
      toastService.error(error.message || 'Failed to delete employee');
    }
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setFormData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone_number: employee.phone_number || '',
      date_of_birth: employee.date_of_birth || '',
      gender: employee.gender || '',
      address: employee.address || '',
      department: employee.department || '',
      designation: employee.designation || '',
      employment_type: employee.employment_type || 'FULL_TIME',
      company_id: employee.company_id,
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedEmployee(null);
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      role: 'EMPLOYEE',
      first_name: '',
      last_name: '',
      phone_number: '',
      date_of_birth: '',
      gender: '',
      address: '',
      department: '',
      designation: '',
      date_of_joining: new Date().toISOString().split('T')[0],
      employment_type: 'FULL_TIME',
      company_id: user?.companyId || 1,
    });
  };

  return (
    <AppLayout title="Employee Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Employee Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your organization's employees
            </p>
          </div>
          <Button onClick={openCreateModal} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees by name, email, code, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Employee List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No employees found matching your search' : 'No employees yet'}
            </p>
          </div>
        ) : (
          <div className="glass rounded-2xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Employee
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Code
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Department
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Designation
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Joined
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {employee.first_name[0]}{employee.last_name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {employee.first_name} {employee.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-mono">
                        {employee.employee_code}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{employee.department || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {employee.designation || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(employee.date_of_joining).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(employee)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Employee Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Update employee information below'
                : 'Fill in the details to create a new employee'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
            </div>

            {!isEditMode && (
              <>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <Select
                  value={formData.employment_type}
                  onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INTERN">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={isEditMode ? handleUpdateEmployee : handleCreateEmployee}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Update' : 'Create'} Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
