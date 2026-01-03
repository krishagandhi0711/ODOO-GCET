import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentEmployee } from "@/data/mockData";
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
  Fingerprint,
  FileCode,
  Upload,
  Plus
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
  const [activeTab, setActiveTab] = useState("resume");
  const [showSalary, setShowSalary] = useState(false);

  return (
    <AppLayout title="Employee Profile">
      <div className="max-w-[1400px] mx-auto space-y-12 pb-20 px-4">

        {/* SECTION 1: Ethereal Profile Hero */}
        <section className="relative pt-20 pb-12 px-8 rounded-[3rem] border-2 border-primary/20 overflow-hidden group bg-secondary/30">
          {/* Kinetic background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.08] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            {/* Main Avatar Hub */}
            <div className="relative">
              <div className="h-40 w-40 rounded-[3.5rem] bg-gradient-to-tr from-foreground to-foreground/80 p-[3px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105">
                <div className="h-full w-full rounded-[3.4rem] bg-background flex items-center justify-center text-foreground text-5xl font-black tracking-tighter overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
                </div>
              </div>

              <div className="absolute -right-2 bottom-4 h-12 w-12 rounded-2xl bg-primary border-2 border-background flex items-center justify-center shadow-2xl animate-bounce-slow text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-primary/30">
                <Fingerprint className="h-4 w-4" />
                Verified Corporate Talent
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

          {/* Master Content Container */}
          <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeTab === "resume" && <CareerResumeModule />}
            {activeTab === "private" && <PersonalInformationModule />}
            {activeTab === "salary" && <CompensationIntelligenceModule showSalary={showSalary} setShowSalary={setShowSalary} />}
            {activeTab === "security" && <SecurityProtocolModule />}
          </div>
        </section>

      </div>
    </AppLayout>
  );
}

{/* SUB-COMPONENTS - HIGH CONTRAST DARK MODE */ }

function HeaderMetric({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="p-6 rounded-[2rem] bg-secondary/80 border-2 border-foreground/10 hover:border-primary/50 transition-all group/metric text-left shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-4 w-4 text-primary group-hover/metric:scale-110 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className="text-base font-black text-foreground truncate">{value}</p>
    </div>
  )
}

function SectionHeading({ title, subtitle, icon: Icon, action }: { title: string, subtitle: string, icon: any, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
      <div className="flex items-center gap-5">
        <div className="h-16 w-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase leading-none">{title}</h2>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-1">{subtitle}</p>
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
      )}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-4 w-4 text-primary opacity-80 group-hover/field:opacity-100 group-hover/field:scale-110 transition-all" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
        </div>
        <p className="text-lg font-black text-foreground tracking-tight leading-tight">{value}</p>
      </div>
    </div>
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

function PersonalInformationModule() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-12">
        <SectionHeading title="Identity Vault" subtitle="Private Personal Metics" icon={Lock} />
        <div className="grid sm:grid-cols-2 gap-6">
          <DarkCardField label="Legal DOB" value={new Date(currentEmployee.dateOfBirth).toLocaleDateString()} icon={Calendar} isPrivate />
          <DarkCardField label="Gender Identity" value={currentEmployee.gender} icon={User} />
          <div className="sm:col-span-2">
            <DarkCardField label="Registered Address" value={currentEmployee.address} icon={MapPin} isPrivate />
          </div>
        </div>

        <div className="p-10 rounded-[3rem] bg-secondary border-2 border-primary/20 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-black text-foreground uppercase tracking-tight">Emergency Dispatch</h4>
          </div>
          <div className="grid sm:grid-cols-3 gap-10 relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Contact Name</span>
              <p className="text-base font-black text-foreground uppercase tracking-tight">{currentEmployee.emergencyContact.name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Affiliation</span>
              <p className="text-base font-black text-foreground uppercase tracking-tight">{currentEmployee.emergencyContact.relationship}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Direct Line</span>
              <p className="text-base font-black text-primary underline decoration-2 underline-offset-4">{currentEmployee.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <SectionHeading title="Documentation" subtitle="Verified Legal Archives" icon={FileText} />
        <div className="grid gap-6">
          {currentEmployee.documents.map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-secondary/80 border-2 border-foreground/10 hover:border-primary/40 transition-all group shadow-xl">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-lg font-black text-foreground tracking-tight uppercase">{doc.name}</p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{doc.type} • Added {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all border border-foreground/5">
                <Download className="h-6 w-6" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompensationIntelligenceModule({ showSalary, setShowSalary }: { showSalary: boolean, setShowSalary: (s: boolean) => void }) {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <SectionHeading title="Compensation" subtitle="Financial Reward Structure" icon={DollarSign} />
        <Button
          onClick={() => setShowSalary(!showSalary)}
          className={cn(
            "h-16 px-10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl",
            showSalary ? "bg-secondary text-foreground border-2 border-foreground/10" : "bg-primary text-white shadow-primary/40 scale-105"
          )}
        >
          {showSalary ? <EyeOff className="h-5 w-5 mr-3" /> : <Eye className="h-5 w-5 mr-3" />}
          {showSalary ? "Obfuscate Figures" : "Verify Financials"}
        </Button>
      </div>

      {!showSalary ? (
        <div className="h-[28rem] w-full rounded-[4rem] border-2 border-primary/20 bg-secondary/80 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
          <div className="h-24 w-24 rounded-[2.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 relative z-10">
            <Lock className="h-12 w-12" />
          </div>
          <div className="space-y-4 relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Encrypted Financial Vault</h3>
            <p className="text-base text-muted-foreground font-bold max-w-sm uppercase tracking-widest leading-relaxed">Identity verification required to process compensation metrics.</p>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 fade-in duration-700 space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <DarkCardField label="Gross Annual Salary" value={currentEmployee.payroll.salary} icon={DollarSign} isPrivate />
            <DarkCardField label="Disbursement Cycle" value={currentEmployee.payroll.payFrequency} icon={Calendar} />
            <DarkCardField label="Deposit Institution" value={currentEmployee.payroll.bankName} icon={Building} />
            <DarkCardField label="Corporate Tax ID" value={currentEmployee.payroll.taxId} icon={FileText} isPrivate />
          </div>

          <div className="p-12 rounded-[4rem] border-2 border-foreground/10 bg-secondary/60 backdrop-blur-xl shadow-2xl text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-12">Institutional Benefit Structure</h4>
            <div className="grid sm:grid-cols-3 gap-16">
              <div className="space-y-3">
                <span className="text-5xl font-black tracking-tighter text-foreground">$50,000</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Base Allocation</p>
              </div>
              <div className="space-y-3">
                <span className="text-5xl font-black tracking-tighter text-foreground">$20,000</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard Allowances</p>
              </div>
              <div className="space-y-3">
                <span className="text-5xl font-black tracking-tighter text-primary font-black">$15,000</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Performance Variable</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SecurityProtocolModule() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <SectionHeading title="Access Protocol" subtitle="Security Credential Matrix" icon={Shield} />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="grid gap-6">
            <DarkSecurityInput label="Primary Authentication Key" placeholder="Current sequence..." />
            <DarkSecurityInput label="Define New Access Key" placeholder="Min 12 alphanumeric..." />
            <DarkSecurityInput label="Confirm New Access Key" placeholder="Re-enter to validate..." />
          </div>
          <Button className="w-full h-16 rounded-[2rem] font-black text-xs uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
            Rotate Access Tokens
          </Button>
        </div>

        <div className="p-12 rounded-[4rem] bg-foreground text-background shadow-2xl flex flex-col justify-between relative overflow-hidden group/mfa">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover/mfa:opacity-100 transition-opacity" />
          <div className="space-y-8 relative z-10">
            <div className="h-20 w-20 rounded-[2rem] bg-background/10 flex items-center justify-center shadow-xl">
              <Fingerprint className="h-10 w-10 text-background" />
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-black tracking-tighter uppercase italic">MFA Hardened Perimeter</h4>
              <p className="text-sm font-bold opacity-70 leading-relaxed uppercase tracking-widest">
                Enforce an additional cryptographic layer for all authentication requests.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full h-16 rounded-[2rem] border-background/20 text-background font-black text-xs uppercase tracking-widest mt-12 hover:bg-background/10 transition-all relative z-10">
            Configure Protocol
          </Button>
        </div>
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