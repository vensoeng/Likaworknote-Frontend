import api from "../api/axios.ts";
import type { UpdateMe, ApiResponse, UserProfile } from "../types/updateMe.ts";

const UpdateMeService = {
 
  updateMe: async (data: UpdateMe): Promise<UserProfile> => {
    const response = await api.post<ApiResponse<UserProfile>>(
      "/auth/update-me",
      data
    );

    return response.data.data;
  },
  
};

export default UpdateMeService;