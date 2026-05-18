import { useQuery } from "@tanstack/react-query";
import { assetInstalledService } from "@/services/asset-installed.service";

export function useAssetInstalled(payload: {
  departmentRowId: number;
  positionTypeRowId: string;
}) {
  return useQuery({
    queryKey: [
      "asset-installed",
      payload.departmentRowId,
      payload.positionTypeRowId,
    ],

    queryFn: () =>
      assetInstalledService.search(payload),

    enabled:
      payload.departmentRowId != null &&
      payload.positionTypeRowId != null,

    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}