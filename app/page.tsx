import ClientLayout from './components/ClientLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gaurav Chaudhari',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-[#eef1fa] to-[#e4e8f6] dark:from-[#060a14] dark:via-[#080c18] dark:to-black relative overflow-hidden">
      {/* Animated liquid blobs background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#7c8cff]/18 to-[#c189ff]/18 dark:from-[#7282ff]/18 dark:to-[#b178ff]/18 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animate-pulse-glow"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-bl from-[#5b6bff]/16 to-[#a26cff]/16 dark:from-[#5764ff]/16 dark:to-[#9a61ff]/16 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animation-delay-2000 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-tr from-[#8ca2ff]/18 to-[#f0b5ff]/18 dark:from-[#8296ff]/18 dark:to-[#e3a7ff]/18 rounded-full mix-blend-multiply filter blur-3xl liquid-blob animation-delay-4000 animate-pulse-glow"></div>
      </div>
      <ClientLayout />
    </main>
  );
}
