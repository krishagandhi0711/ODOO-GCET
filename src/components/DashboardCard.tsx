import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, icon: Icon, children, className }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-6 shadow-soft",
        "hover:shadow-soft-md transition-all duration-300 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
