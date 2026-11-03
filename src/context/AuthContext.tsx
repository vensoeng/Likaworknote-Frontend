import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User, LoginRequest } from "../types/auth";
import authService from "../services/authService";
import authStorage from "../services/authStorage";
import userAvater from "/android-chrome-512x512.png";

interface AuthContextType {
  VITE_API_URL: string;
  DEFAULT_AVATAR: string;
  STORAGE_URL: string;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;

  updateUser: (updatedUser: Partial<User>) => void;

  getProfileImage: (imagePath: string | null | undefined) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    return authStorage.getUser();
  });

  const [loading, setLoading] = useState(true);

  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const DEFAULT_AVATAR = userAvater || '';
  const STORAGE_URL = import.meta.env.STORAGE_URL || "/storage/";

  const isAuthenticated = !!user;

  const login = async (data: LoginRequest): Promise<User> => {
    const response = await authService.login(data);

    authStorage.setAccessToken(response.accessToken);
    authStorage.setRefreshToken(response.refreshToken);
    authStorage.setUser(response.user);

    setUser(response.user);

    return response.user;
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const newUser = {
        ...prev,
        ...updatedUser,
      };

      authStorage.setUser(newUser);

      return newUser;
    });
  };


  // const logout = async () => {
  //   try {
  //     await authService.logout();
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   } finally {
  //     authStorage.clear();
  //     setUser(null);
  //   }
  // };
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authStorage.clear();
      setUser(null);
    }
  };

  const getProfileImage = (imagePath: string | null | undefined) => {
    if (!imagePath) return DEFAULT_AVATAR;
    if (imagePath.startsWith("http")) return imagePath;
    return `${VITE_API_URL}${STORAGE_URL}${imagePath}`;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = authStorage.getAccessToken();

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.me();

        authStorage.setUser(response.user);
        setUser(response.user);
      } catch (error) {
        console.error("Auth initialization error:", error);

        authStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        VITE_API_URL,
        DEFAULT_AVATAR,
        STORAGE_URL,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
        getProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
