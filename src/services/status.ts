import api from "../api/axios.ts";
import type { Status, ApiResponse } from "../types/Status.ts";

const StatusService = {
  getStatus: async (): Promise<Status[]> => {
    const response = await api.get<ApiResponse<Status[]>>("/task-statuses");
    return response.data.data;
  },

  createStatus: async (data: {
    title: string;
    des: string;
  }): Promise<Status> => {
    const response = await api.post<ApiResponse<Status>>(
      "/task-statuses",
      data
    );

    return response.data.data;
  },
  
  updateStatus: async (
    id: number,
    data: {
      title: string;
      des: string;
    }
  ) => {
    const response = await api.put<ApiResponse<Status>>(
      `/task-statuses/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteStatus: async (id: number): Promise<void> => {
    await api.delete(`/task-statuses/${id}`);
  },

};

export default StatusService;