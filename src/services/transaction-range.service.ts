import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { TransactionRangeDevice } from "@/types/transaction-range";

export interface TransactionRangeRequest {
  registerRowIds: string[];

  from: string;

  to: string;

  intervalMinutes: number;
}

export const transactionRangeService = {
  async getRangeChart(
    payload: TransactionRangeRequest
  ) {
    const response =
      await api.post<
        ApiResponse<
          TransactionRangeDevice[]
        >
      >(
        "/transactions/chart/range",
        payload
      );

    return response.data.data;
  },
};