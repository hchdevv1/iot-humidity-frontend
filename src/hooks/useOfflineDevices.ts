"use client";

import { useQuery } from "@tanstack/react-query";

import { getOfflineDevices } from "@/services/offline-device.service";

export function useOfflineDevices() {
  return useQuery({
    queryKey: [
      "offline-devices",
    ],

    queryFn:
      getOfflineDevices,

    refetchInterval:
      1000 * 60 * 5,

    staleTime:
      1000 * 60,
  });
}