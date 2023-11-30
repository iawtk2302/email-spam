export interface Email {
  body: string;
  id: number;
  is_spam: boolean;
  receiver_id: number;
  sender_name: string;
  time_send: string;
  title: string;
  user_id: number;
}

export interface EmailDetail {
  body: string;
  created_at: string;
  is_spam: boolean;
  receiver_email: string;
  sender_name: string;
  title: string;
}

export interface Meta {
  has_next: boolean;
  has_prev: boolean;
  next_page: number | null;
  page: number;
  pages: number;
  prev_page: number | null;
  total_count: number;
}
