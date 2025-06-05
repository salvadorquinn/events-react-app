export type Role = "super-admin" | "admin" | "marketing-supervisor" | "marketing" | "marketing-intern";

export { Event } from './types/event';

export type User = {
  id: string;
  email: string;
  role: Role;
  name?: string;
  created_at?: string;
  last_sign_in?: string;
  permissions?: { [key: string]: boolean };
};