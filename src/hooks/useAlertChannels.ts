"use client";

import { useQuery } from "@tanstack/react-query";

import { getAlertChannels } from "@/services/alert-channel.service";

export function useAlertChannels() {
  return useQuery({
    queryKey: [
      "alert-channels",
    ],

    queryFn: async () => {
      const data =
        await getAlertChannels();

      return data
        .filter(
          (item) =>
            item.isActive ===
            "Y"
        )
        .sort(
          (a, b) =>
            a.groupSort -
            b.groupSort
        );
    },
  });
}