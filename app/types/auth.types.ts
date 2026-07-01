export interface LoginRequest {
  login_id: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  broker_id: string;
  broker_company_name: string | null;
  username: string | null;
  phone: string | null;
  contact_email: string | null;
  id_card_url: string | null;
  id_card_original_filename: string | null;
  id_card_mime_type: string | null;
  roles: Role[];
}

export interface Broker {
  id: string;
  broker_type: string;
  operational_tier: string;
  registration_stage: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  profile_photo_url: string | null;
  pan_number: string | null;
  pin_code: string | null;
  business_classification: string;
  gst_enrolled: boolean;
  new_car_referral_program: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
  broker: Broker;
}
