"use client";

import { useQuery } from "@tanstack/react-query";

import {
  transactionRangeService,
  TransactionRangeRequest,
} from "@/services/transaction-range.service";

export function useTransactionRange(
  payload: TransactionRangeRequest,
  enabled = true
) {
  return useQuery({
    queryKey: [
      "transaction-range",
      payload,
    ],

    queryFn: () =>
      transactionRangeService.getRangeChart(
        payload
      ),

    enabled,
  });
}