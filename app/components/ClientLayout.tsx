'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './Footer';

export default function ClientLayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
