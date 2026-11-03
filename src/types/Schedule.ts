export interface TaskSchedule {
  id: number;
  title: string | null;
  des: string | null;
  value: string | number | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ApiResponse<T> {
  success: boolean;
  total: number;
  data: T;
}
