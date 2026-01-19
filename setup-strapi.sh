#!/bin/bash

# B.Khrease Academic Strapi CMS Setup Script
# This script automates the setup process for the Strapi CMS

set -e

echo "🚀 Setting up B.Khrease Academic Strapi CMS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed (either standalone or integrated)
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Determine which Docker Compose command to use
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    DOCKER_COMPOSE_CMD="docker compose"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js (v18 or higher) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "All prerequisites are installed ✅"

# Navigate to Strapi directory
cd strapi-cms

# Install dependencies
print_status "Installing Strapi dependencies..."
npm install
print_success "Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file from template..."
    cp .env.example .env
    
    # Generate secure keys
    print_status "Generating secure keys..."
    
    # Generate random keys (you might want to use a more secure method in production)
    APP_KEY1=$(openssl rand -base64 32)
    APP_KEY2=$(openssl rand -base64 32)
    APP_KEY3=$(openssl rand -base64 32)
    APP_KEY4=$(openssl rand -base64 32)
    API_TOKEN_SALT=$(openssl rand -base64 32)
    ADMIN_JWT_SECRET=$(openssl rand -base64 32)
    TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update .env file with generated keys
    sed -i.bak "s/your-app-keys-here/$APP_KEY1,$APP_KEY2,$APP_KEY3,$APP_KEY4/g" .env
    sed -i.bak "s/your-api-token-salt/$API_TOKEN_SALT/g" .env
    sed -i.bak "s/your-admin-jwt-secret/$ADMIN_JWT_SECRET/g" .env
    sed -i.bak "s/your-transfer-token-salt/$TRANSFER_TOKEN_SALT/g" .env
    sed -i.bak "s/your-jwt-secret/$JWT_SECRET/g" .env
    
    # Remove backup file
    rm .env.bak
    
    print_success ".env file created with secure keys"
    print_warning "Please update Cloudinary credentials in .env file if you want to use cloud storage"
else
    print_status ".env file already exists, skipping creation"
fi

# Go back to root directory
cd ..

# Start PostgreSQL database
print_status "Starting PostgreSQL database..."
$DOCKER_COMPOSE_CMD up -d postgres

# Wait for database to be ready
print_status "Waiting for database to be ready..."
sleep 10

# Check if database is running
if $DOCKER_COMPOSE_CMD ps postgres | grep -q "Up"; then
    print_success "PostgreSQL database is running"
else
    print_error "Failed to start PostgreSQL database"
    exit 1
fi

# Go back to Strapi directory
cd strapi-cms

# Build and start Strapi
print_status "Building and starting Strapi CMS..."
npm run build

print_success "🎉 B.Khrease Academic Strapi CMS setup completed!"

echo ""
echo "📋 Next Steps:"
echo "1. Start Strapi in development mode:"
echo "   cd strapi-cms && npm run develop"
echo ""
echo "2. Access the admin panel at: http://localhost:1337/admin"
echo "3. Create your first admin user"
echo "4. Access database admin at: http://localhost:8080 (optional)"
echo ""
echo "🔧 Configuration:"
echo "- Database: PostgreSQL running in Docker"
echo "- Admin Panel: http://localhost:1337/admin"
echo "- API Base URL: http://localhost:1337/api"
echo "- Database Admin: http://localhost:8080"
echo ""
echo "📚 Documentation:"
echo "- Strapi CMS README: strapi-cms/README.md"
echo "- API Documentation: Available in admin panel"
echo ""
echo "🔐 Security Notes:"
echo "- Secure keys have been generated automatically"
echo "- Update Cloudinary credentials in strapi-cms/.env for media storage"
echo "- Change default database password for production use"
echo ""
print_success "Setup completed successfully! 🚀"