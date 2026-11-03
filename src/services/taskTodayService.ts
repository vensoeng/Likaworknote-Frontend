import api from "../api/axios.ts";
import type { TaskToday, ApiResponse } from "../types/taskToday.ts";

const StatusService = {
  getTaskToday: async (id: number): Promise<TaskToday[]> => {
    const response = await api.get<ApiResponse<TaskToday[]>>(`/mytask/today/${id}`);
    return response.data.data;
  },
  getTaskThisWeek: async (id: number): Promise<TaskToday[]> => {
    const response = await api.get<ApiResponse<TaskToday[]>>(`/mytask/week/${id}`);
    return response.data.data;
  },
  getTaskThisMonth: async (id: number): Promise<TaskToday[]> => {
    const response = await api.get<ApiResponse<TaskToday[]>>(`/mytask/month/${id}`);
    return response.data.data;
  },
  getTaskThisYear: async (id: number): Promise<TaskToday[]> => {
    const response = await api.get<ApiResponse<TaskToday[]>>(`/mytask/year/${id}`);
    return response.data.data;
  },
  getTaskCategory: async (
    id: number,
    userId: number
  ): Promise<TaskToday[]> => {
    const response = await api.get<ApiResponse<TaskToday[]>>(`/mytask/user/${userId}/category/${id}`);
    return response.data.data;
  },
  getTaskCompletedByDate: async (
    userName: string,
    id: string
  ): Promise<TaskToday[]> => {
      const response = await api.get<ApiResponse<TaskToday[]>>(
          `/mytask/${userName}/${id}`
      );
      console.log(userName, id);
      return response.data.data;
  },
};

export default StatusService;