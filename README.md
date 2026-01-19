# B.Khrease Academic Website

A modern, responsive website for B.Khrease Academic Consult built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ♿ Accessibility compliant (WCAG 2.1 AA)
- 🔍 SEO optimized
- 📊 Performance optimized
- 🎭 Framer Motion animations
- 🗄️ Headless CMS integration (Strapi)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/            # Reusable UI components
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Development Guidelines

- Follow the established code style (ESLint + Prettier)
- Write meaningful commit messages
- Use TypeScript for all new code
- Follow accessibility best practices
- Optimize for performance and SEO

## Deployment

The site is configured for deployment on Vercel with automatic deployments from the main branch.

## License

© 2025 B.Khrease Academic Consult. All rights reserved.

Website designed & developed by [Doxantro Systems](https://doxantrosystems.com)