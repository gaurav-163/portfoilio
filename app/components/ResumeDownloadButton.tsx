'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function ResumeDownloadButton() {
  const [resumePath, setResumePath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resume/active')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.resume) {
          setResumePath(data.resume.path);
        }
      })
      .catch(error => {
        console.error('Failed to fetch active resume:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <button
        disabled
        className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-gray-400 cursor-not-allowed opacity-50"
      >
        <Download className="w-5 h-5 mr-2" />
        Loading...
      </button>
    );
  }

  if (!resumePath) {
    return null; // Don't show button if no resume is available
  }

  return (
    <a
      href={resumePath}
      download
      className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] dark:text-gray-900 hover:shadow-glow-lg transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm"
    >
      <Download className="w-5 h-5 mr-2" />
      Download Resume
    </a>
  );
}
