export interface EventData {
  id: string;
  source: string;
  source_id: string;
  title: string;
  description: string | null;
  start_at: string | null;
  end_at: string | null;
  is_free: boolean | null;
  price_text: string | null;
  location_name: string | null;
  address: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
  organizer: string | null;
  image_url: string | null;
  url: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}
