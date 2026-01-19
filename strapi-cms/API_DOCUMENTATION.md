# B.Khrease Academic Strapi API Documentation

This document provides comprehensive information about the API endpoints available in the B.Khrease Academic Strapi CMS.

## Base URL

- **Development**: `http://localhost:1337/api`
- **Production**: `https://your-domain.com/api`

## Authentication

Most endpoints are public for reading content. Admin operations require authentication:

```bash
# Get JWT token (after creating admin user)
POST /api/auth/local
{
  "identifier": "admin@example.com",
  "password": "your-password"
}

# Use token in subsequent requests
Authorization: Bearer YOUR_JWT_TOKEN
```

## Content Types

### 1. Homepage (Single Type)

Get homepage content including tagline, vision, mission, and statistics.

```bash
GET /api/homepage
```

**Response Example:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "tagline": "distinction with ease",
      "vision": "To be the leading academic consultancy...",
      "mission": "We provide comprehensive research mentorship...",
      "boldValues": {
        "believe": "We believe in the potential...",
        "overcome": "We help students overcome...",
        "lead": "We lead by example...",
        "deliver": "We deliver results..."
      },
      "statistics": {
        "studentsTrained": 1000,
        "foundingYear": 2018,
        "partnersCount": 15,
        "projectsCompleted": 750,
        "awardsWon": 50,
        "registrationDetails": [...]
      },
      "seo": {...}
    }
  }
}
```

### 2. Team Members

Manage team member profiles and information.

```bash
# Get all team members
GET /api/team-members

# Get team members by category
GET /api/team-members/category/founding-core
GET /api/team-members/category/sub-team
GET /api/team-members/category/other

# Get specific team member
GET /api/team-members/:id
```

**Query Parameters:**
- `populate=*` - Include all relations (image, socialLinks)
- `sort=order:asc` - Sort by order field
- `filters[category][$eq]=founding-core` - Filter by category

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Christopher B. Olowosoke",
        "role": "Founder & Lead Academic Consultant",
        "bio": "Christopher is the visionary founder...",
        "category": "founding-core",
        "order": 1,
        "isFounder": true,
        "qualifications": "PhD in Academic Research...",
        "specializations": "Research Methodology...",
        "socialLinks": {
          "email": "christopher@bkhrease.ng",
          "linkedin": "https://linkedin.com/in/christopher-olowosoke"
        },
        "image": {...}
      }
    }
  ]
}
```

### 3. Blog Posts

Educational articles and content management.

```bash
# Get all blog posts
GET /api/blog-posts

# Get blog posts by category
GET /api/blog-posts/category/research-methods

# Get specific blog post
GET /api/blog-posts/:id
```

**Query Parameters:**
- `populate[author][populate]=image` - Include author with image
- `populate[categories]=*` - Include categories
- `populate[featuredImage]=*` - Include featured image
- `sort=publishedAt:desc` - Sort by publication date
- `pagination[page]=1&pagination[pageSize]=10` - Pagination

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Getting Started with Undergraduate Research",
        "slug": "getting-started-undergraduate-research",
        "excerpt": "A comprehensive guide for students...",
        "content": "<h2>Introduction to Undergraduate Research</h2>...",
        "readingTime": 8,
        "tags": ["research", "undergraduate", "methodology"],
        "publishedAt": "2025-01-10T10:00:00.000Z",
        "author": {...},
        "categories": [...],
        "featuredImage": {...},
        "seo": {...}
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

### 4. News Items

Updates, events, and announcements.

```bash
# Get all news items
GET /api/news-items

# Get upcoming events
GET /api/news-items/upcoming

# Get news by type
GET /api/news-items/type/event
GET /api/news-items/type/publication
GET /api/news-items/type/achievement
GET /api/news-items/type/announcement

# Get specific news item
GET /api/news-items/:id
```

**Query Parameters:**
- `filters[isUpcoming][$eq]=true` - Filter upcoming events
- `filters[eventDate][$gte]=${new Date().toISOString()}` - Future events
- `sort=eventDate:asc` - Sort by event date
- `sort=priority:desc` - Sort by priority

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Upcoming Webinar: Advanced Research Methodologies",
        "slug": "upcoming-webinar-advanced-research-methodologies",
        "content": "<p>Join us for an exclusive webinar...</p>",
        "type": "event",
        "eventDate": "2025-02-15T14:00:00.000Z",
        "registrationLink": "https://bkhrease.com/register-webinar",
        "isUpcoming": true,
        "priority": "medium",
        "excerpt": "Learn advanced research methodologies...",
        "featuredImage": {...},
        "seo": {...}
      }
    }
  ]
}
```

### 5. Services

Service offerings and descriptions.

```bash
# Get all active services
GET /api/services

# Get specific service
GET /api/services/:id
```

**Query Parameters:**
- `filters[isActive][$eq]=true` - Only active services
- `sort=order:asc` - Sort by display order
- `populate[contactInfo]=*` - Include contact information

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Research Mentorship Programs",
        "description": "Comprehensive mentorship for undergraduate research projects",
        "detailedDescription": "<p>Our research mentorship programs...</p>",
        "icon": "research",
        "features": [
          "One-on-one mentorship",
          "Research methodology training",
          "Literature review guidance",
          "Data analysis support"
        ],
        "contactInfo": {
          "email": "Info.bkhrease.ng@gmail.com",
          "phone": "+2348122359970",
          "whatsapp": "+2348122359970"
        },
        "order": 1,
        "isActive": true,
        "price": "Contact for pricing",
        "duration": "3-6 months",
        "image": {...}
      }
    }
  ]
}
```

### 6. Categories

Content categorization for blog posts.

```bash
# Get all categories
GET /api/categories

# Get specific category
GET /api/categories/:id
```

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Research Methods",
        "slug": "research-methods",
        "description": "Articles about research methodologies and best practices",
        "color": "#3b82f6"
      }
    }
  ]
}
```

## Advanced Queries

### Population (Include Relations)

```bash
# Include all relations
GET /api/blog-posts?populate=*

# Include specific relations
GET /api/blog-posts?populate[author]=*&populate[categories]=*

# Nested population
GET /api/blog-posts?populate[author][populate]=image
```

### Filtering

```bash
# Equal filter
GET /api/team-members?filters[category][$eq]=founding-core

# Not equal
GET /api/news-items?filters[type][$ne]=announcement

# Greater than (dates)
GET /api/news-items?filters[eventDate][$gte]=2025-01-01

# Contains (text search)
GET /api/blog-posts?filters[title][$contains]=research

# Multiple filters
GET /api/blog-posts?filters[publishedAt][$gte]=2025-01-01&filters[categories][slug][$eq]=research-methods
```

### Sorting

```bash
# Single field
GET /api/blog-posts?sort=publishedAt:desc

# Multiple fields
GET /api/team-members?sort[0]=category:asc&sort[1]=order:asc
```

### Pagination

```bash
# Page-based pagination
GET /api/blog-posts?pagination[page]=1&pagination[pageSize]=10

# Offset-based pagination
GET /api/blog-posts?pagination[start]=0&pagination[limit]=10
```

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found",
    "details": {}
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Development**: 100 requests per minute
- **Production**: 1000 requests per minute per IP

## CORS Configuration

CORS is configured to allow requests from:
- Frontend domain (production)
- localhost:3000 (development)
- Admin panel domain

## Webhooks

Configure webhooks in the admin panel to receive notifications when content is created, updated, or deleted:

```bash
POST /api/webhooks
{
  "name": "Content Update Webhook",
  "url": "https://your-frontend.com/api/revalidate",
  "events": ["entry.create", "entry.update", "entry.delete"]
}
```

## Best Practices

1. **Use Population Wisely**: Only populate relations you need to avoid over-fetching
2. **Implement Caching**: Cache API responses on the frontend for better performance
3. **Handle Errors Gracefully**: Always implement proper error handling
4. **Use Pagination**: For large datasets, always use pagination
5. **Optimize Queries**: Use filters to reduce data transfer
6. **Monitor Performance**: Keep track of API response times

## Example Frontend Integration

```javascript
// React example with fetch
const fetchHomepage = async () => {
  try {
    const response = await fetch('http://localhost:1337/api/homepage?populate=*');
    const data = await response.json();
    return data.data.attributes;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    throw error;
  }
};

// React Query example
const { data, isLoading, error } = useQuery(
  ['blog-posts', page],
  () => fetch(`/api/blog-posts?pagination[page]=${page}&populate=*`).then(res => res.json())
);
```

This API documentation provides a comprehensive guide for integrating with the B.Khrease Academic Strapi CMS. For more advanced usage, refer to the official Strapi documentation.