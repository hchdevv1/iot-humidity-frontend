export interface Department {
  departmentRowId: number;

  departmentName: string;

  abbreviation: string | null;

  building: string | null;

  floor: string | null;

  departmentSort: number;

  departmentRemark: string | null;

  departmentActive: string;
}