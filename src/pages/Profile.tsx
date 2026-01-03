import { AppLayout } from "@/components/layout/AppLayout";

export default function Profile() {
  return (
    <AppLayout title="My Profile">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/50 p-8 relative">
            <div className="flex items-end gap-6">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-soft-md border-4 border-card">
                JD
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">John Doe</h2>
                <p className="text-muted-foreground">Senior Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: "Employee ID", value: "EMP-2024-001" },
                { label: "Email", value: "john.doe@company.com" },
                { label: "Department", value: "Engineering" },
                { label: "Manager", value: "Jane Smith" },
                { label: "Office Location", value: "San Francisco, CA" },
                { label: "Start Date", value: "January 15, 2024" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
