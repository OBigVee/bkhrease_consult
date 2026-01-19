# Design Document - B.Khrease Academic Website

## Overview

The B.Khrease Academic website will be built as a modern, responsive React application with a headless CMS architecture. The design emphasizes professional presentation, accessibility, and seamless content management while maintaining excellent performance and SEO optimization.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │◄──►│   Strapi CMS    │◄──►│   Database      │
│   (Frontend)    │    │   (Backend)     │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Vercel/       │    │   Railway/      │
│   Netlify       │    │   Heroku        │
│   (Hosting)     │    │   (Hosting)     │
└─────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- **React 18** with TypeScript for type safety
- **Next.js** for SSR/SSG and SEO optimization
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **React Query** for API state management

**Backend:**
- **Strapi v4** headless CMS
- **PostgreSQL** database
- **Cloudinary** for media management
- **Node.js** runtime

**Deployment:**
- **Vercel** for frontend hosting
- **Koyeb** for Strapi backend
- **Custom domain** with SSL

## Components and Interfaces

### Page Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Layout.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Team.tsx
│   │   ├── News.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Form.tsx
│   └── seo/
│       ├── SEOHead.tsx
│       └── StructuredData.tsx
├── pages/
│   ├── index.tsx (Homepage)
│   ├── about.tsx
│   ├── services.tsx
│   ├── team.tsx
│   ├── news/
│   │   ├── index.tsx
│   │   └── [slug].tsx
│   ├── blog/
│   │   ├── index.tsx
│   │   └── [slug].tsx
│   └── contact.tsx
├── lib/
│   ├── strapi.ts
│   ├── seo.ts
│   └── utils.ts
└── types/
    ├── strapi.ts
    └── common.ts
```

### Key Components

#### 1. Header Component
```typescript
interface HeaderProps {
  logo: string;
  navigation: NavigationItem[];
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ logo, navigation, isScrolled }) => {
  // Sticky header with logo and navigation
  // Mobile hamburger menu
  // Smooth scroll to sections
}

#### Footer Component
```typescript
interface FooterProps {
  companyInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: SocialLink[];
  quickLinks: NavigationItem[];
}

const Footer: React.FC<FooterProps> = ({ companyInfo, socialLinks, quickLinks }) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="border-t border-gray-800 py-4 text-center text-sm">
        <p>© 2025 B.Khrease Academic Consult. All rights reserved.</p>
        <p className="mt-1">
          Website designed & developed by{' '}
          <a 
            href="https://doxantrosystems.com" 
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doxantro Systems
          </a>
        </p>
      </div>
    </footer>
  );
}
```

#### 2. Hero Section
```typescript
interface HeroProps {
  tagline: string;
  vision: string;
  mission: string;
  ctaButton: {
    text: string;
    link: string;
  };
}

const Hero: React.FC<HeroProps> = ({ tagline, vision, mission, ctaButton }) => {
  // Full-screen hero with background
  // Animated text reveals
  // Call-to-action buttons
}
```

#### 3. Services Grid
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServicesGrid: React.FC<{ services: Service[] }> = ({ services }) => {
  // Responsive grid layout
  // Hover animations
  // Modal for detailed view
}
```

#### 4. Team Showcase
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: 'core' | 'sub' | 'other';
}

const TeamShowcase: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  // Categorized team display
  // Professional photo grid
  // Bio modals or expandable cards
}
```

### API Integration Layer

#### Strapi API Service
```typescript
class StrapiService {
  private baseURL: string;
  
  async getHomepageData(): Promise<HomepageData> {
    // Fetch hero content, featured services, latest news
  }
  
  async getTeamMembers(): Promise<TeamMember[]> {
    // Fetch all team members with categories
  }
  
  async getBlogPosts(page: number, limit: number): Promise<BlogPost[]> {
    // Paginated blog posts with SEO data
  }
  
  async getNewsUpdates(): Promise<NewsItem[]> {
    // Latest news and events
  }
}
```

## Data Models

### Strapi Content Types

#### 1. Homepage Content
```typescript
interface HomepageContent {
  id: string;
  tagline: string;
  vision: string;
  mission: string;
  boldValues: {
    believe: string;
    overcome: string;
    lead: string;
    deliver: string;
  };
  heroImage: MediaFile;
  featuredServices: Service[];
  statistics: {
    studentsTrained: number;
    foundingYear: number;
    partnersCount: number;
  };
}
```

#### 2. Team Member
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: MediaFile;
  category: 'founding-core' | 'sub-team' | 'other';
  order: number;
  socialLinks: {
    linkedin?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

#### 3. Blog Post
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text
  featuredImage: MediaFile;
  author: TeamMember;
  categories: Category[];
  tags: string[];
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

#### 4. News Item
```typescript
interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'event' | 'publication' | 'achievement' | 'announcement';
  eventDate?: string;
  registrationLink?: string;
  featuredImage: MediaFile;
  publishedAt: string;
  isUpcoming: boolean;
}
```

#### 5. Service
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: string;
  features: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
  order: number;
}
```

## User Interface Design

### Design System

#### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-blue: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  
  /* Secondary Colors */
  --secondary-green: #059669;
  --secondary-light: #10b981;
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Accent Colors */
  --accent-orange: #f59e0b;
  --accent-red: #dc2626;
}
```

#### Typography
```css
/* Headings */
.heading-xl { font-size: 3.5rem; font-weight: 800; line-height: 1.1; }
.heading-lg { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
.heading-md { font-size: 1.875rem; font-weight: 600; line-height: 1.3; }
.heading-sm { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }

/* Body Text */
.body-lg { font-size: 1.125rem; line-height: 1.6; }
.body-md { font-size: 1rem; line-height: 1.6; }
.body-sm { font-size: 0.875rem; line-height: 1.5; }
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Page Layouts

#### Homepage Layout
1. **Hero Section** - Full viewport with tagline, vision/mission
2. **BOLD Values** - 4-column grid showcasing core values
3. **Services Overview** - 3-column service cards
4. **Statistics** - Key numbers (1000+ students, founding year)
5. **Latest News** - 3 recent news items
6. **Team Highlight** - Featured team members
7. **Contact CTA** - Contact form and social links

#### Footer Layout
- **Company Information** - Copyright, contact details
- **Quick Links** - Navigation, social media
- **Developer Attribution** - "Website designed & developed by Doxantro Systems"

#### Team Page Layout
1. **Page Header** - Team introduction
2. **Founding Core Team** - Prominent display with photos
3. **Sub-team Members** - Grid layout with roles
4. **Other Team Members** - Compact grid
5. **Join Team CTA** - Recruitment information

#### Blog/News Layout
1. **Featured Post** - Large hero post
2. **Category Filters** - Horizontal filter tabs
3. **Post Grid** - 3-column responsive grid
4. **Pagination** - Load more or numbered pages
5. **Sidebar** - Categories, recent posts, newsletter signup

## Error Handling

### API Error Handling
```typescript
class APIErrorHandler {
  static handleStrapiError(error: any): UserFriendlyError {
    if (error.response?.status === 404) {
      return { message: "Content not found", type: "not-found" };
    }
    if (error.response?.status >= 500) {
      return { message: "Server error, please try again", type: "server-error" };
    }
    return { message: "Something went wrong", type: "generic" };
  }
}
```

### Fallback Components
```typescript
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Catch React errors and show fallback UI
  // Log errors to monitoring service
}

const LoadingFallback: React.FC = () => {
  // Skeleton loading states
  // Progressive loading indicators
}
```

### Offline Handling
- Service worker for basic offline functionality
- Cached content for previously visited pages
- Offline indicators and retry mechanisms

## Testing Strategy

### Unit Testing
```typescript
// Component Testing with React Testing Library
describe('Hero Component', () => {
  test('displays tagline and mission correctly', () => {
    render(<Hero tagline="distinction with ease" mission="..." />);
    expect(screen.getByText('distinction with ease')).toBeInTheDocument();
  });
});

// API Service Testing
describe('StrapiService', () => {
  test('fetches homepage data successfully', async () => {
    const data = await strapiService.getHomepageData();
    expect(data).toHaveProperty('tagline');
  });
});
```

### Integration Testing
- API integration tests with mock Strapi responses
- Form submission testing
- Navigation and routing tests

### End-to-End Testing
```typescript
// Playwright E2E Tests
test('user can navigate through main pages', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  await page.click('text=Services');
  await expect(page).toHaveURL('/services');
});
```

### Performance Testing
- Lighthouse CI for performance monitoring
- Bundle size analysis
- Core Web Vitals tracking

## SEO Implementation

### Meta Tags Strategy
```typescript
interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  structuredData: any;
}

const SEOHead: React.FC<{ seo: SEOData }> = ({ seo }) => {
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <link rel="canonical" href={seo.canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify(seo.structuredData)}
      </script>
    </Head>
  );
};
```

### Structured Data
```typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "B.Khrease Academic Consult",
  "description": "Undergraduate research mentorship in Nigeria and beyond",
  "url": "https://bkhrease.com",
  "logo": "https://bkhrease.com/logo.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+2348122359970",
    "contactType": "customer service",
    "email": "Info.bkhrease.ng@gmail.com"
  },
  "sameAs": [
    "https://www.linkedin.com/company/b-khrease-academic-consult",
    "https://www.youtube.com/@B.khreaseAcademicConsult",
    "https://www.tiktok.com/@bkhreaseacademicconsult"
  ]
};
```

### Performance Optimizations
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static generation for content pages
- CDN delivery for assets

## Security Considerations

### Frontend Security
- Input sanitization for all user inputs
- XSS protection with proper escaping
- HTTPS enforcement
- Content Security Policy headers

### Strapi Security
- JWT authentication for admin access
- Role-based permissions
- API rate limiting
- Regular security updates

### Data Protection
- Environment variables for sensitive data
- Secure API endpoints
- GDPR compliance for user data
- Regular backups with encryption

## Accessibility Implementation

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility

### Implementation Details
```typescript
const AccessibleButton: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  ariaLabel,
  disabled 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2"
    >
      {children}
    </button>
  );
};
```

### Testing Accessibility
- Automated testing with axe-core
- Manual testing with screen readers
- Keyboard navigation testing
- Color contrast validation

This design provides a solid foundation for building a professional, scalable, and maintainable website that meets all the specified requirements while following modern web development best practices.