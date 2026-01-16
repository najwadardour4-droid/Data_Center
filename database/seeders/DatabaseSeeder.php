<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use App\Models\Resource;
use App\Models\Reservation;
use App\Models\Log;
use App\Models\Notification;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Roles
        $roles = [
            'guest' => 'Guest',
            'user' => 'Internal User',
            'manager' => 'Technical Resource Manager',
            'admin' => 'Data Center Administrator',
        ];

        foreach ($roles as $key => $name) {
            Role::firstOrCreate(['name' => $name]);
        }

        $adminRole = Role::where('name', 'Data Center Administrator')->first();
        $managerRole = Role::where('name', 'Technical Resource Manager')->first();
        $userRole = Role::where('name', 'Internal User')->first();
        $guestRole = Role::where('name', 'Guest')->first();


        // 2. Create Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@datacenter.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );

        $manager = User::firstOrCreate(
            ['email' => 'manager@datacenter.com'],
            [
                'name' => 'Alex Manager',
                'password' => Hash::make('password'),
                'role_id' => $managerRole->id,
            ]
        );

        $user1 = User::firstOrCreate(
            ['email' => 'user@datacenter.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role_id' => $userRole->id,
            ]
        );

        $user2 = User::firstOrCreate(
            ['email' => 'jane@datacenter.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password'),
                'role_id' => $userRole->id,
            ]
        );

        // 3. Create Categories
        $categories = [
            'Server' => 'Physical rack-mounted servers for high-performance computing.',
            'Virtual Machine' => 'Flexible cloud instances for development and testing.',
            'Storage' => 'High-capacity SAN and NAS storage blocks.',
            'Network Equipment' => 'Switches, Routers, and Firewalls.',
        ];

        foreach ($categories as $name => $desc) {
            Category::firstOrCreate(['name' => $name], ['description' => $desc]);
        }
        
        $serverCat = Category::where('name', 'Server')->first();
        $vmCat = Category::where('name', 'Virtual Machine')->first();
        $storageCat = Category::where('name', 'Storage')->first();
        $networkCat = Category::where('name', 'Network Equipment')->first();

        // 3.1 Create Rooms & Racks
        $room1 = \App\Models\Room::create([
            'name' => 'Server Room A',
            'floor' => '1',
            'dimensions' => ['width' => 10, 'length' => 15], // Meters
        ]);

        $rackA1 = \App\Models\Rack::create([
            'room_id' => $room1->id,
            'name' => 'Rack A1',
            'height_u' => 42,
            'max_power_watts' => 5000,
            'layout_x' => 1,
            'layout_y' => 1,
        ]);
        
        $rackB2 = \App\Models\Rack::create([
            'room_id' => $room1->id,
            'name' => 'Rack B2',
            'height_u' => 42,
            'max_power_watts' => 6000,
            'layout_x' => 4,
            'layout_y' => 1,
        ]);

        // 4. Create Resources
        $resources = [
            [
                'category_id' => $serverCat->id,
                'manager_id' => $manager->id,
                'name' => 'Dell PowerEdge R740',
                'specifications' => [
                    'cpu' => '2x Intel Xeon Gold 6248',
                    'ram' => '256GB DDR4',
                    'storage' => '2x 480GB SSD (OS) + 4x 4TB HDD (Data)',
                    'form_factor' => '2U Rackmount',
                    'location' => 'Rack A1, U12-13'
                ],
                'status' => 'available',
                'is_active' => true,
                'rack_id' => $rackA1->id,
                'u_position' => 12,
                'u_height' => 2,
                'serial_number' => 'DELL-12345X',
                'purchase_date' => Carbon::parse('2023-01-15'),
                'lifecycle_status' => 'deployed'
            ],
            [
                'category_id' => $serverCat->id,
                'manager_id' => $manager->id,
                'name' => 'HPE ProLiant DL380 Gen10',
                'specifications' => [
                    'cpu' => '2x Intel Xeon Silver 4210R',
                    'ram' => '128GB DDR4',
                    'storage' => '8x 1.2TB SAS 10k',
                    'form_factor' => '2U Rackmount',
                    'location' => 'Rack A1, U14-15'
                ],
                'status' => 'available',
                'is_active' => true
            ],
            [
                'category_id' => $vmCat->id,
                'manager_id' => $manager->id,
                'name' => 'Dev-Env-Ubuntu-01',
                'specifications' => [
                    'vcpu' => '4 vCPU',
                    'ram' => '16GB',
                    'storage' => '100GB NVMe',
                    'os' => 'Ubuntu 22.04 LTS',
                    'ip' => '10.0.0.15'
                ],
                'status' => 'available',
                'is_active' => true
            ],
            [
                'category_id' => $vmCat->id,
                'manager_id' => $manager->id,
                'name' => 'Win-Server-2022-Test',
                'specifications' => [
                    'vcpu' => '8 vCPU',
                    'ram' => '32GB',
                    'storage' => '250GB NVMe',
                    'os' => 'Windows Server 2022',
                    'ip' => '10.0.0.20'
                ],
                'status' => 'available',
                'is_active' => true
            ],
            [
                'category_id' => $storageCat->id,
                'manager_id' => $manager->id,
                'name' => 'NetApp FAS2750',
                'specifications' => [
                    'capacity' => '50TB Usable',
                    'protocol' => 'NFS/CIFS',
                    'connectivity' => '10GbE',
                    'location' => 'Rack B2'
                ],
                'status' => 'maintenance',
                'is_active' => true
            ],
            [
                'category_id' => $networkCat->id,
                'manager_id' => $manager->id,
                'name' => 'Cisco Catalyst 9300',
                'specifications' => [
                    'ports' => '48x 1GbE PoE+',
                    'uplink' => '4x 10GbE SFP+',
                    'type' => 'L3 Switch',
                    'location' => 'Rack A1, Top'
                ],
                'status' => 'available',
                'is_active' => true,
                'rack_id' => $rackA1->id,
                'u_position' => 41,
                'u_height' => 1,
                'serial_number' => 'CSCO-998877',
            ],
            [
                'category_id' => $serverCat->id,
                'manager_id' => $manager->id,
                'name' => 'NVIDIA DGX A100 (AI Lab)',
                'specifications' => [
                    'gpu' => '8x A100 80GB',
                    'cpu' => '2x AMD EPYC 7742',
                    'ram' => '2TB',
                    'storage' => '30TB NVMe',
                    'purpose' => 'Deep Learning Training'
                ],
                'status' => 'available',
                'is_active' => true,
                'rack_id' => $rackB2->id,
                'u_position' => 10,
                'u_height' => 6,
                'serial_number' => 'NV-DGX-001',
                'purchase_date' => Carbon::parse('2024-06-01'),
            ]
        ];

        foreach ($resources as $res) {
            Resource::create($res);
        }

        // Create Sensor Readings History (Last 24 hours - simplified)
        
        // --- Phase 4: Cloud & Hybrid Integration ---
        // Seed Simulated Cloud Instances
        \App\Models\CloudInstance::create([
            'name' => 'Web-Server-Cluster-Primary',
            'provider' => 'AWS',
            'instance_type' => 'm5.large',
            'region' => 'us-east-1',
            'status' => 'Running',
            'cost_per_hour' => 0.096
        ]);

        \App\Models\CloudInstance::create([
            'name' => 'DB-Replica-Async',
            'provider' => 'AWS',
            'instance_type' => 'r5.large',
            'region' => 'us-east-1',
            'status' => 'Running',
            'cost_per_hour' => 0.126
        ]);

        \App\Models\CloudInstance::create([
            'name' => 'Analytics-Processor-Batch',
            'provider' => 'Azure',
            'instance_type' => 'Standard_D2s_v3',
            'region' => 'East US',
            'status' => 'Stopped',
            'cost_per_hour' => 0.096
        ]);

        \App\Models\CloudInstance::create([
            'name' => 'Backup-Grave-Storage',
            'provider' => 'GCP',
            'instance_type' => 'n1-standard-1',
            'region' => 'us-central1',
            'status' => 'Running',
            'cost_per_hour' => 0.0475
        ]);

        \App\Models\CloudInstance::create([
            'name' => 'Dev-Environment-Beta',
            'provider' => 'AWS',
            'instance_type' => 't3.medium',
            'region' => 'eu-west-1',
            'status' => 'Running',
            'cost_per_hour' => 0.0416
        ]);

        // 5. Create Reservations (History & Active)
        $dellServer = Resource::where('name', 'Dell PowerEdge R740')->first();
        $ubuntuVm = Resource::where('name', 'Dev-Env-Ubuntu-01')->first();
        $gpuServer = Resource::where('name', 'NVIDIA DGX A100 (AI Lab)')->first();

        // Past Completed Reservation
        Reservation::create([
            'user_id' => $user1->id,
            'resource_id' => $dellServer->id,
            'start_time' => Carbon::now()->subDays(10),
            'end_time' => Carbon::now()->subDays(8),
            'status' => 'completed',
            'justification' => 'Performance benchmarking for Project X',
        ]);

        // Active Reservation (Right Now)
        Reservation::create([
            'user_id' => $user2->id,
            'resource_id' => $ubuntuVm->id,
            'start_time' => Carbon::now()->subHours(2),
            'end_time' => Carbon::now()->addDays(2),
            'status' => 'approved', // Active effectively
            'justification' => 'Sprint 4 Development Environment',
        ]);

        // Future Approved Reservation
        Reservation::create([
            'user_id' => $user1->id,
            'resource_id' => $gpuServer->id,
            'start_time' => Carbon::now()->addDays(5),
            'end_time' => Carbon::now()->addDays(7),
            'status' => 'approved',
            'justification' => 'Training Large Language Model',
        ]);

        // Pending Reservation
        Reservation::create([
            'user_id' => $user2->id,
            'resource_id' => $dellServer->id,
            'start_time' => Carbon::now()->addDays(3),
            'end_time' => Carbon::now()->addDays(4),
            'status' => 'pending',
            'justification' => 'Load testing web server',
        ]);

        // Rejected Reservation
        Reservation::create([
            'user_id' => $user1->id,
            'resource_id' => $gpuServer->id,
            'start_time' => Carbon::now()->subDays(2),
            'end_time' => Carbon::now()->subDays(1),
            'status' => 'rejected',
            'justification' => 'Impromptu AI analysis',
            'rejection_reason' => 'Scheduled Maintenance window',
        ]);

        // 6. Create Logs
        Log::create([
            'user_id' => $manager->id,
            'action' => 'Resource Created',
            'details' => 'Added new server: NVIDIA DGX A100',
        ]);

        Log::create([
            'user_id' => $user1->id,
            'action' => 'Reservation Created',
            'details' => 'Reservation #1 created for resource: Dell PowerEdge R740',
        ]);

        Log::create([
            'user_id' => $manager->id,
            'action' => 'Reservation Updated',
            'details' => 'Reservation #5 (GPU Server) rejected due to maintenance.',
        ]);

        // 7. Create Notifications
        Notification::create([
            'user_id' => $user1->id,
            'type' => 'error',
            'message' => 'Your reservation for NVIDIA DGX A100 (AI Lab) has been Rejected. Reason: Scheduled Maintenance window',
            'read_at' => Carbon::now()->subDay(),
        ]);

        Notification::create([
            'user_id' => $user1->id,
            'type' => 'success',
            'message' => 'Your reservation for NVIDIA DGX A100 (AI Lab) has been Approved.',
            'created_at' => Carbon::now()->subHours(1),
        ]);
        
        Notification::create([
            'user_id' => $user2->id,
            'type' => 'success',
            'message' => 'Your reservation for Dev-Env-Ubuntu-01 has been Approved.',
            'read_at' => Carbon::now()->subHours(1),
        ]);
        // 5. Create Sensors & Sim Data
        $sensors = [];
        
        // Rack A1 Sensors
        $sensors[] = \App\Models\Sensor::create([
            'rack_id' => $rackA1->id,
            'type' => 'temperature',
            'name' => 'Rack A1 Top Temp',
            'unit' => '°C',
            'current_value' => 24.5,
            'status' => 'normal',
        ]);
        
        $sensors[] = \App\Models\Sensor::create([
            'rack_id' => $rackA1->id,
            'type' => 'power',
            'name' => 'Rack A1 PDU A',
            'unit' => 'W',
            'current_value' => 2450.0,
            'status' => 'normal',
        ]);
        
        // Rack B2 Sensors
        $sensors[] = \App\Models\Sensor::create([
            'rack_id' => $rackB2->id,
            'type' => 'temperature',
            'name' => 'Rack B2 Top Temp',
            'unit' => '°C',
            'current_value' => 28.2, // Slightly hot
            'status' => 'warning',
        ]);

        // Generate Readings
        foreach ($sensors as $sensor) {
            $baseVal = $sensor->current_value;
            for ($i = 0; $i < 24; $i++) {
                 // Random fluctuation
                 $val = $baseVal + (rand(-10, 10) / 10); 
                 \App\Models\SensorReading::create([
                     'sensor_id' => $sensor->id,
                     'value' => $val,
                     'recorded_at' => \Carbon\Carbon::now()->subHours(24 - $i),
                 ]);
            }
        }
    }
}
