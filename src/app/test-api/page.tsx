"use client";

import { useEffect } from "react";

import { departmentService } from "@/services/department.service";

export default function TestApiPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await departmentService.getDepartments();

        console.log("API RESULT:", res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      Test API
    </div>
  );
}