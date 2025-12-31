'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'Anvex AI',
    role: 'Software Engineer ML',
    location: 'Vashi, India',
    period: 'Sept 2025 - Present',
    achievements: [
      'Architected high-performance inference microservices using FastAPI on Docker, reducing model latency by <2300ms for real-time interaction.',
      'Engineered BoundVoice: a scalable voice agent pipeline integrating VAPI SDK and SIP Trunking to manage concurrent telephony streams with dynamic context injection.',
      'Implemented server-grade RAG system with referencing for LLM outputs, increasing structured data extraction accuracy by 75% and eliminating hallucinated fields.',
      'Built Anvex Voice: a moderate-grade RAG with context in real-time, reducing agent response time during live calls.',
      'Fine-tuned SLMs and NVIDIA Parakeet TTS models on proprietary datasets, optimizing inference cost and reducing Word Error Rate (WER) for domain vocabulary.',
    ],
  },
  {
    company: 'Anvex AI',
    role: 'AI Engineer Intern',
    location: 'Vashi, India',
    period: 'Jul 2025 - Sept 2025',
    achievements: [
      'Designed and evaluated 20+ Chain-of-Thought (CoT) prompt templates, ensuring deterministic behavior for enterprise-facing AI agents.',
      'Optimized conversational workflows using user-level analytics, achieving a 30% uplift in engagement and a 15% reduction in call drop-offs.',
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
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
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>

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
                <div className={`absolute top-6 ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} left-0 md:transform md:translate-x-1/2 w-4 h-4 bg-primary-600 border-4 border-white dark:border-gray-900 rounded-full z-10`}></div>

                <div className="ml-8 md:ml-0 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {exp.company}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </p>

                  <ul className="space-y-2 text-left">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: achievement.replace(
                            /(\d+%|<\d+ms|75%|92%)/g,
                            '<span class="font-semibold text-primary-600 dark:text-primary-400">$1</span>'
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
