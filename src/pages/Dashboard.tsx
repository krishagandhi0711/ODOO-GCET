import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-1">Good morning, John</h2>
          <p className="text-muted-foreground">Here's what's happening today.</p>
        </div>

        {/* Placeholder content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Quick Clock-In", description: "Start your work day with one click" },
            { title: "Today's Schedule", description: "View your meetings and tasks" },
            { title: "Time Off Balance", description: "Check your remaining leave days" },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 shadow-soft hover:shadow-soft-md transition-shadow duration-300"
            >
              <h3 className="font-medium text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
              <div className="mt-4 h-24 rounded-lg bg-muted/50 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Coming soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
