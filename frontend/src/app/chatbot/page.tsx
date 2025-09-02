'use client';

import dynamic from 'next/dynamic';

const ChatbotUI = dynamic(() => import('@/components/ChatbotUI').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading chatbot...</div>,
});

export default function ChatbotPage() {
  return <ChatbotUI />;
}
