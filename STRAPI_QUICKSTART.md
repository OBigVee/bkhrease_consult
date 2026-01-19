# B.Khrease Academic Strapi CMS - Quick Start Guide

This guide will help you get the Strapi CMS up and running quickly for the B.Khrease Academic website.

## 🚀 Automated Setup (Recommended)

Run the automated setup script:

```bash
./setup-strapi.sh
```

This script will:
- Check prerequisites (Docker, Node.js)
- Install Strapi dependencies
- Generate secure environment variables
- Start PostgreSQL database
- Build Strapi CMS

## 📋 Manual Setup

If you prefer manual setup or the script fails:

### 1. Prerequisites

Ensure you have installed:
- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

### 2. Install Dependencies

```bash
cd strapi-cms
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and replace placeholder values with secure keys:

```env
APP_KEYS=generate-secure-keys-here
API_TOKEN_SALT=generate-secure-salt
ADMIN_JWT_SECRET=generate-jwt-secret
TRANSFER_TOKEN_SALT=generate-transfer-salt
JWT_SECRET=generate-jwt-secret
```

### 4. Start Database

```bash
# From project root
docker-compose up -d postgres
```

### 5. Validate Setup

```bash
cd strapi-cms
npm run validate
```

### 6. Start Strapi

```bash
npm run develop
```

## 🔧 Access Points

Once running, you can access:

- **Strapi Admin Panel**: http://localhost:1337/admin
- **API Base URL**: http://localhost:1337/api
- **Database Admin (Adminer)**: http://localhost:8080

## 📊 Initial Setup

1. **Create Admin User**: Visit the admin panel and create your first admin user
2. **Sample Data**: The system will automatically create sample content on first run
3. **API Testing**: Test API endpoints using the admin panel or tools like Postman

## 🔍 Verification

Test that everything is working:

```bash
# Check if Strapi is running
curl http://localhost:1337/api/homepage

# Check database connection
docker-compose ps postgres
```

## 📚 Content Management

The CMS includes these content types:

- **Homepage**: Site-wide content and settings
- **Team Members**: Staff profiles and information
- **Blog Posts**: Educational articles and content
- **News Items**: Updates, events, and announcements
- **Services**: Service offerings and descriptions
- **Categories**: Content organization

## 🔐 Security Notes

- Change default database passwords for production
- Use strong, unique keys for all environment variables
- Configure Cloudinary for production media storage
- Set up SSL certificates for production deployment

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart database
docker-compose restart postgres
```

### Port Conflicts
If port 1337 or 5432 is in use:
```bash
# Check what's using the port
lsof -i :1337
lsof -i :5432

# Stop conflicting services or change ports in configuration
```

### Permission Errors
```bash
# Fix file permissions
chmod -R 755 strapi-cms/
```

### Clear Cache and Restart
```bash
# Clear Strapi cache
rm -rf strapi-cms/.cache
rm -rf strapi-cms/build

# Rebuild
npm run build
npm run develop
```

## 📞 Support

For technical issues:
1. Check the troubleshooting section above
2. Review logs in the terminal
3. Consult the full README in `strapi-cms/README.md`
4. Contact the development team

## 🎯 Next Steps

After successful setup:
1. Customize content in the admin panel
2. Configure Cloudinary for media storage
3. Set up production deployment
4. Connect the React frontend to the API

---

**Happy coding! 🚀**