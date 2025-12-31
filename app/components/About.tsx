'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, TrendingUp } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Transforming Ideas into Intelligent Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                I'm a passionate Software Engineer at <span className="font-semibold text-primary-600 dark:text-primary-400">Anvex AI</span>, 
                specializing in cutting-edge AI/ML technologies. With expertise in building high-performance inference 
                microservices using FastAPI and Docker, I've successfully reduced model latency by up to 
                <span className="font-semibold text-primary-600 dark:text-primary-400"> 2300ms</span> for real-time interactions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                My work spans across various AI domains including <span className="font-semibold">LLM Fine-Tuning</span>, 
                <span className="font-semibold"> RAG systems</span>, <span className="font-semibold">Voice AI</span>, and 
                <span className="font-semibold"> Computer Vision</span>. I've implemented server-grade RAG systems that 
                increased extraction accuracy by <span className="font-semibold text-primary-600 dark:text-primary-400">75%</span> 
                and fine-tuned models achieving <span className="font-semibold text-primary-600 dark:text-primary-400">92% accuracy</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Currently pursuing my B.E. in <span className="font-semibold">Artificial Intelligence and Data Science</span> 
                from New Horizon Institute, I'm constantly pushing the boundaries of what's possible with AI, 
                having won 1st place in a LLM Fine-Tuning Hackathon.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Professional Impact</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Reduced agent response time by building moderate-grade RAG systems and optimized 
                      inference pipelines. Designed 20+ Chain-of-Thought prompts ensuring deterministic AI behavior.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Achievements</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      🏆 1st Place - LablabAI Fine-Tuning Hackathon (LLM Optimization)
                      <br />
                      🎓 Head Technical Secretary, Student Association
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Continuous Learning</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      📚 DeepLearning.AI - Generative AI with Large Language Models
                      <br />
                      📚 Stanford/Coursera - Machine Learning Specialization
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
