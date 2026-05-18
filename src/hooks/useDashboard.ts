"use client";

import { useQuery } from "@tanstack/react-query";

import { assetInstalledService } from "@/services/asset-installed.service";

import { transactionService } from "@/services/transaction.service";

import { chartService } from "@/services/chart.service";

interface Props {
  departmentRowId?: number;

  positionTypeRowId?: string;
}

export function useDashboard({
  departmentRowId,
  positionTypeRowId,
}: Props) {
  /**
   * STEP 1
   * Search installed devices
   */
  const assetQuery = useQuery({
    queryKey: [
      "asset-installed",
      departmentRowId,
      positionTypeRowId,
    ],

    queryFn: async () => {
      if (
        !departmentRowId ||
        !positionTypeRowId
      ) {
        return [];
      }

      return assetInstalledService.search(
        {
          departmentRowId,
          positionTypeRowId,
        }
      );
    },

    enabled:
      !!departmentRowId &&
      !!positionTypeRowId,
  });

  /**
   * register ids
   */
  const registerRowIds =
    assetQuery.data?.map(
      (item) => item.registerRowId
    ) ?? [];

  /**
   * STEP 2
   * Latest transactions
   */
  const latestQuery = useQuery({
    queryKey: [
      "latest-transactions",
      registerRowIds,
    ],

    queryFn: async () => {
      if (
        registerRowIds.length === 0
      ) {
        return [];
      }

      return transactionService.getLatest(
        {
          registerRowIds,
        }
      );
    },

    enabled:
      registerRowIds.length > 0,

    /**
     * Hybrid polling
     */
    refetchInterval: 1000 * 30,
  });

  /**
   * STEP 3
   * Chart
   */
  const chartQuery = useQuery({
    queryKey: [
      "daily-chart",
      registerRowIds,
    ],

    queryFn: async () => {
      if (
        registerRowIds.length === 0
      ) {
        return [];
      }

      return chartService.getDailyChart(
        {
          registerRowIds: [
            registerRowIds[0],
          ],
        }
      );
    },

    enabled:
      registerRowIds.length > 0,

    refetchInterval:
      1000 * 60,
  });

  return {
    assetInstalled:
      assetQuery.data ?? [],

    latestTransactions:
      latestQuery.data ?? [],

    charts:
      chartQuery.data ?? [],

    isLoading:
      assetQuery.isLoading ||
      latestQuery.isLoading ||
      chartQuery.isLoading,
  };
}