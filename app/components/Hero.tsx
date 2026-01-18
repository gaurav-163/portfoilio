'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full glass glass-hover">
              <MapPin className="w-4 h-4 mr-2 text-cyan-500" />
              <span className="text-gray-700 dark:text-gray-200">Mumbai, India</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Hi, I'm <span className="gradient-text">Gaurav Chaudhari</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-10 text-gray-700 dark:text-gray-300 h-20 md:h-24"
          >
            <TypeAnimation
              sequence={[
                'AI/ML Engineer',
                2000,
                'LLM Fine-Tuning',
                2000,
                'RAG Architect',
                2000,
                'Voice AI Developer',
                2000,
                'Generative AI',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Software Engineer specializing in <span className="font-medium text-gray-900 dark:text-white">Generative AI</span>, building high-performance inference microservices 
            and scalable voice agent pipelines. Passionate about creating AI solutions that make a real impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <a
              href="/resume.pdf"
              download="Gaurav_Chaudhari_Resume.pdf"
              className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-yellow-300 dark:to-amber-400 dark:text-gray-900 hover:shadow-glow-lg transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
            <a
              href="mailto:chaudharigaurav37@gmail.com"
              className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-2xl glass glass-hover text-purple-600 dark:text-yellow-400 transition-all transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
            <a
              href="https://github.com/gaurav-163"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-xl glass glass-hover text-gray-700 dark:text-gray-200 transition-all transform hover:scale-105"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center gap-6"
          >
            <a
              href="https://linkedin.com/in/gaurav-chaudhari-gc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass glass-hover text-purple-600 dark:text-yellow-400 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/gaurav-163"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass glass-hover text-gray-700 dark:text-gray-200 transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:chaudharigaurav37@gmail.com"
              className="p-3 rounded-full glass glass-hover text-purple-600 dark:text-yellow-400 transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-8 h-8 text-purple-600 dark:text-yellow-400" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
