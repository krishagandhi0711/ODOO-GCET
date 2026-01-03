import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { employeeService } from "@/services/employee.service";
import { toastService } from "@/services/toast.service";
import type { Employee } from "@/types/api.types";
import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  Award,
  FileText,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Users,
  Download,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "professional", label: "Professional", icon: Briefcase },
  { id: "skills", label: "Skills & Certs", icon: Award },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "payroll", label: "Payroll", icon: DollarSign },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      setIsLoading(true);
      const data = await employeeService.getMyProfile();
      setEmployee(data);
    } catch (error: any) {
      toastService.error(error.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout title="My Profile">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!employee) {
    return (
      <AppLayout title="My Profile">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Failed to load profile</p>
            <Button onClick={fetchEmployeeData} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const fullName = `${employee.first_name || ''} ${employee.last_name || ''}`.trim();
  const initials = `${employee.first_name?.[0] || 'U'}${employee.last_name?.[0] || 'N'}`;


  return (
    <AppLayout title="My Profile">


      <div className="w-full mx-auto relative">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left Column - Profile Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass rounded-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden backdrop-blur-xl">
              {/* Header Gradient */}
              <div className="h-24 bg-gradient-to-br from-slate-200/80 via-slate-100/60 to-slate-200/80 dark:from-slate-800/50 dark:via-slate-900/30 dark:to-slate-800/50" />

              {/* Profile Info */}
              <div className="px-6 pb-6 -mt-12">
                <div className="relative inline-block">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-800 dark:text-white text-3xl font-bold shadow-lg border-4 border-background mx-auto">
                    {initials}
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500/30 dark:bg-emerald-500/20 border-2 border-emerald-500/40 dark:border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold text-foreground">{fullName}</h2>
                  <p className="text-muted-foreground mt-1">{employee.designation || 'Employee'}</p>

                  {/* Status Chip */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/30 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 dark:bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      {employee.employment_type || 'Full Time'}
                    </span>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="mt-6 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Profile Completion</span>
                    <span className="text-xs font-semibold text-foreground">
                      {calculateProfileCompletion(employee)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: `${calculateProfileCompletion(employee)}%` }} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {employee.department && (
                    <div className="flex items-center gap-3 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{employee.department}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Company</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      Joined {employee.date_of_joining ? new Date(employee.date_of_joining).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5">
                  <div className="text-xs text-muted-foreground mb-2">Employee ID</div>
                  <div className="text-sm font-mono text-foreground bg-slate-100/80 dark:bg-slate-800/30 rounded-lg px-3 py-2 border border-slate-200 dark:border-white/5">
                    {employee.employee_code}
                  </div>
                </div>

                {/* Verified by HR Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400/80">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified by HR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabbed Content */}
          <div className="glass rounded-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden backdrop-blur-xl">
            {/* macOS-style Tab Navigation */}
            <div className="p-3 border-b border-slate-200 dark:border-white/5">
              <div className="flex gap-1 p-1 bg-slate-100/60 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-white/5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        activeTab === tab.id
                          ? "bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-white/10"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 animate-fade-in">
              {activeTab === "personal" && <PersonalTab employee={employee} />}
              {activeTab === "professional" && <ProfessionalTab employee={employee} />}
              {activeTab === "skills" && <SkillsTab />}
              {activeTab === "documents" && <DocumentsTab />}
              {activeTab === "payroll" && <PayrollTab />}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Helper function to calculate profile completion
function calculateProfileCompletion(employee: Employee): number {
  const fields = [
    employee.first_name,
    employee.last_name,
    employee.email,
    employee.phone_number,
    employee.date_of_birth,
    employee.gender,
    employee.address,
    employee.department,
    employee.designation,
    employee.employment_type,
  ];
  
  const filledFields = fields.filter(field => field && field.trim().length > 0).length;
  return Math.round((filledFields / fields.length) * 100);
}

function PersonalTab({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-6">
      {/* Public Information Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-foreground">Public Information</h3>
          <span className="text-xs text-muted-foreground">• Visible to team members</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField label="Full Name" value={`${employee.first_name} ${employee.last_name}`} icon={User} />
          <InfoField label="Email" value={employee.email} icon={Mail} />
          <InfoField label="Phone" value={employee.phone_number || 'Not provided'} icon={Phone} />
        </div>
      </div>

      {/* Private Information Section */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-semibold text-foreground">Private Information</h3>
          <span className="text-xs text-amber-600 dark:text-amber-400/80">• HR Only</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField 
            label="Date of Birth" 
            value={employee.date_of_birth ? new Date(employee.date_of_birth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : 'Not provided'} 
            icon={Calendar} 
            isPrivate 
          />
          <InfoField label="Gender" value={employee.gender || 'Not provided'} icon={User} isPrivate />
          <InfoField label="Address" value={employee.address || 'Not provided'} icon={MapPin} className="sm:col-span-2" isPrivate />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          <h3 className="text-sm font-semibold text-foreground">Emergency Contact</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-medium text-foreground mt-1">{currentEmployee.emergencyContact.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Relationship</p>
            <p className="text-sm font-medium text-foreground mt-1">{currentEmployee.emergencyContact.relationship}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium text-foreground mt-1">{currentEmployee.emergencyContact.phone}</p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="pt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Last updated: December 15, 2024</span>
      </div>
    </div>
  );
}

function ProfessionalTab({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoField label="Employee ID" value={employee.employee_code} icon={User} />
        <InfoField label="Job Title" value={employee.designation || 'Not assigned'} icon={Briefcase} />
        <InfoField label="Department" value={employee.department || 'Not assigned'} icon={Building} />
        <InfoField label="Employment Type" value={employee.employment_type || 'Not specified'} icon={Users} />
        <InfoField label="Work Email" value={employee.email} icon={Mail} />
        <InfoField label="Phone Number" value={employee.phone_number || 'Not provided'} icon={Phone} />
        <InfoField label="Start Date" value={employee.date_of_joining ? new Date(employee.date_of_joining).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : 'Not specified'} icon={Calendar} />
        <InfoField label="Address" value={employee.address || 'Not provided'} icon={MapPin} />
      </div>

      {/* Last Updated */}
      <div className="pt-4 flex items-center gap-2 text-xs text-muted-foreground border-t border-slate-200 dark:border-white/5">
        <Clock className="h-3 w-3" />
        <span>Last updated: {employee.updated_at ? new Date(employee.updated_at).toLocaleDateString("en-US") : 'N/A'}</span>
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Skills and certifications will be available soon.</p>
        <p className="text-sm text-muted-foreground mt-2">Contact HR to add your skills and certifications.</p>
      </div>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="space-y-4">
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No documents uploaded yet.</p>
        <p className="text-sm text-muted-foreground mt-2">Employment documents will be managed by HR.</p>
      </div>
    </div>
  );
}

function PayrollTab() {
  return (
    <div className="space-y-6">
      {/* Sensitive Warning */}
      <div className="p-4 rounded-xl bg-amber-500/20 dark:bg-amber-500/10 border border-amber-500/30 dark:border-amber-500/20 flex items-start gap-3">
        <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Sensitive Information</p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
            Payroll information is read-only and controlled by HR. Contact HR for any changes.
          </p>
        </div>
      </div>

      <div className="text-center py-12">
        <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Payroll information not yet configured.</p>
        <p className="text-sm text-muted-foreground mt-2">Contact HR department for salary structure setup.</p>
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  icon: typeof User;
  className?: string;
  isPrivate?: boolean;
}

function InfoField({ label, value, icon: Icon, className, isPrivate }: InfoFieldProps) {
  return (
    <div className={cn("p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
        {isPrivate && <Lock className="h-3 w-3 text-amber-600/60 dark:text-amber-400/60" />}
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}