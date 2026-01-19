#!/bin/bash

echo "🚀 Setting up B.Khrease Academic Website..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up Husky hooks
echo "🪝 Setting up Git hooks..."
npx husky install
chmod +x .husky/pre-commit

# Run initial linting and formatting
echo "🔍 Running initial code quality checks..."
npm run lint:fix
npm run format

# Type check
echo "🔧 Running TypeScript type check..."
npm run type-check

echo "✅ Setup complete! You can now run:"
echo "   npm run dev    - Start development server"
echo "   npm run build  - Build for production"
echo "   npm run lint   - Run linting"

echo ""
echo "🌐 Open http://localhost:3000 to view the site"