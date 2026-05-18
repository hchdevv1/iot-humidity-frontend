import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { PositionType } from "@/types/position-type";

export const positionTypeService = {
  async getPositionTypes(
    keyword?: string
  ) {
    const response =
      await api.get<
        ApiResponse<PositionType[]>
      >("/position-types", {
        params: {
          keyword,
        },
      });

    return response.data.data;
  },
};