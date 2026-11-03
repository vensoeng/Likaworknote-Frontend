import api from "../api/axios.ts";
import type { TaskSchedule, ApiResponse } from "../types/Schedule.ts";

const ScheduleService = {
  getSchedule: async (): Promise<TaskSchedule[]> => {
    const response = await api.get<ApiResponse<TaskSchedule[]>>("/task-schedules");
    return response.data.data;
  },

  createSchedule: async (data: {
    title: string;
    des: string;
  }): Promise<TaskSchedule> => {
    const response = await api.post<ApiResponse<TaskSchedule>>(
      "/task-schedules",
      data
    );

    return response.data.data;
  },
  
  updateSchedule: async (
    id: number,
    data: {
      title: string;
      des: string;
    }
  ) => {
    const response = await api.put<ApiResponse<TaskSchedule>>(
      `/task-schedules/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteSchedule: async (id: number): Promise<void> => {
    await api.delete(`/task-schedules/${id}`);
  },

};

export default ScheduleService;