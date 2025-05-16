// src/constants.ts
export const ROLE_PERMISSIONS = {
  "admin": {
    label: "Admin",
    color: "bg-red-500",
    description: "Full access to all features including user management",
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: true,
    canManageUsers: true,
    canViewAnalytics: true,
  },
  "marketing-supervisor": {
    label: "Marketing Supervisor",
    color: "bg-yellow-500",
    description: "Can create, edit and approve events",
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: false,
    canManageUsers: false,
    canViewAnalytics: true,
  },
  "marketing": {
    label: "Marketing",
    color: "bg-blue-500",
    description: "Can create and edit events",
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: false,
    canManageUsers: false,
    canViewAnalytics: false,
  },
  "marketing-intern": {
    label: "Marketing Intern",
    color: "bg-green-500",
    description: "Can view and suggest edits to events",
    canCreateEvents: false,
    canEditEvents: true,
    canDeleteEvents: false,
    canManageUsers: false,
    canViewAnalytics: false,
  }
};