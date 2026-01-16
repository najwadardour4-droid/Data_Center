
import React from 'react';
import { Server, Cpu, Database, Network, LayoutDashboard, Calendar, Settings, Shield, Bell, Users, BarChart3, AlertTriangle, Plus } from 'lucide-react';
import { ResourceType, ResourceStatus, ReservationStatus, UserRole } from './types';

export const MOCK_RESOURCES = [
  {
    id: 'res-1',
    name: 'Dell PowerEdge R740',
    type: ResourceType.SERVER,
    status: ResourceStatus.AVAILABLE,
    specs: { cpu: 'Intel Xeon Gold', ram: '128GB', storage: '2TB NVMe', location: 'Rack A-12', os: 'Ubuntu 22.04' },
    managerId: 'mgr-1'
  },
  {
    id: 'res-2',
    name: 'Research Node VM 01',
    type: ResourceType.VM,
    status: ResourceStatus.RESERVED,
    specs: { cpu: '8 vCPUs', ram: '32GB', storage: '500GB SSD', location: 'Cluster Proxmox-01', os: 'Debian 11' },
    managerId: 'mgr-1'
  },
  {
    id: 'res-3',
    name: 'SAN Storage Array B',
    type: ResourceType.STORAGE,
    status: ResourceStatus.MAINTENANCE,
    specs: { storage: '50TB RAW', bandwidth: '10Gbps', location: 'Rack D-04' },
    managerId: 'mgr-2'
  },
  {
    id: 'res-4',
    name: 'Cisco Catalyst 9300',
    type: ResourceType.NETWORK,
    status: ResourceStatus.AVAILABLE,
    specs: { bandwidth: '40Gbps', location: 'Rack C-01' },
    managerId: 'mgr-2'
  },
  {
    id: 'res-5',
    name: 'HPC Compute Node 05',
    type: ResourceType.SERVER,
    status: ResourceStatus.AVAILABLE,
    specs: { cpu: 'Dual EPYC 7742', ram: '512GB', storage: '4TB NVMe', location: 'Rack H-01' },
    managerId: 'mgr-1'
  }
];

export const MOCK_RESERVATIONS = [
  {
    id: 'rev-1',
    resourceId: 'res-2',
    userId: 'user-1',
    startDate: '2023-10-25',
    endDate: '2023-11-05',
    status: ReservationStatus.ACTIVE,
    justification: 'Running data analysis for physics simulation.'
  },
  {
    id: 'rev-2',
    resourceId: 'res-1',
    userId: 'user-1',
    startDate: '2023-11-10',
    endDate: '2023-11-15',
    status: ReservationStatus.PENDING,
    justification: 'Training large language model for medical research.'
  }
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [UserRole.ADMIN, UserRole.TECH_MANAGER, UserRole.INTERNAL_USER] },
  { id: 'catalog', label: 'Resources', icon: <Server size={20} />, roles: [UserRole.ADMIN, UserRole.TECH_MANAGER, UserRole.INTERNAL_USER, UserRole.GUEST] },
  { id: 'new-reservation', label: 'New Reservation', icon: <Plus size={20} />, roles: [UserRole.INTERNAL_USER] },
  { id: 'my-reservations', label: 'My Bookings', icon: <Calendar size={20} />, roles: [UserRole.INTERNAL_USER] },
  { id: 'requests', label: 'Pending Requests', icon: <Shield size={20} />, roles: [UserRole.TECH_MANAGER, UserRole.ADMIN] },
  { id: 'users', label: 'User Management', icon: <Users size={20} />, roles: [UserRole.ADMIN] },
  { id: 'stats', label: 'Analytics', icon: <BarChart3 size={20} />, roles: [UserRole.ADMIN, UserRole.TECH_MANAGER] },
  { id: 'incidents', label: 'Incidents', icon: <AlertTriangle size={20} />, roles: [UserRole.TECH_MANAGER, UserRole.INTERNAL_USER, UserRole.ADMIN] },
];
