import { cn } from "@/lib/utils";

type StatusType = "present" | "absent" | "leave" | "holiday" | "weekend" | "pending" | "approved" | "rejected";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  present: {
    label: "Present",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  },
  absent: {
    label: "Absent",
    className: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20",
  },
  leave: {
    label: "On Leave",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
  holiday: {
    label: "Holiday",
    className: "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/20",
  },
  weekend: {
    label: "Weekend",
    className: "bg-muted text-muted-foreground border-border",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-full transition-colors",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
