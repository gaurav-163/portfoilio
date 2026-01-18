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
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Transforming Ideas into Intelligent Solutions
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate Software Engineer at <span className="font-semibold text-purple-600 dark:text-yellow-400">Anvex AI</span>, 
                specializing in cutting-edge AI/ML technologies. With expertise in building high-performance inference 
                microservices using FastAPI and Docker, I've successfully reduced model latency by up to 
                <span className="inline-block px-2 py-0.5 mx-1 bg-purple-200/50 dark:bg-yellow-900/30 text-purple-700 dark:text-yellow-300 rounded font-semibold">2300ms</span> for real-time interactions.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My work spans across various AI domains including <span className="font-semibold text-gray-900 dark:text-white">LLM Fine-Tuning</span>, 
                <span className="font-semibold text-gray-900 dark:text-white"> RAG systems</span>, <span className="font-semibold text-gray-900 dark:text-white">Voice AI</span>, and 
                <span className="font-semibold text-gray-900 dark:text-white"> Computer Vision</span>. I've implemented server-grade RAG systems that 
                increased extraction accuracy by <span className="inline-block px-2 py-0.5 mx-1 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded font-semibold">75%</span> 
                and fine-tuned models achieving <span className="inline-block px-2 py-0.5 mx-1 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-semibold">92% accuracy</span>.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Currently pursuing my B.E. in <span className="font-semibold text-gray-900 dark:text-white">Artificial Intelligence and Data Science</span> 
                from New Horizon Institute, I'm constantly pushing the boundaries of what's possible with AI, 
                having won <span className="inline-block px-2 py-0.5 mx-1 bg-purple-200/50 dark:bg-yellow-900/30 text-purple-700 dark:text-yellow-300 rounded font-semibold">1st place</span> in a LLM Fine-Tuning Hackathon.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="group glass glass-hover p-8 rounded-2xl border-2 border-white/20 hover:border-cyan-400/50 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Professional Impact</h4>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      Reduced agent response time by building moderate-grade RAG systems and optimized 
                      inference pipelines. Designed 20+ Chain-of-Thought prompts ensuring deterministic AI behavior.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group glass glass-hover p-8 rounded-2xl border-2 border-white/20 hover:border-purple-400/50 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Achievements</h4>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      🏆 1st Place - LablabAI Fine-Tuning Hackathon (LLM Optimization)
                      <br />
                      🎓 Head Technical Secretary, Student Association
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass glass-hover p-6 rounded-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-400/50 to-emerald-600/50 rounded-lg backdrop-blur">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Continuous Learning</h4>
                    <p className="text-gray-700 dark:text-gray-300">
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
