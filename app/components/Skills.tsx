'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Cpu, 
  Database, 
  Code2, 
  Container, 
  Layers,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Generative AI',
    icon: Sparkles,
    skills: [
      'LLM Fine-Tuning',
      'LoRA/QLoRA',
      'RAG',
      'LangChain',
      'CrewAI',
      'Prompt Engineering (CoT)',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    skills: [
      'PyTorch',
      'Transformers',
      'Scikit-Learn',
      'Vector Search (FAISS, ChromaDB)',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Multimodal AI',
    icon: MessageSquare,
    skills: [
      'VAPI',
      'Deepgram',
      'Sarvam AI',
      'TTS',
      'ASR',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Infrastructure & DevOps',
    icon: Container,
    skills: [
      'Python',
      'FastAPI',
      'Docker',
      'Kafka',
      'GCP',
      'GitHub Actions',
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Data & Databases',
    icon: Database,
    skills: [
      'SQL',
      'MongoDB',
      'Pandas',
      'NumPy',
    ],
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Technical Skills
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            A comprehensive toolkit for building cutting-edge AI solutions
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Also Proficient In
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['openAI API','Unsloth', 'NeML', 'PEFT', 'OpeanAI API', 'Linux'].map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
