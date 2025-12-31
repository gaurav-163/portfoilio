export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading portfolio...</p>
      </div>
    </div>
  );
}
