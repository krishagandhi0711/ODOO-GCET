import { Employee } from '@/types/api.types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { X, Mail, Phone, Calendar, Building, Briefcase, Badge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployeeDetailPanelProps {
  employee: Employee | null;
  onClose: () => void;
}

export function EmployeeDetailPanel({ employee, onClose }: EmployeeDetailPanelProps) {
  if (!employee) return null;

  const getInitials = (firstName: string = '', lastName: string = '') => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'NA';
  };

  const joinDate = employee.date_of_joining 
    ? new Date(employee.date_of_joining).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';

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
              {getInitials(employee.first_name, employee.last_name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-semibold text-card-foreground">
            {employee.first_name} {employee.last_name}
          </h3>
          <p className="text-sm text-muted-foreground">{employee.designation || 'N/A'}</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">{employee.employee_code}</p>
          {employee.employment_type && (
            <span className="inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
              {employee.employment_type}
            </span>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-muted-foreground" />
                <span className="text-card-foreground">{employee.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">Professional</h4>
          <div className="space-y-2">
            {employee.department && (
              <div className="flex items-center gap-3 text-sm">
                <Building size={16} className="text-muted-foreground" />
                <span className="text-card-foreground">{employee.department}</span>
              </div>
            )}
            {employee.designation && (
              <div className="flex items-center gap-3 text-sm">
                <Briefcase size={16} className="text-muted-foreground" />
                <span className="text-card-foreground">{employee.designation}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-muted-foreground" />
              <span className="text-card-foreground">Joined {joinDate}</span>
            </div>
            {employee.gender && (
              <div className="flex items-center gap-3 text-sm">
                <Badge size={16} className="text-muted-foreground" />
                <span className="text-card-foreground capitalize">{employee.gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
