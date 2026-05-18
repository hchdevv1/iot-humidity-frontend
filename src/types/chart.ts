export interface ChartPoint {
  minutes: number;

  time: string;

  value: number;
}

export interface ThresholdRange {
  low: number;

  high: number;
}

export interface ChartThreshold {
  temperature: ThresholdRange;

  humidity: ThresholdRange;
}

export interface DailyChart {
  installedRowId: string;

  assetDeviceName: string;

  departmentRowId: number;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;

  installationArea: string;

  threshold: ChartThreshold;

  temperatureSeries: ChartPoint[];

  humiditySeries: ChartPoint[];
}