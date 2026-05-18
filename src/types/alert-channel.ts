export interface AlertChannel {
  id: number;

  channel: string;

  groupName: string;

  groupLink: string;

  isActive: string;

  groupSort: number;

  groupDescription: string;
}

export interface AlertChannelResponse {
  success: boolean;

  message: string;

  data: AlertChannel[];
}