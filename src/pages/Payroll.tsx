import { AppLayout } from "@/components/layout/AppLayout";
import { Lock } from "lucide-react";

export default function Payroll() {
  return (
    <AppLayout title="Payroll">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 shadow-soft">
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Admin Access Required</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Payroll management is restricted to HR administrators. Contact your HR team if you need access.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
