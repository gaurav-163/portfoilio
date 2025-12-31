'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ExternalLink, Github, Code2, Brain, Database, Eye } from 'lucide-react';

const projects = [
  {
    title: 'CavSpot: Deep Learning Diagnostic System',
    category: 'Computer Vision',
    icon: Eye,
    description: 'End-to-end dental cavity detection pipeline using Vision Transformers (ViT) trained on 90K X-rays',
    technologies: ['PyTorch', 'ViT', 'Computer Vision', 'FastAPI', 'Docker'],
    achievements: [
      'Developed pipeline achieving 0.04 IoU on test set',
      'Optimized inference for edge deployment with <200ms latency',
      'Added Grad-CAM for explainability'
    ],
    period: 'Jun 2024 - Mar 2025',
    github: 'https://github.com/gaurav-chaudhari-gc',
  },
  {
    title: 'Mira: Knowledge-Based RAG Assistant',
    category: 'RAG / LangChain',
    icon: Brain,
    description: 'Domain-semantic RAG pipeline utilizing hybrid search (Dense + Keyword) to retrieve context from unstructured PDFs and handwritten notes',
    technologies: ['ChromaDB', 'LangChain', 'Hybrid Search', 'OCR'],
    achievements: [
      'Engineered Dense + Keyword hybrid search',
      'Integrated Cross-Encoder Reranking to filter context',
      'Reduced hallucination by ensuring high context relevance',
      'Deployed retrieval microservice using FastAPI with <100ms latency'
    ],
    period: 'Jan 2025 - Feb 2025',
    github: 'https://github.com/gaurav-chaudhari-gc',
  },
  {
    title: 'Real-Time Sentiment Analyzer',
    category: 'NLP / REST API',
    icon: Code2,
    description: 'Fine-tuned RoBERTa on 50K tweets for multi-class sentiment analysis',
    technologies: ['RoBERTa', 'NLP', 'REST API'],
    achievements: [
      'Achieved 92% accuracy',
      'Deployed via scalable REST API'
    ],
    period: 'Apr 2023 - Oct 2023',
    github: 'https://github.com/gaurav-chaudhari-gc',
  },
];

const categories = ['All', 'Computer Vision', 'RAG / LangChain', 'NLP / REST API'];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
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
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
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
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                      </div>
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-3">
                      {project.category}
                    </span>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, i) => (
                          <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {project.period}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
