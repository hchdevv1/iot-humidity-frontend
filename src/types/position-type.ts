export interface PositionType {
  positionRowId: number;

  positionName: string;

  positionNameEng: string | null;

  positionRemark: string | null;

  tempperatureAlert: string | null;

  tempperatureNormal: string | null;

  positionTypeRowId: string;

  positionActive: boolean;

  humidityAlert: string | null;

  humidityNormal: string | null;
}
