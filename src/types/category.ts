export interface Category {
  id: number;
  user_id: number;
  title: string | null;
  des: string | null;
  status?: string;
  image_url?: string; 
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ApiResponse<T> {
  success: boolean;
  total: number;
  data: T;
}