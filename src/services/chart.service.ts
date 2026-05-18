import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { DailyChart } from "@/types/chart";

export interface DailyChartRequest {
  registerRowIds: string[];
}

export const chartService = {
  async getDailyChart(
    payload: DailyChartRequest
  ) {
    const response =
      await api.post<
        ApiResponse<DailyChart[]>
      >(
        "/transactions/chart/daily",
        payload
      );

    return response.data.data;
  },
};