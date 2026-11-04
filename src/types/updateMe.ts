export interface UpdateMe {
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  telegram_id: string | null;
}

export interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  telegram_id: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}