'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ChatbotUI = dynamic(() => import('@/components/ChatbotUI').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading chatbot...</div>,
});

const DocumentUploader = dynamic(() => import('@/components/DocumentUploader').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading document uploader...</div>,
});

const DashboardDisplay = dynamic(() => import('@/components/DashboardDisplay').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading dashboard...</div>,
});

export default function ChatbotPage() {
  const [dashboardChartPaths, setDashboardChartPaths] = useState<string[]>([]);

  const handleDashboardGenerated = (paths: string[]) => {
    setDashboardChartPaths(paths);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
      <aside className="w-full lg:w-1/3 p-4 bg-gray-900 border-r border-gray-700 overflow-y-auto space-y-8">
        <DocumentUploader onDashboardGenerated={handleDashboardGenerated} />
        {dashboardChartPaths.length > 0 && (
          <DashboardDisplay chartPaths={dashboardChartPaths} />
        )}
      </aside>
      <main className="flex-1 flex flex-col">
        <ChatbotUI />
      </main>
    </div>
  );
}
