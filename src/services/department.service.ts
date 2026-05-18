import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { Department } from "@/types/department";

export const departmentService = {
  async getDepartments(
    keyword?: string
  ) {
    const response =
      await api.get<
        ApiResponse<Department[]>
      >("/departments", {
        params: {
          keyword,
        },
      });

    return response.data.data;
  },
};