import ClientLayout from './components/ClientLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Animated liquid blobs background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-500/15 dark:from-yellow-500/20 dark:to-amber-600/20 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animate-pulse-glow"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-bl from-pink-300/15 to-purple-400/15 dark:from-yellow-400/20 dark:to-yellow-600/20 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animation-delay-2000 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-pink-400/15 dark:from-amber-500/20 dark:to-yellow-500/20 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animation-delay-4000 animate-pulse-glow"></div>
      </div>
      <ClientLayout />
    </main>
  );
}
