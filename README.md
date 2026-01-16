# DCIM - Data Center Infrastructure Management System

A comprehensive web-based Data Center Infrastructure Management system built with Laravel 11, providing complete visibility and control over physical and cloud infrastructure resources.

## 🚀 Features

### Core Resource Management
- **Resource Catalog**: Full CRUD operations for IT resources with categorization
- **Reservation System**: Complete booking workflow with conflict detection and multi-level approval
- **User Management**: Role-based access control (Guest, Internal User, Technical Resource Manager, Administrator)
- **Incident Reporting**: Track and resolve infrastructure issues with status management
- **Activity Logging**: Comprehensive audit trail for all system actions
- **Real-time Notifications**: Email and in-app notifications for reservations and incidents

### DCIM Capabilities

#### Asset & Rack Management
- Physical asset tracking with lifecycle management
- Rack visualization showing U-unit allocation
- Serial number and warranty tracking
- Asset categorization and status monitoring

#### Room Management
- 2D interactive floor maps
- Visual rack placement with grid coordinates
- Heatmap visualization showing rack health status
- Color-coded status indicators (Normal, Warning, Critical)

#### Environmental Monitoring
- Real-time sensor data for power and temperature
- Historical trend tracking
- Alert thresholds and status monitoring
- Sensor readings visualization

#### Maintenance & Operations
- Maintenance ticket management
- Work order scheduling
- Asset assignment and tracking
- Status workflow (Scheduled → Completed)

#### Capacity Planning
- Rack space utilization tracking
- Power consumption monitoring
- Asset breakdown by category
- Utilization percentage calculations

#### Analytics & Reporting
- PUE (Power Usage Effectiveness) calculations
- Monthly cost projections
- Power consumption trends (6-month view)
- Asset value growth tracking
- Maintenance performance metrics

#### Hybrid Cloud Integration
- Unified dashboard for on-premise and cloud resources
- Multi-cloud support (AWS, Azure, GCP)
- Instance status monitoring
- Cost tracking per hour/month
- Simulated cloud resource synchronization

### Technical Features
- **Mobile Responsive**: Fully responsive design for all viewport sizes
- **Modern UI**: Clean, professional interface with consistent design language
- **Real-time Status**: Color-coded health indicators throughout
- **Secure Authentication**: Laravel Sanctum-based authentication
- **Database Migrations**: Version-controlled schema management

## 📋 Prerequisites

Before installing, ensure you have the following installed on your system:

- **PHP**: >= 8.2
- **Composer**: Latest version
- **MySQL**: >= 8.0 or MariaDB >= 10.3
- **Node.js**: >= 18.x (for asset compilation, optional)
- **Web Server**: Apache or Nginx (or use Laravel's built-in server for development)

## 🔧 Installation

### Quick Installation (Recommended)

We provide automated installation scripts that will:
- ✅ Create the database automatically
- ✅ Run all migrations
- ✅ Seed initial data
- ✅ Configure the application

**You only need to provide your MySQL password!**

#### Windows Users

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd fre_project
   ```

2. **Run the Installer**
   ```bash
   install.bat
   ```
   
   The script will:
   - Install PHP dependencies
   - Prompt for your MySQL root password
   - Create the database automatically
   - Set up all tables and data

#### Linux/Mac Users

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd fre_project
   ```

2. **Run the Installer**
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

### Manual Installation (Alternative)

If you prefer manual installation:

#### 1. Install Dependencies
```bash
composer install
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set your database password:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=data_center_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

#### 3. Run Installation Script
```bash
php install.php
```

This will automatically:
- Create the database
- Generate application key
- Run migrations
- Seed initial data

The seeder creates:
- 4 user roles with different permission levels
- 5 sample users (one for each role)
- 5 resource categories
- 20+ IT resources
- 2 server rooms with racks
- Environmental sensors with historical data
- Sample reservations and maintenance tickets
- 5 simulated cloud instances

### 7. (Optional) Compile Frontend Assets

If you plan to modify CSS/JS:

```bash
npm install
npm run dev
```

## 🚀 Running the Application

### Development Server

Start the Laravel development server:

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

### Production Deployment

For production, configure your web server (Apache/Nginx) to serve the `public` directory. Ensure:

1. Document root points to `/path/to/fre_project/public`
2. All requests are routed through `index.php`
3. PHP extensions are enabled: `pdo`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`

## 👥 Default User Accounts

The system comes with pre-configured user accounts for testing:

| Email | Password | Role | Access Level |
|-------|----------|------|--------------|
| `admin@datacenter.com` | `password` | Administrator | Full system access, all DCIM features |
| `manager@datacenter.com` | `password` | Technical Resource Manager | Resource management, reservation approval |
| `user@datacenter.com` | `password` | Internal User | Create reservations, view resources |
| `guest@datacenter.com` | `password` | Guest | View-only access |

**⚠️ Important**: Change these passwords immediately in production!

## 📱 Usage Guide

### For Administrators

1. **Dashboard**: Access at `/admin/dashboard`
   - Overview of system statistics
   - Quick actions for common tasks
   - Recent activity feed

2. **Room Management**: Navigate to `/admin/rooms`
   - Create new server rooms with dimensions
   - View 2D floor maps
   - Monitor rack placement and health

3. **Rack Management**: Navigate to `/admin/racks`
   - View rack layouts with U-unit visualization
   - See asset allocation
   - Monitor power and environmental status

4. **Monitoring**: Navigate to `/admin/monitoring`
   - Real-time sensor data
   - Power consumption tracking
   - Temperature monitoring

5. **Maintenance**: Navigate to `/admin/maintenance`
   - Create maintenance tickets
   - Schedule work orders
   - Track completion status

6. **Capacity Planning**: Navigate to `/admin/capacity`
   - View utilization percentages
   - Rack space availability
   - Power capacity planning

7. **Reports**: Navigate to `/admin/reports`
   - PUE calculations
   - Cost analysis
   - Trend visualization

8. **Hybrid Cloud**: Navigate to `/admin/hybrid`
   - View cloud instances
   - Monitor costs
   - Sync cloud resources

### For Managers

- Approve/reject resource reservations
- Manage resource inventory
- View system analytics

### For Users

- Browse available resources
- Create reservation requests
- Report incidents
- View reservation history

## 🗂️ Project Structure

```
fre_project/
├── app/
│   ├── Http/Controllers/     # Application controllers
│   ├── Models/               # Eloquent models
│   └── ...
├── database/
│   ├── migrations/           # Database schema migrations
│   └── seeders/              # Database seeders
├── public/                   # Web server document root
├── resources/
│   ├── views/                # Blade templates
│   └── css/                  # Stylesheets
├── routes/
│   └── web.php               # Application routes
└── storage/                  # Logs, cache, uploads
```

## 🔒 Security Features

- CSRF protection on all forms
- Password hashing with bcrypt
- Role-based access control
- SQL injection prevention via Eloquent ORM
- XSS protection via Blade templating
- Session security with secure cookies

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Test database connection
php artisan migrate:status

# Clear configuration cache
php artisan config:clear
```

### Permission Errors

```bash
# Fix storage permissions (Linux/Mac)
chmod -R 775 storage bootstrap/cache

# Fix ownership
chown -R www-data:www-data storage bootstrap/cache
```

### Clear Application Cache

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 📊 Database Schema

The system uses the following main tables:

- `users` - User accounts and authentication
- `roles` - User role definitions
- `resources` - IT resource catalog
- `categories` - Resource categorization
- `reservations` - Booking records
- `rooms` - Server room definitions
- `racks` - Physical rack inventory
- `sensors` - Environmental monitoring devices
- `sensor_readings` - Historical sensor data
- `maintenance_tickets` - Work order tracking
- `cloud_instances` - Cloud resource tracking
- `incidents` - Issue reporting
- `activity_logs` - Audit trail

## 🔄 Maintenance

### Backup Database

```bash
mysqldump -u username -p data_center_db > backup.sql
```

### Update Dependencies

```bash
composer update
php artisan migrate
```

### Clear Old Logs

```bash
# Logs are stored in storage/logs/
rm storage/logs/laravel-*.log
```

## 📝 API Documentation

The system currently uses web routes. For API development:

```bash
php artisan route:list  # View all available routes
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review Laravel documentation: https://laravel.com/docs
- Contact system administrator

## 🎯 Roadmap

Future enhancements planned:
- REST API for external integrations
- Advanced 3D rack visualization
- Automated capacity forecasting
- Integration with real cloud provider APIs
- Mobile native applications
- Advanced reporting with custom dashboards
- Workflow automation engine

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Built with**: Laravel 11, MySQL, Vanilla CSS/JS
