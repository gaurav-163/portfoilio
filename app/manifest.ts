import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gaurav Chaudhari - AI/ML Engineer Portfolio',
    short_name: 'Gaurav Portfolio',
    description: 'Portfolio of Gaurav Chaudhari - AI/ML Engineer and Generative AI Specialist',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
