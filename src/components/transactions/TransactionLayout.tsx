"use client";

import {
  useRef,
  useState,
} from "react";

import { format } from "date-fns";

import { DateRange } from "react-day-picker";

import TransactionFilterBar from "./TransactionFilterBar";

import TransactionChartSection from "./TransactionChartSection";

import TransactionRawTable from "./TransactionRawTable";

import { useTransactionRange } from "@/hooks/useTransactionRange";

export default function TransactionLayout() {
  /**
   * chart ref
   */
  const chartRef =
    useRef<HTMLDivElement>(null);

  /**
   * selected
   */
  const [
    selectedDepartmentRowId,
    setSelectedDepartmentRowId,
  ] = useState<number>();

  const [
    selectedPositionTypeRowId,
    setSelectedPositionTypeRowId,
  ] = useState<string>();

  const [
    selectedRegisterRowId,
    setSelectedRegisterRowId,
  ] = useState<string>();

  const [
    selectedDateRange,
    setSelectedDateRange,
  ] = useState<DateRange>();

  /**
   * submitted
   */
  const [
    departmentRowId,
    setDepartmentRowId,
  ] = useState<number>();

  const [
    positionTypeRowId,
    setPositionTypeRowId,
  ] = useState<string>();

  const [
    registerRowId,
    setRegisterRowId,
  ] = useState<string>();

  const [dateRange, setDateRange] =
    useState<DateRange>();

  /**
   * submit
   */
  const handleSubmit = () => {
    setDepartmentRowId(
      selectedDepartmentRowId
    );

    setPositionTypeRowId(
      selectedPositionTypeRowId
    );

    setRegisterRowId(
      selectedRegisterRowId
    );

    setDateRange(
      selectedDateRange
    );
  };

  /**
   * query enabled
   */
  const enabled =
    !!registerRowId &&
    !!dateRange?.from &&
    !!dateRange?.to;

  /**
   * query
   */
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useTransactionRange(
    {
      registerRowIds: [
        registerRowId ?? "",
      ],

      from: format(
        dateRange?.from ??
          new Date(),
        "yyyy-MM-dd"
      ),

      to: format(
        dateRange?.to ??
          new Date(),
        "yyyy-MM-dd"
      ),

      intervalMinutes: 15,
    },

    enabled
  );

  return (
    <div className="space-y-6 pb-10">
      {/* FILTER */}
      <TransactionFilterBar
        departmentRowId={
          selectedDepartmentRowId
        }
        positionTypeRowId={
          selectedPositionTypeRowId
        }
        registerRowId={
          selectedRegisterRowId
        }
        dateRange={
          selectedDateRange
        }
        onDepartmentChange={
          setSelectedDepartmentRowId
        }
        onPositionTypeChange={
          setSelectedPositionTypeRowId
        }
        onRegisterRowIdChange={
          setSelectedRegisterRowId
        }
        onDateRangeChange={
          setSelectedDateRange
        }
        onSubmit={handleSubmit}
      />

      {/* CHART */}
      <TransactionChartSection
        ref={chartRef}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />

      {/* TABLE */}
      <TransactionRawTable
        chartRef={chartRef}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />
    </div>
  );
}