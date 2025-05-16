// src/types.ts
export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  venue: string;
  address: string;
  description: string;
  region: string; // Allow 'Australia' | 'Bangladesh' or others
  image?: string;
  disabled: boolean;
  map_link?: string;
  link?: string;
  email_template?: string;
};

export type User = {
  id: string;
  email: string;
  role: string;
  name?: string;
  created_at?: string;
  last_sign_in?: string;
};