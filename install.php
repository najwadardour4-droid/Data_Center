<?php

/**
 * DCIM System - Automated Installation Script
 * 
 * This script will:
 * 1. Create the database automatically
 * 2. Run all migrations
 * 3. Seed the database with initial data
 * 
 * Usage: php install.php
 */

echo "\n";
echo "╔════════════════════════════════════════════════════════════╗\n";
echo "║   Data Center Infrastructure Management System (DCIM)     ║\n";
echo "║                  Automated Installation                    ║\n";
echo "╚════════════════════════════════════════════════════════════╝\n";
echo "\n";

// Check if .env file exists
if (!file_exists('.env')) {
    echo "⚠️  .env file not found. Copying from .env.example...\n";
    if (file_exists('.env.example')) {
        copy('.env.example', '.env');
        echo "✓ .env file created successfully.\n\n";
    } else {
        echo "❌ Error: .env.example file not found!\n";
        exit(1);
    }
}

// Prompt for database password
echo "Please enter your MySQL root password (press Enter if no password): ";
$handle = fopen("php://stdin", "r");
$dbPassword = trim(fgets($handle));
fclose($handle);

echo "\n";

// Database configuration
$dbHost = '127.0.0.1';
$dbPort = '3306';
$dbName = 'data_center_db';
$dbUser = 'root';

echo "📋 Configuration:\n";
echo "   Database Host: $dbHost\n";
echo "   Database Port: $dbPort\n";
echo "   Database Name: $dbName\n";
echo "   Database User: $dbUser\n";
echo "\n";

// Step 1: Update .env file
echo "Step 1/5: Updating .env configuration...\n";
$envContent = file_get_contents('.env');

// Update database configuration
$envContent = preg_replace('/DB_HOST=.*/m', "DB_HOST=$dbHost", $envContent);
$envContent = preg_replace('/DB_PORT=.*/m', "DB_PORT=$dbPort", $envContent);
$envContent = preg_replace('/DB_DATABASE=.*/m', "DB_DATABASE=$dbName", $envContent);
$envContent = preg_replace('/DB_USERNAME=.*/m', "DB_USERNAME=$dbUser", $envContent);
$envContent = preg_replace('/DB_PASSWORD=.*/m', "DB_PASSWORD=$dbPassword", $envContent);

file_put_contents('.env', $envContent);
echo "✓ .env file updated successfully.\n\n";

// Step 2: Create database
echo "Step 2/5: Creating database '$dbName'...\n";
try {
    $pdo = new PDO("mysql:host=$dbHost;port=$dbPort", $dbUser, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Drop database if exists (for fresh installation)
    $pdo->exec("DROP DATABASE IF EXISTS `$dbName`");
    echo "   - Dropped existing database (if any)\n";
    
    // Create database
    $pdo->exec("CREATE DATABASE `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Database '$dbName' created successfully.\n\n";
} catch (PDOException $e) {
    echo "❌ Error creating database: " . $e->getMessage() . "\n";
    echo "Please check your MySQL credentials and try again.\n";
    exit(1);
}

// Step 3: Generate application key
echo "Step 3/5: Generating application key...\n";
exec('php artisan key:generate --force', $output, $returnCode);
if ($returnCode === 0) {
    echo "✓ Application key generated successfully.\n\n";
} else {
    echo "⚠️  Warning: Could not generate application key automatically.\n";
    echo "   Please run: php artisan key:generate\n\n";
}

// Step 4: Run migrations
echo "Step 4/5: Running database migrations...\n";
exec('php artisan migrate:fresh --force 2>&1', $output, $returnCode);
if ($returnCode === 0) {
    echo "✓ Database migrations completed successfully.\n\n";
} else {
    echo "❌ Error running migrations:\n";
    echo implode("\n", $output) . "\n";
    exit(1);
}

// Step 5: Seed database
echo "Step 5/5: Seeding database with initial data...\n";
exec('php artisan db:seed --force 2>&1', $output, $returnCode);
if ($returnCode === 0) {
    echo "✓ Database seeded successfully.\n\n";
} else {
    echo "❌ Error seeding database:\n";
    echo implode("\n", $output) . "\n";
    exit(1);
}

// Installation complete
echo "╔════════════════════════════════════════════════════════════╗\n";
echo "║              ✓ Installation Complete!                     ║\n";
echo "╚════════════════════════════════════════════════════════════╝\n";
echo "\n";
echo "🎉 Your DCIM system is ready to use!\n\n";
echo "Default User Accounts:\n";
echo "┌─────────────────────────────┬──────────┬──────────────────┐\n";
echo "│ Email                       │ Password │ Role             │\n";
echo "├─────────────────────────────┼──────────┼──────────────────┤\n";
echo "│ admin@datacenter.com        │ password │ Administrator    │\n";
echo "│ manager@datacenter.com      │ password │ Manager          │\n";
echo "│ user@datacenter.com         │ password │ Internal User    │\n";
echo "│ guest@datacenter.com        │ password │ Guest            │\n";
echo "└─────────────────────────────┴──────────┴──────────────────┘\n";
echo "\n";
echo "⚠️  IMPORTANT: Change these passwords immediately in production!\n\n";
echo "To start the application:\n";
echo "   php artisan serve\n\n";
echo "Then visit: http://localhost:8000\n\n";
