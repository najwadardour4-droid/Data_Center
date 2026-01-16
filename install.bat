@echo off
REM Windows Batch Script for DCIM Installation

echo.
echo ============================================================
echo   Data Center Infrastructure Management System (DCIM)
echo                  Automated Installation
echo ============================================================
echo.

REM Check if PHP is installed
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PHP is not installed or not in PATH
    echo Please install PHP 8.2 or higher and try again.
    pause
    exit /b 1
)

REM Check if Composer is installed
where composer >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Composer is not installed or not in PATH
    echo Please install Composer and try again.
    pause
    exit /b 1
)

echo Step 1: Installing PHP dependencies...
call composer install --no-interaction
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo Step 2: Running installation script...
php install.php
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Installation failed
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
pause
