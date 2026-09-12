import React from 'react';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { TopHeader } from '@/components/layout/TopHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex">
      {/* Desktop Left Sidebar */}
      <DesktopSidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pb-20 md:pb-8">
        {/* Top Header with metrics */}
        <TopHeader userXP={240} streakDays={7} planName="PRO" userName="Matheus" />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavigation />
    </div>
  );
}
