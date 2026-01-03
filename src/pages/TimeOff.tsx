import { AppLayout } from "@/components/layout/AppLayout";

export default function TimeOff() {
  return (
    <AppLayout title="Time Off">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 shadow-soft">
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Time Off Requests</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Request vacation days, sick leave, and view your time off balance. This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
