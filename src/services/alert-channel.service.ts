import axios from "axios";

import {
  AlertChannelResponse,
} from "@/types/alert-channel";

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

export async function getAlertChannels() {
  const response =
    await axios.get<AlertChannelResponse>(
      `${API_URL}/alert-channels`
    );

  return response.data.data;
}