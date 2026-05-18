export interface ChartSeriesItem {
  minutes: number;

  time: string;

  value: number;
}

export interface TransactionChartThreshold {
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

export interface TransactionChart {
  installedRowId: string;

  assetDeviceName: string;

  departmentRowId: number;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  date: string;

  threshold: TransactionChartThreshold;

  temperatureSeries: ChartSeriesItem[];

  humiditySeries: ChartSeriesItem[];
}