import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import authStorage from "../services/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);


// ========================================
// REFRESH STATE
// ========================================

let isRefreshing = false;

let waitingRequests: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];


// ========================================
// PROCESS WAITING REQUESTS
// ========================================

const processWaitingRequests = (
  error: unknown,
  token: string | null = null
) => {
  waitingRequests.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  });

  waitingRequests = [];
};


// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    // Only handle 401
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = authStorage.getRefreshToken();

    // No refresh token
    if (!refreshToken) {
      authStorage.clear();

      return Promise.reject(error);
    }


    // ========================================
    // Another request is already refreshing
    // ========================================

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        waitingRequests.push({
          resolve,
          reject,
        });
      }).then((newAccessToken) => {

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      });
    }


    // ========================================
    // Start refresh
    // ========================================

    isRefreshing = true;

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {
          refreshToken,
        }
      );

      const newAccessToken =
        response.data.accessToken;

      // Save new access token
      authStorage.setAccessToken(
        newAccessToken
      );

      // Release waiting requests
      processWaitingRequests(
        null,
        newAccessToken
      );

      // Retry original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch (refreshError) {

      processWaitingRequests(
        refreshError,
        null
      );

      authStorage.clear();

      return Promise.reject(
        refreshError
      );

    } finally {

      isRefreshing = false;

    }
  }
);

export default api;