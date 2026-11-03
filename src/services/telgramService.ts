import api from "../api/axios.ts";
import type { Telegram, ApiResponse } from "../types/Telegram.ts";

const TelegramService = {
  getTelegram: async (): Promise<Telegram[]> => {
    const response = await api.get<ApiResponse<Telegram[]>>("/user-telegram");
    return response.data.data;
  },

  createTelegram: async (data: {
    title: string;
    des: string;
    telegram_id: string;
  }): Promise<Telegram> => {
    const response = await api.post<ApiResponse<Telegram>>(
      "/user-telegram",
      data
    );

    return response.data.data;
  },
  
  updateTelegram: async (
    id: number,
    data: {
      title: string;
      des: string;
      telegram_id: string;
    }
  ) => {
    const response = await api.put<ApiResponse<Telegram>>(
      `/user-telegram/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteTelegram: async (id: number): Promise<void> => {
    await api.delete(`/user-telegram/${id}`);
  },

};

export default TelegramService;