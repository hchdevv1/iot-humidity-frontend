"use client";

import { useQuery } from "@tanstack/react-query";

import {
  transactionService,
  LatestTransactionRequest,
} from "@/services/transaction.service";

export function useLatestTransactions(
  payload: LatestTransactionRequest,
  enabled = true
) {
  return useQuery({
    queryKey: [
      "latest-transactions",
      payload,
    ],

    queryFn: () =>
      transactionService.getLatest(
        payload
      ),

    enabled:
      enabled &&
      payload.registerRowIds.length >
        0,
  });
}