import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import JsonLd from "./components/JsonLd";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: {
    default: "Gaurav Chaudhari - AI/ML Engineer & Generative AI Specialist",
    template: "%s | Gaurav Chaudhari"
  },
  description: "Experienced AI/ML Engineer at Anvex AI specializing in Generative AI, LLM Fine-Tuning, RAG Systems, Voice AI, and Computer Vision. Expert in Python, FastAPI, Docker, PyTorch, and Transformers. Based in Mumbai, India.",
  keywords: [
    "Gaurav Chaudhari",
    "AI Engineer",
    "Machine Learning Engineer",
    "Generative AI Specialist",
    "Generative AI",
    "LLM Fine-Tuning",
    "RAG Systems",
    "Voice AI",
    "Computer Vision",
    "Python Developer",
    "FastAPI",
    "Docker",
    "PyTorch",
    "Next.js",
    "React",
    "TypeScript",
    "Mumbai Software Engineer",
    "Anvex AI",
    "Portfolio",
    "Software Engineer Mumbai"
  ],
  authors: [{ name: "Gaurav Chaudhari", url: "https://linkedin.com/in/gaurav-chaudhari-gc" }],
  creator: "Gaurav Chaudhari",
  publisher: "Gaurav Chaudhari",
  metadataBase: new URL('https://gaurav-chaudhari.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gaurav-chaudhari.vercel.app",
    siteName: "Gaurav Chaudhari Portfolio",
    title: "Gaurav Chaudhari - AI/ML Engineer & Generative AI Specialist",
    description: "Experienced AI/ML Engineer at Anvex AI specializing in Generative AI, LLM Fine-Tuning, RAG Systems, Voice AI, and Computer Vision. Expert in Python, FastAPI, Docker, PyTorch, and Transformers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gaurav Chaudhari - AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Chaudhari - AI/ML Engineer & Generative AI Specialist",
    description: "AI/ML Engineer specializing in Generative AI, LLM Fine-Tuning, RAG Systems, Voice AI, and Computer Vision",
    creator: "@gaurav_gc",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'C5iQchA5Qf7Ztuv7P3fbUVVP-BzH6a_z4J_rIe0OKoI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <JsonLd />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
