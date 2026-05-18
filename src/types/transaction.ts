export interface TransactionSensorData {
  temperature: number;

  humidity: number;

  alertFlag: string;

  transactionDate: string;

  transactionTime: string;
}

export interface TransactionLatest {
  installedRowId: string;

  assetDeviceName: string;

  departmentRowId: number;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  latest: TransactionSensorData;

  previous: TransactionSensorData;

  temperatureDiff: number;

  humidityDiff: number;

  temperatureTrend:
    | "UP"
    | "DOWN"
    | "SAME";

  humidityTrend:
    | "UP"
    | "DOWN"
    | "SAME";

  lastUpdatedMinutesAgo: number;

  deviceStatus:
    | "ONLINE"
    | "OFFLINE";
}