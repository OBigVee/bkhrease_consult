# Content Management Workflow Guide

## Overview

This document outlines the content management workflow implemented for the B.Khrease Academic website using Strapi CMS with draft/publish functionality, scheduled publishing, and preview capabilities.

## Content Types

### 1. Homepage Content (Single Type)
- **Purpose**: Manages homepage content including tagline, vision, mission, and statistics
- **Features**: Draft/publish workflow, SEO optimization
- **Access**: `/admin/content-manager/singleType/api::homepage.homepage`

### 2. Blog Posts (Collection Type)
- **Purpose**: Educational articles and research content
- **Features**: Full draft/publish workflow, scheduling, categories, author attribution
- **Access**: `/admin/content-manager/collectionType/api::blog-post.blog-post`

### 3. News Items (Collection Type)
- **Purpose**: News updates, events, achievements, and announcements
- **Features**: Draft/publish workflow, event scheduling, priority levels
- **Access**: `/admin/content-manager/collectionType/api::news-item.news-item`

### 4. Team Members (Collection Type)
- **Purpose**: Team member profiles and information
- **Features**: Categorization (founding-core, sub-team, other), ordering
- **Access**: `/admin/content-manager/collectionType/api::team-member.team-member`

### 5. Services (Collection Type)
- **Purpose**: Service offerings and descriptions
- **Features**: Rich text descriptions, feature lists, contact information
- **Access**: `/admin/content-manager/collectionType/api::service.service`

### 6. Categories (Collection Type)
- **Purpose**: Blog post categorization
- **Features**: Color coding, icons, SEO optimization
- **Access**: `/admin/content-manager/collectionType/api::category.category`

## Workflow States

### Draft
- Content is saved but not published
- Not visible on the public website
- Can be edited and previewed
- No `publishedAt` date set

### Scheduled
- Content has a future `publishedAt` date
- Will be automatically published at the scheduled time
- Can be previewed before publication
- Cron job handles automatic publishing

### Published
- Content is live on the website
- Has a `publishedAt` date in the past or present
- Visible to public users
- Can be unpublished if needed

## Admin Interface Features

### User Roles

#### Super Admin
- Full access to all content and system settings
- Can manage user roles and permissions
- Access to developer tools and configurations

#### Content Manager
- Can create, edit, publish, and unpublish all content
- Access to media library and file uploads
- Can manage categories and team members
- Cannot modify system settings

#### Editor
- Can create and edit content
- Cannot publish content (requires approval)
- Can save drafts and request publication
- Limited access to system features

### Content Management Features

#### Draft/Publish Workflow
```javascript
// Publish content immediately
POST /api/blog-posts/:id/publish

// Schedule content for future publication
POST /api/blog-posts/:id/schedule
{
  "publishAt": "2025-02-15T10:00:00Z"
}

// Unpublish content
POST /api/blog-posts/:id/unpublish
```

#### Preview Functionality
```javascript
// Generate preview URL
POST /api/preview/generate-url
{
  "contentType": "blog-post",
  "id": 123
}

// Access preview content
GET /api/preview/blog-post/:id?token=preview-token
```

#### Bulk Operations
```javascript
// Bulk publish multiple items
POST /api/workflow/bulk-publish
{
  "items": [
    { "contentType": "blog-post", "id": 1 },
    { "contentType": "news-item", "id": 2 }
  ]
}
```

## Scheduled Publishing

### Automatic Publishing
- Cron job runs every 5 minutes to check for scheduled content
- Content with `publishedAt` date in the past gets published automatically
- Logs all automatic publications for audit trail

### Event Status Updates
- Cron job runs hourly to update event status
- Events with past dates are marked as no longer upcoming
- Maintains data accuracy for event listings

### Configuration
```javascript
// Enable/disable cron jobs
CRON_ENABLED=true

// Cron job schedules in config/cron-tasks.js
'*/5 * * * *': publishScheduledContent  // Every 5 minutes
'0 * * * *': updateEventStatus         // Every hour
'0 0 * * *': dailyCleanup             // Daily at midnight
```

## Content Validation

### Publishing Requirements

#### Blog Posts
- Title (required)
- Content (required)
- Excerpt (required)
- Author (required)
- At least one category (required)
- SEO meta title (required)
- SEO meta description (required)

#### News Items
- Title (required)
- Content (required)
- Excerpt (required)
- Type (required: event, publication, achievement, announcement)
- Event date (required for events)
- SEO meta title (required)
- SEO meta description (required)

### Validation API
```javascript
// Validate content before publishing
GET /api/workflow/validate/:contentType/:id

// Response
{
  "data": {
    "isValid": true,
    "errors": [],
    "entity": { ... }
  }
}
```

## Media Management

### Cloudinary Integration
- Automatic image optimization
- Multiple format support (JPEG, PNG, WebP)
- Organized folder structure: `/bkhrease-academic/`
- Automatic quality optimization

### Upload Configuration
```javascript
// Cloudinary settings in config/plugins.js
upload: {
  config: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {
        folder: 'bkhrease-academic',
        quality: 'auto:good',
        format: 'auto',
      },
    },
  },
}
```

## API Endpoints

### Content Management
- `GET /api/workflow/stats` - Get workflow statistics
- `GET /api/workflow/drafts` - Get all draft content
- `GET /api/workflow/scheduled` - Get all scheduled content
- `POST /api/workflow/bulk-publish` - Bulk publish content
- `POST /api/workflow/bulk-unpublish` - Bulk unpublish content

### Blog Posts
- `GET /api/blog-posts/drafts` - Get draft blog posts
- `GET /api/blog-posts/published` - Get published blog posts
- `GET /api/blog-posts/:id/preview` - Preview blog post
- `POST /api/blog-posts/:id/publish` - Publish blog post
- `POST /api/blog-posts/:id/schedule` - Schedule blog post

### News Items
- `GET /api/news-items/drafts` - Get draft news items
- `GET /api/news-items/published` - Get published news items
- `GET /api/news-items/:id/preview` - Preview news item
- `POST /api/news-items/:id/publish` - Publish news item
- `POST /api/news-items/:id/schedule` - Schedule news item

### Preview
- `GET /api/preview/blog-post/:id?token=:token` - Preview blog post
- `GET /api/preview/news-item/:id?token=:token` - Preview news item
- `POST /api/preview/generate-url` - Generate preview URL

## Security Considerations

### Preview Security
- Preview URLs require secret token
- Tokens should be rotated regularly
- Preview access is logged for audit

### Admin Access
- Role-based permissions
- Session management
- HTTPS enforcement in production

### Content Security
- Input sanitization
- XSS protection
- Content validation before publishing

## Best Practices

### Content Creation
1. Always fill in SEO fields before publishing
2. Use descriptive titles and excerpts
3. Add relevant categories and tags
4. Include featured images for better engagement
5. Preview content before publishing

### Workflow Management
1. Use drafts for work-in-progress content
2. Schedule content for optimal publishing times
3. Review scheduled content regularly
4. Use bulk operations for efficiency
5. Monitor workflow statistics

### Media Management
1. Optimize images before upload
2. Use descriptive file names
3. Organize content in folders
4. Regularly clean up unused media
5. Monitor storage usage

## Troubleshooting

### Common Issues

#### Scheduled Publishing Not Working
- Check if cron jobs are enabled (`CRON_ENABLED=true`)
- Verify server timezone settings
- Check Strapi logs for cron job errors

#### Preview URLs Not Working
- Verify `PREVIEW_SECRET` environment variable
- Check `FRONTEND_URL` configuration
- Ensure preview routes are properly configured

#### Content Not Publishing
- Validate required fields are filled
- Check user permissions
- Verify content passes validation rules

### Monitoring
- Check Strapi logs for errors
- Monitor cron job execution
- Track content workflow statistics
- Review user activity logs

## Environment Variables

```bash
# Content Management
PREVIEW_SECRET=your-preview-secret-token
FRONTEND_URL=http://localhost:3000
CRON_ENABLED=true

# Email Notifications (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-email-password
EMAIL_DEFAULT_FROM=noreply@bkhrease.ng
EMAIL_DEFAULT_REPLY_TO=info@bkhrease.ng
```

This workflow provides a robust content management system with professional publishing capabilities, ensuring content quality and maintaining a smooth editorial process.