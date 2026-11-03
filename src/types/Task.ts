export interface Task {
  id: number;
  status: boolean | number | string;
  type_id: string | null;
  category_id: string | null;
  schedule: string | null;
  statuses_id: string | null;
  reminder_id: string | null;
  telegram_id: string | null;
  rate: string | null;
  title: string | null;
  des: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ApiResponse<T> {
  success: boolean;
  total: number;
  data: T;
}