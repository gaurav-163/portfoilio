# Gaurav Chaudhari - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Designed to impress recruiters and showcase my work as an AI/ML Engineer and Generative AI Specialist.

## ✨ Features

- **Modern Design**: Clean, professional, and visually stunning interface
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Fully Responsive**: Optimized for all devices - mobile, tablet, and desktop
- **Type-Safe**: Built with TypeScript for reliability and maintainability
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Fast Performance**: Optimized with Next.js 14 App Router for blazing-fast load times

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Navigate to the project directory:
\`\`\`bash
cd portfolio-gc
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

3. Follow the prompts to complete deployment.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

Your portfolio will be live in minutes! 🎉

## 📁 Project Structure

\`\`\`
portfolio-gc/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar with theme toggle
│   │   ├── Hero.tsx         # Hero section with typewriter effect
│   │   ├── About.tsx        # About section
│   │   ├── Experience.tsx   # Work experience timeline
│   │   ├── Projects.tsx     # Project showcase with filtering
│   │   ├── Skills.tsx       # Skills visualization
│   │   ├── Contact.tsx      # Contact form and info
│   │   └── Footer.tsx       # Footer with scroll-to-top
│   ├── context/
│   │   └── ThemeContext.tsx # Theme management
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
\`\`\`

## 🎨 Customization

To customize the portfolio for yourself:

1. **Personal Information**: Update content in each component file
2. **Colors**: Modify \`tailwind.config.ts\` to change the color scheme
3. **Projects**: Edit the \`projects\` array in \`app/components/Projects.tsx\`
4. **Experience**: Update the \`experiences\` array in \`app/components/Experience.tsx\`
5. **Skills**: Modify skill categories in \`app/components/Skills.tsx\`
6. **Contact**: Update contact information in \`app/components/Contact.tsx\`

## 📱 Sections

- **Hero**: Eye-catching introduction with animated typewriter effect
- **About**: Professional summary and achievements
- **Experience**: Career timeline with detailed accomplishments
- **Projects**: Showcase of featured projects with filtering
- **Skills**: Visual representation of technical expertise
- **Contact**: Contact form and social links
- **Footer**: Credits and scroll-to-top button

## 🔧 Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

## 🌟 Features Highlights

- ✅ Smooth scroll navigation
- ✅ Intersection Observer animations
- ✅ Mobile-first responsive design
- ✅ Custom scrollbar styling
- ✅ Gradient text effects
- ✅ Hover animations and transitions
- ✅ Form validation
- ✅ Optimized images and fonts
- ✅ Accessibility features

## 🤝 Contact

- **Email**: chaudharigaurav37@gmail.com
- **LinkedIn**: [gaurav-chaudhari-gc](https://linkedin.com/in/gaurav-chaudhari-gc)
- **GitHub**: [gaurav-chaudhari-gc](https://github.com/gaurav-163)
- **Location**: Mumbai, India

---

Built with ❤️ using Next.js, TypeScript & Tailwind CSS
