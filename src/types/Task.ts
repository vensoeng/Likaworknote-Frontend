export interface Task {
  id: number;
  status: boolean;
  user_id: number;
  type_id: number;
  category_id: number;
  schedule: string;
  statuses_id: number;
  rate: number;
  title: string;
  des: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  total: number;
  data: T;
}