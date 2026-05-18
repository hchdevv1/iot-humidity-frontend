import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api";

import { AssetInstalled } from "@/types/asset-installed";

export interface AssetInstalledSearchRequest {
  departmentRowId: number;

  positionTypeRowId: string;
}

export const assetInstalledService = {
  async search(
    payload: AssetInstalledSearchRequest
  ) {
    const response =
      await api.post<
        ApiResponse<AssetInstalled[]>
      >(
        "/asset-installed/search",
        payload
      );

    return response.data.data;
  },
};