import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Plus,
  X,
  Briefcase,
  Heart,
  User,
  Clock,
  CalendarDays,
  Loader2,
  ChevronDown,
  History,
  Info
} from "lucide-react";
import { leaveBalance, leaveHistory, leaveTypes } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function TimeOff() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <AppLayout title="Time Off Management">
      <div className="max-w-[1200px] mx-auto space-y-8 pb-16 px-4">

        {/* Section 1: Allocation Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <LeaveBalanceCard
            title="Paid Annual Leave"
            used={leaveBalance.paidLeave.used}
            total={leaveBalance.paidLeave.total}
            icon={Briefcase}
            isPrimary
          />
          <LeaveBalanceCard
            title="Sick & Medical"
            used={leaveBalance.sickLeave.used}
            total={leaveBalance.sickLeave.total}
            icon={Heart}
          />
          <LeaveBalanceCard
            title="Personal Leave"
            used={leaveBalance.personalLeave.used}
            total={leaveBalance.personalLeave.total}
            icon={User}
          />
        </div>

        {/* Section 2: Actions & History */}
        <div className="bg-secondary rounded-[2.5rem] border border-foreground/10 shadow-xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-foreground/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">Request Archive</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase">Historical Leave Tracking</p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Initiate Request
            </Button>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead>
                <tr className="bg-foreground/5 text-muted-foreground">
                  <Th label="Classification" />
                  <Th label="Duration Range" />
                  <Th label="Units" />
                  <Th label="Condition/Reason" />
                  <Th label="Status" />
                  <Th label="Timestamp" className="text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {leaveHistory.map((leave, index) => (
                  <tr
                    key={leave.id}
                    className="group hover:bg-primary/[0.02] transition-colors animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-foreground uppercase">{leave.type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-80">
                        {formatDate(leave.startDate)}
                        {leave.startDate !== leave.endDate && (
                          <span className="mx-2 text-primary">—</span>
                        )}
                        {leave.startDate !== leave.endDate && formatDate(leave.endDate)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-foreground">{leave.days} <span className="text-[10px] text-muted-foreground">DAYS</span></span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-medium text-muted-foreground max-w-[200px] truncate block italic">
                        "{leave.reason}"
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={leave.status as any} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-[10px] font-black text-muted-foreground uppercase opacity-60 italic">{formatDate(leave.appliedOn)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <ApplyLeaveModal onClose={() => setIsModalOpen(false)} />
      )}
    </AppLayout>
  );
}

{/* REFINED ATOMS */ }

function LeaveBalanceCard({ title, used, total, icon: Icon, isPrimary }: { title: string, used: number, total: number, icon: any, isPrimary?: boolean }) {
  const remaining = total - used;
  const percentage = (remaining / total) * 100;

  return (
    <div className="p-8 rounded-[2.5rem] bg-secondary border border-foreground/10 hover:border-primary/20 transition-all group shadow-lg flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-3 shadow-xl",
          isPrimary ? "bg-primary text-white" : "bg-foreground text-background"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{Math.round(percentage)}% SECURE</span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-end justify-between">
          <p className="text-4xl font-black text-foreground tracking-tighter">{remaining}</p>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">REMAINING / {total}</p>
        </div>

        <div className="space-y-2">
          <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-1000", isPrimary ? "bg-primary" : "bg-foreground")}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs font-black text-foreground uppercase tracking-tight italic">{title}</p>
        </div>
      </div>
    </div>
  )
}

function Th({ label, className }: { label: string, className?: string }) {
  return (
    <th className={cn("px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]", className)}>
      {label}
    </th>
  )
}

function ApplyLeaveModal({ onClose }: ApplyLeaveModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    remarks: "",
  });

  const selectedType = leaveTypes.find(t => t.value === formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl animate-fade-in" onClick={onClose} />

      <div className="relative bg-secondary rounded-[3rem] border border-foreground/10 shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-10 border-b border-foreground/5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20">
              <CalendarDays className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase italic leading-none">Leave Protocol</h2>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Institutional Request Unit</p>
            </div>
          </div>
          <button onClick={onClose} className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Action Body */}
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Classification Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-full h-16 px-8 rounded-2xl bg-background/50 border border-foreground/10 flex items-center justify-between group transition-all focus:border-primary/50"
              >
                <span className={cn("text-xs font-black uppercase tracking-widest", formData.type ? "text-foreground" : "text-muted-foreground")}>
                  {selectedType?.label || "Select Protocol Type"}
                </span>
                <ChevronDown className={cn("h-4 w-4 text-primary transition-transform", isTypeOpen && "rotate-180")} />
              </button>
              {isTypeOpen && (
                <div className="absolute z-50 top-full inset-x-0 mt-3 bg-secondary border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, type: type.value });
                        setIsTypeOpen(false);
                      }}
                      className="w-full text-left px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all border-b border-foreground/5 last:border-none"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Deployment Start</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="h-16 rounded-2xl bg-background/50 border border-foreground/10 px-8 text-xs font-black uppercase tracking-widest"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Deployment End</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="h-16 rounded-2xl bg-background/50 border border-foreground/10 px-8 text-xs font-black uppercase tracking-widest"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Mission Justification</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Provide detailed reasoning for this absence request..."
              className="w-full h-32 rounded-2xl bg-background/50 border border-foreground/10 p-8 text-xs font-bold text-foreground resize-none focus:outline-none focus:border-primary/50 transition-all"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={onClose} variant="ghost" className="flex-1 h-16 rounded-2xl text-[10px] font-black uppercase tracking-widest">
              Abstain
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.type || !formData.startDate || !formData.endDate}
              className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authorize Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ApplyLeaveModalProps {
  onClose: () => void;
}
