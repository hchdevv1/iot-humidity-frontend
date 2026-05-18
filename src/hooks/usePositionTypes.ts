"use client";

import { useQuery } from "@tanstack/react-query";

import { positionTypeService } from "../services/position-type.service";

export function usePositionTypes(
  keyword?: string
) {
  return useQuery({
    queryKey: [
      "position-types",
      keyword,
    ],

    queryFn: () =>
      positionTypeService.getPositionTypes(
        keyword
      ),

    staleTime: 1000 * 60 * 5,
  });
}