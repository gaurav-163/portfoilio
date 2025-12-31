import ClientLayout from './components/ClientLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ClientLayout />
    </main>
  );
}
