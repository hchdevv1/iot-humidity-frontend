"use client";

import { useQuery } from "@tanstack/react-query";

import {
  transactionChartService,
  TransactionChartRequest,
} from "@/services/transaction-chart.service";

export function useTransactionCharts(
  payload: TransactionChartRequest,
  enabled = true
) {
  return useQuery({
    queryKey: [
      "transaction-charts",
      payload,
    ],

    queryFn: () =>
      transactionChartService.getDailyCharts(
        payload
      ),

    enabled,

    refetchInterval: 300000,
  });
}