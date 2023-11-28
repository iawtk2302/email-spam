export interface Email {
    body: string;
    id: number;
    is_spam: boolean;
    receiver_id: number;
    title: string;
    user_id: number;
  }

  export interface EmailDetail {
    body: string;
    created_at: string;
    is_spam: boolean;
    receiver_email: string;
    title: string;
  }
  
  