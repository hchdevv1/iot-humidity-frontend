export interface OfflineDevice {
  installedRowId: string;

  assetDeviceName: string;

  departmentRowId: number;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  latestTransactionDate:
    | string
    | null;

  latestTransactionTime:
    | string
    | null;

  offlineDays:
    | number
    | null;

  deviceStatus: string;
}

export interface OfflineDeviceResponse {
  success: boolean;

  message: string;

  data: OfflineDevice[];
}