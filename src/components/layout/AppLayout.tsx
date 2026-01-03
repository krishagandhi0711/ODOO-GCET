import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
      {/* 1. Fixed Left Sidebar (Full Height, Z-50) */}
      <Sidebar />

      {/* 2. Fixed Top Navbar (Offset by Sidebar Width, Z-40) */}
      <Header title={title} />

      {/* 3. Independent Scrollable Main Content Area - FIXED positioning */}
      <main className="fixed top-16 left-64 right-0 bottom-0 overflow-y-auto scroll-smooth bg-background/50">
        <div className="container mx-auto p-8 max-w-7xl min-h-full pb-20">
          {/* Page Transition & Content */}
          <div className="page-enter space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}