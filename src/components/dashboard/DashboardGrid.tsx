/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import TopFilterBar from "./TopFilterBar";

import DeviceStatusCard from "./DeviceStatusCard";

import ChartPanel from "./ChartPanel";

import { useAssetInstalled } from "@/hooks/useAssetInstalled";

import { useLatestTransactions } from "@/hooks/useLatestTransactions";

import { useTransactionCharts } from "@/hooks/useTransactionCharts";

import { Wifi, WifiOff } from "lucide-react";
import { useTransactionsSocket } from "@/hooks/useTransactionsSocket";
export default function DashboardGrid() {
  /**
   * selected filters
   */
  const [selectedDepartmentRowId, setSelectedDepartmentRowId] =
    useState<number>();

  const [selectedPositionTypeRowId, setSelectedPositionTypeRowId] =
    useState<string>();

  /**
   * normalized filters
   */
  const [departmentRowId, setDepartmentRowId] = useState<number>();

  const [positionTypeRowId, setPositionTypeRowId] = useState<string>();

  /**
   * handle department change
   */
  const handleDepartmentChange = (value?: number) => {
    /**
     * update department
     */
    setSelectedDepartmentRowId(value);

    /**
     * reset position type
     */
    setSelectedPositionTypeRowId("ALL");
  };

  /**
   * normalize filters
   */
  useEffect(() => {
    /**
     * department
     */
    setDepartmentRowId(selectedDepartmentRowId);

    /**
     * IMPORTANT:
     * convert ALL -> undefined
     */
    setPositionTypeRowId(
      selectedPositionTypeRowId === "ALL"
        ? undefined
        : selectedPositionTypeRowId,
    );
  }, [selectedDepartmentRowId, selectedPositionTypeRowId]);

  /**
   * asset installed
   */
  const { data: devices = [], isLoading: isDevicesLoading } = useAssetInstalled(
    {
      departmentRowId,
      positionTypeRowId,
    },
  );

  /**
   * register row ids
   */
  const registerRowIds = devices.map((d) => d.registerRowId);

  /**
   * latest transactions
   */
  const { data: latestTransactions = [], isLoading: isTransactionsLoading } =
    useLatestTransactions(
      {
        registerRowIds,
      },

      registerRowIds.length > 0,
    );

  /**
   * charts
   */
  const { data: charts = [], isLoading: isChartsLoading } =
    useTransactionCharts(
      {
        registerRowIds,
      },

      registerRowIds.length > 0,
    );

  /**
   * DEBUG
   */
  console.log({
    selectedDepartmentRowId,

    selectedPositionTypeRowId,

    departmentRowId,

    positionTypeRowId,

    registerRowIds,

    charts,
  });
  const { isConnected, isReconnecting } = useTransactionsSocket();
  useTransactionsSocket();

  return (
    <div className="space-y-6 pb-10">
      {/* FILTER */}
      <TopFilterBar
        departmentRowId={selectedDepartmentRowId}
        positionTypeRowId={selectedPositionTypeRowId}
        onDepartmentChange={handleDepartmentChange}
        onPositionTypeChange={setSelectedPositionTypeRowId}
        
      />

      {/* DEVICE ROWS */}
      <div className="space-y-6">
     
        {latestTransactions.map((device, index) => {
          /**
           * matching chart
           */
          const chart = charts.find(
            (c) => c.installedRowId === device.installedRowId,
          );

          return (
            <div
              key={`${device.installedRowId}-${index}`}
              className="
                  grid
                  grid-cols-1
                  xl:grid-cols-[320px_minmax(0,1fr)]
                  gap-6
                  items-start
                "
            >
              {/* LEFT */}
              <DeviceStatusCard
                devices={[device]}
                isLoading={isDevicesLoading || isTransactionsLoading}
              />

              {/* RIGHT */}
              <ChartPanel
                charts={chart ? [chart] : []}
                isLoading={isChartsLoading}
              />
            </div>
          );
        })}
      </div>
         {/* CONNECTION STATUS */}
        <div className="flex items-center justify-end">
          {isConnected ? (
            <div className="inline-flex items-center gap-2  rounded-full  bg-emerald-100  px-4 py-2 text-sm font-medium   text-emerald-700 ">
              <Wifi size={16} />
              LIVE
            </div>
          ) : (
            <div
              className=" inline-flex  items-center gap-2 rounded-full  bg-red-100  px-4  py-2 text-sm font-medium text-red-700" >
              <WifiOff size={16} />

              {isReconnecting ? "Reconnecting..." : "Disconnected"}
            </div>
          )}
        </div>
    </div>
  );
}
