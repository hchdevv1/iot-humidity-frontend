import axios from "axios";

import {
  OfflineDeviceResponse,
} from "@/types/offline-device";

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

export async function getOfflineDevices() {
  const response =
    await axios.get<OfflineDeviceResponse>(
      `${API_URL}/transactions/offline-devices`
    );

  return response.data.data;
}