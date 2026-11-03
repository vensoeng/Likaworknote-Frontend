export interface UpdateMe {
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}