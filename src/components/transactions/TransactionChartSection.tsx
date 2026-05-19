"use client";

import {forwardRef} from "react";
import TransactionDateChartCard from "./TransactionDateChartCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import { TransactionRangeDevice } from "@/types/transaction-range";

type Props = {
  data?: TransactionRangeDevice[];

  isLoading?: boolean;

  isError?: boolean;

  onRetry?: () => void;
};

const TransactionChartSection =
  forwardRef<
    HTMLDivElement,
    Props
  >(
    (
      {
        data = [],
        isLoading = false,
        isError = false,
        onRetry,
      },
      ref
    ) => {
      /**
       * loading
       */
      if (isLoading) {
        return (
          <LoadingState title="Loading charts..." />
        );
      }

      /**
       * error
       */
      if (isError) {
        return (
          <ErrorState
            title="Chart Error"
            description="Failed to load chart data"
            onRetry={onRetry}
          />
        );
      }

      /**
       * empty
       */
      if (data.length === 0) {
        return (
          <EmptyState
            title="No chart data"
            description="Please select device and date range"
          />
        );
      }

      return (
        <div
          ref={ref}
          className="space-y-6"
        >
          {data.map(
            (device) =>
              device.series.map(
                (day) => (
                  <div
                    key={`${device.installedRowId}-${day.date}`}
                    className="pdf-chart-card"
                  >
                    <TransactionDateChartCard
                      device={device}
                      day={day}
                    />
                  </div>
                )
              )
          )}
        </div>
      );
    }
  );

TransactionChartSection.displayName =
  "TransactionChartSection";

export default TransactionChartSection;