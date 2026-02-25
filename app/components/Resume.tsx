'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function Resume() {
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => {
        setResumeFile(data.filename);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="resume" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading resume...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!resumeFile) {
    return null; // Don't render if no resume file found
  }

  return (
    <section id="resume" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
          >
            Resume
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl">
              <FileText className="w-16 h-16 mx-auto mb-6 text-purple-600 dark:text-[#a7b5ff]" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Download My Resume
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Get a detailed overview of my experience, skills, and achievements in AI/ML engineering.
              </p>
              <a
                href={`/resume/${resumeFile}`}
                download={resumeFile}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}