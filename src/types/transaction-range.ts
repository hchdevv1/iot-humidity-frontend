export interface TransactionRangeSeriesItem {
  minutes: number;

  time: string;

  value: number;
}

export interface TransactionRangeDaySeries {
  date: string;

  temperatureSeries: TransactionRangeSeriesItem[];

  humiditySeries: TransactionRangeSeriesItem[];
}

export interface TransactionRangeThreshold {
  temperature: {
    low: string;

    high: string;
  };

  humidity: {
    low: string;

    high: string;
  };

  description: {
    normal: string;

    alert: string;
  };
}

export interface TransactionRangeDevice {
  installedRowId: string;

  assetDeviceName: string;

  departmentRowId: number;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  threshold: TransactionRangeThreshold;

  series: TransactionRangeDaySeries[];
}