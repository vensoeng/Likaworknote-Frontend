import api from "../api/axios.ts";
import type { Task, ApiResponse } from "../types/Task.ts";

const TaskService = {
  getTask: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>("/tasks");
    return response.data.data;
  },

  createTask: async (data: {
    title: string;
    des: string;
    type_id: string | number;
    category_id: string | number;
    statuses_id: string | number;
    reminder_id: string | number;
    telegram_id?: string | number;
    schedule: string;
    rate: string | number;
  }): Promise<Task> => {
    const payload = {
      ...data,
      type_id: Number(data.type_id),
      category_id: Number(data.category_id),
      statuses_id: Number(data.statuses_id),
      reminder_id: Number(data.reminder_id),
      telegram_id: data.telegram_id ? Number(data.telegram_id) : undefined,
      schedule: data.schedule,
      rate: Number(data.rate || 0),
    };

    const response = await api.post<ApiResponse<Task>>("/tasks", payload);
    return response.data.data;
  },
  
  updateTask: async (
    id: number | string,
    data: Partial<{
      title: string;
      des: string;
      type_id: string | number;
      category_id: string | number;
      statuses_id: string | number;
      reminder_id: string | number;
      telegram_id?: string | number;
      schedule: string;
      rate: string | number;
    }>
  ): Promise<Task> => {
    const payload = {
      ...data,
      ...(data.type_id && { type_id: Number(data.type_id) }),
      ...(data.category_id && { category_id: Number(data.category_id) }),
      ...(data.statuses_id && { statuses_id: Number(data.statuses_id) }),
      ...(data.reminder_id && { reminder_id: Number(data.reminder_id) }),
      ...(data.telegram_id && { telegram_id: Number(data.telegram_id) }),
      ...(data.schedule !== undefined && { schedule: data.schedule }),
      ...(data.rate !== undefined && { rate: Number(data.rate) }),
    };

    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, payload);
    return response.data.data;
  },
  
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

};

export default TaskService;