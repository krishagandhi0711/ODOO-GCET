import React, { useState } from 'react';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    return stored === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden relative">
      {/* 1. Sidebar with Collapse Control */}
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {/* 2. Header (Adjusts position based on collapse) */}
      <Header
        title={title}
        isCollapsed={isCollapsed}
      />

      {/* 3. Main Content (Adjusts position based on collapse) */}
      <main
        className={`fixed top-16 right-0 bottom-0 overflow-y-auto scroll-smooth bg-background/50 transition-all duration-300 ${isCollapsed ? 'left-20' : 'left-64'
          }`}
      >
        <div className="min-h-full w-full p-4 md:p-6 pb-32 relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8b5cf61a_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf61a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          {/* Page Transition & Content */}
          <div className="page-enter space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}