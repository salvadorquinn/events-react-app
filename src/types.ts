export type Role = 'super-admin' | 'admin' | 'marketing-supervisor' | 'marketing' | 'marketing-intern';
export type { Event } from './types/event';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  created_at?: string;
  last_sign_in?: string;
  permissions?: {
    canCreateEvents: boolean;
    canEditEvents: boolean;
    canDeleteEvents: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    canManageAdmins: boolean;
    canEditPermissions: boolean;
  };
}

export type RolePermissions = {
  label: string;
  color: string;
  description: string;
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  canCloneEvents: boolean;
  canDisableEvents: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canManageAdmins: boolean;
  canEditPermissions: boolean;
  canBeModified: boolean;
  canAccessMarketing: boolean;
};