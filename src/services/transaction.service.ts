import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { TransactionLatestItem } from "@/types/transaction-latest";

export interface LatestTransactionRequest {
  registerRowIds: string[];
}

export const transactionService = {
  async getLatest(
    payload: LatestTransactionRequest
  ) {
    const response =
      await api.post<
        ApiResponse<
          TransactionLatestItem[]
        >
      >(
        "/transactions/latest",
        payload
      );

    return response.data.data;
  },
};