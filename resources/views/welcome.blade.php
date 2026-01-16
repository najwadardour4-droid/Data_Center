{{-- Converted from client/pages/Welcome.tsx to Blade --}}
{{-- Note: This file uses Tailwind CSS classes. Replace route(...) helpers with actual URLs if your named routes differ. --}}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>DataCenter Pro — Welcome</title>
  {{-- Ensure Tailwind CSS is loaded in your layout or include it here --}}
</head>
<body class="min-h-screen bg-white">

  {{-- Navigation --}}
  <nav class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
          DC
        </div>
        <span class="font-bold text-lg text-slate-900">DataCenter Pro</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="{{ route('login') }}" class="inline-flex items-center">
          <span class="px-2 py-1 rounded text-sm text-slate-700 hover:text-slate-900">Login</span>
        </a>

       
      </div>
    </div>
  </nav>

  {{-- Hero Section --}}
  <section class="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 lg:py-32">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Data Center Resource Management System
        </h1>
        <p class="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
          Efficiently manage, reserve, and track IT infrastructure resources including servers,
          virtual machines, storage, and network equipment with a modern, intuitive platform.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="{{ route('login') }}" class="inline-block w-full sm:w-auto">
            <span class="inline-block text-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium w-full sm:w-auto">Login to Dashboard</span>
          </a>

            <span class="inline-block text-center px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-blue-900 font-semibold w-full sm:w-auto">Create Account</span>
          </a>

          <a href="{{ url('/resources') }}" class="inline-block w-full sm:w-auto">
            <span class="inline-block text-center px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold w-full sm:w-auto">View Resources</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  {{-- About Section --}}
  <section class="py-16 lg:py-24 bg-slate-50">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 text-center">
          About the Platform
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span class="w-6 h-6 text-blue-600 inline-block" aria-hidden="true"></span>
              Comprehensive Resource Tracking
            </h3>
            <p class="text-slate-600 leading-relaxed">
              Monitor and manage all your data center infrastructure in one unified platform. Track servers,
              virtual machines, storage arrays, and network equipment with real-time visibility.
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span class="w-6 h-6 text-blue-600 inline-block" aria-hidden="true"></span>
              Reservation & Conflict Management
            </h3>
            <p class="text-slate-600 leading-relaxed">
              Streamline resource allocation with intelligent reservation system. Automatic conflict detection
              prevents double-booking and ensures optimal resource utilization.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {{-- Key Features Section --}}
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">
        Key Features
      </h2>
      <p class="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
        Everything you need to efficiently manage your data center infrastructure
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {{-- Feature 1 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-blue-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Server Management</h3>
          <p class="text-slate-600 text-sm">
            Complete inventory and monitoring of physical and virtual servers with detailed specifications.
          </p>
        </div>

        {{-- Feature 2 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-cyan-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Storage Solutions</h3>
          <p class="text-slate-600 text-sm">
            Track and allocate storage resources across multiple arrays, tiers, and backup systems.
          </p>
        </div>

        {{-- Feature 3 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-purple-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">VM Allocation</h3>
          <p class="text-slate-600 text-sm">
            Manage virtual machine deployment and resource assignment with real-time conflict resolution.
          </p>
        </div>

        {{-- Feature 4 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-orange-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Real-time Analytics</h3>
          <p class="text-slate-600 text-sm">
            Dashboard insights with live metrics, utilization rates, and predictive analytics.
          </p>
        </div>

        {{-- Feature 5 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-green-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Reservation System</h3>
          <p class="text-slate-600 text-sm">
            Intuitive booking system with calendar view and automated conflict detection.
          </p>
        </div>

        {{-- Feature 6 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-red-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Access Control</h3>
          <p class="text-slate-600 text-sm">
            Role-based permissions and audit trails for compliance and security.
          </p>
        </div>

        {{-- Feature 7 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-indigo-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Team Collaboration</h3>
          <p class="text-slate-600 text-sm">
            Notifications, comments, and activity logs for seamless team coordination.
          </p>
        </div>

        {{-- Feature 8 --}}
        <div class="p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-teal-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Traceability</h3>
          <p class="text-slate-600 text-sm">
            Complete audit trail of all actions and changes for compliance requirements.
          </p>
        </div>
      </div>
    </div>
  </section>

  {{-- User Roles Section --}}
  <section class="py-16 lg:py-24 bg-slate-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">
        User Roles & Permissions
      </h2>
      <p class="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
        Flexible access control tailored to different organizational roles
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {{-- Guest Role --}}
        <div class="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-slate-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-3">Guest</h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>View public resources</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Browse availability</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Request access</span>
            </li>
          </ul>
        </div>

        {{-- Internal User Role --}}
        <div class="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-blue-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-3">Internal User</h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Make reservations</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>View owned resources</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Track usage metrics</span>
            </li>
          </ul>
        </div>

        {{-- Manager Role --}}
        <div class="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-purple-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-3">Manager</h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Manage team resources</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Approve reservations</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>View analytics reports</span>
            </li>
          </ul>
        </div>

        {{-- Admin Role --}}
        <div class="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <span class="w-6 h-6 text-red-600 inline-block" aria-hidden="true"></span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-3">Administrator</h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>Full system access</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>User & role management</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span>System configuration</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {{-- Statistics & Dashboard Preview Section --}}
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">
        Dashboard Overview
      </h2>
      <p class="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
        Real-time insights and metrics at a glance
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <p class="text-sm font-medium text-blue-600 mb-2">Total Resources</p>
          <p class="text-3xl font-bold text-blue-900">1,284</p>
          <p class="text-xs text-blue-600 mt-2">+12 this month</p>
        </div>

        <div class="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <p class="text-sm font-medium text-purple-600 mb-2">Active Reservations</p>
          <p class="text-3xl font-bold text-purple-900">342</p>
          <p class="text-xs text-purple-600 mt-2">78% occupancy rate</p>
        </div>

        <div class="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <p class="text-sm font-medium text-green-600 mb-2">Available Resources</p>
          <p class="text-3xl font-bold text-green-900">942</p>
          <p class="text-xs text-green-600 mt-2">22% available</p>
        </div>

        <div class="p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
          <p class="text-sm font-medium text-orange-600 mb-2">System Health</p>
          <p class="text-3xl font-bold text-orange-900">99.8%</p>
          <p class="text-xs text-orange-600 mt-2">All systems operational</p>
        </div>
      </div>

      <div class="bg-slate-50 border border-slate-200 rounded-lg p-8">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Resource Utilization Trend</h3>
        <div class="h-64 flex items-center justify-center text-slate-400">
          <div class="text-center">
            <span class="inline-block w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true"></span>
            <p>Utilization chart will display real-time data</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {{-- Security & Technology Section --}}
  <section class="py-16 lg:py-24 bg-slate-900 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-center">
        Security & Technology
      </h2>
      <p class="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
        Enterprise-grade security and modern technology stack
      </p>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold flex items-center gap-2 mb-4">
            <span class="w-6 h-6 text-blue-400 inline-block" aria-hidden="true"></span>
            Security
          </h3>
          <ul class="space-y-3 text-slate-300">
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
              Laravel authentication
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
              Role-based permissions
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
              Encrypted credentials
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
              Comprehensive logging
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold flex items-center gap-2 mb-4">
            <span class="w-6 h-6 text-cyan-400 inline-block" aria-hidden="true"></span>
            Technology Stack
          </h3>
          <ul class="space-y-3 text-slate-300">
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
              Laravel PHP Framework
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
              MySQL Database
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
              Tailwind CSS
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-cyan-400 rounded-full inline-block"></span>
              RESTful API
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold flex items-center gap-2 mb-4">
            <span class="w-6 h-6 text-green-400 inline-block" aria-hidden="true"></span>
            Compliance
          </h3>
          <ul class="space-y-3 text-slate-300">
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Audit trails
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Data privacy
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Activity logging
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Backup & recovery
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {{-- Footer --}}
  <footer class="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              DC
            </div>
            <span class="font-semibold text-white">DataCenter Pro</span>
          </div>
          <p class="text-sm">Enterprise resource management for data centers</p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Product</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Company</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">About</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Connect</h4>
          <div class="flex gap-4">
            <a href="#" class="hover:text-white transition-colors" aria-label="Github">
              <span class="inline-block w-5 h-5" aria-hidden="true"></span>
            </a>
            <a href="#" class="hover:text-white transition-colors" aria-label="LinkedIn">
              <span class="inline-block w-5 h-5" aria-hidden="true"></span>
            </a>
            <a href="#" class="hover:text-white transition-colors" aria-label="Mail">
              <span class="inline-block w-5 h-5" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>&copy; 2024 DataCenter Pro. All rights reserved.</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>