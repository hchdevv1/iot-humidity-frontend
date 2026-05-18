"use client";

import AlertChannelCard from "./AlertChannelCard";

import LoadingState from "@/components/common/LoadingState";

import ErrorState from "@/components/common/ErrorState";

import EmptyState from "@/components/common/EmptyState";

import { useAlertChannels } from "@/hooks/useAlertChannels";

export default function AlertChannelLayout() {
  /**
   * query
   */
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useAlertChannels();

  /**
   * loading
   */
  if (isLoading) {
    return (
      <LoadingState title="Loading alert channels..." />
    );
  }

  /**
   * error
   */
  if (isError) {
    return (
      <ErrorState
        title="Alert Channel Error"
        description="Failed to load alert channels"
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
        title="No alert channels"
        description="No active discord channels found"
      />
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-card
          shadow-sm
          p-6
        "
      >
        <div className="text-2xl font-bold">
          Join Discord
        </div>

        <div
          className="
            text-muted-foreground
            mt-2
          "
        >
          Receive real-time
          temperature &
          humidity alerts
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-5
        "
      >
        {data.map((item) => (
          <AlertChannelCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}