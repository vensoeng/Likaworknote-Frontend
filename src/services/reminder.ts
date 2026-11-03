import api from "../api/axios.ts";
import type { Reminder, ApiResponse } from "../types/Reminder.ts";

const ReminderService = {
  getReminder: async (): Promise<Reminder[]> => {
    const response = await api.get<ApiResponse<Reminder[]>>("/task-reminder");
    return response.data.data;
  },

  createReminder: async (data: {
    title: string;
    des: string;
  }): Promise<Reminder> => {
    const response = await api.post<ApiResponse<Reminder>>(
      "/task-reminder",
      data
    );

    return response.data.data;
  },
  
  updateReminder: async (
    id: number,
    data: {
      title: string;
      des: string;
    }
  ) => {
    const response = await api.put<ApiResponse<Reminder>>(
      `/task-reminder/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteReminder: async (id: number): Promise<void> => {
    await api.delete(`/task-reminder/${id}`);
  },

};

export default ReminderService;