export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gaurav Chaudhari",
    url: "https://gaurav-chaudhari.vercel.app",
    image: "https://gaurav-chaudhari.vercel.app/profile.jpg",
    sameAs: [
      "https://linkedin.com/in/gaurav-chaudhari-gc",
      "https://github.com/gaurav-chaudhari-gc",
    ],
    jobTitle: "Software Engineer ML",
    worksFor: {
      "@type": "Organization",
      name: "Anvex AI",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    email: "chaudhari.gaurav3710@gmail.com",
    telephone: "+91-8850873204",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "New Horizon Institute Of Technology & Management",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Large Language Models",
      "LLM Fine-Tuning",
      "RAG Systems",
      "Voice AI",
      "Computer Vision",
      "Python",
      "FastAPI",
      "Docker",
      "PyTorch",
      "Next.js",
      "React",
      "TypeScript",
    ],
    description: "Experienced AI/ML Engineer specializing in Generative AI, LLM Fine-Tuning, RAG Systems, Voice AI, and Computer Vision",
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gaurav Chaudhari Portfolio",
    url: "https://gaurav-chaudhari.vercel.app",
    description: "Portfolio website of Gaurav Chaudhari - AI/ML Engineer and Generative AI Specialist",
    author: {
      "@type": "Person",
      name: "Gaurav Chaudhari",
    },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gaurav Chaudhari - AI/ML Engineering Services",
    description: "Professional AI/ML engineering and Generative AI development services",
    provider: {
      "@type": "Person",
      name: "Gaurav Chaudhari",
    },
    areaServed: "Worldwide",
    serviceType: [
      "AI/ML Engineering",
      "Generative AI Development",
      "LLM Fine-Tuning",
      "RAG System Development",
      "Voice AI Solutions",
      "Computer Vision",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
