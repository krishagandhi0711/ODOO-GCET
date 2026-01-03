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
  Download
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
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left Column - Profile Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
              {/* Header Gradient */}
              <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-accent" />
              
              {/* Profile Info */}
              <div className="px-6 pb-6 -mt-12">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-soft-md border-4 border-card mx-auto">
                  {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
                </div>
                
                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold text-foreground">{currentEmployee.fullName}</h2>
                  <p className="text-muted-foreground mt-1">{currentEmployee.role}</p>
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

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Employee ID</div>
                  <div className="text-sm font-mono text-foreground bg-muted rounded-lg px-3 py-2">
                    {currentEmployee.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabbed Content */}
          <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-border overflow-x-auto">
              <div className="flex min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all duration-200",
                        activeTab === tab.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
      <div className="grid gap-6 sm:grid-cols-2">
        <InfoField label="Full Name" value={currentEmployee.fullName} icon={User} />
        <InfoField label="Date of Birth" value={new Date(currentEmployee.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} />
        <InfoField label="Gender" value={currentEmployee.gender} icon={User} />
        <InfoField label="Email" value={currentEmployee.email} icon={Mail} />
        <InfoField label="Phone" value={currentEmployee.phone} icon={Phone} />
        <InfoField label="Address" value={currentEmployee.address} icon={MapPin} className="sm:col-span-2" />
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-medium text-foreground mb-4">Emergency Contact</h3>
        <div className="grid gap-4 sm:grid-cols-3 p-4 rounded-lg bg-muted/30">
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
    </div>
  );
}

function ProfessionalTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <InfoField label="Employee ID" value={currentEmployee.id} icon={User} />
        <InfoField label="Job Title" value={currentEmployee.role} icon={Briefcase} />
        <InfoField label="Department" value={currentEmployee.department} icon={Building} />
        <InfoField label="Company" value={currentEmployee.company} icon={Users} />
        <InfoField label="Office Location" value={currentEmployee.office} icon={MapPin} />
        <InfoField label="Start Date" value={new Date(currentEmployee.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} />
        <InfoField label="Reports To" value={currentEmployee.manager} icon={User} />
        <InfoField label="Work Email" value={currentEmployee.email} icon={Mail} />
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {currentEmployee.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-medium text-foreground mb-4">Certifications</h3>
        <div className="space-y-3">
          {currentEmployee.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">Issued by {cert.issuer}</p>
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
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">Your employment documents are listed below.</p>
      {currentEmployee.documents.map((doc, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.type} • Added {doc.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      ))}
    </div>
  );
}

function PayrollTab() {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Payroll information is read-only. Contact HR for any changes.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <InfoField label="Annual Salary" value={currentEmployee.payroll.salary} icon={DollarSign} />
        <InfoField label="Pay Frequency" value={currentEmployee.payroll.payFrequency} icon={Calendar} />
        <InfoField label="Bank Name" value={currentEmployee.payroll.bankName} icon={Building} />
        <InfoField label="Account (Last 4)" value={`****${currentEmployee.payroll.accountLast4}`} icon={FileText} />
        <InfoField label="Tax ID" value={currentEmployee.payroll.taxId} icon={FileText} />
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  icon: typeof User;
  className?: string;
}

function InfoField({ label, value, icon: Icon, className }: InfoFieldProps) {
  return (
    <div className={cn("p-4 rounded-lg bg-muted/30", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
