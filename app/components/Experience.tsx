'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.experiences) {
          setExperiences(data.data.experiences);
        }
      })
      .catch(err => console.error('Failed to load experiences:', err));
  }, []);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-400 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff]"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                } md:w-1/2`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-6 ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} left-0 md:transform md:translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-[#7c8cff] dark:to-[#b178ff] border-4 border-purple-100 dark:border-slate-950 rounded-full z-10 shadow-lg`}></div>

                <div className="ml-8 md:ml-0 glass-card glass-card-hover p-6 rounded-2xl transition-all">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full glass text-purple-700 dark:text-[#c3d0ff] text-sm font-semibold">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {exp.company}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full glass text-purple-700 dark:text-purple-300 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {exp.position}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </p>
                  
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{exp.description}</p>
                  )}

                  <ul className="space-y-2 text-left">
                    {(exp.responsibilities || exp.achievements || []).map((item: string, i: number) => (
                      <li
                        key={i}
                        className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /(\d+%|<\d+ms|75%|92%)/g,
                            '<span class="font-semibold text-purple-600 dark:text-[#c3d0ff]">$1</span>'
                          ),
                        }}
                      />
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
