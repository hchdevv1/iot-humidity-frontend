"use client";

import DeviceStatusCard from "./DeviceStatusCard";
import ChartPanel from "./ChartPanel";

import { TransactionLatestItem } from "@/types/transaction-latest";

import { TransactionChart } from "@/types/transaction-chart";

type Props = {
  latest?: TransactionLatestItem;

  chart?: TransactionChart;

  isLoading?: boolean;
};

export default function DeviceMonitoringCard({
  latest,
  chart,
  isLoading = false,
}: Props) {
  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)]  gap-6 items-stretch"
    >
      {/* LEFT */}
      <DeviceStatusCard
        devices={
          latest ? [latest] : []
        }
        isLoading={isLoading}
      />

      {/* RIGHT */}
      <ChartPanel
        charts={chart ? [chart] : []}
        isLoading={isLoading}
      />
    </div>
  );
}