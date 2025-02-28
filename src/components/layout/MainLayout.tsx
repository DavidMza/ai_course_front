import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils/cn';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6F7]">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      <main className={cn(
        "transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        {children}
      </main>
    </div>
  );
};