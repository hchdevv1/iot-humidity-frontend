"use client";

import { useQuery } from "@tanstack/react-query";

import { departmentService } from "@/services/department.service";

export function useDepartments(
  keyword?: string
) {
  return useQuery({
    queryKey: [
      "departments",
      keyword,
    ],

    queryFn: () =>
      departmentService.getDepartments(
        keyword
      ),

    staleTime: 1000 * 60 * 5,
  });
}