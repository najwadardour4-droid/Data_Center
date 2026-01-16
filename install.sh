#!/bin/bash

# Linux/Mac Installation Script for DCIM

echo ""
echo "============================================================"
echo "  Data Center Infrastructure Management System (DCIM)"
echo "                 Automated Installation"
echo "============================================================"
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ ERROR: PHP is not installed"
    echo "Please install PHP 8.2 or higher and try again."
    exit 1
fi

# Check if Composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ ERROR: Composer is not installed"
    echo "Please install Composer and try again."
    exit 1
fi

echo "Step 1: Installing PHP dependencies..."
composer install --no-interaction
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Failed to install dependencies"
    exit 1
fi
echo ""

echo "Step 2: Running installation script..."
php install.php
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Installation failed"
    exit 1
fi

echo ""
echo "✓ Installation completed successfully!"
echo ""
