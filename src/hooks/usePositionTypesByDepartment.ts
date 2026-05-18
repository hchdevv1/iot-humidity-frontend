"use client";

import { useQuery } from "@tanstack/react-query";

import { getPositionTypesByDepartment } from "@/services/position-type-by-department.service";

export function usePositionTypesByDepartment(
  departmentRowId?: number,
) {
  return useQuery({
    queryKey: [
      "position-types-by-department",
      departmentRowId,
    ],

    queryFn: () =>
      getPositionTypesByDepartment(
        departmentRowId!,
      ),

    enabled:
      !!departmentRowId,

    staleTime:
      1000 * 60 * 5,
  });
}