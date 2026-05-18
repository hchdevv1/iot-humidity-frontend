import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { TransactionChart } from "@/types/transaction-chart";

export interface TransactionChartRequest {
  registerRowIds: string[];
}

export const transactionChartService = {
  async getDailyCharts(
    payload: TransactionChartRequest
  ) {
    const response =
      await api.post<
        ApiResponse<TransactionChart[]>
      >(
        "/transactions/chart/daily",
        payload
      );

    return response.data.data;
  },
};