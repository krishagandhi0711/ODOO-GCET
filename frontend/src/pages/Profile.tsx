import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { employeeService } from "@/services/employee.service";
import { toastService } from "@/services/toast.service";
import type { Employee } from "@/types/api.types";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  FileText,
  DollarSign,
  Lock,
  Eye,
  EyeOff,
  Edit2,
  Shield,
  CheckCircle2,
  Briefcase,
  Award,
  Download,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "resume", label: "Career & Resume" },
  { id: "private", label: "Private Info" },
  { id: "salary", label: "Compensation" },
  { id: "security", label: "Security" },
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
              <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter leading-tight">
                {currentEmployee.firstName} <span className="text-primary font-black">{currentEmployee.lastName}</span>
              </h1>
              <p className="text-xl text-muted-foreground font-bold tracking-tight">
                {currentEmployee.role} <span className="text-primary mx-2">/</span> <span className="text-foreground">{currentEmployee.company}</span>
              </p>
            </div>

            {/* Quick Action Matrix - Darker Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl pt-8">
              <HeaderMetric label="Employee ID" value={currentEmployee.id} icon={FileText} />
              <HeaderMetric label="Business Unit" value={currentEmployee.department} icon={Building} />
              <HeaderMetric label="Regional Hub" value={currentEmployee.office} icon={MapPin} />
              <HeaderMetric label="Direct Manager" value={currentEmployee.manager} icon={User} />
            </div>
          </div>
        </section>

        {/* SECTION 2: Dynamic Tab Interface */}
        <section className="space-y-8">
          {/* Premium Tab Bar - Darker */}
          <div className="flex flex-wrap items-center justify-center gap-4 p-3 bg-secondary/80 backdrop-blur-3xl rounded-[2.5rem] max-w-fit mx-auto border-2 border-foreground/10 shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-10 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden",
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
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
    </section>

      </div >
    </AppLayout >
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
      <div className="flex items-center gap-5">
        <div className="h-16 w-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20">
          <Icon className="h-8 w-8" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField label="Full Name" value={`${employee.first_name} ${employee.last_name}`} icon={User} />
          <InfoField label="Email" value={employee.email} icon={Mail} />
          <InfoField label="Phone" value={employee.phone_number || 'Not provided'} icon={Phone} />
        </div>
      </div>
      {action}
    </div>
  )
}

function DarkCardField({ label, value, icon: Icon, isPrivate }: { label: string, value: string, icon: any, isPrivate?: boolean }) {
  return (
    <div className="group/field relative p-8 rounded-[2rem] bg-secondary/80 border-2 border-foreground/10 hover:border-primary/30 transition-all shadow-xl overflow-hidden">
      {isPrivate && (
        <div className="absolute top-4 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 h-fit">
          <Lock className="h-2.5 w-2.5 text-primary" />
          <span className="text-[8px] font-black text-primary uppercase">Secure</span>
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
        <p className="text-lg font-black text-foreground tracking-tight leading-tight">{value}</p>
      </div>
    </div >
  )
}

{/* TABS MODULES */ }

function CareerResumeModule() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-12">
        <SectionHeading title="Identity & Resume" subtitle="Professional Documentation" icon={FileCode} />

        {/* Resume Action Card - HIGH CONTRAST DARK */}
        <div className="p-10 rounded-[3rem] bg-secondary/90 border-2 border-foreground/10 text-foreground shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group/resume">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/resume:opacity-100 transition-opacity" />
          <div className="h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center mb-2 border-2 border-primary/20">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black tracking-tighter uppercase italic">Professional CV</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Updated: January 2026</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full relative z-10">
            <Button className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:scale-[1.02] shadow-xl border-none">
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button variant="outline" className="flex-1 h-14 rounded-2xl border-primary text-primary hover:bg-primary/10 hover:text-primary font-black uppercase tracking-widest transition-all">
              <Upload className="h-4 w-4 mr-2" /> Update
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <DarkCardField label="Designation" value={currentEmployee.role} icon={Briefcase} />
          <DarkCardField label="Business Unit" value={currentEmployee.department} icon={Building} />
        </div>
      </div>

      <div className="space-y-12">
        <SectionHeading
          title="Expertise Map"
          subtitle="Skillsets & Validations"
          icon={Award}
          action={
            <Button className="h-12 px-6 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              <Plus className="h-4 w-4 mr-2" /> Add Tech Stack
            </Button>
          }
        />
        <div className="space-y-10">
          <div className="flex flex-wrap gap-4">
            {currentEmployee.skills.map(skill => (
              <span key={skill} className="px-8 py-4 rounded-[1.5rem] bg-secondary border-2 border-foreground/10 text-xs font-black uppercase tracking-[0.2em] text-foreground hover:border-primary transition-all shadow-lg">
                {skill}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 py-2 border-b border-foreground/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Registered Certifications</span>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all flex items-center gap-1.5">
                <Plus className="h-3 w-3" /> New Certification
              </button>
            </div>
            <div className="grid gap-6">
              {currentEmployee.certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-secondary/80 border-2 border-foreground/10 group transition-all hover:bg-secondary hover:border-primary/50 shadow-xl">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                      <Award className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground tracking-tighter uppercase mt-1 tracking-widest">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

function DarkSecurityInput({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">{label}</label>
      <Input
        type="password"
        placeholder={placeholder}
        className="h-16 rounded-[2rem] bg-secondary border-2 border-foreground/10 focus:border-primary transition-all font-mono px-8 text-foreground"
      />
    </div>
  )
}