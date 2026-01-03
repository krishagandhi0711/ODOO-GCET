import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  icon: Icon,
  children,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 hover-lift transition-all duration-300",
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>

      {/* Card Content */}
      <div>{children}</div>
    </div>
  );
}
