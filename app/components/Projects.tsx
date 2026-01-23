'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Code2, Brain, Database, Eye } from 'lucide-react';

const iconMap: any = {
  'Eye': Eye,
  'Brain': Brain,
  'Code2': Code2,
  'Database': Database,
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.projects) {
          setProjects(data.data.projects);
          // Extract unique categories
          const cats = ['All', ...new Set(data.data.projects.map((p: any) => p.category))];
          setCategories(cats as string[]);
        }
      })
      .catch(err => console.error('Failed to load projects:', err));
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Featured Projects
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Showcasing my expertise in AI/ML, from computer vision to RAG systems
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 dark:from-[#7c8cff] dark:to-[#b178ff] text-white dark:text-gray-900 shadow-lg'
                    : 'glass glass-hover text-gray-700 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const IconComponent = iconMap[project.icon] || Code2;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass glass-hover rounded-2xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 dark:from-[#7c8cff]/20 dark:to-[#b178ff]/20">
                        <IconComponent className="w-6 h-6 text-purple-600 dark:text-[#7c8cff]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-purple-600 dark:text-[#7c8cff]">
                          {project.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Key Technologies:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Achievements:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {project.achievements?.map((achievement: string, i: number) => (
                          <li key={i} className="line-clamp-1">{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {project.period}
                      </span>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
