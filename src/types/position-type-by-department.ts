export interface PositionTypeByDepartmentItem {
  departmentRowId: string;

  departmentName: string;

  positionTypeRowId: string;

  positionTypeName: string;
}

export interface PositionTypeByDepartmentResponse {
  success: boolean;

  message: string;

  data: PositionTypeByDepartmentItem[];
}