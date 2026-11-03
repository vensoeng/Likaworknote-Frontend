export interface Telegram {
  id: number;
  title: string | null;
  des: string | null;
  telegram_id: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ApiResponse<T> {
  success: boolean;
  total: number;
  data: T;
}