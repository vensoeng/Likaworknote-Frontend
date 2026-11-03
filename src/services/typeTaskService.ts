import api from "../api/axios.ts";
import type { TypeTask, ApiResponse } from "../types/TypeTask.ts";

const TypeTaskService = {
  getTypeTask: async (): Promise<TypeTask[]> => {
    const response = await api.get<ApiResponse<TypeTask[]>>("/task-types");
    return response.data.data;
  },

  createTypeTask: async (data: {
    title: string;
    des: string;
  }): Promise<TypeTask> => {
    const response = await api.post<ApiResponse<TypeTask>>(
      "/task-types",
      data
    );

    return response.data.data;
  },
  
  updateTypeTask: async (
    id: number,
    data: {
      title: string;
      des: string;
    }
  ) => {
    const response = await api.put<ApiResponse<TypeTask>>(
      `/task-types/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteTypeTask: async (id: number): Promise<void> => {
    await api.delete(`/task-types/${id}`);
  },

};

export default TypeTaskService;