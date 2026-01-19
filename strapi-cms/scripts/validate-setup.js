#!/usr/bin/env node

/**
 * Validation script for B.Khrease Strapi CMS setup
 * This script checks if all required components are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating B.Khrease Strapi CMS setup...\n');

let errors = [];
let warnings = [];

// Check if package.json exists and has required dependencies
function checkPackageJson() {
  const packagePath = path.join(__dirname, '..', 'package.json');

  if (!fs.existsSync(packagePath)) {
    errors.push('package.json not found');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  const requiredDeps = [
    '@strapi/strapi',
    '@strapi/plugin-users-permissions',
    '@strapi/plugin-i18n',
    '@strapi/provider-upload-cloudinary',
    'pg',
  ];

  const missingDeps = requiredDeps.filter(
    dep => !packageJson.dependencies[dep]
  );

  if (missingDeps.length > 0) {
    errors.push(`Missing dependencies: ${missingDeps.join(', ')}`);
  } else {
    console.log('✅ Package.json and dependencies are valid');
  }
}

// Check if .env file exists and has required variables
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');

  if (!fs.existsSync(envPath)) {
    warnings.push('.env file not found - copy from .env.example');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');

  const requiredVars = [
    'APP_KEYS',
    'API_TOKEN_SALT',
    'ADMIN_JWT_SECRET',
    'TRANSFER_TOKEN_SALT',
    'JWT_SECRET',
    'DATABASE_CLIENT',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_NAME',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
  ];

  const missingVars = requiredVars.filter(
    varName => !envContent.includes(varName)
  );

  if (missingVars.length > 0) {
    errors.push(`Missing environment variables: ${missingVars.join(', ')}`);
  } else {
    console.log('✅ Environment variables are configured');
  }

  // Check for placeholder values
  if (envContent.includes('your-app-keys-here')) {
    warnings.push('APP_KEYS still contains placeholder values');
  }

  if (envContent.includes('your-cloudinary-name')) {
    warnings.push(
      'Cloudinary credentials not configured (optional for local development)'
    );
  }
}

// Check if content types exist
function checkContentTypes() {
  const contentTypesPath = path.join(__dirname, '..', 'src', 'api');

  if (!fs.existsSync(contentTypesPath)) {
    errors.push('Content types directory not found');
    return;
  }

  const requiredContentTypes = [
    'homepage',
    'team-member',
    'blog-post',
    'news-item',
    'service',
    'category',
  ];

  const existingContentTypes = fs.readdirSync(contentTypesPath);
  const missingContentTypes = requiredContentTypes.filter(
    ct => !existingContentTypes.includes(ct)
  );

  if (missingContentTypes.length > 0) {
    errors.push(`Missing content types: ${missingContentTypes.join(', ')}`);
  } else {
    console.log('✅ All content types are present');
  }
}

// Check if components exist
function checkComponents() {
  const componentsPath = path.join(__dirname, '..', 'src', 'components');

  if (!fs.existsSync(componentsPath)) {
    errors.push('Components directory not found');
    return;
  }

  const requiredComponents = [
    'shared/seo.json',
    'content/bold-values.json',
    'content/statistics.json',
    'content/social-links.json',
    'content/contact-info.json',
    'content/registration-detail.json',
  ];

  const missingComponents = requiredComponents.filter(
    comp => !fs.existsSync(path.join(componentsPath, comp))
  );

  if (missingComponents.length > 0) {
    errors.push(`Missing components: ${missingComponents.join(', ')}`);
  } else {
    console.log('✅ All components are present');
  }
}

// Check if config files exist
function checkConfigFiles() {
  const configPath = path.join(__dirname, '..', 'config');

  const requiredConfigs = [
    'database.js',
    'server.js',
    'admin.js',
    'middlewares.js',
    'plugins.js',
  ];

  const missingConfigs = requiredConfigs.filter(
    config => !fs.existsSync(path.join(configPath, config))
  );

  if (missingConfigs.length > 0) {
    errors.push(`Missing config files: ${missingConfigs.join(', ')}`);
  } else {
    console.log('✅ All configuration files are present');
  }
}

// Run all checks
checkPackageJson();
checkEnvFile();
checkContentTypes();
checkComponents();
checkConfigFiles();

// Display results
console.log('\n📊 Validation Results:');

if (errors.length > 0) {
  console.log('\n❌ Errors found:');
  errors.forEach(error => console.log(`  - ${error}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(warning => console.log(`  - ${warning}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(
    '\n🎉 All checks passed! Your Strapi CMS is properly configured.'
  );
  console.log('\nNext steps:');
  console.log('1. Start PostgreSQL: docker-compose up -d postgres');
  console.log('2. Run Strapi: npm run develop');
  console.log('3. Access admin panel: http://localhost:1337/admin');
} else if (errors.length === 0) {
  console.log('\n✅ Setup is valid with minor warnings.');
  console.log('You can proceed with starting the CMS.');
} else {
  console.log('\n❌ Please fix the errors before starting the CMS.');
  process.exit(1);
}

console.log('\n🔗 Useful links:');
console.log('- Strapi Documentation: https://docs.strapi.io/');
console.log('- B.Khrease CMS README: ./README.md');
console.log('- Setup Script: ../setup-strapi.sh');
