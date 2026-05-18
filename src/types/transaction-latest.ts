export interface TransactionLatestItem {
  installedRowId: string;

  assetDeviceName: string;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  latest: {
    temperature: number;
    humidity: number;
    alertFlag: string;
    transactionDate: string;
    transactionTime: string;
  };

  previous: {
    temperature: number;
    humidity: number;
    alertFlag: string;
    transactionDate: string;
    transactionTime: string;
  };

  temperatureDiff: number;
  humidityDiff: number;

  temperatureTrend: string;
  humidityTrend: string;

  lastUpdatedMinutesAgo: number;

  deviceStatus: string;
}