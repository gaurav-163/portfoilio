"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// LinkedIn's script reads the data attributes once on mount.
// To switch themes, we force a remount by changing the React key.
export default function LinkedInBadge() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const profileUrl = "https://in.linkedin.com/in/gaurav-chaudhari-gc?trk=profile-badge";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Poll until LinkedIn's render function is available
    let tries = 0;
    const interval = setInterval(() => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.LIRenderAll) {
        setScriptReady(true);
        clearInterval(interval);
        // @ts-ignore
        window.LIRenderAll();
      }
      if (++tries > 40) {
        clearInterval(interval); // stop after ~4s
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Re-render the badge when theme changes
    if (scriptReady) {
      try {
        // @ts-ignore
        window.LIRenderAll && window.LIRenderAll();
      } catch {}
    }
  }, [theme, scriptReady]);

  if (!mounted) return null;

  const dataTheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="max-w-sm mx-auto">
      <div className="glass glass-hover rounded-2xl border-2 border-white/20 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-purple-600 dark:text-[#c3d0ff]" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">LinkedIn Profile</span>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] text-white dark:text-gray-900 hover:shadow-glow-lg transition-all"
          >
            Follow
          </a>
        </div>

        {!scriptReady && (
          <div className="h-64 rounded-xl bg-white/10 dark:bg-white/5 animate-pulse" />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={dataTheme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={scriptReady ? "" : "hidden"}
          >
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="medium"
              data-theme={dataTheme}
              data-type="VERTICAL"
              data-vanity="gaurav-chaudhari-gc"
              data-version="v1"
            >
              <a className="badge-base__link LI-simple-link" href={profileUrl}>
                Gaurav Chaudhari
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] text-white dark:text-gray-900 hover:shadow-glow-lg transition-all"
          >
            <Linkedin className="w-4 h-4 mr-2" /> View on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
