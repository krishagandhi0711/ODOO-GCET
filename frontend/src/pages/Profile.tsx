import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentEmployee } from "@/data/mockData";
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
  Clock
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
                    {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500/30 dark:bg-emerald-500/20 border-2 border-emerald-500/40 dark:border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold text-foreground">{currentEmployee.fullName}</h2>
                  <p className="text-muted-foreground mt-1">{currentEmployee.role}</p>

                  {/* Status Chip */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/30 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 dark:bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      Full Time
                    </span>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="mt-6 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Profile Completion</span>
                    <span className="text-xs font-semibold text-foreground">92%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Complete your skills section</p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{currentEmployee.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{currentEmployee.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{currentEmployee.office}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5">
                  <div className="text-xs text-muted-foreground mb-2">Employee ID</div>
                  <div className="text-sm font-mono text-foreground bg-slate-100/80 dark:bg-slate-800/30 rounded-lg px-3 py-2 border border-slate-200 dark:border-white/5">
                    {currentEmployee.id}
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
              {activeTab === "personal" && <PersonalTab />}
              {activeTab === "professional" && <ProfessionalTab />}
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

function PersonalTab() {
  return (
    <div className="space-y-6">
      {/* Public Information Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-foreground">Public Information</h3>
          <span className="text-xs text-muted-foreground">• Visible to team members</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField label="Full Name" value={currentEmployee.fullName} icon={User} />
          <InfoField label="Email" value={currentEmployee.email} icon={Mail} />
          <InfoField label="Phone" value={currentEmployee.phone} icon={Phone} />
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
          <InfoField label="Date of Birth" value={new Date(currentEmployee.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} isPrivate />
          <InfoField label="Gender" value={currentEmployee.gender} icon={User} isPrivate />
          <InfoField label="Address" value={currentEmployee.address} icon={MapPin} className="sm:col-span-2" isPrivate />
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

function ProfessionalTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoField label="Employee ID" value={currentEmployee.id} icon={User} />
        <InfoField label="Job Title" value={currentEmployee.role} icon={Briefcase} />
        <InfoField label="Department" value={currentEmployee.department} icon={Building} />
        <InfoField label="Company" value={currentEmployee.company} icon={Users} />
        <InfoField label="Office Location" value={currentEmployee.office} icon={MapPin} />
        <InfoField label="Start Date" value={new Date(currentEmployee.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} />
        <InfoField label="Reports To" value={currentEmployee.manager} icon={User} />
        <InfoField label="Work Email" value={currentEmployee.email} icon={Mail} />
      </div>

      {/* Last Updated */}
      <div className="pt-4 flex items-center gap-2 text-xs text-muted-foreground border-t border-slate-200 dark:border-white/5">
        <Clock className="h-3 w-3" />
        <span>Last updated: January 2, 2025</span>
      </div>
    </div>
  );
}

function SkillsTab() {
  const skillLevels = ["Advanced", "Intermediate", "Advanced", "Intermediate", "Advanced"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Technical Skills</h3>
        <div className="space-y-2">
          {currentEmployee.skills.map((skill, index) => (
            <div key={skill} className="flex items-center justify-between p-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <span className="text-sm font-medium text-foreground">{skill}</span>
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                skillLevels[index] === "Advanced"
                  ? "bg-emerald-500/20 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20"
                  : "bg-blue-500/20 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/20"
              )}>
                {skillLevels[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-white/5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Certifications</h3>
        <div className="space-y-3">
          {currentEmployee.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{cert.name}</p>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Issued by {cert.issuer}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{cert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsTab() {
  const documentStatuses = ["Verified", "Verified", "Pending", "Verified"];
  const documentSizes = ["2.4 MB", "1.8 MB", "3.1 MB", "890 KB"];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">Your employment documents are listed below.</p>
      {currentEmployee.documents.map((doc, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-lg bg-red-500/20 dark:bg-red-500/10 border border-red-500/30 dark:border-red-500/20 flex items-center justify-center">
              <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1",
                  documentStatuses[index] === "Verified"
                    ? "bg-emerald-500/20 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20"
                    : "bg-amber-500/20 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/20"
                )}>
                  {documentStatuses[index] === "Verified" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {documentStatuses[index]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{doc.type} • {documentSizes[index]} • Added {doc.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-200 dark:hover:bg-slate-700/50">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      ))}
    </div>
  );
}

function PayrollTab() {
  const [showSensitive, setShowSensitive] = useState(false);

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

      {/* Blur Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5">
        <span className="text-sm text-muted-foreground">Show sensitive data</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSensitive(!showSensitive)}
          className="gap-2"
        >
          {showSensitive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showSensitive ? "Hide" : "Show"}
        </Button>
      </div>

      <div className={cn("grid gap-4 sm:grid-cols-2 transition-all duration-300", !showSensitive && "blur-sm pointer-events-none select-none")}>
        <InfoField label="Annual Salary" value={currentEmployee.payroll.salary} icon={DollarSign} isPrivate />
        <InfoField label="Pay Frequency" value={currentEmployee.payroll.payFrequency} icon={Calendar} />
        <InfoField label="Bank Name" value={currentEmployee.payroll.bankName} icon={Building} isPrivate />
        <InfoField label="Account (Last 4)" value={`****${currentEmployee.payroll.accountLast4}`} icon={FileText} isPrivate />
        <InfoField label="Tax ID" value={currentEmployee.payroll.taxId} icon={FileText} isPrivate />
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