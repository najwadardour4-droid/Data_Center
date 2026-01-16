
export enum UserRole {
  GUEST = 'Guest',
  INTERNAL_USER = 'Internal User',
  TECH_MANAGER = 'Technical Resource Manager',
  ADMIN = 'Data Center Administrator'
}

export enum ResourceType {
  SERVER = 'Server',
  VM = 'Virtual Machine',
  STORAGE = 'Storage',
  NETWORK = 'Network Equipment'
}

export enum ResourceStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline'
}

export enum ReservationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
    os?: string;
    location: string;
    form_factor?: string;
  };
  managerId: string;
}

export interface Reservation {
  id: string;
  resourceId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: ReservationStatus;
  justification: string;
  rejectionReason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}
