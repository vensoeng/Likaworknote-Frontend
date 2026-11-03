export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  pr_img: string | null;
  gender: string;
  birthday: string;
  email: string;
  role: number;
  telgram_id: string | null;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  pr_img?: File;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  message: string;
}

export interface MeResponse {
  message: string;
  user: User;
}

export interface ApiError {
  message: string;
}