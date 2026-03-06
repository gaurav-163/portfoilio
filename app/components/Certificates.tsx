'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';

const certificates = [
  {
    title: 'Fundamentals of MCP',
    issuer: 'Anthropic',
    url: 'https://cas-bridge.xethub.hf.co/xet-bridge-us/682f5d0ff0af4dc8a20649c1/c6cfc5d9575c4c04c7a6c6801d47b97bb9eeb18b0c7f23cedb483d4acdae916d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cas%2F20260306%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260306T062418Z&X-Amz-Expires=3600&X-Amz-Signature=74be25d3ebcc21ad86250af0e63f7a776613475bf50d16b37c056c078b776d7e&X-Amz-SignedHeaders=host&X-Xet-Cas-Uid=68db800eba90f84409e5c7ba&response-content-disposition=inline%3B+filename*%3DUTF-8%27%272026-01-28.png%3B+filename%3D%222026-01-28.png%22%3B&response-content-type=image%2Fpng&x-amz-checksum-mode=ENABLED&x-id=GetObject&Expires=1772781858&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3Mjc4MTg1OH19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2FzLWJyaWRnZS54ZXRodWIuaGYuY28veGV0LWJyaWRnZS11cy82ODJmNWQwZmYwYWY0ZGM4YTIwNjQ5YzEvYzZjZmM1ZDk1NzVjNGMwNGM3YTZjNjgwMWQ0N2I5N2JiOWVlYjE4YjBjN2YyM2NlZGI0ODNkNGFjZGFlOTE2ZCoifV19&Signature=cFIWdNbKUJKUrZ2IUd4sYnBF4Yfa1BxFcCPI4Q1qsEw-yGt%7E%7EjdmrbcBXj9oWUrtOz9keTB44oDKEA1II10TQUVDm1DbsMwQw1GMlQpVUE43k-mo%7Ew1Agi0ouXbfNzPldJZgYX%7E9lrWjentdiWEpFsYAVuFFZ4RJcyosWMB7m4c-s0wsQUfqSVh58I14jgLCN45FkaKrisP26-qN1S4j4iyHsl1ZA4FGwwtegQC2P8YE%7EIpkTPM8RRYN-Sw2oCM8h9L0S%7EkkZ33FCaqMvzH9LvOFSGgBnoVWFlp1s63ctEn9gI2izyP5bfe9aQN5BCk5WlBILFWHqolDA-gUL%7E1eaQ__&Key-Pair-Id=K2L8F4GPSG1IFC',
    category: 'AI / Agents',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia · Forage',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_7P3knrMbPmSrZKbq7_1744901977336_completion_certificate.pdf',
    category: 'Data Analytics',
  },
  {
    title: 'Data Analyst Certification',
    issuer: 'OneRoadmap',
    url: 'https://oneroadmap.io/skills/da/certificate/CERT-6E91CE95',
    category: 'Data Analytics',
  },
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    url: 'https://api.badgr.io/public/assertions/l5Q9FahyTwmXIF7NqVXWYA',
    category: 'API / Development',
  },
  {
    title: 'Introduction to Statistics',
    issuer: 'Stanford University · Coursera',
    url: 'https://www.coursera.org/account/accomplishments/records/LLXMVLXX367R',
    category: 'Data Science',
  },
  {
    title: 'Generative AI with Large Language Models',
    issuer: 'Coursera · DeepLearning.AI',
    url: 'https://www.coursera.org/account/accomplishments/records/MGDEX5EFWV7D',
    category: 'AI / LLMs',
    date: 'July 2024',
  },
  {
    title: 'Building Deep Learning Models with TensorFlow',
    issuer: 'IBM · Coursera',
    url: 'https://www.coursera.org/account/accomplishments/records/ARELECTG9XCY',
    category: 'Deep Learning',
  },
  {
    title: 'Introduction to Deep Learning & Neural Networks with Keras',
    issuer: 'IBM · Coursera',
    url: 'https://www.coursera.org/account/accomplishments/records/YBAZAPBGTAE9',
    category: 'Deep Learning',
  },
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM · Coursera',
    url: 'https://coursera.org/share/c570a149a8dd10d40c0fa7e25b9be913',
    category: 'Machine Learning',
  },
  {
    title: 'Python and Artificial Intelligence',
    issuer: 'AWS Community · DevTown',
    url: 'https://cert.devtown.in/verify/Z18PbnO',
    category: 'AI / Python',
  },
];

const categories = ['All', 'AI / LLMs', 'Deep Learning', 'Machine Learning', 'Data Analytics', 'Data Science', 'API / Development', 'AI / Agents', 'AI / Python'];

export default function Certificates() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeCategory);

  return (
    <section id="certificates" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Certificates
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Professional certifications and course completions across AI, ML, and data disciplines
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 text-sm ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] text-white dark:text-gray-900 shadow-lg'
                    : 'glass glass-hover text-gray-700 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border-0 group transition-all flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-[#c3d0ff] transition-colors mt-1" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full glass text-purple-700 dark:text-[#c3d0ff] text-xs font-semibold mb-2">
                    {cert.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-[#c3d0ff] transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
