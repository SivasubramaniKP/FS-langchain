'use client';
import Image from "next/image";
import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import client components with ssr: false
const HeroSectionClient = dynamic(() => import('@/components/HeroSectionClient'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading hero section...</div>,
});

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading features...</div>,
});

const CoolnessSection = dynamic(() => import('@/components/CoolnessSection'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading awesomeness...</div>,
});

// Removed MemesSection dynamic import

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400 p-6">Loading footer...</div>,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HeroSectionClient />
      <FeaturesSection />
      <CoolnessSection />
      {/* Removed MemesSection */}
      <Footer />
    </div>
  );
}
