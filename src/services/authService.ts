import api from "../api/axios";
import authStorage from "./authStorage";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  RefreshResponse,
  MeResponse,
} from "../types/auth";

const authService = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const formData = new FormData();

        formData.append("email", data.email);
        formData.append("password", data.password);

        if (data.firstName) {
            formData.append("firstName", data.firstName);
        }

        if (data.lastName) {
            formData.append("lastName", data.lastName);
        }

        if (data.pr_img) {
            formData.append("pr_img", data.pr_img);
        }

        const response = await api.post<AuthResponse>(
            "/auth/register",
            formData
        );

        return response.data;
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            data
        );

        return response.data;
    },

    refresh: async (
        refreshToken: string
            ): Promise<RefreshResponse> => {
        const response = await api.post<RefreshResponse>(
            "/auth/refresh",
            {
            refreshToken,
            }
        );

        return response.data;
    },

    // logout: async() : Promise<{ message: string }> => {
    //     const response = await api.post(
    //         "/auth/logout",
    //     );

    //     return response.data;
    // },
    logout: async (): Promise<{ message: string }> => {
        const refreshToken = authStorage.getRefreshToken();
        
        // Pass refreshToken in body so backend can revoke it
        const response = await api.post<{ message: string }>(
        "/auth/logout",
        { refreshToken }
        );

        return response.data;
    },

    me: async (): Promise<MeResponse> => {
        const response = await api.get<MeResponse>(
            "/auth/me"
        );

        return response.data;
    },
};

export default authService;