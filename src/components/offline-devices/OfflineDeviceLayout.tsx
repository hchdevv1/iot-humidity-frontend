"use client";

import OfflineDeviceSummary from "./OfflineDeviceSummary";

import OfflineDeviceTable from "./OfflineDeviceTable";

import LoadingState from "@/components/common/LoadingState";

import ErrorState from "@/components/common/ErrorState";

import EmptyState from "@/components/common/EmptyState";

import { useOfflineDevices } from "@/hooks/useOfflineDevices";

export default function OfflineDeviceLayout() {
  /**
   * query
   */
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useOfflineDevices();

  /**
   * loading
   */
  if (isLoading) {
    return (
      <LoadingState title="Loading offline devices..." />
    );
  }

  /**
   * error
   */
  if (isError) {
    return (
      <ErrorState
        title="Offline Device Error"
        description="Failed to load offline devices"
        onRetry={refetch}
      />
    );
  }

  /**
   * empty
   */
  if (data.length === 0) {
    return (
      <EmptyState
        title="No offline devices"
        description="All devices are online"
      />
    );
  }

  return (
    <div className="space-y-6 pb-10">
  
      {/* SUMMARY
      <OfflineDeviceSummary
        total={data.length}
      /> */}

      {/* TABLE */}
      <OfflineDeviceTable
        devices={data}
      />
    </div>
  );
}