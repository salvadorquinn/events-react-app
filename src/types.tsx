export type Role = "super-admin" | "admin" | "marketing-supervisor" | "marketing" | "marketing-intern";

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  venue: string;
  address: string;
  description: string;
  region: string;
  image?: string;
  disabled: boolean;
  map_link?: string;
  link?: string;
  email_template?: string;
};

export type User = {
  id: string;
  email: string;
  role: Role;
  name?: string;
  created_at?: string;
  last_sign_in?: string;
  permissions?: { [key: string]: boolean };
};