export interface Status {
  id: number;
  title: string;
  des: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  total?: number;
  meta?: {
    total_items: number;
    current_page: number;
    limit: number;
    total_pages: number;
  };
  data: T;
}
