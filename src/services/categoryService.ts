import api from "../api/axios";
import type { Category, ApiResponse } from "../types/category";

const CategoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>("/task-categories");
    return response.data.data;
  },

  createCategory: async (data: {
    title: string;
    des: string;
  }): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>(
      "/task-categories",
      data
    );

    return response.data.data;
  },
  
  updateCategory: async (
    id: number,
    data: {
      title: string;
      des: string;
    }
  ) => {
    const response = await api.put<ApiResponse<Category>>(
      `/task-categories/${id}`,
      data
    );

    return response.data.data;
  },
  
  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/task-categories/${id}`);
  },

};

export default CategoryService;