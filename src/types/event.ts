export type Event = {
  id: number;
  title: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
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
  created_at?: string;
  updated_at?: string;
}; 