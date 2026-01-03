import { AppLayout } from "@/components/layout/AppLayout";

export default function Attendance() {
  return (
    <AppLayout title="Attendance">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 shadow-soft">
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Attendance Tracking</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Clock in and out, view your work hours, and track your attendance history. This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
