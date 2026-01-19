# B.Khrease Academic Strapi CMS

This is the headless CMS backend for the B.Khrease Academic website, built with Strapi v4.

## Features

- **Content Types**: Homepage, Team Members, Blog Posts, News Items, Services, Categories
- **Media Management**: Cloudinary integration for image storage and optimization
- **Database**: PostgreSQL with Docker support for local development
- **API**: RESTful API with custom endpoints for enhanced functionality
- **Admin Panel**: User-friendly interface for content management
- **SEO**: Built-in SEO components for all content types

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
cd strapi-cms
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=bkhrease_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false

# Cloudinary (Optional for local development)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

### 3. Start PostgreSQL Database

```bash
# From the root directory
docker-compose up -d postgres
```

This will start:
- PostgreSQL database on port 5432
- Adminer (database admin) on port 8080

### 4. Run Strapi

```bash
# Development mode
npm run develop

# Production mode
npm run build
npm run start
```

### 5. Access the Admin Panel

- Strapi Admin: http://localhost:1337/admin
- Database Admin (Adminer): http://localhost:8080

## Content Types

### Homepage (Single Type)
- Tagline, Vision, Mission
- BOLD Values (Believe, Overcome, Lead, Deliver)
- Statistics and achievements
- SEO metadata

### Team Members
- Personal information and bios
- Categories: founding-core, sub-team, other
- Social links and qualifications
- Professional photos

### Blog Posts
- Rich text content with media
- Categories and tags
- Author relationships
- SEO optimization
- Reading time calculation

### News Items
- Event announcements and updates
- Publication highlights
- Achievement showcases
- Event management with dates and registration

### Services
- Service descriptions and features
- Contact information
- Pricing and duration
- Active/inactive status

### Categories
- Blog post categorization
- Color coding
- SEO-friendly slugs

## API Endpoints

### Public Endpoints

```
GET /api/homepage - Homepage content
GET /api/team-members - All team members
GET /api/team-members/category/:category - Team members by category
GET /api/blog-posts - All blog posts
GET /api/blog-posts/category/:category - Blog posts by category
GET /api/news-items - All news items
GET /api/news-items/upcoming - Upcoming events
GET /api/news-items/type/:type - News items by type
GET /api/services - All active services
GET /api/categories - All categories
```

### Authentication

For admin operations, you'll need to:
1. Create an admin user through the admin panel
2. Generate API tokens in the admin panel
3. Use JWT tokens for authenticated requests

## Database Management

### Backup Database
```bash
docker exec bkhrease-postgres pg_dump -U strapi bkhrease_strapi > backup.sql
```

### Restore Database
```bash
docker exec -i bkhrease-postgres psql -U strapi bkhrease_strapi < backup.sql
```

### Reset Database
```bash
docker-compose down -v
docker-compose up -d postgres
npm run develop
```

## Deployment

### Environment Setup

For production deployment, ensure you have:
- Secure APP_KEYS and JWT secrets
- Production PostgreSQL database
- Cloudinary account for media storage
- SSL certificates

### Recommended Hosting

- **Strapi**: Railway, Heroku, DigitalOcean, or Koyeb
- **Database**: Managed PostgreSQL (Railway, Heroku Postgres, etc.)
- **Media**: Cloudinary or AWS S3

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

## Development

### Adding New Content Types

1. Create schema in `src/api/[content-type]/content-types/[content-type]/schema.json`
2. Add controllers, routes, and services
3. Update the bootstrap file if needed for sample data
4. Test API endpoints

### Custom API Endpoints

Add custom routes in the routes file:

```javascript
{
  method: 'GET',
  path: '/custom-endpoint',
  handler: 'controller.customMethod',
}
```

### Components

Reusable components are stored in `src/components/` and can be used across content types.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker-compose ps`
- Check database credentials in `.env`
- Verify network connectivity

### Permission Errors
- Check file permissions for uploads
- Verify Cloudinary credentials
- Review user roles and permissions in admin panel

### Performance Issues
- Enable database query logging
- Monitor API response times
- Optimize database queries
- Use pagination for large datasets

## Support

For technical support or questions about the CMS setup, contact the development team at Doxantro Systems.

## License

This project is licensed under the MIT License.