import axios from "axios";

import {
  PositionTypeByDepartmentResponse,
} from "@/types/position-type-by-department";

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

export async function getPositionTypesByDepartment(
  departmentRowId: number,
) {
  const response =
    await axios.get<PositionTypeByDepartmentResponse>(
      `${API_URL}/position-types/by-department/${departmentRowId}`,
    );

  return response.data.data;
}