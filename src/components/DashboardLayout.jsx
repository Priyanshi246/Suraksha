import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '../lib/utils';

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={cn(
          "flex-1 transition-all duration-300 p-4 lg:p-6",
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
